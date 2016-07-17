
var bookshelf = require('../config/bookshelf');

var personalityPlus = bookshelf.Model.extend({
  tableName: 'personalityPlus',
  hasTimestamps: true

});

module.exports = personalityPlus;
