var bookshelf = require('../config/bookshelf');

var productDefine = bookshelf.Model.extend({
  tableName: 'productsDefine',
  hasTimestamps: true,
  qoutas: function() {
 return this.hasMany(qouta);
}

});

module.exports = productDefine;
