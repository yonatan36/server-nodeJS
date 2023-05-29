var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
// var indexRouter = require("./routes/index");
// var usersRouter = require("./routes/users");
const apiRouter = require("./routes/api");

var app = express();

app.use(cors());
app.use(logger("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));



app.use("/api", apiRouter);


app.use((req, res, next) => {
  res.status(404).json({ msg: "Page not found!" });
});

module.exports = app;
