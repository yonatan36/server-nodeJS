const Card = require("./Card");

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
const deleteCard = (id) => {
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

//likes
const likesCard = async (id, updateLike) => {
  try {
    const card = await Card.findOneAndUpdate({ _id: id }, updateLike, {
      new: true,
    });
    return card;
  } catch (error) {
    throw new Error("Failed to retrieve card from the database");
  }
};
const myCards = (userId) => {
  return Card.find({ user_id: userId });
};

module.exports = {
  myCards,
  createCard,
  getAllCards,
  getcardById,
  deleteCard,
  updateCard,
  getCardByBizNumber,
  likesCard,
};
