const cardsService = require("./cards.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// CRUDL functions

async function create(req, res, next) {
  const data = await cardsService.create(req.body.data);
  res.status(201).json({ data });
}

module.exports = {
  create: asyncErrorBoundary(create),
};
