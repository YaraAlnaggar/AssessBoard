
var bookshelf = require('../config/bookshelf');

var activation = bookshelf.Model.extend({
  tableName: 'activations',
  hasTimestamps: true,
qouta: function() {
 return this.belongsTo(qouta);
},
examTokens: function() {
return this.hasMany(examToken);
},
sessionLog: function() {
 return this.belongsTo(sessionLog);
}


});

module.exports = activation;
