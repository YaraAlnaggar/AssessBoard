exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('examTokens', function(table) {
      table.increments();
      table.integer('TokenID');
      table.string('TokenString').unique();


      table.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('examTokens')
  ]);
};
