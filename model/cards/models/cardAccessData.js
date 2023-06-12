const cardsServiceMongo = require("../cardServies");
const config = require("config");

const dbOption = config.get("dbOption");

const createCard = (cardToSave) => {
  switch (dbOption) {
    case "mongo":
    default:
      return cardsServiceMongo.createCard(cardToSave);
  }
};

const getAllCards = () => {
  switch (dbOption) {
    case "mongo":
    default:
      return cardsServiceMongo.getAllCards();
  }
};

const getcardById = (id) => {
  switch (dbOption) {
    case "mongo":
    default:
      return cardsServiceMongo.getcardById(id);
  }
};

const myCards = (userId) => {
  switch (dbOption) {
    case "mongo":
    default:
      return cardsServiceMongo.myCards(userId);
  }
};

const updateCard = (id, cardToUpdate) => {
  switch (dbOption) {
    case "mongo":
    default:
      return cardsServiceMongo.updateCard(id, cardToUpdate);
  }
};

const deleteCard = (id) => {
  switch (dbOption) {
    case "mongo":
    default:
      return cardsServiceMongo.deleteCard(id);
  }
};

const likesCard = (userId, cardId) => {
  switch (dbOption) {
    case "mongo":
    default:
      return cardsServiceMongo.likesCard(userId, cardId);
  }
};

module.exports = {
  createCard,
  getAllCards,
  getcardById,
  myCards,
  updateCard,
  deleteCard,
  likesCard,
};
