const knex = require("../db/connection");

function create(newDeck) {
  return knex("decks")
    .insert(newDeck)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

function read(deckId) {
  return knex("decks")
    .select("*")
    .where({ id: deckId })
    .then((returnedData) => returnedData[0]);
}

function list() {
  //return { hello: "world" };
  return knex("decks").select("*");
}

module.exports = {
  create,
  read,
  list,
};
