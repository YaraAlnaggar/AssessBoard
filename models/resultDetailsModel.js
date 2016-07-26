var bookshelf = require('../config/bookshelf');

var resultDetail = bookshelf.Model.extend({
  tableName: 'resultDetails',
  hasTimestamps: true,
  result: function() {
   return this.belongsTo(result);
 }

});

module.exports = resultDetail;
