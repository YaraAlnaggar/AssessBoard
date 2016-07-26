
var bookshelf = require('../config/bookshelf');

var activation = bookshelf.Model.extend({
  tableName: 'activations',
  hasTimestamps: true

});

module.exports = activation;
