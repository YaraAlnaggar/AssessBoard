var bookshelf = require('../config/bookshelf');

var purchaseRequest = bookshelf.Model.extend({
  tableName: 'purchaseRequests',
  hasTimestamps: true

});

module.exports = purchaseRequest;
