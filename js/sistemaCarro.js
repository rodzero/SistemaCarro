var AppCarro = (function SistemaCarro() {

	var app = {};
	var carros = [];
	var simulacoes = [];
	var Storage = window.localStorage;

	var carroController;
	var simulacaoController;

	function init() {
		if(Storage.getItem('carros')) {
			carros = JSON.parse(Storage.getItem('carros'));
		}
		 else
		 	carros = [];

		if(Storage.getItem('simulacoes')) {
			simulacoes = JSON.parse(Storage.getItem('simulacoes'));
		}
		 else
		 	simulacoes = [];

		var lista = document.getElementById('listaCarros');
		carroController = new CarroController(lista, carros);

		var listaSimulacoes = document.getElementById('listaSimulacoes');
		simulacaoController = new SimulacaoController(listaSimulacoes);
	}

	app.init = function() {
		init();
	};

	app.getCatalog = function() {
		return carros;
	};

	app.getSimulacoes = function() {
		return simulacoes;
	};

	app.persisteSimulacoes = function() {
		var jsonSimulacoes = JSON.stringify(simulacoes);
		Storage.setItem('simulacoes', jsonSimulacoes);
		Storage.setItem('idSimulacao', parseInt(app.getIdSimulacao())+1);

		simulacaoController.limpaCampos();
		simulacaoController.carregaSimulacoes();
	};

	app.persisteCarros = function() {
		var jsonCarros = JSON.stringify(carros);
		Storage.setItem('carros', jsonCarros);
		Storage.setItem('codigoCarro', parseInt(app.getCodigoCarro())+1);
		simulacaoController.preencheCarros();

		carroController.limpaCampos();
		carroController.carregaCarros();
	};

	app.getIdSimulacao = function() {
		if(Storage.getItem('idSimulacao'))
			return Storage.getItem('idSimulacao');
		else
			return 1;
	};

	app.getCodigoCarro = function() {
		if(Storage.getItem('codigoCarro'))
			return Storage.getItem('codigoCarro');
		else
			return 1;
	};

	app.getCarro = function(codigo) {
		for (var i = 0; i < carros.length; i++) {
			if(carros[i].codigo == codigo)
			return carros[i];
		}

		return undefined;
	};

	app.mostraNotificacao = function(titulo, texto, tipo) {
        if(!tipo)
            tipo = 'info';

		var notice = new PNotify({
			title: titulo,
			text: texto,
			type: tipo,
			animate_speed: 'fast',
			buttons: {
				closer: false,
				sticker: false
			}
		});

		notice.get().click(function() {
			notice.remove();
		});
	}

	return app;
})();
