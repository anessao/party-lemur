app.controller("PartyListCtrl", function($location, $rootScope, $routeParams, $scope, EventFactory) {
	$scope.parties = [];
	
	let getItems = () => {
	  EventFactory.getPartyList($rootScope.user.uid).then((partyObjs) => {
	    $scope.parties = partyObjs;
	  }).catch((error) => {
	    console.log("get error", error);
	  });
	};

	getItems();

});