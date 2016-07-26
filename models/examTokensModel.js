var bookshelf = require('../config/bookshelf');

var examToken = bookshelf.Model.extend({
  tableName: 'examTokens',
  hasTimestamps: true,
  activation: function() {
   return this.belongsTo(activation);
 },
 result: function() {
  return this.hasOne(result);
},
sessionLog: function() {
 return this.belongsTo(sessionLog);
}

});

module.exports = examToken;
