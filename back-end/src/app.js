const express = require("express");
const app = express();

// Functions
const sayHello = (req, res, next) => {
  res.send("Hello!");
};

// Routes

app.get("/", sayHello);

module.exports = app;
