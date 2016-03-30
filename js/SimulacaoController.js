function SimulacaoController(elem, simulacoes) {
	this.lista = elem;
	init();
	this.preencheCarros = preencheCarros;

	function init() {
		getLocalizacao();

		var opcaoDiasRb = document.getElementById('opcaoDias');
		var opcaoKmRb = document.getElementById('opcaoKm');

		addEventListener('click', atualizaViewOpcao, opcaoDiasRb);
		addEventListener('click', atualizaViewOpcao, opcaoKmRb);

		var carroDd = document.getElementById('carroEscolhido');
		preencheCarros();
	};

	function preencheCarros() {
		var carros = AppCarro.getCatalog();
		document.getElementById('carroEscolhido').textContent = '';

		var opcaoVazia = document.createElement('option');
		document.getElementById('carroEscolhido').appendChild(opcaoVazia);

		for (var i = 0; i < carros.length; i++) {
			var modelo = document.getElementById('carroOpcaoItem');
	        var copia = modelo.content.firstElementChild.cloneNode(true);
			copia.value = carros[i].codigo;
	        TPC.replaceWithData(copia, carros[i]);
			document.getElementById('carroEscolhido').appendChild(copia);
		}
	}

	function atualizaViewOpcao() {
		if(document.querySelector('input[name="opcao"]:checked').value == 'dias') {
			document.getElementById('opcoesPeriodo').hidden = false;
			document.getElementById('opcoesKm').hidden = true;
		}
		else {
			document.getElementById('opcoesPeriodo').hidden = true;
			document.getElementById('opcoesKm').hidden = false;
		}
	}

	function getLocalizacao() {
		var successCallback = function(position){
		    var origem = document.getElementById('origem');

			Geocoder.geocodeLatLng(position.coords.latitude + ',' + position.coords.longitude, origem);
		}

		var errorCallback = function(error){
		    var errorMessage = 'Unknown error';
		    switch(error.code) {
		      case 1:
		        errorMessage = 'Permission denied';
		        break;
		      case 2:
		        errorMessage = 'Position unavailable';
		        break;
		      case 3:
		        errorMessage = 'Timeout';
		        break;
		    }
		    console.log(errorMessage);
		};

		var options = {
		    enableHighAccuracy: true,
		    timeout: 1000,
		    maximumAge: 0
		};

		navigator.geolocation.getCurrentPosition(successCallback,errorCallback,options);
	}
}
