exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('productsDefine', function(table) {
      table.increments();
      table.string('ServiceName');
      table.integer('Price');
      table.integer('thershold');

      table.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('productsDefine')
  ]);
};
