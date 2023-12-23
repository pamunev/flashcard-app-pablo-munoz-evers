const knex = require("../db/connection");

function create(card) {
  return knex("cards")
    .insert(card)
    .returning("*")
    .then((newData) => newData[0]);
}

function list() {
  return knex("cards").select("*");
}

module.export = {
  create,
  list,
};
