app.factory("InviteFactory", function($q, $http, $rootScope, FIREBASE_CONFIG) {
	let addInvite = (newInvite) => {
		return $q((resolve, reject) => {
			$http.post(`${FIREBASE_CONFIG.databaseURL}/invites.json`, JSON.stringify(newInvite))
			.then((results) => {
				resolve(results);
			}).catch((error) => {
				reject(error);
			});
		});
	};

	let createlayerObj = (newLayer) => {
		return $q((resolve, reject) => {
			$http.post(`${FIREBASE_CONFIG.databaseURL}/layers.json`, JSON.stringify(newLayer))
			.then((results) => {
				resolve(results);
			}).catch((error) => {
				reject(error);
			});
		});
	};

	return {addInvite:addInvite, createlayerObj:createlayerObj};
});