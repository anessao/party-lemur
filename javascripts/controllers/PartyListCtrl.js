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

	$scope.addEvent = () => {
		$scope.newEvent.uid = $rootScope.user.uid;
		  	EventFactory.postNewEvent($scope.newEvent).then((results) => {
		  		getItems();
		  		$scope.newEvent = {};
		  	}).catch((error) => {
		  		console.log("Save event error", error);
	  	});
	};

});