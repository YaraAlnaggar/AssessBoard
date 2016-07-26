var bookshelf = require('../config/bookshelf');

var result = bookshelf.Model.extend({
  tableName: 'results',
  hasTimestamps: true,
  examToken: function() {
   return this.belongsTo(examToken);
 },  examDetails: function() {
  return this.hasMany(examDetail);
 },
 resultDetails: function() {
 return this.hasMany(resultDetail);
},

});

module.exports = result;
