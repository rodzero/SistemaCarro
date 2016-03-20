var AppCarro = (function SistemaCarro() {

	var app = {};
	var carroController;
	var carros = [];
	var Storage = window.sessionStorage;

	function salvarCarro(event) {
		if(document.getElementById('carro_id').value != "") {
			var carro = carros[document.getElementById('carro_id').value];

			carro.fabricante = document.getElementById('fabricante').value;
			carro.modelo = document.getElementById('modelo').value;
			carro.ano = document.getElementById('ano').value;
			carro.cor = document.getElementById('cor').value;
			carro.placa = document.getElementById('placa').value;
			carro.valorDia = document.getElementById('valor_dia').value;
			carro.valorKm = document.getElementById('valor_km').value;

			var li = document.getElementById('lista').children[document.getElementById('carro_id').value];
			carroController.atualizaItem(li, carro);
		}
		else {
			var novoCarro = new Carro(
				document.getElementById('fabricante').value,
				document.getElementById('modelo').value,
				document.getElementById('ano').value,
				document.getElementById('cor').value,
				document.getElementById('placa').value,
				document.getElementById('valor_dia').value,
				document.getElementById('valor_km').value
				);

			carros.push(novoCarro);
			carroController.add(novoCarro);
		}

		app.persisteCarros();
		carroController.limpaCampos();
	};

	app.persisteCarros = function() {
		var jsonCarros = JSON.stringify(carros);
		Storage.setItem("carros", jsonCarros);
	}

	function filtraPlaca(event) {
		var inputPlaca = document.getElementById('placa');
		var regex = /([A-Za-z]{1,3}[0-9]{1,4})/;

		var result = regex.exec(inputPlaca.value)

		if(result !== null || inputPlaca.value.length <= 7)
			inputPlaca.value = result[1].toUpperCase();
		else
			inputPlaca.value = '';

	}

	function filtraAno(event) {
		var inputAno = document.getElementById('ano');
		var regex = /([0-9]{1,4})/;

		var result = regex.exec(inputAno.value);
		if(result !== null)
			inputAno.value = result[1];
		else
			inputAno.value = '';
	}

	function somenteNumeros(event) {
		var el = event.currentTarget;
		if(el.value == "")
			return;

		var regex = /^([0-9]{0,5})+(\.[1-9]{0,2})?$/;

		var result = regex.exec(el.value);
		if(result !== null)
			el.value = result[0];
		else
			el.value = el.value.substring(0, el.value.length-1);

	}

	function init() {

		if(sessionStorage.getItem("carros"))
			carros = JSON.parse(sessionStorage.getItem("carros"));
		 else
		 	carros = [];

		var btSalvarCarro = document.getElementById("salvar");
		var btCancelar = document.getElementById("cancelar");
		var edtPlaca = document.getElementById("placa");
		var edtAno = document.getElementById("ano");
		var edtValorDia = document.getElementById("valor_dia");
		var edtValorKm = document.getElementById("valor_km");

		var lista = document.getElementById("lista");

		carroController = new CarroController(lista, carros);

		edtPlaca.addEventListener('keyup', filtraPlaca, false);
		edtAno.addEventListener('keyup', filtraAno, false);

		edtValorDia.addEventListener('keyup', somenteNumeros, false);
		edtValorKm.addEventListener('keyup', somenteNumeros, false);

		btSalvarCarro.addEventListener('click', salvarCarro, false);
		btCancelar.addEventListener('click', carroController.limpaCampos, false);
	}

	app.init = function() {
		console.log("AppCarro.init");
		init();
	};
	app.getCatalog = function() {
		console.log("AppCarro.getCatalog");
		return carros;
	};

	return app;
})();
