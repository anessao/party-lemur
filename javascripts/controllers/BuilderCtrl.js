app.controller("BuilderCtrl", function($location, $rootScope, $routeParams, $scope, $timeout, ImageFactory, InviteFactory, EventFactory) {
	
	let canvas = document.getElementById("inviteBuilder");
	let ctx = canvas.getContext('2d');

	$scope.images = [];
	$scope.textInput = "";
	$scope.newEvent = {};
	$scope.currentLayers = [];
	$scope.showLayerOptions = false;
	let thisEvent = "";

	let layerSelectedImage = "";
	
	let getItems = () => {
	  ImageFactory.getImageList($rootScope.user.uid).then((imagesObjs) => {
	    $scope.images = imagesObjs;
	    console.log($scope.images);
	  }).catch((error) => {
	    console.log("get error", error);
	  });
	};

//**************************
// IMAGE BUILDER V2
//**************************
	let xAxis = 10;
	let yAxis = 10;
	let zScale = 0.5;
	let layerCounter = 0;
	let fontSize = 50;
	let fontType = "Futura";

	let myDrawImage = (obj) => {
	  	let longstring = obj.imageCode;
		  let xAxis = obj.xAxis;
		  let yAxis = obj.yAxis;
		  let zScale = obj.scale;
		  	
	  	let img = new Image();
	  	img.onload = () => {
	    	ctx.drawImage(img, xAxis, yAxis, img.width * zScale, img.height * zScale);
	    	console.log(obj);
	    	if (obj.string !== undefined) {
	    		writeMyText(obj);
	    	}
	  	};
	  	img.src = longstring;
	};

	let writeMyText = (textObj) => {
		  ctx.font = `${textObj.size}px ${textObj.fontType}`;
			ctx.fillText(textObj.string, textObj.xAxis, textObj.yAxis);
	};

	$scope.setLayer = (imageObj) => {
		newLayer = {
			imageCode:`data:${imageObj.filetype};base64,${imageObj.base64code}`,
			xAxis: xAxis,
			yAxis: yAxis,
			scale: zScale,
			layernumber: layerCounter
		};
		$scope.currentLayers.push(newLayer);
		layerCounter ++;
		$scope.currentLayers.forEach((layerObj) => {
			if (layerObj.string !== undefined) {
				$timeout(() => {writeMyText(layerObj);}, 200);
			} else {
  			myDrawImage(layerObj);
			}
		});
	};

	$scope.createTextLayer = (textString) => {
		let newLayer = {
			string: textString,
			xAxis: 100,
			yAxis: 100,
			size: fontSize,
			fontType: fontType,
			layernumber: layerCounter
		};
		$scope.currentLayers.push(newLayer);
		layerCounter ++;
		$scope.currentLayers.forEach((layerObj) => {
			if (layerObj.string !== undefined) {
				$timeout(() => {writeMyText(layerObj);}, 200);
			} else {
  			myDrawImage(layerObj);
			}
		});
	};

	//******************************
	//LAYER MANIPULATIONS

	//Left and right
	$scope.shiftLayerRight = (layerNum) => {
		for (let a = 0; a < $scope.currentLayers.length; a++){
			if (layerNum === $scope.currentLayers[a].layernumber) {
				$scope.currentLayers[a].xAxis = $scope.currentLayers[a].xAxis + 10;
			}
		}
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		$scope.currentLayers.forEach((layerObj) => {
			if (layerObj.string !== undefined) {
				$timeout(() => {writeMyText(layerObj);}, 200);
			} else {
  			myDrawImage(layerObj);
			}
		});
	};
	$scope.shiftLayerLeft = (layerNum) => {
		for (let a = 0; a < $scope.currentLayers.length; a++){
			if (layerNum === $scope.currentLayers[a].layernumber) {
				$scope.currentLayers[a].xAxis = $scope.currentLayers[a].xAxis - 10;
			}
		}
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		$scope.currentLayers.forEach((layerObj) => {
			if (layerObj.string !== undefined) {
				$timeout(() => {writeMyText(layerObj);}, 200);
			} else {
  			myDrawImage(layerObj);
			}
		});
	};

	//Up and Down
		$scope.shiftLayerUp = (layerNum) => {
		for (let a = 0; a < $scope.currentLayers.length; a++){
			if (layerNum === $scope.currentLayers[a].layernumber) {
				$scope.currentLayers[a].yAxis = $scope.currentLayers[a].yAxis - 10;
			}
		}
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		$scope.currentLayers.forEach((layerObj) => {
			if (layerObj.string !== undefined) {
				$timeout(() => {writeMyText(layerObj);}, 200);
			} else {
  			myDrawImage(layerObj);
			}
		});
	};
	$scope.shiftLayerDown = (layerNum) => {
		for (let a = 0; a < $scope.currentLayers.length; a++){
			if (layerNum === $scope.currentLayers[a].layernumber) {
				$scope.currentLayers[a].yAxis = $scope.currentLayers[a].yAxis + 10;
			}
		}
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		$scope.currentLayers.forEach((layerObj) => {
			if (layerObj.string !== undefined) {
				$timeout(() => {writeMyText(layerObj);}, 200);
			} else {
  			myDrawImage(layerObj);
			}
		});
	};

	//Scale
	$scope.scaleLayerUp = (layerNum) => {
		for (let a = 0; a < $scope.currentLayers.length; a++){
			if (layerNum === $scope.currentLayers[a].layernumber) {
				$scope.currentLayers[a].scale = $scope.currentLayers[a].scale + 0.05;
			}
		}
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		$scope.currentLayers.forEach((layerObj) => {
			if (layerObj.string !== undefined) {
				$timeout(() => {writeMyText(layerObj);}, 200);
			} else {
  			myDrawImage(layerObj);
			}
		});
	};
		$scope.scaleLayerDown = (layerNum) => {
		for (let a = 0; a < $scope.currentLayers.length; a++){
			if (layerNum === $scope.currentLayers[a].layernumber) {
				$scope.currentLayers[a].scale = $scope.currentLayers[a].scale - 0.05;
			}
		}
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		$scope.currentLayers.forEach((layerObj) => {
			if (layerObj.string !== undefined) {
				$timeout(() => {writeMyText(layerObj);}, 30);
			} else {
  			myDrawImage(layerObj);
			}
		});
	};

	//Delete Layer
	$scope.deleteLayer = (layerNum) => {
		for (let a = 0; a < $scope.currentLayers.length; a++){
			if (layerNum === $scope.currentLayers[a].layernumber) {
				$scope.currentLayers.splice(a, 1);
			}
		}
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		$scope.currentLayers.forEach((layerObj) => {
			if (layerObj.string !== undefined) {
				$timeout(() => {writeMyText(layerObj);}, 30);
			} else {
  			myDrawImage(layerObj);
			}
		});
	};

	//**************************
	// FINAL DESIGN CHANGE
	//**************************
	let myEvent = "none"; //adjust this when ready to work out UX on events

	$scope.saveMyDesign = () => {
		let designBase64 = canvas.toDataURL();
		let newDesign = {
  		uid : $rootScope.user.uid,
  		base64code : designBase64,
  		category : myEvent
  	};
  	
  	
  	InviteFactory.addInvite(newDesign).then((results) => {
  			$scope.currentLayers.forEach((layerObj) => {
  				let newLayerObj = {};
  				newLayerObj.inviteId = results.data.name;
  				if (layerObj.string !== undefined){
  						newLayerObj = {
  							inviteid: results.data.name,
								string: layerObj.string,
								xAxis: layerObj.xAxis,
								yAxis: layerObj.yAxis,
								size: layerObj.size,
								fontType: layerObj.fontType,
								layernumber: layerObj.layerCounter
							};
						} else {
							newLayerObj = {
								inviteid: results.data.name,
								imageCode: layerObj.imageCode,
								xAxis: layerObj.xAxis,
								yAxis: layerObj.yAxis,
								scale: layerObj.scale,
								layernumber: layerObj.layerCounter
							};
						}
					InviteFactory.createlayerObj(newLayerObj).then(() => {
					})
					.catch((error) => {
						console.log(error);
					});
				});
  	}).catch((error) => {
  		console.log(error);
  	});
	};

	// **************************
	// SET EVENT
	// **************************

  $scope.saveEvent = () => {
  	$scope.newEvent.uid = $rootScope.user.uid;
  	EventFactory.postNewEvent($scope.newEvent).then((answer) => {
  		$scope.showLayerOptions = true;
  		getItems();
  	}).catch((error) => {
  		console.log(error);
  	});
  };

});