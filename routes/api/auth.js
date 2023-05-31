const express = require("express");
const bcrypt = require("../../config/bcrypt")
const router = express.Router();
const {validateRegisterSchema} = require("../../validation/joi/registerValidation")


//http://localhost:8181/api/auth/register
router.post("/register", async (req, res) => {
 try{

const hashedPassword = await bcrypt.generateHash("123456");
console.log(hashedPassword)

 }catch(err){

 }
});
//http://localhost:8181/api/auth/login
router.post("/login",async (req, res) => {
try{

}catch(err){

}
});


module.exports = router;
