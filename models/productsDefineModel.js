var bookshelf = require('../config/bookshelf');

var productDefine = bookshelf.Model.extend({
  tableName: 'productsDefine',
  hasTimestamps: true

});

module.exports = productDefine;
