angular.module('MyApp')
    .controller('purchaseRequestCtrl', function($scope, $rootScope, $location, $window, $auth, viewData,purchase) {
        $scope.profile = $rootScope.currentUser;


        $scope.purchaseExams=function(){
purchase.PurchaseOffline($scope.purchaseRequest).then(function(requestMade){
  $scope.Bindrequest=requestMade.status+" Request ID :"+requestMade.data.purchaseRequests_id ;
  console.log(requestMade);
});
        };
        purchase.RetrieveProducts().then(function(productList){
          $scope.productsNames= productList.data;

        })

        $scope.FetchData = function() {
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
