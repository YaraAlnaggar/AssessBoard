var bookshelf = require('../config/bookshelf');

var notfication = bookshelf.Model.extend({
  tableName: 'notfications',
  hasTimestamps: true,
  user: function() {
   return this.belongsTo(User);
 },
 User: function() {
  return this.belongsTo(User);
}

});

module.exports = notfication;
