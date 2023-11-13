const express = require("express");
const morgan = require("morgan");
const app = express();

// Functions
const sayHello = (req, res, next) => {
  res.send("Hello!");
};

// Routes

app.get("/", sayHello);
app.use(morgan("dev"));

module.exports = app;
