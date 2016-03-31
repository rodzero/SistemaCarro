function CarroController(elem, carros) {
    var controller = {};
    controller.lista = elem;

    controller.carregaCarros = carregaCarros;

    controller.adicionaCarroLista = function(carro) {
        var modelo = document.getElementById('carroListItem');
        var copia = modelo.content.firstElementChild.cloneNode(true);
        TPC.replaceWithData(copia, carro);

        var spanEdit = copia.getElementsByClassName('edita-carro')[0];
        spanEdit.addEventListener('click', function() { editaCarro(carro); }, false);

        var spanDelete = copia.getElementsByClassName('deleta-carro')[0];
        spanDelete.addEventListener('click', function() { removeCarro(copia, carro); }, false);

        controller.lista.appendChild(copia);
    };

    controller.salvarCarro = function(event) {
        if(document.getElementById('carro_id').value != '') {
            var carro = AppCarro.getCarro(document.getElementById('carro_id').value);

            carro.fabricante = document.getElementById('fabricante').value;
            carro.modelo = document.getElementById('modelo').value;
            carro.ano = document.getElementById('ano').value;
            carro.cor = document.getElementById('cor').value;
            carro.placa = document.getElementById('placa').value;
            carro.valorDia = document.getElementById('valor_dia').value;
            carro.valorKm = document.getElementById('valor_km').value;
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

            AppCarro.getCatalog().push(novoCarro);
            controller.adicionaCarroLista(novoCarro);
        }

        AppCarro.persisteCarros();
        AppCarro.mostraNotificacao('Cadastro de Carros', 'Carro salvo com sucesso!', 'success');
    };

    function editaCarro(carro) {
        document.getElementById('carro_id').value = carro.codigo;
        document.getElementById('fabricante').value = carro.fabricante;
        document.getElementById('modelo').value = carro.modelo;
        document.getElementById('ano').value = carro.ano;
        document.getElementById('cor').value = carro.cor;
        document.getElementById('placa').value = carro.placa;
        document.getElementById('valor_dia').value = carro.valorDia;
        document.getElementById('valor_km').value = carro.valorKm;
    }

    function removeCarro(li, carro) {
        if(window.confirm('Confirma a exclusão do registro?')) {
            remove(li);
            carros.splice(carros.indexOf(carro),1);
            AppCarro.persisteCarros();
            AppCarro.mostraNotificacao('Cadastro de Carros', 'Carro removido com sucesso', 'success');
        }
    }

    controller.atualizaItem = function(tr, carro) {
        tr.children[0].innerHTML = carro.fabricante == undefined ? '' : carro.fabricante;
        tr.children[1].innerHTML = carro.modelo == undefined ? '' : carro.modelo;
        tr.children[2].innerHTML = carro.ano == undefined ? '' : carro.ano;
        tr.children[3].innerHTML = carro.cor == undefined ? '' : carro.cor;
        tr.children[4].innerHTML = carro.placa == undefined ? '' : carro.placa;
    };

    function remove(elem) {
        controller.lista.removeChild(elem);
    }

    controller.limpaCampos = function() {
        document.getElementById('carro_id').value = '';
        document.getElementById('fabricante').value = '';
        document.getElementById('modelo').value = '';
        document.getElementById('ano').value = '';
        document.getElementById('cor').value = '';
        document.getElementById('placa').value = '';
        document.getElementById('valor_dia').value = '';
        document.getElementById('valor_km').value = '';

        document.getElementById('fabricante').focus();
    };

    function carregaCarros() {
        controller.lista.textContent = '';

        for(var i = 0 ; i < carros.length ; i++) {
            controller.adicionaCarroLista(carros[i]);
        }
    }

    function filtraPlaca(event) {
        var inputPlaca = document.getElementById('placa');
        var regex = /([A-Za-z]{1,3}[0-9]{1,4})/;

        var result = regex.exec(inputPlaca.value);

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
        if(el.value == '')
            return;

        var regex = /^([0-9]{0,5})+(\.[1-9]{0,2})?$/;

        var result = regex.exec(el.value);
        if(result !== null)
            el.value = result[0];
        else
            el.value = el.value.substring(0, el.value.length-1);

    }

    function init() {
        carregaCarros();

        var btSalvarCarro = document.getElementById('salvar');
        var btCancelar = document.getElementById('cancelar');
        var edtPlaca = document.getElementById('placa');
        var edtAno = document.getElementById('ano');
        var edtValorDia = document.getElementById('valor_dia');
        var edtValorKm = document.getElementById('valor_km');

        edtPlaca.addEventListener('keyup', filtraPlaca, false);
        edtAno.addEventListener('keyup', filtraAno, false);

        edtValorDia.addEventListener('keyup', somenteNumeros, false);
        edtValorKm.addEventListener('keyup', somenteNumeros, false);

        btSalvarCarro.addEventListener('click', controller.salvarCarro, false);
        btCancelar.addEventListener('click', controller.limpaCampos, false);

        return controller;
    }

    return init();
}
