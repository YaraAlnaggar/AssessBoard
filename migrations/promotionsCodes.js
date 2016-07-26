exports.up = function(knex, Promise) {
  return Promise.all([
    // knex.schema.createTable('promotionCode', function(table) {
    //   table.increments("id").primary();
    //   table.string('PromotionCode');
    //   table.integer('RateGiven');
    //   table.integer('DefinedQuntity');
    //   table.dateTime('InitializeDate');
    //   table.dateTime('ExpiryDate');
    //   table.string('DefinedService');
    //   table.integer('CompanyIdRestrictedTo');
    //   table.integer('NumberUsed');
    //   table.integer('NumberCanBeUsed');
    //   table.integer('NumberOfTokensToBeAppliedOn');
    //   table.integer('NumberOfTokensToBeAppliedTo');
    //   table.boolean('isItRestricted');
    //
    //   table.integer('qoutas_id').unsigned().notNull().references('qoutas.id');
    //
    //   table.timestamps();
    // })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('promotionCode')
  ]);
};
