let isAuth = (AuthFactory) => new Promise ((resolve, reject) => {
  if(AuthFactory.isAuthenticated()){
    resolve();
  } else {
    reject();
  }
});

app.run(function($location, $rootScope, FIREBASE_CONFIG, AuthFactory) {
  firebase.initializeApp(FIREBASE_CONFIG);

  $rootScope.$on('$routeChangeStart', function(event, currRoute, prevRoute) {
    // checks to see if there is a current user
    var logged = AuthFactory.isAuthenticated();

    var appTo;

    // to keep error from being thrown on page refresh
    if (currRoute.originalPath) {
      // check if the user is going to the auth page = currRoute.originalPath
      // if user is on auth page then appTo is true
      // if it finds something other than /auth it return a -1 and -1!==-1 so resolves to false
      appTo = currRoute.originalPath.indexOf('/auth') !== -1;
    }

    //if not on /auth page AND not logged in redirect to /auth
    if (!appTo && !logged) {
      event.preventDefault();
      $location.path('/auth');
    }
  });
});


app.config(function($routeProvider) {
  $routeProvider
    .when('/partylemur', {
      templateUrl: 'partials/landing.html',
      controller: 'LandingCtrl'
    })
    .when('/auth', {
      templateUrl: 'partials/auth.html',
      controller: 'AuthCtrl'
    })
    .when('/logout', {
      templateUrl: 'partials/auth.html',
      controller: 'AuthCtrl',
      resolve : {isAuth}
    })
    .otherwise('/partylemur'); // default catch
});