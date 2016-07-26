var bookshelf = require('../config/bookshelf');

var resultDetail = bookshelf.Model.extend({
  tableName: 'resultDetails',
  hasTimestamps: true

});

module.exports = resultDetail;
