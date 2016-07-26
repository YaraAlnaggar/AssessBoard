exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('notfications', function(table) {
      table.increments();
      table.string('content');
      table.boolean("seen");

      table.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('notfications')
  ]);
};
