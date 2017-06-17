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
		console.log("newLayer pre-posting: ", newLayer);
		return $q((resolve, reject) => {
			$http.post(`${FIREBASE_CONFIG.databaseURL}/layers.json`, JSON.stringify(newLayer))
			.then((results) => {
				resolve(results);
			}).catch((error) => {
				reject(error);
			});
		});
	};

	let getEventInvites = (eventsid) => {
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
	let getUserInvites = (userid) => {
		let invites = [];
	    return $q((resolve, reject) => {
	      $http.get(`${FIREBASE_CONFIG.databaseURL}/invites.json?orderBy="uid"&equalTo="${userid}"`)
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

	let getInvite = (inviteid) => {
		return $q((resolve, reject) => {
      $http.get(`${FIREBASE_CONFIG.databaseURL}/invites/${inviteid}.json`)
      .then((resultz) => {
        resolve(resultz.data);
      }).catch((error) => {
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

	let editInvite = (newinvite) => {
		return $q((resolve, reject) => {
			$http.put(`${FIREBASE_CONFIG.databaseURL}/invites/${newinvite.id}.json`, JSON.stringify(newinvite))
			.then((results) => {
				resolve(results);
			}).catch((error) => {
				reject(error);
			});
		});
	};

	let editlayerObj = (newlayer) => {
		return $q((resolve, reject) => {
			$http.put(`${FIREBASE_CONFIG.databaseURL}/invites/${newlayer.id}.json`, JSON.stringify(newlayer))
			.then((results) => {
				resolve(results);
			}).catch((error) => {
				reject(error);
			});
		});
	};

	let getInviteLayers = (inviteId) => {
		let layers = [];
		console.log(layers);
	    return $q((resolve, reject) => {
	      $http.get(`${FIREBASE_CONFIG.databaseURL}/layers.json?orderBy="inviteid"&equalTo="${inviteId}"`)
	        .then((fbItems) => {
	            var itemCollection = fbItems.data;
	            if(itemCollection.length !== null) {
	            Object.keys(itemCollection).forEach((key) => {
	                itemCollection[key].id = key;
	                layers.push(itemCollection[key]);
	            });
	          }
	            resolve(layers);
	        })
	        .catch((error) => {
	            reject(error);
	        });
	    });
	};
	let deleteLayers = (layerid) => {
		console.log("layer id", layerid)
		return $q((resolve, reject) => {
	    $http.delete(`${FIREBASE_CONFIG.databaseURL}/layers/${layerid}.json`)
		    .then((results) => {
		      resolve(results);
		    })
		    .catch((error) => {
		      reject(error);
		    });
	    });
	};

	let deleteInvite = (inviteId) => {
		let layers = [];
		getInviteLayers(inviteId).then((results) => {
			layers = results;
			layers.forEach((layer) => {
				deleteLayers(layer.id).then(() => {
					console.log("layer delete working");
				})
				.catch((error) => {
					console.log("delete layer error", error);
				});
			});
		}).catch((error) => {
			console.log("get layers in invite delete system not working", error);
		});
		return $q((resolve, reject) => {
			console.log("delete invite", inviteId);
    	$http.delete(`${FIREBASE_CONFIG.databaseURL}/invites/${inviteId}.json`)
	    .then((results) => {
	      resolve(results);
	    })
	    .catch((error) => {
	      reject(error);
	    });
    });
	};

	return {addInvite:addInvite, createlayerObj:createlayerObj, getEventInvites:getEventInvites, editEventsDesigns:editEventsDesigns, getInviteLayers:getInviteLayers, getInvite:getInvite, editInvite:editInvite, editlayerObj:editlayerObj, getUserInvites:getUserInvites, deleteInvite:deleteInvite, deleteLayers:deleteLayers};
});