var bookshelf = require('../config/bookshelf');

var qouta = bookshelf.Model.extend({
  tableName: 'qoutas',
  hasTimestamps: true,
  company: function() {
   return this.belongsTo(company);
 },

 productDefine: function() {
  return this.belongsTo(productDefine);
},
purchaseRequests: function() {
return this.hasMany(purchaseRequest);
},

activations: function() {
return this.hasMany(activation);
},

promotionCodes: function() {
return this.hasMany(promotionCode);
},

});

module.exports = qouta;
