app.controller("BuilderEditorCtrl", function($location, $rootScope, $routeParams, $scope, $timeout, ImageFactory, InviteFactory, EventFactory) {
	
	let canvas = document.getElementById("inviteBuilder");
	let ctx = canvas.getContext('2d');

	$scope.images = [];
	$scope.textInput = "";
	$scope.currentLayers = [];
	$scope.showLayerOptions = true;
	let thisEventId = "";
	
	let getItems = () => {
	  ImageFactory.getImageList($rootScope.user.uid).then((imagesObjs) => {
	    $scope.images = imagesObjs;
	  }).catch((error) => {
	    console.log("get error", error);
	  });
	};

	getItems();

	InviteFactory.getInviteLayers($routeParams.inviteid).then((results) => {
		results.sort(function (a, b) {
  		return a.layernumber - b.layernumber;
		});
		$scope.currentLayers = results;
		layerReDraw();
	})
	.catch((error) => {
		console.log(error);
	});
	InviteFactory.getInvite($routeParams.inviteid).then((results) => {
		thisEventId = results.eventid;
				console.log("eventid, ", thisEventId);
	}).catch((error) => {
		console.log(error);
	});

//**************************
// IMAGE BUILDER V2
//**************************
	let xAxis = 10;
	let yAxis = 10;
	let zScale = 0.5;
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

	$scope.setImageLayer = (imageObj) => {
		let layerCounter = $scope.currentLayers[$scope.currentLayers.length - 1].layernumber + 1;
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
		let layerCounter = $scope.currentLayers[$scope.currentLayers.length - 1].layernumber + 1;
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

	let layerReDraw = () => {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		$scope.currentLayers.forEach((layerObj) => {
			if (layerObj.string !== undefined) {
				$timeout(() => {writeMyText(layerObj);}, 200);
			} else {
  			myDrawImage(layerObj);
			}
		});
	};

	//Left and right
	$scope.shiftLayerRight = (layerNum) => {
		for (let a = 0; a < $scope.currentLayers.length; a++){
			if (layerNum === $scope.currentLayers[a].layernumber) {
				$scope.currentLayers[a].xAxis = $scope.currentLayers[a].xAxis + 10;
			}
		}
		layerReDraw();
	};
	$scope.shiftLayerLeft = (layerNum) => {
		for (let a = 0; a < $scope.currentLayers.length; a++){
			if (layerNum === $scope.currentLayers[a].layernumber) {
				$scope.currentLayers[a].xAxis = $scope.currentLayers[a].xAxis - 10;
			}
		}
		layerReDraw();
	};

	//Up and Down
		$scope.shiftLayerUp = (layerNum) => {
		for (let a = 0; a < $scope.currentLayers.length; a++){
			if (layerNum === $scope.currentLayers[a].layernumber) {
				$scope.currentLayers[a].yAxis = $scope.currentLayers[a].yAxis - 10;
			}
		}
		layerReDraw();
	};
	$scope.shiftLayerDown = (layerNum) => {
		for (let a = 0; a < $scope.currentLayers.length; a++){
			if (layerNum === $scope.currentLayers[a].layernumber) {
				$scope.currentLayers[a].yAxis = $scope.currentLayers[a].yAxis + 10;
			}
		}
		layerReDraw();
	};

	//Scale
	$scope.scaleLayerUp = (layerNum) => {
		for (let a = 0; a < $scope.currentLayers.length; a++){
			if (layerNum === $scope.currentLayers[a].layernumber) {
				$scope.currentLayers[a].scale = $scope.currentLayers[a].scale + 0.05;
			}
		}
		layerReDraw();
	};
		$scope.scaleLayerDown = (layerNum) => {
		for (let a = 0; a < $scope.currentLayers.length; a++){
			if (layerNum === $scope.currentLayers[a].layernumber) {
				$scope.currentLayers[a].scale = $scope.currentLayers[a].scale - 0.05;
			}
		}
		layerReDraw();
	};

	//Delete Layer
	$scope.deleteLayer = (layerNum) => {
		for (let a = 0; a < $scope.currentLayers.length; a++){
			if (layerNum === $scope.currentLayers[a].layernumber) {
				$scope.currentLayers.splice(a, 1);
			}
		}
		layerReDraw();
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
  		category : myEvent,
  		eventid : thisEventId,
  		id: $routeParams.inviteid
  	};
  	
  	
  	InviteFactory.editInvite(newDesign).then((results) => {
  			$scope.currentLayers.forEach((layerObj) => {
  				let newLayerObj = {};
  				if (layerObj.string !== undefined){
  						newLayerObj = {
  							inviteid: $routeParams.inviteid,
								string: layerObj.string,
								xAxis: layerObj.xAxis,
								yAxis: layerObj.yAxis,
								size: layerObj.size,
								fontType: layerObj.fontType,
								layernumber: layerObj.layernumber,
								id: layerObj.id
							};
						} else {
							newLayerObj = {
								inviteid: $routeParams.inviteid,
								imageCode: layerObj.imageCode,
								xAxis: layerObj.xAxis,
								yAxis: layerObj.yAxis,
								scale: layerObj.scale,
								layernumber: layerObj.layernumber,
								id: layerObj.id
							};
						}
					InviteFactory.editlayerObj(newLayerObj).then(() => {
					})
					.catch((error) => {
						console.log(error);
					});
				});
  			$location.url('/profile');
  	}).catch((error) => {
  		console.log(error);
  	});
	};

});