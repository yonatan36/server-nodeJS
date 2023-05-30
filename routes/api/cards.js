const express = require("express");
const router = express.Router();
const cardServiceModel = require("../../model/cards/cardServies");
const cardsValidationServise = require("../../validation/cardsValidationServise");

//http://localhost:8181/api/cards
router.post("/", async (req, res) => {
  try {
    await cardsValidationServise.createCardValidation(req.body);
    const dataFromMongoose = await cardServiceModel.createCard(req.body);
    console.log("dataFromMongoose", dataFromMongoose);
    res.json({ msg: "card created!" });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});
router.get("/getall", async (req, res) => {
  try {
    const allCards = await cardServiceModel.getAllCards();
    console.log("All cards:", allCards);
    res.status(200).json(allCards);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;
