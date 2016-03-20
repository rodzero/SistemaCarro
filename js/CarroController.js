function CarroController(elem, carros) {
    this.lista = elem;

    this.add = function(carro) {
        var modelo = document.getElementById('carroListItem');
        var copia = modelo.content.firstElementChild.cloneNode(true);
        TPC.replaceWithData(copia, carro);

        var spanEdit = copia.getElementsByClassName('edita-carro')[0];
        spanEdit.addEventListener('click', function() { editaCarro(carro); }, false);

        var spanDelete = copia.getElementsByClassName('deleta-carro')[0];
        spanDelete.addEventListener('click', function() { removeCarro(copia, carro); }, false);

    	lista.appendChild(copia);
    }

    function editaCarro(carro) {
		var index = carros.indexOf(carro);

		document.getElementById('carro_id').value = index;
		document.getElementById('fabricante').value = carro.fabricante;
		document.getElementById('modelo').value = carro.modelo;
		document.getElementById('ano').value = carro.ano;
		document.getElementById('cor').value = carro.cor;
		document.getElementById('placa').value = carro.placa;
		document.getElementById('valor_dia').value = carro.valorDia;
		document.getElementById('valor_km').value = carro.valorKm;
	}

	function removeCarro(li, carro) {
		if(window.confirm("Confirma a exclusão do registro?")) {
			remove(li);
			carros.splice(carros.indexOf(carro),1);
			AppCarro.persisteCarros();
		}
	}

    this.atualizaItem = function(tr, carro) {
        tr.children[0].innerHTML = carro.fabricante == undefined ? "" : carro.fabricante;
        tr.children[1].innerHTML = carro.modelo == undefined ? "" : carro.modelo;
        tr.children[2].innerHTML = carro.ano == undefined ? "" : carro.ano;
        tr.children[3].innerHTML = carro.cor == undefined ? "" : carro.cor;
        tr.children[4].innerHTML = carro.placa == undefined ? "" : carro.placa;
    }

    function remove(elem) {
        lista.removeChild(elem);
    }

    this.limpaCampos = function() {
    	document.getElementById('carro_id').value = '';
    	document.getElementById('fabricante').value = '';
    	document.getElementById('modelo').value = '';
    	document.getElementById('ano').value = '';
    	document.getElementById('cor').value = '';
    	document.getElementById('placa').value = '';
    	document.getElementById('valor_dia').value = '';
    	document.getElementById('valor_km').value = '';

    	document.getElementById('fabricante').focus();
    }

    for(i=0;i<carros.length;i++) {
        this.add(carros[i]);
    }
}
