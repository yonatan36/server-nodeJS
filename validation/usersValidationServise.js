const joiReistersValidation = require("./joi/registerValidation");

const validatorOption = "Joi";

const registerUserValidation = (userInput) => {
  if (validatorOption === "Joi") {
    return joiReistersValidation.validateRegisterSchema(userInput);
  }
  throw new Error("validator undefined");
};

module.exports = {
  registerUserValidation,
};
