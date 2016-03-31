'use strict';
function SimulacaoController(elem, simulacoes) {
	var controller = {};

	controller.lista = elem;

	controller.opcaoDiasRb = document.getElementById('opcaoDias');
	controller.opcaoKmRb = document.getElementById('opcaoKm');
	controller.carroDd = document.getElementById('carroEscolhido');
	controller.edtNomeCliente = document.getElementById('nomeCliente');
	controller.edtOrigem = document.getElementById('origem');
	controller.edtDestino = document.getElementById('destino');
	controller.edtDataInicio = document.getElementById('dateInicio');
	controller.edtDataFim = document.getElementById('dateFim');
	controller.btnAdicionarSimulacao = document.getElementById('btnAdicionarSimulacao');

	controller.preencheCarros = preencheCarros;

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

	function init() {
		getLocalizacao();
		controller.opcaoDiasRb.addEventListener('click', atualizaViewOpcao, false);
		controller.opcaoKmRb.addEventListener('click', atualizaViewOpcao, false);
		preencheCarros();
		controller.btnAdicionarSimulacao.addEventListener('click', novaSimulacao, false);
		controller.carregaSimulacoes();

		return controller;
	};

	function novaSimulacao() {
		var codCarro = controller.carroDd.options[controller.carroDd.selectedIndex].value;
		var cliNome = controller.edtNomeCliente.value;

		var ori = controller.edtOrigem.value;
		var dst = controller.edtDestino.value;

		var op = document.querySelector('input[name="opcao"]:checked').value;

		var dtInicio = controller.edtDataInicio.value;
		var dtFim = controller.edtDataFim.value;

		var simulacao = new Simulacao(codCarro, cliNome, op, dtInicio, dtFim, ori, dst);

		AppCarro.getSimulacoes().push(simulacao);
		AppCarro.persisteSimulacoes();
	}

	controller.carregaSimulacoes = function() {
        controller.lista.textContent = '';
		var simulacoes = AppCarro.getSimulacoes();
        for(var i = 0 ; i < simulacoes.length ; i++) {
            controller.adicionaSimulacaoLista(simulacoes[i]);
        }
    }

	controller.adicionaSimulacaoLista = function(simulacao) {
        var modelo = document.getElementById('simulacaoListItem');
        var copia = modelo.content.firstElementChild.cloneNode(true);
        TPC.replaceWithData(copia, simulacao);

        var spanDelete = copia.getElementsByClassName('deleta-simulacao')[0];
        spanDelete.addEventListener('click', function() { removeSimulacao(copia, simulacao); }, false);

        controller.lista.appendChild(copia);
    };

	function removeSimulacao(li, simulacao) {
		var simulacoes = AppCarro.getSimulacoes();

		if(window.confirm('Confirma a exclusão do registro?')) {
			controller.lista.removeChild(li);
			simulacoes.splice(simulacoes.indexOf(simulacao),1);
			AppCarro.persisteSimulacoes();
		}
	}

	controller.limpaCampos = function() {
		this.edtNomeCliente.value = '';
		this.edtDataInicio.value = '';
		this.edtDataFim.value = '';
		this.edtDestino.value = '';

		this.carroDd.selectedIndex = 0;
	}

	return init();
}
