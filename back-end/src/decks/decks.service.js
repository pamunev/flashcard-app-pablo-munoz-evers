const knex = require("knex");

function create(newDeck) {
  return knex("decks")
    .insert(newDeck)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

function list() {
  return knex("decks").select("*");
}

module.exports = {
  create,
  list,
};
