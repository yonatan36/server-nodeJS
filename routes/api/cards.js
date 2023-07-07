const express = require("express");
const router = express.Router();
const cardsValidationServise = require("../../validation/cardsValidationServise");
const idValidationServise = require("../../validation/idValidationService");
const cardAccessDataService = require("../../model/cards/models/cardAccessData");
const normalizeCard = require("../../model/cards/helpers/normalizationCard");
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
      await cardAccessDataService.createCard(normalCard);

      res.status(200).json(createCard);
    } catch (err) {
      res.status(400).json(err.message);
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
      const id = req.params.id;
      await idValidationServise.idValidation(id);
      await cardsValidationServise.createCardValidation(req.body);
      let updatenormalCard = await normalizeCard(req.body, req.userData._id);
      const updateCard = await cardAccessDataService.updateCard(
        id,
        updatenormalCard
      );
      res.status(200).json({ msg: `card - ${updateCard.title} update!` });
    } catch (err) {
      res.status(400).json(err.message);
    }
  }
);

//http://localhost:8181/api/cards/my-cards
//get my-cards
router.get(
  "/my-cards",
  authmw,

  async (req, res) => {
    try {
      const userId = req.userData._id;
      const userCards = await cardAccessDataService.myCards(userId);

      if (userCards == 0) {
        res.json({ msg: "You don't have any cards you've created" });
      } else {
        res.json(userCards);
      }
    } catch (err) {
      res.status(400).json(err);
    }
  }
);

//http://localhost:8181/api/cards
//get all cards
router.get("/", authmw, async (req, res) => {
  try {
    await cardsValidationServise.createCardValidation();
    const allCards = await cardAccessDataService.getAllCards();

    res.status(200).json(allCards);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

//http://localhost:8181/api/cards/:id
//get card
router.get("/:id", authmw, async (req, res) => {
  try {
    const id = req.params.id;
    await idValidationServise.idValidation(id);
    const findCardByiD = await cardAccessDataService.getcardById(id);

    res.status(200).json(findCardByiD);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

//http://localhost:8181/api/cards:id
//deleted card
router.delete(
  "/:id",
  authmw,
  permissionsMiddleware(true, false, true),
  async (req, res) => {
    try {
      const id = req.params.id;
      await idValidationServise.idValidation(id);
      const dataFromDb = await cardAccessDataService.deleteCard(id);
      if (!dataFromDb) {
        return res.status(404).json({ msg: "Could not find the card" });
      }
      res.status(200).json({ msg: `card - ${dataFromDb.title} deleted!` });
    } catch (err) {
      res.status(400).json(err.message);
    }
  }
);

//http://localhost:8181/api/cards/card-likes:id
//likes card
router.patch("/card-likes/:id", authmw, async (req, res) => {
  try {
    const user = req.userData;
    const cardId = req.params.id;
    let card = await cardAccessDataService.likesCard(cardId);
    const cardLikes = card.likes.find((id) => id === user._id);

    if (!cardLikes) {
      card.likes.push(user._id);

      res
        .status(200)
        .json({ message: `${card.title} liked!`, likes: card.likes.length });
    } else {
      const cardFiltered = card.likes.filter((id) => id !== user._id);
      card.likes = cardFiltered;
      res
        .status(200)
        .json({ message: `${card.title} uNliked!`, likes: card.likes.length });
    }
    card = await card.save();
  } catch (err) {
    res.status(400).json(err.message);
  }
});

module.exports = router;
