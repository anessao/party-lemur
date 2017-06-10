app.controller("ImageAddCtrl", function($window, $location, $rootScope, $scope, $timeout, ImageFactory) {
	$scope.finished = false;
  $scope.testSave = () => {
  	let newFile = {
  		uid : $rootScope.user.uid,
  		base64code : $scope.file.base64,
  		filetype : $scope.file.filetype
  	};
  	ImageFactory.postNewImage(newFile).then(() => {
  		newFile = {};
  		$scope.file = {};
  		$scope.finished = true;
  	}).catch((error) => {
  		console.log(error);
  	});
  };

  $scope.onChange = function (e, fileList) {
    console.log('this is on-change handler!');
  };
  
  $scope.onLoad = function (e, reader, file, fileList, fileOjects, fileObj) {
    console.log('this is handler for file reader onload event!');
    console.log(file.base64);

  };


});