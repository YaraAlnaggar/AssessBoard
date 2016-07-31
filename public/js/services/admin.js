angular.module('MyApp')
  .factory('admin', function($http) {
    return {
      getAllData: function(data) {
        return $http.get('/GetAllGrades');
      },
      getReportByToken: function(data) {
        return $http.post('/reports',data);
      },
      UpgradeUsers: function(data) {
        return $http.post('/admin/upgradeUser',data);
      },
      SearcUsers: function(data) {
        return $http.post('/admin/GetAllCompaines',data);
      },
      AddCompany: function(data) {
        return $http.post('/admin/Company',data);
      },
      VerifyOrder: function(data) {
        return $http.post('/admin/verfiyPurchase',data);
      }
    };
  });
