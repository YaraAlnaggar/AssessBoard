var bookshelf = require('../config/bookshelf');

var promotionCode = bookshelf.Model.extend({
  tableName: 'promotionCodes',
  hasTimestamps: true

});

module.exports = promotionCode;
