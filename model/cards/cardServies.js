const Card = require("./Card");

const createCard = (cardToSave) => {
  //normalize card
  let card = new Card(cardToSave);
  return card.save();
};

const getAllCards = async () => {
  try {
    const cards = await Card.find();
    return cards;
  } catch (error) {
    throw error;
  }
};

module.exports = {  
  createCard,
  getAllCards,
};
