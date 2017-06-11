app.controller("ImagesListCtrl", function($location, $rootScope, $routeParams, $scope, ImageFactory) { 
	
	$scope.goToAddNew = () => {
		$location.url("/image/new");
	};

	$scope.images = [];
	
	let getItems = () => {
	  ImageFactory.getImageList($rootScope.user.uid).then((imagesObjs) => {
	    $scope.images = imagesObjs;
	  }).catch((error) => {
	    console.log("get error", error);
	  });
	};

	getItems();

	$scope.deleteUpload = (id) => {
		ImageFactory.fbDelete(id).then(() => {
			getItems();
		}).catch((error) => {
			console.log("error in image upload delete", error);
		});
	};
	
	$scope.editUpload = (id) => {
		$location.url(`/image/edit/${id}`);
	};

});