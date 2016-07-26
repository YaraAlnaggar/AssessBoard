
var bookshelf = require('../config/bookshelf');

var company = bookshelf.Model.extend({
  tableName: 'companyProfiles',
  hasTimestamps: true

});

module.exports = company;
