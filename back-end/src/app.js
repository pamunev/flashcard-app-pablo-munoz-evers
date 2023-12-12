const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const cardsRouter = require("./cards/cards.router");
const decksRouter = require("./decks/decks.router");

// Middleware
app.use(morgan("dev"));
app.use(cors());

// Functions
const sayHello = (req, res, next) => {
  res.send("Hello!");
};

// Routes

app.get("/", sayHello);

app.use("/cards", cardsRouter);
app.use("/decks", decksRouter);

module.exports = app;
