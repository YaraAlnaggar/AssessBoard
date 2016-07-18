angular.module('MyApp', ['ngRoute', 'satellizer'])
  .config(function($routeProvider, $locationProvider, $authProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
      .when('/', {
        templateUrl: 'partials/home.html'
      })
      .when('/contact', {
        templateUrl: 'partials/contact.html',
        controller: 'ContactCtrl',
      })
      .when('/orderHistory', {
        templateUrl: 'partials/orderHistory.html',
        controller: 'orderHistoryCtrl',  
         resolve: { loginRequired: loginRequiredAdmin }
      })
      .when('/launcher', {
        templateUrl: 'partials/launcher.html',
        controller: 'launcherCtrl',
        resolve: { loginRequired: loginRequiredCorporate }
      })
      .when('/report', {
        templateUrl: 'partials/report.html',
        controller: 'reportCtrl',
        resolve: { loginRequired: loginRequiredCorporate }
      })
        .when('/userProfile', {
        templateUrl: 'partials/userProfile.html',
        controller: 'userProfileCtrl',
        resolve: { loginRequired: loginRequired }
      })
      .when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'LoginCtrl',
        resolve: { skipIfAuthenticated: skipIfAuthenticated }
      })
      .when('/signup', {
        templateUrl: 'partials/signup.html',
        controller: 'SignupCtrl',
        resolve: { skipIfAuthenticated: skipIfAuthenticated }
      })
      .when('/account', {
        templateUrl: 'partials/profile.html',
        controller: 'ProfileCtrl',
        resolve: { loginRequired: loginRequired }
      })
      .when('/forgot', {
        templateUrl: 'partials/forgot.html',
        controller: 'ForgotCtrl',
        resolve: { skipIfAuthenticated: skipIfAuthenticated }
      })
      .when('/reset/:token', {
        templateUrl: 'partials/reset.html',
        controller: 'ResetCtrl',
        resolve: { skipIfAuthenticated: skipIfAuthenticated }
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

    function loginRequired($location, $auth) {
      if (!$auth.isAuthenticated()) {
        $location.path('/login');
      }
    }
    function loginRequiredAdmin($location, $auth , $rootScope) {
      var userLevel=parseInt( $rootScope.currentUser.UserType, 10)
      if (!$auth.isAuthenticated() ||  userLevel!=3 ) { // loged in as a admin
        $location.path('/login');
      }
    }
      function loginRequiredCorporate($location, $auth , $rootScope) {
      var userLevel=parseInt( $rootScope.currentUser.UserType, 10)
      if (!$auth.isAuthenticated() || userLevel<2) { // loged in as a admin
        $location.path('/login');
      }
    }
  })
  .run(function($rootScope, $window) {
    if ($window.localStorage.user) {
      $rootScope.currentUser = JSON.parse($window.localStorage.user);
    }
  });
