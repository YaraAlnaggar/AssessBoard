exports.up = function(knex, Promise) {
  return Promise.all([
    // knex.schema.createTable('activations', function(table) {
    //   table.increments("id").primary();
    //   table.boolean("AssessmentModuleEnabled");
    //   table.dateTime('ExpiryDate');
    //   table.string('Taken');
    //   table.dateTime('TimeStamp');
    //   table.integer('NumberOfTokensOrdered');
    //   table.integer('TotalPrice');
    //
    //
    //   table.integer('activations_id').references('qoutas.id');
    //
    //   table.timestamps();
    // })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('activations')
  ]);
};
