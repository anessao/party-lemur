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

	let getSingleInvite = (eventsid) => {
		let invites = [];
	    return $q((resolve, reject) => {
	      $http.get(`${FIREBASE_CONFIG.databaseURL}/invites.json?orderBy="eventid"&equalTo="${eventsid}"`)
	        .then((fbItems) => {
	            var itemCollection = fbItems.data;
	            if(itemCollection.length !== null) {
	            Object.keys(itemCollection).forEach((key) => {
	                itemCollection[key].id = key;
	                invites.push(itemCollection[key]);
	            });
	          }
	            resolve(invites);
	        })
	        .catch((error) => {
	            reject(error);
	        });
	    });
	};

	let editEventsDesigns = (newDesign) => {
		return $q((resolve, reject) => {
      $http.put(`${FIREBASE_CONFIG.databaseURL}/invites/${newDesign.id}.json`, JSON.stringify({
        uid : newDesign.uid,
	  		base64code : newDesign.designBase64,
	  		category : newDesign.category,
	  		eventid : newDesign.eventid,
	  		id : newDesign.id
      })).then((results) => {
        resolve(results);
      }).catch((error) => {
        reject(error);
      });
    });
	};

	return {addInvite:addInvite, createlayerObj:createlayerObj, getSingleInvite:getSingleInvite, editEventsDesigns:editEventsDesigns};
});