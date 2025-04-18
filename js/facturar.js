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

 // Función para formatear la fecha con '/' después de 2 dígitos
 function formatearFecha(input) {
    let value = input.value.replace(/\D/g, ''); // Eliminar todo lo que no sea número
    if (value.length > 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4); // Agregar '/' después de 2 dígitos
    }
    input.value = value;

    // Validar la fecha de expiración
    validarFechaExpiracion(value);
  }

  // Función para validar que la fecha no esté vencida
  function validarFechaExpiracion(value) {
    const errorElement = document.getElementById('expiracion-error');
    if (value.length === 5) {
      const [mes, anio] = value.split('/').map(Number);
      const fechaActual = new Date();
      const fechaExpiracion = new Date(`20${anio}`, mes - 1); // Mes es 0-indexado en JS, así que restamos 1

      // Si la fecha es menor que la fecha actual, mostrar "X"
      if (fechaExpiracion < fechaActual) {
        errorElement.style.display = 'inline'; // Mostrar X si está vencida
      } else {
        errorElement.style.display = 'none'; // Ocultar X si no está vencida
      }
    }
  }


     // Función para formatear el número de la tarjeta con espacios cada 4 dígitos
  function formatearTarjeta(input) {
    let value = input.value.replace(/\D/g, ''); // Eliminar todo lo que no sea número
    value = value.substring(0, 16); // Limitar a 16 dígitos, longitud típica de una tarjeta

    // Formatear con espacios cada 4 dígitos
    let formattedValue = '';
    for (let i = 0; i < value.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formattedValue += ' ';
      }
      formattedValue += value[i];
    }

    input.value = formattedValue;

    // Validar si es una tarjeta de Visa o MasterCard
    validarTarjeta(formattedValue);
  }

  // Función para validar si es Visa o MasterCard
  function validarTarjeta(value) {
    const errorElement = document.getElementById('tarjeta-error');
    const validacionElement = document.getElementById('tarjeta-validacion');

    // Eliminar espacios para validar correctamente
    const cleanValue = value.replace(/\s/g, ''); // Eliminar los espacios antes de la validación

    // Expresiones regulares para validar el tipo de tarjeta
    // Visa: comienza con 4 y tiene entre 13 y 16 dígitos
    const visaRegex = /^4[0-9]{12,15}$/;

    // MasterCard: comienza con 51-55 o entre 2221-2720 y tiene 16 dígitos
    const mastercardRegex = /^(5[1-5][0-9]{14}|2[2-7][0-9]{14})$/;

    // Si la tarjeta es de Visa o MasterCard
    if (visaRegex.test(cleanValue)) {
      errorElement.style.display = 'none';
      validacionElement.style.display = 'inline';
      validacionElement.innerText = '✔ Visa';
    } else if (mastercardRegex.test(cleanValue)) {
      errorElement.style.display = 'none';
      validacionElement.style.display = 'inline';
      validacionElement.innerText = '✔ MasterCard';
    } else {
      errorElement.style.display = 'inline'; // Mostrar X si no es una tarjeta válida
      validacionElement.style.display = 'none';
    }
  }