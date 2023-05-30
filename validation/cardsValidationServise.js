
const joiCardsValidation = require("./joi/cardsValidation");

const validatorOption = "Joi";

const createCardValidation = (userInput) => {
  if (validatorOption === "Joi") {
    return joiCardsValidation.validateCardSchema(userInput);
  }
  throw new Error("validator undefined");
};

module.exports = {
  createCardValidation,
};
