exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('sessionLogs', function(table) {
      table.increments();

      table.dateTime('LoginTime');
      table.dateTime('LogoutTime');

      table.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users')
  ]);
};
