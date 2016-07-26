exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('results', function(table) {
      table.increments();
      table.string('UserID');
      table.string('Result');
      table.string('AssessType');
      table.string('TokenString');
      table.string('Name');
      table.string('Domain');
      table.string('Level');
      table.string('Version');

      table.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('results')
  ]);
};
