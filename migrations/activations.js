exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('activations', function(table) {
      table.increments();
      table.boolean("AssessmentModuleEnabled");
      table.dateTime('ExpiryDate');
      table.string('Taken');
      table.dateTime('TimeStamp');
      table.integer('NumberOfTokensOrdered');
      table.integer('TotalPrice');

      table.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('activations')
  ]);
};
