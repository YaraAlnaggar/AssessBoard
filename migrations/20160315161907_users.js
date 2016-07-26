exports.up = function(knex, Promise) {
  return Promise.all([

    knex.schema.createTable('sessionLogs', function(table) {
      table.increments("id").primary();

      table.dateTime('LoginTime');
      table.dateTime('LogoutTime');


      table.integer('user_id').unsigned().notNull().references('users.id');

      table.timestamps();
    }),
    knex.schema.createTable('billingHistory', function(table) {
      table.increments("id").primary();
      table.integer('Invoice');
      table.dateTime('InvoiceDate');
      table.integer('Paid');
      table.boolean('isPaid');
      table.integer('Unit');
      table.integer('Discount');
      table.integer('SalexTax');
      table.integer("Total");
      table.timestamps();
      table.integer('purchaseRequests_id').unsigned().notNull().references('purchaseRequests.id');

    }),
    knex.schema.createTable('results', function(table) {
      table.increments("id").primary();
      table.string('UserID');
      table.string('Result');
      table.string('AssessType');
      table.string('TokenString');
      table.string('Name');
      table.string('Domain');
      table.string('Level');
      table.string('Version');

      table.integer('examToken_id').unsigned().notNull().unique().references('examTokens.id');

      table.timestamps();
    }),

    knex.schema.createTable('resultDetails', function(table) {
      table.increments("id").primary();
      table.integer('part');
      table.integer('Question');
      table.string('partName');
      table.string('QuestionName');
      table.string('Feedback');

      table.integer('results_id').unsigned().notNull().references('results.id');

      table.timestamps();
    }),
    knex.schema.createTable('qoutas', function(table) {
      table.increments("id").primary();
      table.string('SubscriptionName');
      table.integer('PurchasedUnits');
      table.integer('ConsumedUnits');
      table.integer('DiscountRate');
      table.dateTime('StartDate');
      table.dateTime('ExpiryDate');
      table.string('PaymentMethod');
      table.string('PromotionCode');
      table.boolean('isActivated');

      table.integer('company_id').unsigned().notNull().references('companyProfiles.id');
      table.integer('productsDefine_id').unsigned().notNull().references('productsDefine.id');

      table.timestamps();
    }),

    knex.schema.createTable('purchaseRequests', function(table) {
      table.increments("id").primary();
      table.boolean("ApprovedByAssess");
      table.boolean("ApprovedByBank");
      table.dateTime('ApprovalDate');
      table.boolean("RequestIsDone");
      table.dateTime('RequestDate');


      table.integer('AmountOfTokenRequested').unique();
      table.integer('promotionCode');


      table.integer('sessionLogs_id').unsigned().notNull().references('sessionLogs.id');

      table.integer('qoutas_id').unsigned().notNull().references('qoutas.id');

      table.timestamps();
    }),

    knex.schema.createTable('promotionCode', function(table) {
      table.increments("id").primary();
      table.string('PromotionCode');
      table.integer('RateGiven');
      table.integer('DefinedQuntity');
      table.dateTime('InitializeDate');
      table.dateTime('ExpiryDate');
      table.string('DefinedService');
      table.integer('CompanyIdRestrictedTo');
      table.integer('NumberUsed');
      table.integer('NumberCanBeUsed');
      table.integer('NumberOfTokensToBeAppliedOn');
      table.integer('NumberOfTokensToBeAppliedTo');
      table.boolean('isItRestricted');

      table.integer('qoutas_id').unsigned().notNull().references('qoutas.id');

      table.timestamps();
    }),

    knex.schema.createTable('productsDefine', function(table) {
      table.increments("id").primary();
      table.string('ServiceName');
      table.integer('Price');
      table.integer('thershold');

      table.timestamps();
    }),
    knex.schema.createTable('notfications', function(table) {
      table.increments("id").primary();
      table.string('content');
      table.boolean("seen");

      table.timestamps();

      table.integer('users_id').unsigned().notNull().references('users.id');

    }),
    knex.schema.createTable('examTokens', function(table) {
      table.increments("id").primary();
      table.integer('TokenID');
      table.string('TokenString').unique();

      table.integer('sessionLogs_id').unsigned().notNull().references('sessionLogs.id');

      table.integer('activations_id').unsigned().notNull().references('examTokens.id');

      table.timestamps();
    }),

    knex.schema.createTable('examDetails', function(table) {
      table.increments("id").primary();
      table.string('Question');
      table.integer('QuestionNumber');
      table.string('Answer');
      table.string('WrittenAnswer');
      table.integer('TimeToAnswerInMins');
      table.integer('TimeTakenInMins');
      table.boolean('isAnswered');
      table.string('RightAnswer');

      table.integer('result_id').unsigned().notNull().references('results.id');

      table.timestamps();
    }),
    knex.schema.createTable('activations', function(table) {
      table.increments("id").primary();
      table.boolean("AssessmentModuleEnabled");
      table.dateTime('ExpiryDate');
      table.string('Taken');
      table.dateTime('TimeStamp');
      table.integer('NumberOfTokensOrdered');
      table.integer('TotalPrice');


      table.integer('qoutas_id').unsigned().notNull().references('qoutas.id');

      table.timestamps();
    }),

    knex.schema.createTable('companyProfiles', function(table) {
      table.increments("id").primary();
      table.string('CompanyName');
      table.integer('CompanyAccountType');
      table.string('CompanyUniqueToken').unique();
      table.timestamps();
    }),

    knex.schema.createTable('users', function(table) {
      table.increments("id").primary();
      table.string('UserID');
      table.string('FirstName');
      table.string('FaimlyName');
      table.string('PersonalEmail').unique();
      table.integer('Phone').unique();
      table.string('password');
      table.string('passwordResetToken');
      table.dateTime('passwordResetExpires');
      table.integer("UserAccountType");
      table.boolean("userVerfiedByEmail");
      table.boolean("userVerfiedByCorp");
      table.boolean("userVerfiedByAdmin");
      table.boolean("userVerfiedBySms");
      table.timestamp("userVerfiicationDate");
      table.string('gender');
      table.string('location');
      table.string('website');
      table.string('picture');
      table.string('facebook');
      table.string('twitter');
      table.string('google');
      table.string('vk');

      table.timestamps();
      table.integer('companyProfiles_id').unsigned().notNull().references('companyProfiles.id');

    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users')
  ]);
};
