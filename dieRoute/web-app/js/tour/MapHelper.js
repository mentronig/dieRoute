if(typeof(DeMentronigMapUtils) == "undefined") var DeMentronigMapUtils = {};

/* ====================== MarkerHelper ============================== */

DeMentronigMapUtils.MarkerHelper = function(theMap){
	this.map = theMap;
	this.markersArray = [];
};

/*
 * Add a marker to the map
 */
DeMentronigMapUtils.MarkerHelper.prototype.addMarker = function(aMapAddress){
    var marker = new google.maps.Marker({
        position: aMapAddress.getLatLng(), 
        map: this.map,
        title:"Hello" + aMapAddress.getLatLng().toString() 
    });	
    this.markersArray.push(marker);
    
    google.maps.event.addListener(marker, 'click', function(){
    	var latLng = marker.getPosition();	
    	$("#geoPointLat").val(latLng.lat());
    	$("#geoPointLng").val(latLng.lng());
    	$("#geoElevation").val(aMapAddress.getElevation());
    	
		if (!$("#newMapAddressDialog").dialog("isOpen")) { 
		    $("#newMapAddressDialog").dialog("open");
		} else {
			$("#newMapAddressDialog").dialog("close");
		};    	
    });
};

/*
 * Clear all markers from this map;
 */
DeMentronigMapUtils.MarkerHelper.prototype.clearMarkers = function(){
	if(this.markersArray){
		for ( var i in this.markersArray) {
			this.markersArray[i].setMap(null);
		}
	}
};
	
/*
 * Show all existing markers on this map
 */
DeMentronigMapUtils.MarkerHelper.prototype.showMarkers = function(){
	if(this.markersArray){
		for ( var i in this.markersArray) {
			this.markersArray[i].setMap(map);
		}
	}
};
	
DeMentronigMapUtils.MarkerHelper.prototype.deleteAll = function(){
	if(this.markersArray){
		this.clearMarkers();
		this.markersArray.length = 0;
	}		
};

/* ====================== GeoCodingHelper ============================ */
DeMentronigMapUtils.GeoCodingHelper = function(){
	this.geocoder = new google.maps.Geocoder();
};

/*
 * Set address details with a little help from geocode
 */
DeMentronigMapUtils.GeoCodingHelper.prototype.getAddress = function(latLng){
	
	this.geocoder.geocode( { 'latLng': latLng}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
			var mapAddress = appContext.getTour().getMapAddress(latLng);
			if(mapAddress){
				var addressArray = results[0].formatted_address.split(',');
				for ( var cnt = 0; cnt < addressArray.length; cnt++) {
					switch(cnt){
						case 0:
							addressDetail.setStreet(addressArray[cnt]);
							break;
						case 1:
							addressDetail.setCity(addressArray[cnt]);
							break;
						case 2:
							addressDetail.setCountry(addressArray[cnt]);
							break;
						default:
							log.debug("address Array to big cnt = " + addressArray[cnt]);
					};
					
				}				
			} else {
				alert("No Address found!");
			}			
        } else {
          alert("Geocode was not successful for the following reason: " + status);
        }
      });    
};


DeMentronigMapUtils.GeoCodingHelper.prototype.getAddressForNewMappAddress = function(latLng){
	
	this.geocoder.geocode( { 'latLng': latLng}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
			var addressArray = results[0].formatted_address.split(',');
			for ( var cnt = 0; cnt < addressArray.length; cnt++) {
				switch(cnt){
					case 0:
						$("#geoStreet").val(addressArray[cnt]);
						break;
					case 1:
						$("#geoCity").val(addressArray[cnt]);
						break;
					case 2:
						$("#geoCountry").val(addressArray[cnt]);
						break;
					default:
						log.debug("address Array to big cnt = " + addressArray[cnt]);
				};
			};					
        } else {
          alert("Geocode was not successful for the following reason: " + status);
        }
      });    
};


/* ====================== DirectionServiceHelper ============================ */
DeMentronigMapUtils.DirectionServiceHelper = function(aMap){
	this.directionsService = new google.maps.DirectionsService();
	this.directionsDisplay = new google.maps.DirectionsRenderer();
    this.directionsDisplay.setMap(aMap);
    this.directionsDisplay.setPanel(document.getElementById("directionsPanel"));
};

DeMentronigMapUtils.DirectionServiceHelper.prototype.routeWaypoints = function(aTour){
	
	var mapAddressArray = aTour.getAddressArray();
	var addressLenth = mapAddressArray.length;

	if(addressLenth < 2){
		alert("The route must have at least two points.");
		return;
	}
	
	var startPoint = mapAddressArray[0].getLatLng();
	var endPoint = mapAddressArray[addressLenth-1].getLatLng();
	
	var request;
	
	// only start and end point
	if(addressLenth == 2){
	    request = {
	            origin: startPoint, 
	            destination: endPoint,
	            travelMode: google.maps.DirectionsTravelMode.WALKING  //DRIVING WALKING BICYLING
	    };		
	} else { // more than two points, assuming waypoints
		var waypts = [];
		var endCount = addressLenth-1;
		for ( var cnt = 1; cnt < endCount ; cnt++) {
			waypts.push({location:mapAddressArray[cnt].getLatLng(), stopover:true});		
		}
			
	    request = {
	            origin: startPoint, 
	            destination: endPoint,
	            waypoints: waypts,
	            optimizeWaypoints: true,
	            travelMode: google.maps.DirectionsTravelMode.DRIVING  //DRIVING WALKING BICYLING
	    };
	}
    
    this.directionsService.route(request, function(response,status){
        if (status == google.maps.DirectionsStatus.OK) {
        	appContext.getDirectionServiceHelper().getDirectionDisplay().setDirections(response);
          } else {
        	  alert("Not OK");
          }    	
    });	
};

