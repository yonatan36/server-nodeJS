const config = require("config");
const validatorOption = config.get("validatorOption");
const joiIdValidation = require("./joi/idValidation");

const idValidation = (userInput) => {
  if (validatorOption === "Joi") {
    return joiIdValidation.validateId(userInput);
  }
  throw new Error("validator undefined");
};

module.exports = {
  idValidation,
};
