var bookshelf = require('../config/bookshelf');

var purchaseRequest = bookshelf.Model.extend({
  tableName: 'purchaseRequests',
  hasTimestamps: true,
  qouta: function() {
   return this.belongsTo(qouta);
 },
 sessionLog: function() {
  return this.belongsTo(sessionLog);
},
bill: function() {
 return this.hasOne(bill);
},

});

module.exports = purchaseRequest;
