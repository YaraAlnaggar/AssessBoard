var bookshelf = require('../config/bookshelf');

var sessionLog = bookshelf.Model.extend({
  tableName: 'sessionLogs',
  hasTimestamps: true,
  examToken: function() {
   return this.hasOne(examToken);
 },
 activation: function() {
  return this.hasOne(activation);
},
purchaseRequest: function() {
   return this.hasOne(purchaseRequest);
 }



});

module.exports = sessionLog;
