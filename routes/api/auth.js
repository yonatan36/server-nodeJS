const express = require("express");
const bcrypt = require("../../config/bcrypt");
const router = express.Router();
const {
  registerUserValidation,
  loginUserValidation,
} = require("../../validation/usersValidationServise");
const normalizeUser = require("../../model/users/helpers/normalizationUser");
const usersServiceModel = require("../../model/users/usersService");
const chalk = require("chalk");
const jwt = require("../../config/jwt");

//http://localhost:8181/api/auth/register
router.post("/register", async (req, res) => {
  try {
    req.body = normalizeUser(req.body);
    await registerUserValidation(req.body);
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
    await loginUserValidation(req.body);
    const userData = await usersServiceModel.getUserByEmail(req.body.email);
    if (!userData) {
      console.log("invalid email or password");
      throw new Error("invalid email and/or password");
    }
    const isPasswordMatch = await bcrypt.cmpHash(
      req.body.password,
      userData.password
    );
    if (!isPasswordMatch) {
      console.log("invalid email or password");
      throw new Error("invalid email and/or password");
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

module.exports = router;
