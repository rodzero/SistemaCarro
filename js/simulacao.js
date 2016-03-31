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
            return AppCarro.getCarro(s.carroEscolhido).valorDia * (s.dateFim - s.dateInicio);
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
