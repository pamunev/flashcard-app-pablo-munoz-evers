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
    .select("d.*", "c.id as cardId", "c.front", "c.back", "c.deckId")
    .then((data) => {
      const decks = [];
      // Organizing the data into decks
      data.forEach((row) => {
        let deck = decks.find((d) => d.id === row.id);

        if (!deck) {
          deck = { ...row, cards: [] };
          decks.push(deck);
        }

        if (row.cardId) {
          // I'll use addCards to map card properties
          const card = addCards(row);
          // I'll add the mapped card to the "cards" array
          deck.cards.push(card);
        }
      });
      return decks;
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
