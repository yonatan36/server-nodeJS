const User = require("./Users");

const registerUser = (userData) => {
  const user = new User(userData);
  return user.save();
};


 module.exports = {
    registerUser,
 }