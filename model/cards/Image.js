const mongoose = require("mongoose");
const { URL } = require("./helpers/mongooseValidation");


const Image = new mongoose.Schema({
     url: URL
 });
module.exports = Image;
