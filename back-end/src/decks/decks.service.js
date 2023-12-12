const knex = require("knex");

function create(newDeck) {
  return knex("decks").insert(newDeck);
}

function list() {
  return knex("decks").select("*");
}

module.exports = {
  create,
  list,
};
