angular.module('MyApp')
    .controller('SignupCtrl', function($scope, $rootScope, $location, $window, $auth) {
        $scope.companyCheck = false;
        $scope.signup = function() {

            $scope.EmailIsBeingSentMsg = "An Email is being sent to " + $scope.user.PersonalEmail + " Please confirm and go to the login Page";
           if ($scope.companyCheck === true) $scope.user.companyID = "none";
            $auth.signup($scope.user)
                .then(function(response) {
                    //$auth.setToken(response);
                    $rootScope.currentUser = response.data.user;
                    $window.localStorage.user = JSON.stringify(response.data.user);
                    //$location.path('/');
                    $scope.EmailIsSend = "Please check your email : " + $scope.user.PersonalEmail;
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

        $scope.authenticate = function(provider) {
            $auth.authenticate(provider)
                .then(function(response) {
                    $rootScope.currentUser = response.data.user;
                    $window.localStorage.user = JSON.stringify(response.data.user);
                    // $location.path('/');
                })
                .catch(function(response) {
                    if (response.error) {
                        $scope.messages = {
                            error: [{
                                msg: response.error
                            }]
                        };
                    } else if (response.data) {
                        $scope.messages = {
                            error: [response.data]
                        };
                    }
                });
        };
    });
