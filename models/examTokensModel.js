var bookshelf = require('../config/bookshelf');

var examToken = bookshelf.Model.extend({
  tableName: 'examTokens',
  hasTimestamps: true

});

module.exports = examToken;
