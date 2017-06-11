app.factory("InviteFactory", function($q, $http, $rootScope, FIREBASE_CONFIG) {
	let addInvite = () => {
		console.log("invite factory working");
	};

	return {addInvite:addInvite};
});