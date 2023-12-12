const decksService = require("./decks.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function create(req, res, next) {
  const data = await decksService.create(req.body.data);
  res.status(201).json({ data });
}

async function list(req, res, next) {
  const data = await decksService.list();
  res.status(201).json({ data });
}

module.exports = {
  create: asyncErrorBoundary(create),
  list: asyncErrorBoundary(list),
};
