const express = require("express");
const router = express.Router();

const authRouter = require("./api/auth")
const cardsRouter = require("./api/cards")

//http://localhost:8181/api/
router.get("/", (req, res) => {
  res.json({ msg: "sub rote" });
});

//http://localhost:8181/api/auth
router.use("/users", authRouter)

//http://localhost:8181/api/cards
router.use("/cards", cardsRouter)

module.exports = router;
