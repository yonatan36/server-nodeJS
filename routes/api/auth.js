const express = require("express");
const bcrypt = require("../../config/bcrypt");
const router = express.Router();
const usersValidationServise = require("../../validation/usersValidationServise");
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
    await usersValidationServise.registerUserValidation(req.body);
    req.body.password = await bcrypt.generateHash(req.body.password);
    req.body = normalizeUser(req.body);
    await usersServiceModel.registerUser(req.body);
    console.log(chalk.greenBright("register!"));
  } catch (err) {
    res.json(err).status(400);
    console.log(chalk.redBright(err.message));
  }
});

//http://localhost:8181/api/auth/login
router.post("/login", async (req, res) => {
  try {
    await usersValidationServise.loginUserValidation(req.body);
    const userData = await usersServiceModel.getUserByEmail(req.body.email);
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
      throw new cos("invalid email and/or password");
    }
    const token = await jwt.generateToken({
      _id: userData._id,
      isAdmin: userData.isAdmin,
      isBusiness: userData.isBusiness,
    });
    res.json(token);
  } catch (err) {
    res.status(400).json(err.message);
    console.log(err);
  }
});
//http://localhost:8181/api/auth/:id
//update user
router.put("/:id", authmw, async (req, res) => {
  try {
    req.body = normalizeUser(req.body);
    await usersValidationServise.registerUserValidation(req.body);
    let updateNormalUser = await normalizeUser(
      req.body,
      "647c6c48855aa30f62f11a42"
    );
    const updateUser = await usersServiceModel.updateUser(
      req.params.id,
      updateNormalUser
    );
    res.send(updateUser);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

//http://localhost:8181/api/auth/getUsers
//get all users
router.get(
  "/",
  authmw,
  permissionsMiddleware(false, true, false),
  async (req, res) => {
    try {
      const getAll = await usersServiceModel.getUsers(req.body);
      console.log(chalk.greenBright("getusers"));
      res.send(getAll);
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
  permissionsMiddleware(false, true, false),
  async (req, res) => {
    try {
      const getUser = await usersServiceModel.getUser(req.params.id);
      res.send(getUser);
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
      await usersServiceModel.deleteUser(req.params.id);
      res.json("deleted user!");
    } catch (err) {
      res.json(err).status(400);
      console.log(chalk.redBright(err.message));
    }
  }
);

module.exports = router;
