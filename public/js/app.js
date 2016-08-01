//the defined users are 3 now users corp admin
// user:1000  corpUser:2000 Corporate:3000  employee:4000 SuperUser:5000  so u can other type of users in the middle
// this is a easy way to deal with aith as all u gonna do to add another permissio
// is to make another loginRequired function with the number u want as the threshold
angular.module('MyApp', ['ngRoute', 'satellizer'])
    .config(function($routeProvider, $locationProvider, $authProvider) {
        $locationProvider.html5Mode(true);
        $routeProvider
            .when('/', {
                templateUrl: 'partials/home.html',
                resolve: {
                    loginRequired: loginRequired
                }

            })
            .when('/contact', {
                templateUrl: 'partials/contact.html',
                controller: 'ContactCtrl',
            })
            .when('/library', {
                templateUrl: 'partials/library.html',
                controller: 'libraryCtrl',
            })
            .when('/about', {
                templateUrl: 'partials/about.html',
                controller: 'aboutCtrl',
            })
            .when('/billingHistory', {
                templateUrl: 'partials/billingHistory.html',
                controller: 'billingHistoryCtrl',
                resolve: {
                    loginRequired: loginRequiredCorporate
                }
            })
            .when('/purchaseRequest', {
                templateUrl: 'partials/purchaseRequest.html',
                controller: 'purchaseRequestCtrl',
                resolve: {
                    loginRequired: loginRequiredCorporate
                }
            })
            .when('/admin', {
                templateUrl: 'partials/admin.html',
                controller: 'adminCtrl',
                resolve: {
                    loginRequired: loginRequiredAdmin
                }
            })
            .when('/activator', {
                templateUrl: 'partials/activator.html',
                controller: 'activatorCtrl',
                resolve: {
                    loginRequired: loginRequiredCorporate
                }
            })
            .when('/results', {
                templateUrl: 'partials/results.html',
                controller: 'resultsCtrl',
                resolve: {
                    loginRequired: loginRequired
                }
            })
            .when('/userProfile', {
                templateUrl: 'partials/userProfile.html',
                controller: 'userProfileCtrl',
                resolve: {
                    loginRequired: loginRequired
                }
            })
            .when('/login', {
                templateUrl: 'partials/login.html',
                controller: 'LoginCtrl',
                resolve: {
                    skipIfAuthenticated: skipIfAuthenticated
                }
            })
            .when('/signup', {
                templateUrl: 'partials/signup.html',
                controller: 'SignupCtrl',
                resolve: {
                    skipIfAuthenticated: skipIfAuthenticated
                }
            })
            .when('/account', {
                templateUrl: 'partials/profile.html',
                controller: 'ProfileCtrl',
                resolve: {
                    loginRequired: loginRequired
                }
            })
            .when('/forgot', {
                templateUrl: 'partials/forgot.html',
                controller: 'ForgotCtrl',
                resolve: {
                    skipIfAuthenticated: skipIfAuthenticated
                }
            })
            .when('/reset/:token', {
                templateUrl: 'partials/reset.html',
                controller: 'ResetCtrl',
                resolve: {
                    skipIfAuthenticated: skipIfAuthenticated
                }
            })
            .otherwise({
                templateUrl: 'partials/404.html'
            });

        $authProvider.loginUrl = '/login';
        $authProvider.signupUrl = '/signup';
        $authProvider.facebook({
            url: '/auth/facebook',
            clientId: '980220002068787',
            redirectUri: 'http://localhost:3000/auth/facebook/callback'
        });
        $authProvider.google({
            url: '/auth/google',
            clientId: '631036554609-v5hm2amv4pvico3asfi97f54sc51ji4o.apps.googleusercontent.com'
        });

        function skipIfAuthenticated($location, $auth) {
            if ($auth.isAuthenticated()) {
                $location.path('/');
            }
        }

        function loginRequired($location, $auth, $rootScope) {
            if (!$auth.isAuthenticated()) {
                $location.path('/login');
            }
            $rootScope.userTokenObject = $auth.getPayload();
            $rootScope.userTokenLevel = $rootScope.userTokenObject.level;
        }

        function loginRequiredAdmin($location, $auth, $rootScope) {
            if (!$auth.isAuthenticated() || $auth.getPayload().level < 3500) { // loged in as a admin
                $location.path('/login');
            }
        }

        function loginRequiredEmployee($location, $auth, $rootScope) {
            if (!$auth.isAuthenticated() || $auth.getPayload().level < 3500) { // loged in as a admin
                $location.path('/login');
            }
        }

        function loginRequiredCorporate($location, $auth, $rootScope) {
            if (!$auth.isAuthenticated() || $auth.getPayload().level < 2500) { // loged in as a admin
                $location.path('/login');
            }
        }
    })
    .run(function($rootScope, $window) {
        if ($window.localStorage.user) {
          // $rootScope.currentUser = JSON.parse($window.localStorage.user);
        }
    });
