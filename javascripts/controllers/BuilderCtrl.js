app.controller("BuilderCtrl", function($location, $rootScope, $routeParams, $scope, ImageFactory, InviteFactory) {
	$scope.images = [];
	$scope.event = {};
	
	let getItems = () => {
	  ImageFactory.getImageList($rootScope.user.uid).then((imagesObjs) => {
	    $scope.images = imagesObjs;
	  }).catch((error) => {
	    console.log("get error", error);
	  });
	};

	getItems();

	//**************************
	// IMAGE BUILDER
	//**************************
		let canvas = document.getElementById("inviteBuilder");
		let ctx = canvas.getContext('2d');
		let counter = 50;

		let bkgImageObj = {};
		
		$scope.textlayers = {
			line1: "Come celebrate!",
			line2: "Elizabeth is turning 30",
			line3: "at M.L.Rose Bar and Grill",
			line4: "March 30th"
		};

		let createText = (inputInfo) => {
  		ctx.font = "20px Arial";
  		ctx.fillText(inputInfo, 10, counter);
  		counter = counter + 60;
		};

		let imageMaker = (newImageObj) => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			counter = 50;
			let image = new Image();
			image.onload = () => {
				ctx.drawImage(image, 0, 0, image.width * 0.5, image.height * 0.5);
				//SET TEXT HERE:
				createText($scope.textlayers.line1);
				createText($scope.textlayers.line2);
				createText($scope.textlayers.line3);
				createText($scope.textlayers.line4);
			};
			image.src = `data:${newImageObj.filetype};base64,${newImageObj.base64code}`;
		};

	$scope.setMyImage = (imageObj) => {
		bkgImageObj = imageObj;
		imageMaker(imageObj);
	};

	$scope.updateCanvas = () => {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		imageMaker(bkgImageObj);
		counter = 50;
	};

});