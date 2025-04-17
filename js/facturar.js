window.onload = cargaInicial();

function cargaInicial() {
    cargarProvincias();
}

var cmbProvincia = document.getElementById('prov');
var cmbCanton = document.getElementById('can');
var cmbDistrito = document.getElementById('dis');


// https://programando.paginasweb.cr/2016/04/29/lista-de-provincias-cantones-y-distritos-de-costa-rica-en-formato-json/

// 1. Cargar de Provincias
// Cuando se cargue la pantalla el “Select” de provincias deberá aparecer cargado con los datos de las 
// provincias mediante el consumo del api respectivo.
// ----------------------- provincias -----------------------
// consola // js
function cargarProvincias() {
    fetch('https://ubicaciones.paginasweb.cr/provincias.json')
        .then((res) => res.json())
        .then((data) => {
            var obj = data;
            var keys = Object.keys(obj);

            cmbProvincia.innerHTML = '';

            for (var i = 0; i < keys.length; i++) {
                var option = $(
                    '<option value="' + keys[i] + '">' + obj[keys[i]] + '</option>'
                );
                $('#prov').append(option);
            }

            cambioSelect('P');
        })
        .catch((err) => {
            console.log(err);
        });
}
cargarProvincias();


// 2. Cargar de Cantones
// Cada vez que se seleccione una provincia se deberá cargar los cantones respectivos a la provincia seleccionada, 
// mediante el consumo del api respectivo.
// ----------------------- Cantones -----------------------
// consola // js
function cargarCantones() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var cantones = JSON.parse(this.responseText);
            console.log(cantones);
        }
    };
    xhttp.open(
        'GET',
        'https://ubicaciones.paginasweb.cr/provincia/1/cantones.json',
        true
    );
    xhttp.send();
}
cargarCantones();


// Cargar de Distritos
// Cada vez que se seleccione un cantón se deberá cargar los distritos respectivos al cantón y provincia seleccionada,
// mediante el consumo del api respectivo.
// ----------------------- Distritos -----------------------
// consola // js
function cargarDistritos() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var distritos = JSON.parse(this.responseText);
            console.log(distritos);
        }
    };
    xhttp.open(
        'GET',
        'https://ubicaciones.paginasweb.cr/provincia/1/canton/1/distritos.json',
        true
    );
    xhttp.send();
}
cargarDistritos();

// CARGAR DEPENDIENDO DE LA PROVINCIA
function cargarProvincias() {
    fetch('https://ubicaciones.paginasweb.cr/provincias.json')
        .then((res) => res.json())
        .then((data) => {
            var obj = data;
            var keys = Object.keys(obj);

            cmbProvincia.innerHTML = '';

            for (var i = 0; i < keys.length; i++) {
                var option = $(
                    '<option value="' + keys[i] + '">' + obj[keys[i]] + '</option>'
                );
                $('#prov').append(option);
            }

            cambioSelect('P');
        })
        .catch((err) => {
            console.log(err);
        });
}

function cambioSelect(p) {
    if (p == 'P') {
        fetch(
            `https://ubicaciones.paginasweb.cr/provincia/${cmbProvincia.value}/cantones.json`
        )
            .then((res) => res.json())
            .then((data) => {
                var obj = data;
                var keys = Object.keys(obj);

                cmbCanton.innerHTML = '';

                for (var i = 0; i < keys.length; i++) {
                    var option = $(
                        '<option value="' + keys[i] + '">' + obj[keys[i]] + '</option>'
                    );
                    $('#can').append(option);
                }
                cambioSelect('C');
            })
            .catch((err) => {
                console.log(err);
            });
    } else if (p == 'C') {
        fetch(
            `https://ubicaciones.paginasweb.cr/provincia/${cmbProvincia.value}/canton/${cmbCanton.value}/distritos.json`
        )
            .then((res) => res.json())
            .then((data) => {
                var obj = data;
                var keys = Object.keys(obj);

                cmbDistrito.innerHTML = '';

                for (var i = 0; i < keys.length; i++) {
                    var option = $(
                        '<option value="' + keys[i] + '">' + obj[keys[i]] + '</option>'
                    );
                    $('#dis').append(option);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

