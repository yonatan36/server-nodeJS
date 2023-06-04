const express = require("express");
const router = express.Router();
const cardServiceModel = require("../../model/cards/cardServies");
const cardsValidationServise = require("../../validation/cardsValidationServise");
const normalizeCard = require("../../model/cards/helpers/normalizationCard");
const usersServiceModel = require("../../model/users/usersService");

//http://localhost:8181/api/cards
//created
router.post("/", async (req, res) => {
  try {
    await cardsValidationServise.createCardValidation(req.body);
    let normalCard = await normalizeCard(req.body, "6475d6dbdca2de4b30e421e1");
    const dataFromMongoose = await cardServiceModel.createCard(normalCard);
    console.log("dataFromMongoose", dataFromMongoose);
    res.json({ msg: "card created!" });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

//http://localhost:8181/api/cards:id
//update card
router.put("/:id", async (req, res) => {
  try {
    await cardsValidationServise.createCardValidation(req.body);
    let updatenormalCard = await normalizeCard(
      req.body,
      "6475d6dbdca2de4b30e421e1"
    );
    const updateCard = await cardServiceModel.updateCard(
      req.params.id,
      updatenormalCard
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

router.patch("/card-likes/:id", async (req, res) => {
  try {
    const user = await usersServiceModel.getUserByEmail(req.body.email);
    const cardId = req.params.id;
    let card = await cardServiceModel.likesCard(cardId);
    const cardLikes = card.likes.find(
      (id) => id.toString() === user._id.toString()
    );

    if (!cardLikes) {
      card.likes.push(user._id);
    } else {
      const cardFiltered = card.likes.filter(
        (id) => id.toString() !== user._id.toString()
      );
      card.likes = cardFiltered;
    }

    card = await card.save();
    return res.send(card);
  } catch (error) {
    console.log(chalk.redBright("Could not edit like:", error.message));
    return res.status(500).send(error.message);
  }
});

module.exports = router;
