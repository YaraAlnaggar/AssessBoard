angular.module('MyApp')
  .controller('upgradeCtrl', function($scope, $rootScope, $location, $window, $auth, viewData) {
    $scope.profile = $rootScope.currentUser;

        $scope.upgradeUsers = function() {
      viewData.UpgradeUsers($scope.toUpgradeUser)
        .then(function(response) {
          $scope.messages = {
            success: Array.isArray(response.data) ? response.data : [response.data]
          };
        })
        .catch(function(response) {
          $scope.messages = {
            error: Array.isArray(response.data) ? response.data : [response.data]
          };
        });
    };

  });