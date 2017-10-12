app.controller("BuilderCtrl", function($location, $rootScope, $routeParams, $scope, $timeout, ImageFactory, InviteFactory, EventFactory, FileSaver, Blob) {
	
	let canvas = document.getElementById("inviteBuilder");
	let ctx = canvas.getContext('2d');

	$scope.events = [];
	$scope.images = [];
	$scope.textInput = "";
	$scope.newEvent = {};
	$scope.currentLayers = [];
	$scope.showLayerOptions = false;
	let thisEventId = "";
	
	let getItems = () => {
	  ImageFactory.getImageList($rootScope.user.uid).then((imagesObjs) => {
	    $scope.images = imagesObjs;
	  }).catch((error) => {
	    console.log("Get user items error", error);
	  });
	};
	getItems();

	let getAllEvents = () => {
		EventFactory.getPartyList($rootScope.user.uid).then((partyItems) => {
			$scope.events = partyItems;
		}).catch((error) => {
			console.log("get events error", error);
		});
	};
	getAllEvents();

	$scope.selectEvent = () => {
		thisEventId = $scope.eventValue;
		$scope.showLayerOptions = true;
	};
//**************************
// IMAGE BUILDER V2
//**************************
	let xAxis = 0;
	let yAxis = 0;
	let zScale = 1;
	let layerCounter = 0;
	let fontSize = 50;
	let fontType = "Futura";
	let fillStyle = "black";

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
		  ctx.fillStyle = textObj.fillStyle;
		  ctx.fillText(textObj.string, textObj.xAxis, textObj.yAxis);
	};

	$scope.setImageLayer = (imageObj) => {
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
			layernumber: layerCounter,
			fillStyle: fillStyle
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
		$scope.textInput = "";
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
				$scope.currentLayers[a].xAxis = $scope.currentLayers[a].xAxis + 20;
			}
		}
		layerReDraw();
	};
	$scope.shiftLayerLeft = (layerNum) => {
		for (let a = 0; a < $scope.currentLayers.length; a++){
			if (layerNum === $scope.currentLayers[a].layernumber) {
				$scope.currentLayers[a].xAxis = $scope.currentLayers[a].xAxis - 20;
			}
		}
		layerReDraw();
	};

	//Up and Down
		$scope.shiftLayerUp = (layerNum) => {
		for (let a = 0; a < $scope.currentLayers.length; a++){
			if (layerNum === $scope.currentLayers[a].layernumber) {
				$scope.currentLayers[a].yAxis = $scope.currentLayers[a].yAxis - 20;
			}
		}
		layerReDraw();
	};
	$scope.shiftLayerDown = (layerNum) => {
		for (let a = 0; a < $scope.currentLayers.length; a++){
			if (layerNum === $scope.currentLayers[a].layernumber) {
				$scope.currentLayers[a].yAxis = $scope.currentLayers[a].yAxis + 20;
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

	//Change text
	$scope.changeLayerText = (layerNum, newTextString) => {
		for (let a = 0; a < $scope.currentLayers.length; a++){
			if (layerNum === $scope.currentLayers[a].layernumber) {
				$scope.currentLayers[a].string = newTextString;
			}
		}
		layerReDraw();
		newTextString = "";
	};

	$scope.setColor = (layerNum, ev) => {
		for (let a = 0; a < $scope.currentLayers.length; a++){
			if (layerNum === $scope.currentLayers[a].layernumber) {
				if (ev.currentTarget.value === "white") {
					fillStyle = "white";
					$scope.currentLayers[a].fillStyle = fillStyle;
				}
				if (ev.currentTarget.value === "black") {
					fillStyle = "black";
					$scope.currentLayers[a].fillStyle = fillStyle;
				}
				if (ev.currentTarget.value === "red") {
					fillStyle = "#a85265";
					$scope.currentLayers[a].fillStyle = fillStyle;
				}
				if (ev.currentTarget.value === "yellow") {
					fillStyle = "#eead20";
					$scope.currentLayers[a].fillStyle = fillStyle;
				}
				if (ev.currentTarget.value === "blue") {
					fillStyle = "#3f88c8";
					$scope.currentLayers[a].fillStyle = fillStyle;
				}
			}
		}
		layerReDraw();
	};

		$scope.fontSize = (layerNum, ev) => {
		for (let a = 0; a < $scope.currentLayers.length; a++){
			if (layerNum === $scope.currentLayers[a].layernumber) {
				if (ev.currentTarget.value === "up") {
					$scope.currentLayers[a].size = $scope.currentLayers[a].size + 10;
				}
				if (ev.currentTarget.value === "down") {
					$scope.currentLayers[a].size = $scope.currentLayers[a].size - 10;
				}
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
  		eventid : thisEventId
  	};
  	
  	
  	InviteFactory.addInvite(newDesign).then((results) => {
  			$scope.currentLayers.forEach((layerObj) => {
  				layerObj.inviteid = results.data.name;
					InviteFactory.createlayerObj(layerObj).then(() => {
					})
					.catch((error) => {
						console.log("Save new layers error", error);
					});
				});
  			$location.url('/profile');
  	}).catch((error) => {
  		console.log("Save invite error", error);
  	});
	};

	// **************************
	// USER DESIGN AND EVENT SAVES
	// **************************

  $scope.saveEvent = () => {
  	$scope.newEvent.uid = $rootScope.user.uid;
  	EventFactory.postNewEvent($scope.newEvent).then((results) => {
  		thisEventId = results.data.name;
  		$scope.showLayerOptions = true;
  	}).catch((error) => {
  		console.log("Save event error", error);
  	});
  };

  $scope.noEvent = () => {
  	thisEventId = "noparty";
  	$scope.showLayerOptions = true;
  };

  $scope.btnDownload = () => {
		canvas.toBlob(function(blob) {
    	saveAs(blob, "invitation image.png");
		});
  };


});