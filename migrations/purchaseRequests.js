exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('purchaseRequests', function(table) {
      table.increments();
      table.boolean("ApprovedByAssess");
      table.boolean("ApprovedByBank");
      table.dateTime('ApprovalDate');
      table.boolean("RequestIsDone");
      table.dateTime('RequestDate');


      table.integer('AmountOfTokenRequested').unique();
      table.integer('promotionCode');

      table.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('purchaseRequests')
  ]);
};
