exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function(table) {
      table.increments();
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
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users')
  ]);
};
