const express = require("express");
const router = express.Router();
const cardServiceModel = require("../../model/cards/cardServies");
const cardsValidationServise = require("../../validation/cardsValidationServise");
const normalizeCard = require("../../model/cards/helpers/normalizationCard");
const chalk = require("chalk");
const permissionsMiddleware = require("../../middleware/permissionsMiddleware");
const authmw = require("../../middleware/authMiddleware");

//http://localhost:8181/api/cards
//created
router.post(
  "/",
  authmw,
  permissionsMiddleware(true, true, false),
  async (req, res) => {
    try {
      const createCard = await cardsValidationServise.createCardValidation(
        req.body
      );
      let normalCard = await normalizeCard(req.body, req.userData._id);
      await cardServiceModel.createCard(normalCard);
      console.log(chalk.greenBright("card created!"));
      res.status(200).json(createCard);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  }
);

//http://localhost:8181/api/cards:id
//update card
router.put(
  "/:id",
  authmw,
  permissionsMiddleware(false, false, true),
  async (req, res) => {
    try {
      await cardsValidationServise.createCardValidation(req.body);
      let updatenormalCard = await normalizeCard(req.body, req.userData._id);
      const updateCard = await cardServiceModel.updateCard(
        req.params.id,
        updatenormalCard
      );
      if (updateCard) {
        res.status(200).json(updateCard);
        console.log(chalk.greenBright("card update!"));
        res.json({ msg: "card update!" });
      }
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  }
);

//http://localhost:8181/api/cards
//get all
router.get("/", authmw, async (req, res) => {
  try {
    await cardsValidationServise.createCardValidation();
    const allCards = await cardServiceModel.getAllCards();
    console.log(chalk.greenBright("get all cards!"))
    res.status(200).json(allCards);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

//http://localhost:8181/api/cards/:id
//get card
router.get("/:id", authmw, async (req, res) => {
  try {
    await cardsValidationServise.createCardValidation();
    const findCardByiD = await cardServiceModel.getcardById(req.params.id);
    console.log(chalk.greenBright("get card!"))
    res.status(200).json(findCardByiD);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

//http://localhost:8181/api/cards:id
//deleted card
router.delete(
  "/:id",
  authmw,
  permissionsMiddleware(false, true, true),
  async (req, res) => {
    try {
      const deleteCard = await cardServiceModel.delateCard(req.params.id);
      if (deleteCard) {
        res.status(200).send({ msg: "deleted Card!" });
        console.log(chalk.greenBright("delted card"));
      } else {
        res.json({ msg: "could not find the card" });
        console.log(chalk.redBright("could not find the card"));
      }
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  }
);

//http://localhost:8181/api/cards/card-likes:id
//likes card
router.patch("/card-likes/:id", authmw, async (req, res) => {
  try {
    const user = req.userData;
    const cardId = req.params.id;

    let card = await cardServiceModel.likesCard(cardId);

    const cardLikes = card.likes.find((id) => id === user._id);

    if (!cardLikes) {
      card.likes.push(user._id);
      console.log(chalk.greenBright("liked!"))
    } else {
      const cardFiltered = card.likes.filter((id) => id !== user._id);
      card.likes = cardFiltered;
      console.log(chalk.greenBright("uNliked!"));
    }

    card = await card.save();
    return res.send(card);
  } catch (err) {
    console.log(chalk.redBright("Card Like Error:"));
    console.error(err);
    res.status(400).json(err);
  }
});

module.exports = router;
