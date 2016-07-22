angular.module('MyApp')
  .controller('userProfileCtrl', function($scope, $rootScope, $location, $window, $auth, viewData) {
    $scope.profile = $rootScope.currentUser;
    $scope.fetchUserData = function() {
      viewData.getDataByToken($scope.user)
        .then(function(response) {
          $scope.userData=JSON.stringify(response.data);
          if( $scope.userData !="null")
          $scope.showDataTokenBy=true ;
          else
          $scope.showDataTokenBy=false ;
         // console.log(JSON.stringify(response.data));
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
