const express = require("express");
const router = express.Router();
const cardServiceModel = require("../../model/cards/cardServies");
const cardsValidationServise = require("../../validation/cardsValidationServise");
const normalizeCard = require("../../model/cards/helpers/normalizationCard");

//http://localhost:8181/api/cards
//created
router.post("/", async (req, res) => {
  try {
    await cardsValidationServise.createCardValidation(req.body);
    //let normalCard = await normalizeCard(req.body)
    const dataFromMongoose = await cardServiceModel.createCard(req.body);
    console.log("dataFromMongoose", dataFromMongoose);
    res.json({ msg: "card created!" });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});
//http://localhost:8181/api/cards
//get all
router.get("/", async (req, res) => {
  try {
    await cardsValidationServise.createCardValidation();
    const allCards = await cardServiceModel.getAllCards();
    console.log("All cards", allCards);
    res.status(200).json(allCards);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});
//http://localhost:8181/api/cards/:id
//get card
router.get("/:id", async (req, res) => {
  try {
    await cardsValidationServise.createCardValidation();
    const findCardByiD = await cardServiceModel.getcardById(req.params.id);
    console.log("card find", findCardByiD);
    res.status(200).json(findCardByiD);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

//http://localhost:8181/api/cards:id
//deleted card
router.delete("/:id", async (req, res) => {
  try {
    const deleteCard = await cardServiceModel.delateCard(req.params.id);
    console.log("card find", deleteCard);
    if (deleteCard) {
      res.status(200).json({ msg: "deleted Card!" });
    } else {
      res.json({ msg: "could not find the card" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

//http://localhost:8181/api/cards:id
//update card
router.put("/:id", async (req, res) => {
  try {
    const updateCard = await cardServiceModel.updateCard(
      req.params.id,
      req.body
    );
    console.log("card find", updateCard);
    if (updateCard) {
      res.status(200).json({ msg: "update Card!" });
    } else {
      res.json({ msg: "could not find the card" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;
