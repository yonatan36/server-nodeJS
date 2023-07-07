const Joi = require("joi");

const loginSchema = Joi.object({
  email: Joi.string()
    .regex(
      new RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)
    )
    .required(),
  password: Joi.string()
    .min(8)
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
    .required()
    .messages({
      "string.base": `"Password" should be a type of string`,
      "string.empty": `"Password" must contain a value`,
      "string.pattern.base": `"Password" must contain at least one uppercase letter, one lowercase letter, one digit, and one special character`,
      "any.required": `"Password" is a required field`,
    })
    .required(),
});

const validateLoginSchema = (userInput) => loginSchema.validateAsync(userInput);

module.exports = {
  validateLoginSchema,
};
