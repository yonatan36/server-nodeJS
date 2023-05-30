const mongoose = require("mongoose");
const {
  URL,
  DEFAULT_STRING_SCHEMA,
  DEFAULT_STRING_SCHEMA_REQUIRED,
} = require("./helpers/mongooseValidation");

const Address = new mongoose.Schema({
  state: DEFAULT_STRING_SCHEMA,
  country: DEFAULT_STRING_SCHEMA_REQUIRED,
  city: DEFAULT_STRING_SCHEMA_REQUIRED,
  street: DEFAULT_STRING_SCHEMA_REQUIRED,
  houseNumber: {
    type: Number,
    required: true,
    trim: true,
    minLength: 1,
  },
  zip: {
    type: Number,
    trim: true,
    minLength: 2,
    default: 0,
  },
});

module.exports = Address;
