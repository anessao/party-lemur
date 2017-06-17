app.controller("InviteListCtrl", function($location, $rootScope, $routeParams, $scope, InviteFactory, EventFactory) { 

	$scope.invites = [];
	$scope.parties = [];
	
	let getImages = () => {
	  InviteFactory.getUserInvites($rootScope.user.uid).then((userInvites) => {
	    $scope.invites = userInvites;
	    console.log($scope.invites);
	  }).catch((error) => {
	    console.log("get error", error);
	  });
	};
	$scope.editInvite = (inviteId) => {
  	$location.url(`/editor/${inviteId}`);
  };

  $scope.inviteDelete = (inviteId) => {
  	InviteFactory.deleteInvite(inviteId).then(() => {
  		getImages();
  		console.log("delete working");
  	}).catch((error) => {
  		console.log("delete invite error", error);
  	});
  };

	getImages();

	// let getParties = () => {
 //  	EventFactory.getPartyList($rootScope.user.uid).then((partyObjs) => {
	//     $scope.parties = partyObjs;
	//   }).catch((error) => {
	//     console.log("get error", error);
	//   });
 //  	};
 //  	getParties();

});