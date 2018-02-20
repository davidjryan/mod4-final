exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("mod4final", function(table) {
      table.increments("id").primary();
      table.string("title");

      table.timestamps(true, true);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable("mod4final")]);
};
