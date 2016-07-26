var bookshelf = require('../config/bookshelf');

var notfication = bookshelf.Model.extend({
  tableName: 'notfications',
  hasTimestamps: true

});

module.exports = notfication;
