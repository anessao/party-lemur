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

  let fbDelete = (itemId) => {
  	return $q((resolve, reject) => {
    $http.delete(`${FIREBASE_CONFIG.databaseURL}/images/${itemId}.json`)
	    .then((results) => {
	      resolve(results);
	    })
	    .catch((error) => {
	      reject(error);
	    });
    });
  };

  let getSelectedImage = (id) => {
    return $q((resolve, reject) => {
      $http.get(`${FIREBASE_CONFIG.databaseURL}/images/${id}.json`)
      .then((resultz) => {
        resultz.data.id = id;
        resolve(resultz);
      }).catch((error) => {
        reject(error);
      });
    });
  };

  let editUpload = (editImageObj) => {
    return $q((resolve, reject) => {
      $http.put(`${FIREBASE_CONFIG.databaseURL}/images/${editImageObj.id}.json`, JSON.stringify({
        base64code: editImageObj.base64code,
        category: editImageObj.category,
        filetype: editImageObj.filetype,
        uid: editImageObj.uid
      })).then((results) => {
        resolve(results);
      }).catch((error) => {
        reject(error);
      });
    });
  };

  return {postNewImage:postNewImage, getImageList:getImageList, fbDelete:fbDelete, getSelectedImage:getSelectedImage, editUpload:editUpload};
});