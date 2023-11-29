const express = require("express");
const morgan = require("morgan");
const app = express();
const cardsRouter = require("./cards/cards.router");
const decksRouter = require("./decks/decks.router");

// Functions
const sayHello = (req, res, next) => {
  res.send("Hello!");
};

// Routes

app.get("/", sayHello);
app.use(morgan("dev"));

app.use("/cards", cardsRouter);
app.use("/decks", decksRouter);

module.exports = app;
