angular.module('MyApp')
  .factory('user', function($http) {
    return {
      getAllData: function(data) {
        return $http.get('/GetAllGrades');
      },
      changePassword: function(data) {
        return $http.put('/account', data);
      },
      deleteAccount: function() {
        return $http.delete('/account');
      },
      UpgradeUsers: function(data) {
        return $http.post('/admin/upgradeUser',data);
      }
    };
  });