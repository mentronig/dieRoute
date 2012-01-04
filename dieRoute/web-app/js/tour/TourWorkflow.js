if(typeof(DeMentronigTourTourWorkFlow) == "undefined") var DeMentronigTourTourWorkFlow = {};

DeMentronigTourTourWorkFlow.TourWorkflow = function(){
	
};

DeMentronigTourTourWorkFlow.TourWorkflow.prototype.processTourMarker = function(aLatLng){
	var mapAddress = new DeMentronigBO.MapAddress();
	mapAddress.setLatLng(aLatLng);
	appContext.getTour().addAddress(mapAddress);
	appContext.getMarkerHelper().addMarker(mapAddress);
	var geoCodingHelper = appContext.getGeoCodingHelper();
	geoCodingHelper.getAddress(mapAddress.getLatLng());

};

/* Zeichnen einer Polylinie und Marker */
DeMentronigTourTourWorkFlow.TourWorkflow.prototype.processTourPath = function(aLatLng){
	var mapAddress = new DeMentronigBO.MapAddress();
	mapAddress.setLatLng(aLatLng);
	appContext.getTour().addAddress(mapAddress);
	appContext.getElevationServiceHelper().getElevation(mapAddress);
	appContext.getMarkerHelper().addMarker(mapAddress);
	appContext.getPolylineHelper().add(aLatLng);

};

DeMentronigTourTourWorkFlow.TourWorkflow.prototype.saveTour = function(){
	alert("Save tour");
	var tour = appContext.getTour();
	tour.setMapUser($('#tourUser').val());
	tour.setName($('#tourName').val());
	tour.setSeverity($('#tourSeverity').val());
	
	var tourDetail = tour.getTourDetail();
	tourDetail.setType($('#tourType').val());
	tourDetail.setCategory($('#tourCategory').val());
	tourDetail.setCondition($('#tourCondition').val());
	tourDetail.setPanorama($('#tourPanorama').val());
	tourDetail.setDistance($('#tourDistance').val());
	tourDetail.setDuration($('#tourDuration').val());
	tourDetail.setDescription($('#tourDescription').val());
	tourDetail.setMaxElevation($('#tourMaxElevation').val());
	
	alert("tour = " + tour.getMapUser() + " : "+ tour.getName() + " : "+ tour.getSeverity()
			+ " : "+ tourDetail.getType()+ " : "+ tourDetail.getCategory()+ " : "+ tourDetail.getCondition()
			+ " : "+ tourDetail.getPanorama()+ " : "+ tourDetail.getDistance()+ " : "+ tourDetail.getDuration()
			+ " : "+ tourDetail.getDescription()+ " : "+ tourDetail.getMaxElevation()
	);
};