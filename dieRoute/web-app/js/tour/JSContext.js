
var appContext = (function() {  
	
	/********************* private section ************************/
	
	var defaultPos = new google.maps.LatLng(50.31608, 8.855189999999993); // florstadt germany 	
	var map;
	var markerHelper;
	var geoCodingHelper;
	var directionServiceHelper;
	var polylineHelper;
	var elevationServiceHelper;
	var mapPrinter;
	var tour;
	var mapAddressArray;
	var tourWorkflow;
	var newMapAddressDialogHelper;
	

	createMarkerHelper = function(){
		markerHelper = new DeMentronigMapUtils.MarkerHelper(map);
	};

	_getTourWorflow = function(){
		if(!tourWorkflow)
			tourWorkflow = new DeMentronigTourTourWorkFlow.TourWorkflow();
		return tourWorkflow;
	};
	
	_initMap = function(centerPos){
		if(!map){
		    var myOptions = {
		    	      zoom: 12,
		    	      center: centerPos,
		    	      navigationControl: true,
		    	      mapTypeControl: true,
		    	      scaleControl: false,		    	      
		    	      mapTypeId: google.maps.MapTypeId.TERRAIN
		    	    };
	 	    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);		
		}
	};	
	
	/************************* closure begin ***********************/
	
	return {
		/********************** Map **********************/
		initMap : function(centerPosition){_initMap(centerPosition);},
		
		getMap : function(){return map;}, 
		
		/********************* Marker ********************/
		 getMarkerHelper : function(){
			if(!map)
				_initMap(defaultPos);
			
			if(!markerHelper)
				createMarkerHelper();
			
			return markerHelper;
		},
		
		/****************** GeoCoding *******************/
		getGeoCodingHelper : function(){
			if(!geoCodingHelper)
				geoCodingHelper = new DeMentronigMapUtils.GeoCodingHelper();
			
			return geoCodingHelper;
		},
		
		getDirectionServiceHelper : function(){
			if(!directionServiceHelper)				
				directionServiceHelper = new DeMentronigMapUtils.DirectionServiceHelper(map);

			return directionServiceHelper; 
		},
		
		getPolylineHelper : function(){
			if(!polylineHelper){
				polylineHelper = new DeMentronigMapUtils.PolylineHelper(map, '#000000', 1.0, 3);
			}
			
			return polylineHelper;
		},
		
		getElevationServiceHelper : function(){
			if(!elevationServiceHelper)
				elevationServiceHelper = new DeMentronigMapUtils.ElevationServiceHelper();
			
			return elevationServiceHelper;
		},
		
		getNewMapAddressDialog : function(){
			return new DeMentronigTourUi.NewMapAddressDialog();
		},
		
		getMapPrinter : function(){
			if(!mapPrinter)
				mapPrinter = new DeMentronigMapUtils.MapPrinter();
			
			return mapPrinter;			
		},
		
		getTour : function(){
			if(!tour)
				tour = new DeMentronigBO.Tour();
			
			return tour;				
		},

		showRoute : function(){
			log.debug("show route");
			if(!directionServiceHelper)				
				directionServiceHelper = new DeMentronigMapUtils.DirectionServiceHelper(map);
			
			if(!tour){
				alert("No tour to route !!");
				return;
			}
			
			directionServiceHelper.routeWaypoints(tour);
		},
		
		createAddressDetail : function(){
			return new DeMentronigBO.AddressDetail();
		},
		
		getTourWorflow : function(){
			return _getTourWorflow();
		},
		
		getNewMapAddressDialogHelper : function(){
			if(!newMapAddressDialogHelper)
				newMapAddressDialogHelper = new DeMentronigTourUi.NewMapAddressDialogHelper();
			
			return newMapAddressDialogHelper;
		},
		
		saveTour : function(){
			_getTourWorflow().saveTour();	
		},
		
		setOptions : function(zoom, center, mapTypeId){
			var mapOptions = {
		    	      zoom: zoom,
		    	      center: center,
		    	      mapTypeId: mapTypeId					
			};
			if(!map){
				map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
			}else {
				map.setOptions(mapOptions);
			}			
		}
	};     
})();  