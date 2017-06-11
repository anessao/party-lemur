app.controller("ImageEditCtrl", function($window, $location, $routeParams, $rootScope, $scope, $timeout, ImageFactory) {
	
  $scope.file = {};
	$scope.finished = false;
	$scope.readyToSave = true;
	$scope.imageCategory = "";

  ImageFactory.getSelectedImage($routeParams.imageid).then((results) => {
    $scope.file.filetype = results.data.filetype;
    $scope.imageCategory = results.data.category;
    $scope.file.base64 = results.data.base64code;

  }).catch((error) => {
    console.log("error on get single image for upload image edit ctrl", error);
  });
  $scope.itemSave = () => {
  	let newFile = {
  		uid : $rootScope.user.uid,
  		base64code : $scope.file.base64,
  		filetype : $scope.file.filetype,
  		category : $scope.imageCategory,
      id : $routeParams.imageid
  	};
  	ImageFactory.editUpload(newFile).then(() => {
  		newFile = {};
  		$scope.file = {};
      $location.url('/images/list');
  	}).catch((error) => {
  		console.log(error);
  	});
  };


});