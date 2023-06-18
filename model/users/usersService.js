const User = require("./Users");

const registerUser = (userData) => {
  const user = new User(userData);
  return user.save();
};



const getUserByEmail = (email) => {
  return User.findOne({ email });
};

const updateUser = async (id, userToUpdate) => {
  return User.findByIdAndUpdate(id, userToUpdate, {
    new: true,
  });
};

const getUsers = () => {
  return User.find();
};

const getUser = (id) => {
  return User.findById(id);
};

const deleteUser = (id) => {
  return User.findByIdAndDelete(id);
};


const updateBizUser = (id) => {
  return User.findByIdAndUpdate(
    id,
    [{ $set: { isBusiness: { $not: "$isBusiness" } } }],
    {
      new: true,
    }
  );
};
module.exports = {
  updateBizUser,
  registerUser,
  getUserByEmail,
  updateUser,
  getUsers,
  getUser,
  deleteUser,
};
