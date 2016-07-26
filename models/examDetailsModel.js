var bookshelf = require('../config/bookshelf');

var examDetail = bookshelf.Model.extend({
  tableName: 'examDetails',
  hasTimestamps: true

});

module.exports = examDetail;
