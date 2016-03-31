function Simulacao(codCarro, cliNome, op, dtInicio, dtFim, ori, dst) {
    var simulacao = {};

    idSimulacao = AppCarro.getIdSimulacao();
    simulacao.id = idSimulacao;
    simulacao.carroEscolhido = codCarro;
    simulacao.nomeCliente = cliNome;
    simulacao.opcao = op;
    simulacao.dateInicio = dtInicio;
    simulacao.dateFim = dtFim;
    simulacao.origem = ori;
    simulacao.destino = dst;
    simulacao.toString = function() {
        return simulacao.nomeCliente + ' ' + simulacao.opcao;
    };

    simulacao.valor = (function(s) {
        if(s.opcao == 'km') {
            Geocoder.getDistance(s, s.origem, s.destino, setaValor);
            return 'Calculando...';
        }
        else {
            var dInicio = new Date(s.dateInicio.split('-')[2], s.dateInicio.split('-')[1], s.dateInicio.split('-')[0], 0, 0, 0);
            var dFim = new Date(s.dateFim.split('-')[2], s.dateFim.split('-')[1], s.dateFim.split('-')[0], 0, 0, 0);

            var timeDiff = Math.abs(dFim.getTime() - dInicio.getTime());
            var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

            return AppCarro.getCarro(s.carroEscolhido).valorDia * diffDays;
        }
    })(simulacao);

    simulacao.carro = (function(codCarro) {
        var carro = AppCarro.getCarro(codCarro);
        return carro.fabricante + ' - ' + carro.placa;
    })(simulacao.carroEscolhido);

    function setaValor(s, distancia) {
        var valorF = distancia * AppCarro.getCarro(s.carroEscolhido).valorKm;
        s.valor = parseFloat(valorF).toFixed(2);
        AppCarro.persisteSimulacoes();
    }

    return simulacao;
}
