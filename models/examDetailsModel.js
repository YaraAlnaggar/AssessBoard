var bookshelf = require('../config/bookshelf');

var examDetail = bookshelf.Model.extend({
  tableName: 'examDetails',
  hasTimestamps: true,
  result: function() {
   return this.belongsTo(result);
 },

});

module.exports = examDetail;
