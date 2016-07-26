exports.up = function(knex, Promise) {
  return Promise.all([
    // knex.schema.createTable('notfications', function(table) {
    //   table.increments("id").primary();
    //   table.string('content');
    //   table.boolean("seen");
    //
    //   table.timestamps();
    //
    //   table.integer('users_id').unsigned().notNull().references('users.id');
    //
    // })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('notfications')
  ]);
};
