const Card = require("./Card");
const normalizCard = require("./helpers/normalizationCard");

//created new card
const createCard = async (cardToSave) => {
  let card = new Card(cardToSave);
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
const updateCard = async (id, cardToUpdate) => {
     

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
