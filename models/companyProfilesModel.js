
var bookshelf = require('../config/bookshelf');

var company = bookshelf.Model.extend({
  tableName: 'companyProfiles',
  hasTimestamps: true,
  users: function() {
  return this.hasMany(User);
},
qoutas: function() {
return this.hasMany(qouta);
}
});

module.exports = company;
