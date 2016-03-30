window.onload = init;

function loadScript(url, callback) {
    var script = document.createElement('script');
    script.src = url;
    if (callback!==undefined) {
        script.addEventListener('load', callback);
    }
    var local = document.getElementsByTagName('script')[0].parentNode;
    local.appendChild(script);
}

function init() {
    loadScript('http://maps.google.com/maps/api/js?sensor=false');
    loadScript('js/Geocoder.js');
    loadScript('bower_components/jquery/dist/jquery.js', function() {
        loadScript('bower_components/bootstrap/dist/js/bootstrap.js');
    });
    loadScript('js/carro.js');
    loadScript('js/simulacao.js');
    loadScript('js/SimulacaoController.js');
    loadScript('js/tpc.js', function() {
        loadScript('js/CarroController.js', function() {
            loadScript('js/sistemaCarro.js', function() {
                AppCarro.init();
            });
        });
    });
}
