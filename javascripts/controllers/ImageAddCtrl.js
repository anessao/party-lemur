app.controller("ImageAddCtrl", function($window, $location, $rootScope, $scope, $timeout, ImageFactory) {
	
	$scope.finished = false;
	$scope.readyToSave = false;
	$scope.imageCategory = "";

	$scope.allowSave = () => {
		$scope.readyToSave = true;
	};

  $scope.itemSave = () => {
  	let newFile = {
  		uid : $rootScope.user.uid,
  		base64code : $scope.file.base64,
  		filetype : $scope.file.filetype,
  		category : $scope.imageCategory,
      filename: $scope.file.filename
  	};
  	ImageFactory.postNewImage(newFile).then(() => {
  		newFile = {};
  		$scope.file = {};
  		$scope.finished = true;
  		$scope.imageCategory = "";
  	}).catch((error) => {
  		console.log(error);
  	});
  };
  
});