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
    .when('/profile', {
      templateUrl: 'partials/profile.html',
      controller: 'ProfileCtrl',
      resolve: {isAuth}
    })
    .when('/image/new', {
      templateUrl: 'partials/imageAdd.html',
      controller: 'ImageAddCtrl',
      resolve : {isAuth}
    })
    .when('/images/list', {
      templateUrl: 'partials/image-list.html',
      controller: 'ImagesListCtrl',
      resolve : {isAuth}
    })
    .when('/image/edit/:imageid', {
      templateUrl: 'partials/imageAdd.html',
      controller: 'ImageEditCtrl',
      resolve: {isAuth}
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