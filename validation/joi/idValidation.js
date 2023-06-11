const Joi = require("joi");

// Define the schema for ID validation
const idSchema = Joi.string().length(24).hex().required();

// Validate ID parameter
const validateId = (id) => {
  return idSchema.validateAsync(id);
};

module.exports = {
  validateId,
};
