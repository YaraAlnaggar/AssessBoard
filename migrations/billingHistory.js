exports.up = function(knex, Promise) {
  return Promise.all([
    // knex.schema.createTable('billingHistory', function(table) {
    //   table.increments("id").primary();
    //   table.integer('Invoice');
    //   table.dateTime('InvoiceDate');
    //   table.integer('Paid');
    //   table.boolean('isPaid');
    //   table.integer('Unit');
    //   table.integer('Discount');
    //   table.integer('SalexTax');
    //   table.integer("Total");
    //   table.timestamps();
    // })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('billingHistory')
  ]);
};
