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

    geocoder.getDistance = function(obj, origem, destino, callback) {
        var directionsService = new google.maps.DirectionsService();

        var request = {
            origin:origem,
            destination:destino,
            travelMode: google.maps.TravelMode.DRIVING
        };

        directionsService.route(request, function(result, status) {
            var distancia = null;
            if (status == google.maps.DirectionsStatus.OK) {
                console.log(result.routes[0].legs[0].distance.value / 1000);
                distancia = result.routes[0].legs[0].distance.value / 1000;
            }

            callback(obj, distancia);
        });
    };

    return geocoder;
}
)();
