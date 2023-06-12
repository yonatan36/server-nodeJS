const joiReistersValidation = require("./joi/registerValidation");
const joiLoginValidation = require("../validation/joi/loginValidation");
const joiUpdateValidatoin = require("../validation/joi/updateUserValidation");
const validatorOption = "Joi";

const registerUserValidation = (userInput) => {
  if (validatorOption === "Joi") {
    return joiReistersValidation.validateRegisterSchema(userInput);
  }
  throw new Error("validator undefined");
};
const updateUserValidation = (userInput) => {
  if (validatorOption === "Joi") {
    return joiUpdateValidatoin.validateUpdateUserSchema(userInput);
  }
  throw new Error("validator undefined");
};
const loginUserValidation = (userInput) => {
  if (validatorOption === "Joi") {
    return joiLoginValidation.validateLoginSchema(userInput);
  }
  throw new Error("validator undefined");
};

module.exports = {
  registerUserValidation,
  loginUserValidation,
  updateUserValidation,
};
