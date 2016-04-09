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
    loadScript('js/Geocoder.min.js');
    loadScript('bower_components/jquery/dist/jquery.js', function() {
        loadScript('bower_components/bootstrap/dist/js/bootstrap.js');

        loadScript('bower_components/pnotify/dist/pnotify.js', function() {
            PNotify.prototype.options.styling = 'bootstrap3';
        });

        loadScript('js/jquery-ui/jquery-ui.js', function() {
            $('#dateInicio').datepicker({
                dateFormat: 'dd-mm-yy'
            });
            $('#dateFim').datepicker({
                dateFormat: 'dd-mm-yy'
            });
        });
    });
    loadScript('js/carro.min.js');
    loadScript('js/simulacao.min.js');
    loadScript('js/SimulacaoController.min.js');
    loadScript('js/tpc.min.js', function() {
        loadScript('js/CarroController.min.js', function() {
            loadScript('js/sistemaCarro.min.js', function() {
                AppCarro.init();
            });
        });
    });
}
