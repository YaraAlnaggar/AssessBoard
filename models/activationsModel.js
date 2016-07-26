
var bookshelf = require('../config/bookshelf');

var activation = bookshelf.Model.extend({
  tableName: 'activations',
  hasTimestamps: true,
qouta: function() {
 return this.belongsTo(qouta);
},

});

module.exports = activation;
