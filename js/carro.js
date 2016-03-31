function Carro(fab, mod, ano, cor, placa, valorDia, valorKm) {
    this.codigo = AppCarro.getCodigoCarro;
    this.fabricante = fab;
    this.modelo = mod;
    this.ano = ano;
    this.cor = cor;

    this.valorDia = valorDia || 150.00;
    this.valorKm = valorKm || 2.50;

    this.placa = (function(str) {
        return str.toUpperCase();
    })(placa);

    this.toString = function() {
        return this.fabricante + ' ' + this.modelo + ' ' + this.ano + ' ' + this.cor + ' ' + '(' + this.placa + ')';
    };
}
