const express = require("express");
const bcrypt = require("../../config/bcrypt");
const router = express.Router();
const {
  registerUserValidation,
} = require("../../validation/usersValidationServise");
const normalizeUser = require("../../model/users/helpers/normalizationUser");
const usersServiceModel = require("../../model/users/usersService");

//http://localhost:8181/api/auth/register
router.post("/register", async (req, res) => {
  try {
    await registerUserValidation(req.body);
    req.body.password = await bcrypt.generateHash(req.body.password);
    req.body = normalizeUser(req.body);
    await usersServiceModel.registerUser(req.body);
    res.json({ msg: "register!" });
  } catch (err) {
    res.json(err).status(400);
  }
});
//http://localhost:8181/api/auth/login
router.post("/login", async (req, res) => {
  try {
  } catch (err) {}
});

module.exports = router;
