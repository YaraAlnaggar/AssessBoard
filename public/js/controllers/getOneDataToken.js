angular.module('MyApp')
  .controller('oneDataCtrl', function($scope, $rootScope, $location, $window, $auth, viewData) {
    $scope.profile = $rootScope.currentUser;

    $scope.FetchData = function() {
      viewData.getDataByToken($scope.user)
        .then(function(response) {
          $scope.returnedData=JSON.stringify(response.data);
          console.log(JSON.stringify(response.data));
          $scope.messages = {
            success: [response.data]
          };
        })
        .catch(function(response) {
          $scope.messages = {
            error: Array.isArray(response.data) ? response.data : [response.data]
          };
        });
    };



  });