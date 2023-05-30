const Card = require("./Card");

//created new card
const createCard = (cardToSave) => {
  //normalize card
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
};
