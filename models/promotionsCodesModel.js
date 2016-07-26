var bookshelf = require('../config/bookshelf');

var promotionCode = bookshelf.Model.extend({
  tableName: 'promotionCodes',
  hasTimestamps: true,
  qouta: function() {
   return this.belongsTo(qouta);
 },

});

module.exports = promotionCode;
