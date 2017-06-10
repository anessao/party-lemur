app.controller("AuthCtrl", function($location, $rootScope, $routeParams, $scope, AuthFactory, UserFactory) {

	$scope.alerts = [];
  $scope.auth = {
    email: "a@a.com",
    password: "123456"
  };

  if ($location.path() === '/logout') {
    AuthFactory.logout();
    $rootScope.user = {};
    $location.url('/auth');
  }

  let logMeIn = () => {
    AuthFactory.authenticate($scope.auth).then((userCreds) => {
      return UserFactory.getUser(userCreds.uid);
    }, (error) => {
      $scope.alerts.push({msg: error.message});
    }).then((user) => {
      $rootScope.user = user;
      $location.url('/partylemur');
    }).catch();
  };
  
  $scope.registerUser = () => {
    AuthFactory.registerWithEmail($scope.auth).then((registeredUser) => {
      $scope.auth.uid = registeredUser.uid;
      return UserFactory.addUser($scope.auth);
    }, (error) => {
      $scope.alerts.push({msg: error.message});
    }).then((registerComplete) => {
      logMeIn();
    }).catch(() => {
      console.log("addUser error", error);
    });
  };

  $scope.loginUser = () => {
    logMeIn();
  };


});