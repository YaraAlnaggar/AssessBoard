angular.module('MyApp')
  .factory('purchase', function($http) {
    return {
      getAllData: function(data) {
        return $http.get('/GetAllGrades');
      },
      PurchaseOffline: function(data) {
        return $http.post('/purchase',data);
      },
      ActivatePurchaseOffline: function(data) {
        return $http.post('/activate',data);
      }
    };
  });
