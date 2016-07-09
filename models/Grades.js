
var bookshelf = require('../config/bookshelf');

var Grades = bookshelf.Model.extend({
  tableName: 'grades',
  hasTimestamps: true,

});

module.exports = Grades;
