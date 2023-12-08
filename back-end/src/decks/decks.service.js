const knex = require("knex");

function list(req, res, next) {
  return knex("decks").select("*");
}

module.exports = {
  list,
};
