const jwt = require("jsonwebtoken");
const config = require("config")

const generateToken = (payload, expData = "30d") => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      config.get("jwtKey"),
      {
        expiresIn: expData,
      },
      (err, token) => {
        if (err) reject(err);
        else resolve(token);
      }
    );
  });
};

const verifyToken = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token,  config.get("jwtKey"), (err, payload) => {
      if (err) reject(err);
      else resolve(payload);
    });
  });


  module.exports={generateToken,verifyToken}