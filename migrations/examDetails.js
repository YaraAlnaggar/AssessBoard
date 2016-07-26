exports.up = function(knex, Promise) {
  return Promise.all([
    // knex.schema.createTable('examDetails', function(table) {
    //   table.increments("id").primary();
    //   table.string('Question');
    //   table.integer('QuestionNumber');
    //   table.string('Answer');
    //   table.string('WrittenAnswer');
    //   table.integer('TimeToAnswerInMins');
    //   table.integer('TimeTakenInMins');
    //   table.boolean('isAnswered');
    //   table.string('RightAnswer');
    //
    //   table.integer('results_id').unsigned().notNull().references('results.id');
    //
    //   table.timestamps();
    // })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('examDetails')
  ]);
};