DeMentronigMapUtils.DirectionServiceHelper.prototype.getDirectionService = function(){return this.directionsService;};
DeMentronigMapUtils.DirectionServiceHelper.prototype.getDirectionDisplay = function(){return this.directionsDisplay;};



/* ====================== PolylineHelper ============================ */
DeMentronigMapUtils.PolylineHelper = function(aMap, strokeColor, strokeOpacity, strokeWeight){
	this.polyOptions = {
		strokeColor:strokeColor,
		strokeOpacity:strokeOpacity,
		strokeWeight:strokeWeight
	};
	
	this.polyline = new google.maps.Polyline(this.polyOptions);
	this.polyline.setMap(aMap);
};

DeMentronigMapUtils.PolylineHelper.prototype.add = function(aLatLng){
	var path = this.polyline.getPath();
	path.push(aLatLng);
};

/* ====================== ElevationServiceHelper ============================ */
DeMentronigMapUtils.ElevationServiceHelper = function(){
	this.elevator = new google.maps.ElevationService();
};


/*
 * 
 * Get a elevation for a given MapAddress.latLng and set the elevation attribute on MapAddress
 * 
 *  @param aMapAddress
 *  
 */
DeMentronigMapUtils.ElevationServiceHelper.prototype.getElevation = function(aMapAddress){
	var locations = [];
	var latLng = aMapAddress.getLatLng();
	locations.push(latLng);
	var positionalRequest = {
		'locations' : locations	
	};
	
	this.elevator.getElevationForLocations(positionalRequest, function(results, status) {
		if (status == google.maps.ElevationStatus.OK) {
	        // Retrieve the first result
	        if (results[0]) {
	        	aMapAddress.setElevation(results[0].elevation);
	        }
		 } else {
	          alert("No elevator results found");
        }
	        
	});
	
};

DeMentronigMapUtils.ElevationServiceHelper.prototype.getElevationForNewMappAddress = function(lat, lng){
		var latLng = new google.maps.LatLng(lat, lng);
		
		var locations = [];
		locations.push(latLng);
		var positionalRequest = {
			'locations' : locations	
		};

		this.elevator.getElevationForLocations(positionalRequest, function(results, status) {
			if (status == google.maps.ElevationStatus.OK) {

		        // Retrieve the first result
		        if (results[0]) {
		        	$("#geoElevation").val(results[0].elevation);
		        }
			 } else {
		          alert("No elevator results found");
	        }
		        
		});
		
};

/* ====================== MapPrinter ============================ */
DeMentronigMapUtils.MapPrinter = function(){};

DeMentronigMapUtils.MapPrinter.prototype.printMapAddress = function (aMapAddress){
    $("#geoPointLat").val(aMapAddress.getLatLng().lat());
    $("#geoPointLng").val(aMapAddress.getLatLng().lng());
    var addressDetail = aMapAddress.getAddressDetail();
    if(!addressDetail)
    	return;

    $("#geoStreet").val(addressDetail.getStreet());
	$("#geoCity").val(addressDetail.getCity());
	$("#geoCountry").val(addressDetail.getCountry());
	$("#geoElevation").val(addressDetail.getElevation());
	
/*
	var results = theMapAddress.getResults();
	for ( var cnt = 0; cnt < results.length; cnt++) {
		
		$("#addressResults").append("<p>************************</p>");
		$("#addressResults").append("<p>results types:</p>");
		for ( var tcnt = 0; tcnt < results[cnt].types.length; tcnt++) {
			$("#addressResults").append("<p> type i= " + tcnt + " : " + results[cnt].types[tcnt] + "</p>");
		};

		$("#addressResults").append("<p>formatted_address:</p>");
		$("#addressResults").append("<p> i= " + cnt + " : " + results[cnt].formatted_address + "</p>");

		for ( var tcnt = 0; tcnt < results[cnt].address_components.length; tcnt++) {
			$("#addressResults").append("<p>addresss components long name:</p>");

			$("#addressResults").append("<p> long i= " + tcnt + " : " + results[cnt].address_components[tcnt].long_name + "</p>");

			for ( var xcnt = 0; xcnt < results[cnt].address_components[tcnt].types.length; xcnt++) {
				$("#addressResults").append("<p>address components types:</p>");

				$("#addressResults").append("types i= " + xcnt + " : " + results[cnt].address_components[tcnt].types[xcnt]);
			};
		
		};
		

	};
*/
};

