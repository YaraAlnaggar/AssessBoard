exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('qoutas', function(table) {
      table.increments();
      table.string('SubscriptionName');
      table.integer('PurchasedUnits');
      table.integer('ConsumedUnits');
      table.integer('DiscountRate');
      table.dateTime('StartDate');
      table.dateTime('ExpiryDate');
      table.string('PaymentMethod');
      table.string('PromotionCode');
      table.boolean('isActivated');


      table.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('qoutas')
  ]);
};
