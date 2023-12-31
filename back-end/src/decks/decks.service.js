const knex = require("../db/connection");

function create(newDeck) {
  return knex("decks")
    .insert(newDeck)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

function read(deckId) {
  console.log("deck id:", deckId);
  return knex("decks")
    .select("*")
    .where({ id: deckId })
    .then((returnedData) => returnedData[0]);
}

function list() {
  //return { hello: "world" };
  return knex("decks").select("*");
}

function listCards(deck) {
  return knex("cards").select("*").where({ deckId: deck.id });
}

module.exports = {
  create,
  read,
  list,
  listCards,
};
