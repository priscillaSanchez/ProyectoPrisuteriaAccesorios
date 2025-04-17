const btn = document.getElementById('botons');

document.getElementById('form')
 .addEventListener('submit', function(event) {
   event.preventDefault();

   btn.value = 'Sending...';

   const serviceID = 'default_service';
   const templateID = 'template_yatizfw';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Send Email';
      alert('Sent!');
    }, (err) => {
      btn.value = 'Send Email';
      alert(JSON.stringify(err));
    });
});


function finalizarCompra() {
  // Limpiar carrito
  localStorage.removeItem('carrito');

  // Mostrar el formulario
  document.getElementById('formularioCompra').style.display = 'block';

  // Hacer scroll suave hasta el formulario
  document.getElementById('formularioCompra').scrollIntoView({ behavior: 'smooth' });
}


function buscarContribuyente() {
  const identificacion = document.getElementById('identificacion').value.trim();

  if (!identificacion) {
    alert('Por favor ingresa una identificación');
    return;
  }

  fetch(`https://api.hacienda.go.cr/fe/ae?identificacion=${identificacion}`)
    .then(res => {
      if (!res.ok) throw new Error('No se encontró el contribuyente');
      return res.json();
    })
    .then(data => {
      if (data.nombre) {
        document.getElementById('nombres').value = data.nombre;
      } else {
        alert('No se encontró el nombre en la respuesta.');
      }
    })
    .catch(err => {
      console.error(err);
      alert('Error al consultar la API de Hacienda');
    });
}

//** */
  
// https://programando.paginasweb.cr/2016/04/29/lista-de-provincias-cantones-y-distritos-de-costa-rica-en-formato-json/

// 1. Cargar de Provincias
// Cuando se cargue la pantalla el “Select” de provincias deberá aparecer cargado con los datos de las 
// provincias mediante el consumo del api respectivo.
// ----------------------- provincias -----------------------
// consola // js
function cargarProvincias() {
  fetch('https://raw.githubusercontent.com/lateraluz/Datos/master/distritos.json')
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
      'https://raw.githubusercontent.com/lateraluz/Datos/master/distritos.json',
      true
  );
  xhttp.send();
}


/***/
window.onload = cargaInicial();

function cargaInicial() {
    cargarProvincias();
}


// Este proceso se ejecuta cuando se dé click en el botón “Registrar” y conlleva los siguientes pasos:
// Se debe tomar los valores seleccionados en los “Select”; Cantidad, Producto y Tamaño.
var cmbProvincia = document.getElementById('prov');
var cmbCanton = document.getElementById('can');
var cmbDistrito = document.getElementById('dis');


// Cargar Tabla de Producto Seleccionado, los registros en “tbody” de la tabla cuyo id es "datos" deben cargarse de 
// forma dinámica y deben contener los siguientes datos:
// Cantidad: cantidad seleccionada.
// Producto: Nombre del producto seleccionado.
// Tamaño: tamaño seleccionado.
// Precio: precio del producto seleccionado.
// Total: monto total de la línea (TL).
// Debe aparecer en pantalla de la siguiente forma:


function registrarProducto() {
    var cantidad = slcCantidad.value;
    var producto = slcProducto.value;
    var tamanio = slcTamanio.value;
    var precio = obtenerPrecio(producto);
    var total = cantidad * precio;

    if (tamanio == 'Medium') {
        total = total + total * 0.1;
    } else if (tamanio == 'Large') {
        total = total + total * 0.15;
    }

    precioTotal = precioTotal + total;

    var fila = `<tr>
                    <td>${cantidad}</td>
                    <td>${slcProducto.options[slcProducto.selectedIndex].text
        }</td>
                    <td>${tamanio}</td>
                    <td>${precio}</td>
                    <td>${total}</td>
                </tr>`;
    $('#datos').append(fila);

    // Calcular el total a Pagar: El total a pagar se calcula cada vez que se registra un producto y corresponde 
    // a la sumatoria de todos los montos de total de la línea (TL) + 10000 de transporte en caso de haber seleccionado: 
    // Puntarenas, Guanacaste o Limón.
    // o Este resultado deberá mostrarlo en la caja de texto cuyo id es txtTotal.

    if (cont == 0) {
        if (
            cmbProvincia.value == '5' ||
            cmbProvincia.value == '6' ||
            cmbProvincia.value == '7'
        ) {
            precioTotal = precioTotal + 10000;
            cont++;
        }
    }

    txtTotal.value = precioTotal;
}



// 1. Cargar de Provincias
// Cuando se cargue la pantalla el “Select” de provincias deberá aparecer cargado con los datos de las 
// provincias mediante el consumo del api respectivo.
// ----------------------- provincias -----------------------
// consola // js
function cargarProvincias() {
    fetch('hhttps://raw.githubusercontent.com/lateraluz/Datos/master/distritos.json')
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
        'https://raw.githubusercontent.com/lateraluz/Datos/master/distritos.json',
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
        'https://raw.githubusercontent.com/lateraluz/Datos/master/distritos.json',
        true
    );
    xhttp.send();
}
cargarDistritos();

// CARGAR DEPENDIENDO DE LA PROVINCIA
function cargarProvincias() {
    fetch('https://raw.githubusercontent.com/lateraluz/Datos/master/distritos.json')
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

