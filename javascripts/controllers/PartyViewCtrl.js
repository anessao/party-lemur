app.controller("PartyViewCtrl", function($location, $rootScope, $routeParams, $scope, EventFactory, InviteFactory) {
	$scope.selectedParty = {};
	$scope.partyDesigns = [];
	$scope.partyEditInfo = false;

  $scope.editPartyShow = () => {
  	$scope.partyEditInfo = true;
  };

  //********************
  //Grab Info from DB to display
  //********************
  let getParty = () => {
  	EventFactory.getSelectedParty($routeParams.partyid).then((results) => {
	  	$scope.selectedParty = results.data;
	  })
	  .catch((error) => {
	  	console.log("getSingleItem error ", error);
	  });
  };
  getParty();

  InviteFactory.getEventInvites($routeParams.partyid).then((results) => {
  	$scope.partyDesigns = results;
  })
  .catch((error) => {
  	console.log(error);
  });

  //********************
  //CRUD functionality
  //********************
  $scope.editPartyObj = {};

  $scope.deleteParty = (partyid) => {
  	EventFactory.deleteSelectedEvent($routeParams.partyid).then((results) => {
  		$scope.partyDesigns.forEach((designObj) => {
  			let updateDesign = {
			  		uid : $rootScope.user.uid,
			  		base64code : designObj.designBase64,
			  		category : designObj.category,
			  		eventid : "noparty",
			  		id : designObj.id
			 };
  			InviteFactory.editEventsDesigns(updateDesign).then((results) => {
  				console.log(results);
  			})
  			.catch((error) => {
  				console.log(error);
  			});
  		});
  		$location.url('/myparties');
  	})
  	.catch((error) => {
  		console.log(error);
  	});
  };

  $scope.submitPartyEdit = (partyId) => {
  	$scope.editPartyObj.uid = $rootScope.user.uid;
  	$scope.editPartyObj.id = partyId;
  	EventFactory.editParty($scope.editPartyObj).then(() => {
  		getParty();
  		$scope.partyEditInfo = false;
  	}).catch((error) => {
  		console.log("edit item error", error);
  	});
  };

  $scope.editInvite = (inviteId) => {
  	$location.url(`/editor/${inviteId}`);
  };

  $scope.goToBuilder = () => {
    $location.url(`/invitebuilder`);
  };

  //end controller
});