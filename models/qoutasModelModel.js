var bookshelf = require('../config/bookshelf');

var qouta = bookshelf.Model.extend({
  tableName: 'qoutas',
  hasTimestamps: true

});

module.exports = qouta;
