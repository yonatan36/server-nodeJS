const Card = require("./Card");
const normalizCard = require("./helpers/normalizationCard")


//created new card
const createCard = async (cardToSave) => {
  let normalCard =  await normalizCard( cardToSave,"6475d6dbdca2de4b30e421e1");
  let card = new Card(normalCard);
  return card.save();
};

//get all cards
const getAllCards = () => {
  return Card.find();
};

//get by id
const getcardById = (id) => {
  return Card.findById(id);
};

//deleted
const delateCard = (id) => {
  return Card.findByIdAndDelete(id);
};

const getCardByBizNumber = (bizNumber) => {
  return Card.findOne({ bizNumber }, { bizNumber: 1, _id: 0 });
};

//update
const updateCard = (id, cardToUpdate) => {
  return Card.findByIdAndUpdate(id, cardToUpdate, {
    new: true,
  });
};

module.exports = {
  createCard,
  getAllCards,
  getcardById,
  delateCard,
  updateCard,
  getCardByBizNumber,
};
