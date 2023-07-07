const Joi = require("joi");

const createCardSchema = Joi.object({
  title: Joi.string().min(2).max(256).required(),
  subTitle: Joi.string().min(2).max(256).required(),
  description: Joi.string().min(2).max(1024).required(),
  phone: Joi.string()
    .regex(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/)
    .required()
    .messages({
      "string.pattern.base":
        "Invalid phone number format. Please enter a valid phone number.",
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

  web: Joi.string()
    .regex(
      new RegExp(
        /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
      )
    )
    .allow(""),
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
  address: Joi.object().keys({
    state: Joi.string().min(0).max(256).allow(""),
    country: Joi.string().min(2).max(256).required(),
    city: Joi.string().min(2).max(256).required(),
    street: Joi.string().min(2).max(256).required(),
    houseNumber: Joi.number().min(1).required(),
    zip: Joi.number().allow("", 0),
  }),

  bizNumber: Joi.number().min(1000000).max(9999999).allow(""),
  user_id: Joi.string().hex().length(24),
});

const validateCardSchema = (userInput) => {
  return createCardSchema.validateAsync(userInput);
};

module.exports = {
  validateCardSchema,
};
