const Joi = require("joi");

const registerSchema = Joi.object({
  name: Joi.object()
    .keys({
      firstName: Joi.string().min(2).max(256).required(),
      middleName: Joi.string().min(2).max(256).allow(""),
      lastName: Joi.string().min(2).max(256).required(),
    })
    .required(),
  phone: Joi.string()
    .min(9)
    .regex(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/)
    .required()
    .messages({
      "string.pattern.base":
        "Invalid phone number format. Please enter a valid phone number. exemple (0534355534)",
      "string.empty":
        "Phone number must not be empty. Please provide a phone number.",
      "any.required":
        "Phone number is required. Please provide a phone number.",
    }),
  email: Joi.string()
    .regex(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)
    .required()
    .messages({
      "string.pattern.base": "Please enter a valid email address",
      "string.empty":
        "Email must not be empty. Please provide an email address.",
      "any.required": "Email is required. Please provide an email address.",
    }),

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

  image: Joi.object().keys({
    url: Joi.string()
      .regex(
        /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
      )
      .messages({
        "string.pattern.base": "Please enter a valid URL",
        "string.empty": "URL must not be empty. Please provide a URL.",
      }),
    alt: Joi.string().min(2).max(256).required(),
  }),
  address: Joi.object()
    .keys({
      state: Joi.string().min(0).max(256).allow(""),
      country: Joi.string().min(2).max(256).required(),
      city: Joi.string().min(2).max(256).required(),
      street: Joi.string().min(2).max(256).required(),
      houseNumber: Joi.number().min(1).required(),
      zip: Joi.number().allow("", 0),
    })
    .required(),
  isAdmin: Joi.boolean().allow(""),
  isBusiness: Joi.boolean().allow(""),
});

const validateRegisterSchema = (userInput) =>
  registerSchema.validateAsync(userInput);

module.exports = {
  validateRegisterSchema,
};
