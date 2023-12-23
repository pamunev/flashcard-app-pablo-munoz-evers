const decksService = require("./decks.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function create(req, res, next) {
  const data = await decksService.create(req.body.data);
  res.status(201).json({ data });
}

async function read(req, res, next) {
  const { id } = req.params;
  const data = await decksService.read(id);
  res.status(201).json({ data });
}

async function list(req, res, next) {
  const data = await decksService.list();
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
  read: [asyncErrorBoundary(deckExists), asyncErrorBoundary(read)],
  list: asyncErrorBoundary(list),
};
