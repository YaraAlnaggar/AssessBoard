angular.module('MyApp')
    .controller('adminCtrl', function($scope, $rootScope, $location, $window, $auth, admin) {
        $scope.profile = $rootScope.currentUser;


        $scope.addCompany=function(){
          admin.AddCompany($scope.CompanyAddObject).then(function(response){
            if(response===null)console.log(response);
            console.log(response);
            $scope.BindAddComany=response.status  +" Compnay name : "+response.data.CompanyName +" Company temp ID : "+response.data.CompanyUniqueToken ;

          }).catch(function(error){
            $scope.BindAddComany=response.status;
              console.log(error);
          });
        };
        $scope.upgradeUsers = function() {
            admin.UpgradeUsers($scope.toUpgradeUser)
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
        $scope.verfyRequest=function(){
          admin.VerifyOrder($scope.VerifyRequestObject).then(function(response){
            if(response===null)console.log(response);
            $scope.BindVerifyRequest=response.status;
            console.log(response);

          }).catch(function(error){
            $scope.BindVerifyRequest=response.status;
              console.log(error);
          });
        };
        $scope.searchCompines=  function(){
          admin.SearcUsers({}).then(function(response) {
            console.log();
              $scope.BindSearchCompine=response.status;
            $scope.companiesSearchResults=JSON.stringify(response.data);
              // $scope.messages = {
              //     success: Array.isArray(response.data) ? response.data : [response.data]
              // };
          })
          .catch(function(response) {
            $scope.BindSearchCompines=response.status;
              // $scope.messages = {
              //     error: Array.isArray(response.data) ? response.data : [response.data]
              // };
          });
        };

    });
