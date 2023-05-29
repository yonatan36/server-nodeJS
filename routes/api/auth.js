const express = require("express");
const router = express.Router();



//http://localhost:8181/api/auth/register
router.get("/register", (req, res) => {
  res.json({ msg: "register" });
});
//http://localhost:8181/api/auth/login
router.get("/login", (req, res) => {
  res.json({ msg: "login" });
});


module.exports = router;
