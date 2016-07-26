exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('resultDetails', function(table) {
      table.increments();
      table.integer('part');
      table.integer('Question');
      table.string('partName');
      table.string('QuestionName');
      table.string('Feedback');

      table.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('resultDetails')
  ]);
};
