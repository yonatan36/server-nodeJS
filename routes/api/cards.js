const express = require("express");
const router = express.Router();


//http://localhost:8181/api/cards
router.get("/", (req, res, next) =>{
    res.json({msg:"cards"})
});

//localhost:8181/api/cards/getall
http: router.get("/getall", (req, res, next) => {
  res.json({ msg: "all cards" });
});
module.exports = router