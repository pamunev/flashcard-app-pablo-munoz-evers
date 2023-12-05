/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("cards", (table) => {
    table.increments("id").primary();
    table.string("front");
    table.string("back");
    table.integer("deckId").unsigned().notNullable();
    table
      .foreign("deckId")
      .references("id")
      .inTable("decks")
      .onDelete("cascade");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("cards");
};
