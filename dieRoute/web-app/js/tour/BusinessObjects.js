if(typeof(DeMentronigBO) == "undefined") var DeMentronigBO = {};

/************************ Tour ***************************/
DeMentronigBO.Tour = function(){
	this.name;
	this.severity; //Schwierigkeitsgrad
	this.addressArray = [];
	this.mapUser;
	this.tourDetail;
	
};

// Getter & Setter
DeMentronigBO.Tour.prototype.getName = function(){return this.name;};
DeMentronigBO.Tour.prototype.setName = function(aName){this.name = aName;};
DeMentronigBO.Tour.prototype.getSeverity = function(){return this.severity;};
DeMentronigBO.Tour.prototype.setSeverity = function(aSeverity){this.severity = aSeverity;};
DeMentronigBO.Tour.prototype.setMapUser = function (aMapUser){this.mapUser = aMapUser;};
DeMentronigBO.Tour.prototype.getMapUser = function (){return this.mapUser;};
DeMentronigBO.Tour.prototype.getAddressArray = function(){return this.addressArray;};
DeMentronigBO.Tour.prototype.addAddress = function(aMapAddress){
	this.addressArray.push(aMapAddress);
};

DeMentronigBO.Tour.prototype.getTourDetail = function(){
	if(!this.tourDetail)
		this.tourDetail = new DeMentronigBO.TourDetail();
	
	return this.tourDetail;
};

DeMentronigBO.Tour.prototype.getMapAddress = function(aLatLng){
	for ( var cnt = 0; cnt < this.addressArray.length; cnt++) {
		var addressLatLng = this.addressArray[cnt].getLatLng();
		if ((aLatLng.lat() == addressLatLng.lat()) &&  (aLatLng.lng() == addressLatLng.lng())) {
			return this.addressArray[cnt];
		}
	}
	return undefined;
};

/************************ TourDetail ***************************/
DeMentronigBO.TourDetail = function(){
	this.type;			//Fahhrad, Wandern, 
	this.category;		//Winter
	this.condition;
	this.panorama;
	this.distance;
	this.duration;
	this.description;
	this.maxElevation;
};
DeMentronigBO.TourDetail.prototype.setType = function(aType){this.type = aType;};
DeMentronigBO.TourDetail.prototype.getType = function(){return this.type;};
DeMentronigBO.TourDetail.prototype.setCategory = function(aCategory){this.category = aCategory;};
DeMentronigBO.TourDetail.prototype.getCategory = function(){return this.category;};
DeMentronigBO.TourDetail.prototype.setCondition = function(aCondition){this.condition = aCondition;};
DeMentronigBO.TourDetail.prototype.getCondition = function(){return this.condition;};
DeMentronigBO.TourDetail.prototype.setPanorama = function(aPanorama){this.panorama = aPanorama;};
DeMentronigBO.TourDetail.prototype.getPanorama = function(){return this.panorama;};
DeMentronigBO.TourDetail.prototype.setDistance = function(aDistance){this.distance = aDistance;};
DeMentronigBO.TourDetail.prototype.getDistance = function(){return this.distance;};
DeMentronigBO.TourDetail.prototype.setDuration = function(aDuration){this.duration = aDuration;};
DeMentronigBO.TourDetail.prototype.getDuration = function(){return this.duration;};
DeMentronigBO.TourDetail.prototype.setDescription = function(aDescription){this.description = aDescription;};
DeMentronigBO.TourDetail.prototype.getDescription = function(){return this.description;};
DeMentronigBO.TourDetail.prototype.setMaxElevation = function(aMaxElevation){this.maxElevation = aMaxElevation;};
DeMentronigBO.TourDetail.prototype.getMaxElevation = function(){return this.maxElevation;};

/********************* UserName *************************/

DeMentronigBO.MapUser = function(){
	this.userName;
};
DeMentronigBO.MapUser.prototype.setUserName = function (aUserName){this.userName = aUserName;};
DeMentronigBO.MapUser.prototype.getUserName = function (){return this.userName;};

/********************* MapAddress *************************/
DeMentronigBO.MapAddress = function(){
	this.latLng;	
	this.elevation; 	// hoehe
	this.addressDetail = undefined;
};

// Getter & Setter
DeMentronigBO.MapAddress.prototype.setLatLng = function(theLatLng){this.latLng = theLatLng;};
DeMentronigBO.MapAddress.prototype.getLatLng = function(){return this.latLng;};

DeMentronigBO.MapAddress.prototype.setAddressDetail = function(aAddressDetail){this.addressDetail = aAddressDetail;};
DeMentronigBO.MapAddress.prototype.getAddressDetail = function(){return this.addressDetail;};

DeMentronigBO.MapAddress.prototype.setElevation = function(aElevation){this.elevation = aElevation;};
DeMentronigBO.MapAddress.prototype.getElevation = function(){return this.elevation;};

/********************* AddressDetail *************************/
DeMentronigBO.AddressDetail = function(){
	this.longAddress;
	this.street;
	this.city;
	this.country;
	this.results;
	this.info;			// frei text
	this.opening;		// oeffnungszeiten 
	
};

DeMentronigBO.AddressDetail.prototype.setLongAddress = function (theAddress){this.longAddress = theAddress;};
DeMentronigBO.AddressDetail.prototype.getLongAddress = function (){return this.longAddress ;};

DeMentronigBO.AddressDetail.prototype.setStreet = function(aStreet){this.street= aStreet;};
DeMentronigBO.AddressDetail.prototype.getStreet = function(){return this.street;};

DeMentronigBO.AddressDetail.prototype.setCity = function(aCity){this.city= aCity;};
DeMentronigBO.AddressDetail.prototype.getCity = function(){return this.city;};

DeMentronigBO.AddressDetail.prototype.setCountry = function(aCountry){this.country= aCountry;};
DeMentronigBO.AddressDetail.prototype.getCountry = function(){return this.country;};

DeMentronigBO.AddressDetail.prototype.setResults = function(aResults){this.results= aResults;};
DeMentronigBO.AddressDetail.prototype.getResults = function(){return this.results;};

DeMentronigBO.AddressDetail.prototype.setInfo = function(aInfo){this.info = aInfo;};
DeMentronigBO.AddressDetail.prototype.getInfo = function(){return this.info;};

DeMentronigBO.AddressDetail.prototype.setOpening = function(aOpening){this.opening = aOpening;};
DeMentronigBO.AddressDetail.prototype.getOpening = function(){return this.opening;};
