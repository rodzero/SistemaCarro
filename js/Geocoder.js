var Geocoder = (function Geocoder() {

    var geocoder = {};

    geocoder.geocodeLatLng = function(latlng, elem) {
		var geocoder = new google.maps.Geocoder;
	  	var input = latlng;
		var latlngStr = input.split(',', 2);
		var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};

		geocoder.geocode({'location': latlng}, function(results, status) {
			if (status === google.maps.GeocoderStatus.OK) {
				if (results[1]) {
					console.log(results[1]);
					elem.value = results[1].formatted_address;
				} else {
					console.log('No results found');
				}
			} else {
				console.log('Geocoder failed due to: ' + status);
			}
		});
	};

    return geocoder;
}
)();
