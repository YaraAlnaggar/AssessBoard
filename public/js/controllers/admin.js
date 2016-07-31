angular.module('MyApp')
    .controller('adminCtrl', function($scope, $rootScope, $location, $window, $auth, viewData) {
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
        $scope.searchCompines=  function(){
          viewData.SearcUsers({}).then(function(response) {
            console.log();

            $scope.companiesSearchResults=JSON.stringify(response.data);
              // $scope.messages = {
              //     success: Array.isArray(response.data) ? response.data : [response.data]
              // };
          })
          .catch(function(response) {
              // $scope.messages = {
              //     error: Array.isArray(response.data) ? response.data : [response.data]
              // };
          });
        };

    });
