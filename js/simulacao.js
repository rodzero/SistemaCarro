var idSimulacao = 1;

function Simulacao(codCarro, cliNome, op, dtInicio, dtFim, ori, dst) {
    idSimulacao++;
    this.id = idSimulacao;
    this.carroEscolhido = codCarro;
    this.nomeCliente = cliNome;
    this.opcao = op;
    this.dateInicio = dtInicio;
    this.dateFim = dtFim;
    this.origem = ori;
    this.destino = dst;
    this.toString = function() {
        return this.nomeCliente + ' ' + this.opcao;
    };
}
