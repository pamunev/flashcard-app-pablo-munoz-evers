const knex = require("../db/connection");

function create(card) {
  return knex("cards")
    .insert(card)
    .returning("*")
    .then((newData) => newData[0]);
}

module.export = {
  create,
};
