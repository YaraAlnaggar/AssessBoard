var bookshelf = require('../config/bookshelf');

var result = bookshelf.Model.extend({
  tableName: 'results',
  hasTimestamps: true

});

module.exports = result;
