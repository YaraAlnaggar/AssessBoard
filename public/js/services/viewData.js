angular.module('MyApp')
  .factory('viewData', function($http) {
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
      getReportByToken: function(data) {
        return $http.post('/reports',data);
      },
      UpgradeUsers: function(data) {
        return $http.post('/admin/upgradeUser',data);
      }
    };
  });