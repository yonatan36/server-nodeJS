const express = require("express");
const bcrypt = require("../../config/bcrypt");
const router = express.Router();
const usersValidationServise = require("../../validation/usersValidationServise");
const idValidationServise = require("../../validation/idValidationService");
const userAccessDataService = require("../../model/users/models/userAccessData");
const normalizeUser = require("../../model/users/helpers/normalizationUser");
const usersServiceModel = require("../../model/users/usersService");
const chalk = require("chalk");
const jwt = require("../../config/jwt");
const CustomError = require("../../utils/CustomError");
const permissionsMiddleware = require("../../middleware/permissionsMiddleware");
const authmw = require("../../middleware/authMiddleware");

//http://localhost:8181/api/auth/register
router.post("/register", async (req, res) => {
  try {
    req.body = normalizeUser(req.body);
    const register = await usersValidationServise.registerUserValidation(
      req.body
    );
    req.body.password = await bcrypt.generateHash(req.body.password);
    req.body = normalizeUser(req.body);
    await userAccessDataService.registerUser(req.body);
    console.log(chalk.greenBright("register!"));
    res.json(register).status(200);
  } catch (err) {
    res.json(err).status(400);
    console.log(chalk.redBright(err.message));
  }
});

//http://localhost:8181/api/auth/login
router.post("/login", async (req, res) => {
  try {
    await usersValidationServise.loginUserValidation(req.body);
    const userData = await userAccessDataService.getUserByEmail(req.body.email);
    if (!userData) {
      console.log("invalid email or password");
      throw new CustomError("invalid email and/or password");
    }
    const isPasswordMatch = await bcrypt.cmpHash(
      req.body.password,
      userData.password
    );
    if (!isPasswordMatch) {
      console.log("invalid email or password");
      throw new CustomError("invalid email and/or password");
    }
    const token = await jwt.generateToken({
      _id: userData._id,
      isAdmin: userData.isAdmin,
      isBusiness: userData.isBusiness,
    });
    res.status(200).json({ token: token });
  } catch (err) {
    res.status(400).json(err.message);
    console.log(err.message);
  }
});
//http://localhost:8181/api/auth/:id
//update user
router.put(
  "/:id",
  authmw,
  permissionsMiddleware(true, true, true),
  async (req, res) => {
    try {
      req.body.password = await bcrypt.generateHash(req.body.password);
      let updateNormalUser = await normalizeUser(req.body, req.userData._id);
      const id = req.params.id;
      await idValidationServise.idValidation(id);
      await usersValidationServise.registerUserValidation(req.body);
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

//http://localhost:8181/api/auth
//get all users
router.get(
  "/",
  authmw,
  permissionsMiddleware(false, true, false),
  async (req, res) => {
    try {
      const getAll = await userAccessDataService.getUsers(req.body);
      console.log(chalk.greenBright("get users!"));
      res.json(getAll);
    } catch (err) {
      res.json(err).status(400);
      console.log(chalk.redBright(err.message));
    }
  }
);

//http://localhost:8181/api/auth/:id
//get user
router.get(
  "/:id",
  authmw,
  permissionsMiddleware(false, true, true),
  async (req, res) => {
    try {
      const getUser = await userAccessDataService.getUser(req.params.id);
      console.log(chalk.greenBright("get user!"));
      res.json(getUser);
    } catch (err) {
      res.json(err).status(400);
      console.log(chalk.redBright(err.message));
    }
  }
);

//http://localhost:8181/api/auth/:id
//delete user
router.delete(
  "/:id",
  authmw,
  permissionsMiddleware(false, true, true),
  async (req, res) => {
    try {
      const id = req.params.id;
      await idValidationServise.idValidation(id);
      const dataFromDb = await userAccessDataService.deleteUser(id);
      console.log(chalk.greenBright("user deleted!"));
      res.json({
        msg: `user - ${dataFromDb.name.firstName} ${dataFromDb.name.lastName} deleted`,
      });
    } catch (err) {
      res.json(err).status(400);
      console.log(chalk.redBright(err.message));
    }
  }
);

router.patch(
  "/:id",
  authmw,
  permissionsMiddleware(true, true, true),
  async (req, res) => {
    try {
      const id = req.params.id;
      await idValidationServise.idValidation(id);
      const updateUser = await userAccessDataService.updateBizUser(id);

      res.json(
        `${updateUser.name.firstName} ${updateUser.name.lastName}  isBusiness - ${updateUser.isBusiness}`
      );
    } catch (err) {
      res.json(err).status(400);
      console.log(chalk.redBright(err.message));
    }
  }
);

module.exports = router;
