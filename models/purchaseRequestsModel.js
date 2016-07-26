var bookshelf = require('../config/bookshelf');

var purchaseRequest = bookshelf.Model.extend({
  tableName: 'purchaseRequests',
  hasTimestamps: true,
  qouta: function() {
   return this.belongsTo(qouta);
 },

});

module.exports = purchaseRequest;
