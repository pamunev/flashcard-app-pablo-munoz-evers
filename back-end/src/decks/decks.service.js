const knex = require("../db/connection");

function create(newDeck) {
  return knex("decks")
    .insert(newDeck)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

function list() {
  console.log("knex:", knex("decks").select("*"));
  //return { hello: "world" };
  return knex("decks").select("*");
}

module.exports = {
  create,
  list,
};
