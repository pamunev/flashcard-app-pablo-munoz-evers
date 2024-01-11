const knex = require("../db/connection");

const lodash = require("lodash");

const mapProperties = require("../utils/map-properties");

const addCards = mapProperties({
  id: "cards.id",
  front: "cards.front",
  back: "cards.back",
  deckId: "cards.deckId",
});

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
  return knex("decks as d")
    .leftJoin("cards as c", "d.id", "c.deckId")
    .select("d.*", "c.*")
    .then((data) => {
      return data.map((deckData) => addCards(deckData));
    });
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
