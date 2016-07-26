
var bookshelf = require('../config/bookshelf');

var bill = bookshelf.Model.extend({
  tableName: 'billingHistory',
  hasTimestamps: true

});

module.exports = bill;
