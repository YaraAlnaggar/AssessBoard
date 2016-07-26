var bookshelf = require('../config/bookshelf');

var sessionLog = bookshelf.Model.extend({
  tableName: 'sessionLogs',
  hasTimestamps: true

});

module.exports = sessionLog;
