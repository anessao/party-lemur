app.factory("ImageFactory", function($q, $http, FIREBASE_CONFIG){
	
	let postNewImage = (newImage) => {
		return $q((resolve, reject) => {
			$http.post(`${FIREBASE_CONFIG.databaseURL}/images.json`, JSON.stringify(newImage))
			.then((results) => {
				resolve(results);
			}).catch((error) => {
				reject(error);
			});
		});
	};
	let getImageList = (userId) => {
		console.log("user id", userId);
    let imagez = [];
    return $q((resolve, reject) => {
      $http.get(`${FIREBASE_CONFIG.databaseURL}/images.json?orderBy="uid"&equalTo="${userId}"`)
        .then((fbItems) => {
            var itemCollection = fbItems.data;
            if(itemCollection.length !== null) {
            Object.keys(itemCollection).forEach((key) => {
                itemCollection[key].id = key;
                imagez.push(itemCollection[key]);
            });
          }
          	console.log(imagez);
            resolve(imagez);
        })
        .catch((error) => {
            reject(error);
        });
    });
  };

  return {postNewImage:postNewImage, getImageList:getImageList};
});