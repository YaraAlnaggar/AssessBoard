exports.up = function(knex, Promise) {
  return Promise.all([
    // knex.schema.createTable('resultDetails', function(table) {
    //   table.increments("id").primary();
    //   table.integer('part');
    //   table.integer('Question');
    //   table.string('partName');
    //   table.string('QuestionName');
    //   table.string('Feedback');
    //
    //   table.integer('results_id').unsigned().notNull().references('results.id');
    //
    //   table.timestamps();
    // })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('resultDetails')
  ]);
};
