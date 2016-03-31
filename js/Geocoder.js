var Geocoder = (function Geocoder() {

    var geocoder = {};

    geocoder.geocodeLatLng = function(input, elem) {
        var geocoder = new google.maps.Geocoder;
        var latlngStr = input.split(',', 2);
        var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};

        geocoder.geocode({'location': latlng}, function(results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                if (results[1]) {
                    elem.value = results[1].formatted_address;
                } else {
                    AppCarro.mostraNotificacao('Localização', 'Nenhum resultado encontrado', 'error');
                }
            } else {
                AppCarro.mostraNotificacao('Localização', 'O Geolocalizador falhou devido: \n' + status, 'error');
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
                distancia = result.routes[0].legs[0].distance.value / 1000;
            }
            else {
                AppCarro.mostraNotificacao('Simulação', 'Erro ao calcular distância', 'error');
            }

            callback(obj, distancia);
        });
    };

    return geocoder;
}
)();
