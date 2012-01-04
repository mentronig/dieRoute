if(typeof(DeMentronigTourUi) == "undefined") var DeMentronigTourUi = {};

DeMentronigTourUi.NewMapAddressDialog = function(){
	var save = function() {
		var dialogHelper = appContext.getNewMapAddressDialogHelper();
		dialogHelper.saveMapAddress();
				
		dialogHelper.resetDialog();
		$("#newMapAddressDialog").dialog("close"); 
	};
	
	cancel = function() {
		appContext.getNewMapAddressDialogHelper().resetDialog();
		$("#newMapAddressDialog").dialog("close");
	};
	
	getAddress = function(){
		var lat = $("#geoPointLat").val();
		var lng = $("#geoPointLng").val();
		var latLng = new google.maps.LatLng(lat, lng);
		appContext.getGeoCodingHelper().getAddressForNewMappAddress(latLng);

	};
	
	dialogOpts = {
		autoOpen: false,
		buttons: {
			"Save": save,
			"Cancel": cancel,
			"GAddress" : getAddress
		}
	};

	$("#newMapAddressDialog").dialog(dialogOpts);
	
};

DeMentronigTourUi.NewMapAddressDialogHelper = function(){};
DeMentronigTourUi.NewMapAddressDialogHelper.prototype.resetDialog = function (){
	$(':input' , '#newMapAddressDialog')
	.not(':button, :submit, :reset, :hidden')
	.val('')
	.removeAttr('checked')
	.removeAttr('selected');
};

DeMentronigTourUi.NewMapAddressDialogHelper.prototype.saveMapAddress = function(){
	
	var lat = $("#geoPointLat").val();
	var lng = $("#geoPointLng").val();
	var latLng = new google.maps.LatLng(lat, lng);
	
	var tour = appContext.getTour();
	var mapAddress = tour.getMapAddress(latLng);
	if(!mapAddress){
		mapAddress = new DeMentronigBO.MapAddress();
		tour.addAddress(mapAddress);
	}
	
	mapAddress.setLatLng(latLng);
	mapAddress.setElevation($("#geoPointElevation").val());
	
	var addressDetail = mapAddress.getAddressDetail();
	if(!addressDetail){
		addressDetail = new DeMentronigBO.AddressDetail();
		mapAddress.setAddressDetail(addressDetail);
	}
		
	addressDetail.setStreet($("#geoStreet").val());
	addressDetail.setCity($("#geoCity").val());
	addressDetail.setCountry($("#geoCountry").val());
	addressDetail.setInfo($("#geoInfo").val());
	addressDetail.setOpening($("#geoOpening").val());
	
	
};