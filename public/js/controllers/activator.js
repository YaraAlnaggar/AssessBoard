angular.module('MyApp')
    .controller('activatorCtrl', function($scope, $rootScope, $location, $window, $auth, activator) {
        $scope.profile = $rootScope.currentUser;
$scope.activaeTokens=function(){
  activator.ActivatePurchaseOffline($scope.activation).then(function(activationResults){
    console.log(activationResults);
  });
};
        $scope.FetchData = function() {
            viewData.getDataByToken($scope.user)
                .catch(function(response) {
                    $scope.messages = {
                        error: Array.isArray(response.data) ? response.data : [response.data]
                    };
                });
        };

        $scope.SubmitChanges = function() {
            viewData.getDataByToken($scope.user)
                .then(function(response) {
                    $scope.returnedDataString = JSON.stringify(response.data);
                    $scope.returnedData = response.data;
                    if ($scope.returnedDataString != "null")
                        $scope.showDataTokenBy = true;
                    else
                        $scope.showDataTokenBy = false;
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
