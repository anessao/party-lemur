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

});