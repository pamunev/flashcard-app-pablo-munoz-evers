const decksService = require("./decks.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// CRUDL

async function create(req, res, next) {
  const data = await decksService.create(req.body.data);
  res.status(201).json({ data });
}

function read(req, res, next) {
  const data = res.locals.deck;
  res.status(201).json({ data });
}

async function list(req, res, next) {
  const data = await decksService.list();
  res.status(201).json({ data });
}

async function listCards(req, res, next) {
  const deck = res.locals.deck;
  const data = await decksService.listCards(deck);
  res.status(201).json({ data });
}

// Validation Middleware

async function deckExists(req, res, next) {
  const { id } = req.params;
  const deck = await decksService.read(id);
  if (deck) {
    res.locals.deck = deck;
    return next();
  } else {
    next({
      status: 404,
      message: `Deck ${id} not found.`,
    });
  }
}

module.exports = {
  create: asyncErrorBoundary(create),
  read: [asyncErrorBoundary(deckExists), read],
  list: asyncErrorBoundary(list),
  listCards: [asyncErrorBoundary(deckExists), asyncErrorBoundary(listCards)],
};
