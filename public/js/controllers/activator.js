angular.module('MyApp')
    .controller('activatorCtrl', function($scope, $rootScope, $location, $window, $auth, activator) {
        $scope.profile = $rootScope.currentUser;
$scope.activaeTokens=function(){
  activator.ActivatePurchaseOffline($scope.activation).then(function(activationResults){
    console.log(activationResults);
    var csv = Papa.unparse(activationResults);
    CsvEncoded=encodeURI(csv);
    var newCsv=CsvEncoded.replace("%0D%0A", "\n");
    newCsv=newCsv.replace("activations_id", "activations_id\n");
    $scope.returnedData=csv;
    var a = document.createElement('a');
    console.log(newCsv);
a.href     = 'data:attachment/csv;charset=utf-8,' + newCsv;
a.target   ='_blank';
a.download = 'keys.csv';
a.innerHTML = "Click me to download the file.";
a.click();
    console.log(csv);
  });
};



    });
