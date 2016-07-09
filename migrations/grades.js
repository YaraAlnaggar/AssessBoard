exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('grades', function(table) {
      table.increments();
      table.string('name');
      table.string('last name');
      table.string('email').unique();
      table.string('Grade');
      table.string('Field');
      table.dateTime('Acceptence');
      table.string('gender');
      table.string('relevents');
      table.string('previous expernice');
      table.string('importance');
      table.string('recomended field ');
      table.string('company appling to');
      table.string('token')
      table.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('grades')
  ])
};
