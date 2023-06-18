const usersServiceMongo = require("../usersService");
const config = require("config");

const dbOption = config.get("dbOption");

const registerUser = (userData) => {
  switch (dbOption) {
    case "mongo":
    default:
      return usersServiceMongo.registerUser(userData);
  }
};


const getUserByEmail = (email) => {
  switch (dbOption) {
    case "mongo":
    default:
      return usersServiceMongo.getUserByEmail(email);
  }
};
const getUser = (id) => {
  switch (dbOption) {
    case "mongo":
    default:
      return usersServiceMongo.getUser(id);
  }
};

const getUsers = () => {
  switch (dbOption) {
    case "mongo":
    default:
      return usersServiceMongo.getUsers();
  }
};

const updateUser = (id, userToUpdate) => {
  switch (dbOption) {
    case "mongo":
    default:
      return usersServiceMongo.updateUser(id, userToUpdate);
  }
};

const updateBizUser = (id) => {
  switch (dbOption) {
    case "mongo":
    default:
      return usersServiceMongo.updateBizUser(id);
  }
};

const deleteUser = (id) => {
  switch (dbOption) {
    case "mongo":
    default:
      return usersServiceMongo.deleteUser(id);
  }
};

module.exports = {
  registerUser,
  getUserByEmail,
  getUser,
  getUsers,
  updateUser,
  updateBizUser,
  deleteUser,
};
