function Carro(fab, mod, ano, cor, placa) {
	this.fabricante = fab;
	this.modelo = mod;
	this.ano = ano;
	this.cor = cor;
	this.placa = (function(str) {
		return str.toUpperCase();
	})(placa);

	this.toString = function() {
		return this.fabricante + " " + this.modelo + " " + this.ano + " " + this.cor + " " + "(" + this.placa + ")";
	}
};

function salvarCarro(event) {

	if(document.getElementById('carro_id').value != "") {
		var carro = carros[document.getElementById('carro_id').value];

		carro.fabricante = document.getElementById('fabricante').value;
		carro.modelo = document.getElementById('modelo').value;
		carro.ano = document.getElementById('ano').value;
		carro.cor = document.getElementById('cor').value;
		carro.placa = document.getElementById('placa').value;

		var li = document.getElementById('lista').children[document.getElementById('carro_id').value];
		configuraItem(li, carro);
	}
	else {
		var novoCarro = new Carro(
			document.getElementById('fabricante').value,
			document.getElementById('modelo').value,
			document.getElementById('ano').value,
			document.getElementById('cor').value,
			document.getElementById('placa').value
			);

		carros.push(novoCarro);
		adicionaCarroLista(novoCarro);
	}

	limpaCampos();
};

function limpaCampos() {
	document.getElementById('carro_id').value = '';
	document.getElementById('fabricante').value = '';
	document.getElementById('modelo').value = '';
	document.getElementById('ano').value = '';
	document.getElementById('cor').value = '';
	document.getElementById('placa').value = '';
}

function adicionaCarroLista(carro) {
	var li = document.createElement('li');
	configuraItem(li, carro);

	var lista = document.getElementById("lista");
	lista.appendChild(li);
}

function configuraItem(li, carro) {
	li.textContent = carro.toString();
	criaSpanCarro(li, carro);
}

function criaSpanCarro(li, carro) {
	var spanDelete = document.createElement('span');
	spanDelete.classList.add("glyphicon");
	spanDelete.classList.add("glyphicon-trash");
	spanDelete.addEventListener('click', function() { removeCarro(li, carro); }, false);
	li.appendChild(spanDelete);

	var spanEdit = document.createElement('span');
	spanEdit.classList.add("glyphicon");
	spanEdit.classList.add("glyphicon-pencil");
	spanEdit.addEventListener('click', function() { editaCarro(carro); }, false);
	li.appendChild(spanEdit);
}

function editaCarro(carro) {
	var index = carros.indexOf(carro);

	document.getElementById('carro_id').value = index;
	document.getElementById('fabricante').value = carro.fabricante;
	document.getElementById('modelo').value = carro.modelo;
	document.getElementById('ano').value = carro.ano;
	document.getElementById('cor').value = carro.cor;
	document.getElementById('placa').value = carro.placa;
}

function removeCarro(li, carro) {
	if(window.confirm("Confirma a exclusão do registro?")) {
		lista.removeChild(li);
		carros.pop(carro);
	}
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

	var result = regex.exec(inputAno.value)
	if(result !== null)
		inputAno.value = result[1];
	else
		inputAno.value = '';

}

window.onload = function() {
	var btSalvarCarro = document.getElementById("salvar");
	var edtPlaca = document.getElementById("placa");
	var edtAno = document.getElementById("ano");

	edtPlaca.addEventListener('keyup', filtraPlaca, false);
	edtAno.addEventListener('keyup', filtraAno, false);

	btSalvarCarro.addEventListener('click', salvarCarro, false);
}

var carros = [];