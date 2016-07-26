exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('companyProfiles', function(table) {
      table.increments();
      table.string('UserID');
      table.string('CompanyName');
      table.integer('CompanyAccountType');
      table.string('CompanyUniqueToken').unique();

      table.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('companyProfiles')
  ]);
};
