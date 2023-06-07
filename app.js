var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var cors = require("cors");
const initialData = require("./initialData/initialData");
// var indexRouter = require("./routes/index");
// var usersRouter = require("./routes/users");
const apiRouter = require("./routes/api");
const loggersService = require("./utils/loggers/loggerServise");

var app = express();

app.use(cors());
app.use(loggersService.logger); // Specify the "combined" format

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
initialData();

app.use("/api", apiRouter);

app.use((req, res, next) => {
  res.status(404).json({ msg: "Page not found!" });
});

module.exports = app;
