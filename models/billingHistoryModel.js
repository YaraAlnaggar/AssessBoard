
var bookshelf = require('../config/bookshelf');

var bill = bookshelf.Model.extend({
  tableName: 'billingHistory',
  hasTimestamps: true,
  purchaseRequest: function() {
   return this.belongsTo(purchaseRequest);
 }

});

module.exports = bill;
