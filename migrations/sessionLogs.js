exports.up = function(knex, Promise) {
  return Promise.all([
    // knex.schema.createTable('sessionLogs', function(table) {
    //   table.increments("id").primary();
    //
    //   table.dateTime('LoginTime');
    //   table.dateTime('LogoutTime');
    //
    //
    //   table.integer('user_id').unsigned().notNull().references('users.id');
    //
    //   table.timestamps();
    // })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users')
  ]);
};
