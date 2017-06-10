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

  return {postNewImage:postNewImage};
});