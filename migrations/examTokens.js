exports.up = function(knex, Promise) {
  return Promise.all([
    // knex.schema.createTable('examTokens', function(table) {
    //   table.increments("id").primary();
    //   table.integer('TokenID');
    //   table.string('TokenString').unique();
    //
    //   table.integer('activations_id').unsigned().notNull().references('examTokens.id');
    //
    //   table.timestamps();
    // })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('examTokens')
  ]);
};
