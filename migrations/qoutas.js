exports.up = function(knex, Promise) {
  return Promise.all([
    // knex.schema.createTable('qoutas', function(table) {
    //   table.increments("id").primary();
    //   table.string('SubscriptionName');
    //   table.integer('PurchasedUnits');
    //   table.integer('ConsumedUnits');
    //   table.integer('DiscountRate');
    //   table.dateTime('StartDate');
    //   table.dateTime('ExpiryDate');
    //   table.string('PaymentMethod');
    //   table.string('PromotionCode');
    //   table.boolean('isActivated');
    //
    //   table.integer('company_id').unsigned().notNull().references('companyProfiles.id');
    //   table.integer('productsDefine_id').unsigned().notNull().references('productsDefine.id');
    //
    //   table.timestamps();
    // })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('qoutas')
  ]);
};
