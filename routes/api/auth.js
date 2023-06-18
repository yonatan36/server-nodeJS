const express = require("express");
const bcrypt = require("../../config/bcrypt");
const router = express.Router();
const usersValidationServise = require("../../validation/usersValidationServise");
const idValidationServise = require("../../validation/idValidationService");
const userAccessDataService = require("../../model/users/models/userAccessData");
const usersServiceModel = require("../../model/users/usersService");
const normalizeUser = require("../../model/users/helpers/normalizationUser");
const chalk = require("chalk");
const jwt = require("../../config/jwt");
const CustomError = require("../../utils/CustomError");
const permissionsMiddleware = require("../../middleware/permissionsMiddleware");
const authmw = require("../../middleware/authMiddleware");

//http://localhost:8181/api/users/register
//register
router.post("/register", async (req, res) => {
  try {
    req.body = normalizeUser(req.body);
    const register = await usersValidationServise.registerUserValidation(
      req.body
    );
    const unicq = await userAccessDataService.getUserByEmail(req.body.email);
    if (unicq) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    req.body.password = await bcrypt.generateHash(req.body.password);
    req.body = normalizeUser(req.body);
    await userAccessDataService.registerUser(req.body);

    console.log(chalk.greenBright("register"));
    res.status(200).json(register);
  } catch (err) {
    res.json(err.message).status(400);
    console.log(chalk.redBright(err.message));
  }
});

//http://localhost:8181/api/users/login
//login
router.post("/login", async (req, res) => {
  try {
    await usersValidationServise.loginUserValidation(req.body);
    const userData = await userAccessDataService.getUserByEmail(req.body.email);
    if (!userData) {
      console.log("invalid email or password");
      return res.status(400).json({ msg: "invalid email and/or password" });
    }
    const isPasswordMatch = await bcrypt.cmpHash(
      req.body.password,
      userData.password
    );
    if (!isPasswordMatch) {
      console.log("invalid email or password");
      return res.status(400).json({ msg: "invalid email and/or password" });
    }

    const token = await jwt.generateToken({
      _id: userData._id,
      isAdmin: userData.isAdmin,
      isBusiness: userData.isBusiness,
    });
    res.status(200).json({ token: token });
    console.log(chalk.greenBright("login"));
  } catch (err) {
    res.status(400).json(err.message);
    console.log(err.message);
  }
});
//http://localhost:8181/api/users/:id
//update user
router.put(
  "/:id",
  authmw,
  permissionsMiddleware(false, false, true),
  async (req, res) => {
    try {
      let updateNormalUser = await normalizeUser(req.body, req.userData._id);
      const id = req.params.id;
      await idValidationServise.idValidation(id);
      await usersValidationServise.updateUserValidation(req.body);
      updateNormalUser = await normalizeUser(req.body, req.userData._id);
      const updateUser = await usersServiceModel.updateUser(
        id,
        updateNormalUser
      );
      res.status(200).json({
        msg: `user - ${updateUser.name.firstName} ${updateUser.name.lastName} update!`,
      });
      console.log(
        chalk.greenBright(
          `user - ${updateUser.name.firstName} ${updateUser.name.lastName} update!`
        )
      );
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ error: err.message });
    }
  }
);

//http://localhost:8181/users/auth
//get all users
router.get(
  "/",
  authmw,
  permissionsMiddleware(true, false, false),
  async (req, res) => {
    try {
      const getAll = await userAccessDataService.getUsers(req.body);
      console.log(chalk.greenBright("get all users!"));
      res.status(200).json(getAll);
    } catch (err) {
      res.status(400).json(err);
      console.log(chalk.redBright(err.message));
    }
  }
);

//http://localhost:8181/api/users/:id
//get user
router.get(
  "/:id",
  authmw,
  permissionsMiddleware(true, false, true),
  async (req, res) => {
    try {
      const getUser = await userAccessDataService.getUser(req.params.id);
      console.log(chalk.greenBright("get user!"));
      res.status(200).json(getUser);
    } catch (err) {
      res.status(400).json(err);
      console.log(chalk.redBright(err.message));
    }
  }
);

//http://localhost:8181/api/users/:id
//delete user
router.delete(
  "/:id",
  authmw,
  permissionsMiddleware(true, false, true),
  async (req, res) => {
    try {
      const id = req.params.id;
      await idValidationServise.idValidation(id);
      const dataFromDb = await userAccessDataService.deleteUser(id);

            if (!dataFromDb) {
              console.log(chalk.redBright("Could not find the user"));
              return res.status(404).json({ msg: "Could not find the user" });
            }
      console.log(
        chalk.greenBright(
          `user - ${dataFromDb.name.firstName} ${dataFromDb.name.lastName} deleted`
        )
      );
      res.status(200).json({
        msg: `user - ${dataFromDb.name.firstName} ${dataFromDb.name.lastName} deleted`,
      });
    } catch (err) {
      res.status(400).json(err.message);
      console.log(chalk.redBright(err.message));
    }
  }
);


//http://localhost:8181/api/users/:id
//update user
router.patch(
  "/:id",
  authmw,
  permissionsMiddleware(false, false, true),
  async (req, res) => {
    try {
      const id = req.params.id;
      await idValidationServise.idValidation(id);
      const updateUser = await userAccessDataService.updateBizUser(id);
      console.log(chalk.greenBright("isBusiness update"));
      res
        .status(200)
        .json(
          `${updateUser.name.firstName} ${updateUser.name.lastName}  isBusiness - ${updateUser.isBusiness}`
        );
    } catch (err) {
      res.status(400).json(err);
      console.log(chalk.redBright(err.message));
    }
  }
);

module.exports = router;
