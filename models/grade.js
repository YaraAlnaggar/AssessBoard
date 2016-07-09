
var bookshelf = require('../config/bookshelf');

var grade = bookshelf.Model.extend({
  tableName: 'grades',
  hasTimestamps: true

});

module.exports = grade;
