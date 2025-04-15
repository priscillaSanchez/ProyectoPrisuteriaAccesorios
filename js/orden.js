const btn = document.getElementById('button');

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
let provincias = [];
let cantones = [];
let distritos = [];

document.addEventListener('DOMContentLoaded', async () => {
  await cargarDatos();
  llenarProvincias();
});

async function cargarDatos() {
  const [prov, cant, dist] = await Promise.all([
    fetch('json/provincias.json')
    .then(res => res.json())
    .then(data => {
      console.log('Provincias:', data);
    }),
    fetch('json/cantones.json').then(r => r.json()),
    fetch('json/distritos.json').then(r => r.json()),
  ]);

  provincias = prov;
  cantones = cant;
  distritos = dist;
}

function llenarProvincias() {
  const select = document.getElementById('provincia');
  provincias.forEach(p => {
    const option = document.createElement('option');
    option.value = p.codigo;
    option.textContent = p.nombre;
    select.appendChild(option);
  });

  select.addEventListener('change', () => {
    llenarCantones(select.value);
  });
}

function llenarCantones(provinciaCodigo) {
  const selectCanton = document.getElementById('canton');
  const selectDistrito = document.getElementById('distrito');
  selectCanton.innerHTML = '<option value="">Seleccione un cantón</option>';
  selectDistrito.innerHTML = '<option value="">Seleccione un distrito</option>';
  selectCanton.disabled = false;
  selectDistrito.disabled = true;

  const cantonesFiltrados = cantones.filter(c => c.provincia === provinciaCodigo);
  cantonesFiltrados.forEach(c => {
    const option = document.createElement('option');
    option.value = c.codigo;
    option.textContent = c.nombre;
    selectCanton.appendChild(option);
  });

  selectCanton.addEventListener('change', () => {
    llenarDistritos(provinciaCodigo, selectCanton.value);
  });
}

function llenarDistritos(provinciaCodigo, cantonCodigo) {
  const selectDistrito = document.getElementById('distrito');
  selectDistrito.innerHTML = '<option value="">Seleccione un distrito</option>';
  selectDistrito.disabled = false;

  const distritosFiltrados = distritos.filter(d => d.provincia === provinciaCodigo && d.canton === cantonCodigo);
  distritosFiltrados.forEach(d => {
    const option = document.createElement('option');
    option.value = d.codigo;
    option.textContent = d.nombre;
    selectDistrito.appendChild(option);
  });
}


/** */
async function obtenerCantones() {
  const url = "https://raw.githubusercontent.com/lateraluz/Datos/master/cantones.json";
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Error al obtener cantones: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data || [];
  } catch (error) {
    console.error(error.message);
    return [];
  }
}

// Ejemplo de uso:
obtenerCantones().then(cantones => {
  console.log(cantones);
}).catch(error => {
  console.error("Hubo un error al cargar los cantones:", error);
});
