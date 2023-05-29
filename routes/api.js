const express = require("express");
const router = express.Router();

const authRouter = require("./api/auth")
const cardsRouter = require("./api/cards")

//http://localhost:8181/api/
router.get("/", (req, res) => {
  res.json({ msg: "sub rote" });
});


router.use("/auth", authRouter)
router.use("/cards", cardsRouter)

module.exports = router;
