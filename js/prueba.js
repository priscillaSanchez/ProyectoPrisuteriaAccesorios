document.addEventListener('DOMContentLoaded', function() { // Inicializar EmailJS cuando el DOM esté cargado
    emailjs.init('77o0jYfFOfzNdg3Mj');
  
    const camposObligatorios = {
      identificacion: document.getElementById('identificacion'),
      email: document.querySelector('input[name="email"]'),
      prov: document.getElementById('prov'),
      can: document.getElementById('can'),
      dis: document.getElementById('dis')
    };
  
    Object.values(camposObligatorios).forEach(campo => {
      if (campo) campo.required = true;
    });
  
    const radioTarjeta = document.getElementById('tarjeta-credito');
    const radioSinpe = document.getElementById('SINPE');
    const formularioTarjeta = document.getElementById('formulario-tarjeta');
    const mensajeSinpe = document.getElementById('mensaje-sinpe');
  
    const camposTarjeta = {
      nombreTarjeta: document.getElementById('tarjeta'),
      numeroTarjeta: document.getElementById('numero-tarjeta'),
      expiracion: document.getElementById('tarjeta-expiracion'),
      cvv: document.getElementById('tarjeta-cvv')
    };
  
    function actualizarMetodoPago() {
      if (radioTarjeta.checked) {
        formularioTarjeta.style.display = 'block';
        mensajeSinpe.style.display = 'none';
        Object.values(camposTarjeta).forEach(campo => campo.required = true);
      } else if (radioSinpe.checked) {
        formularioTarjeta.style.display = 'none';
        mensajeSinpe.style.display = 'block';
        Object.values(camposTarjeta).forEach(campo => campo.required = false);
      }
    }
  
    if (radioTarjeta && radioSinpe) {
      radioTarjeta.addEventListener('change', actualizarMetodoPago);
      radioSinpe.addEventListener('change', actualizarMetodoPago);
      actualizarMetodoPago();
    }
  
    const estilos = document.createElement('style');
    estilos.textContent = `
      .campo-error {
        border: 1px solid red !important;
        background-color: #ffebee !important;
      }
    `;
    document.head.appendChild(estilos);
  
    // Función para mostrar mensaje de "Bolsa vacía"
    function mostrarMensajeBolsaVacia() {
      const contenedorCarrito = document.getElementById('contenedorCarrito') || document.querySelector('.carrito-container');
      if (contenedorCarrito) {
        contenedorCarrito.innerHTML = `
          <div class="bolsa-vacia">
            <h3>Tu bolsa está vacía</h3>
            <p>No tienes productos en tu bolsa de compras.</p>
          </div>
        `;
      }
      const contadorCarrito = document.getElementById('contador-carrito');
      if (contadorCarrito) {
        contadorCarrito.textContent = '0';
      }
    }
  
    // Al cargar la página, verificar si el carrito está vacío
    const carritoInicial = JSON.parse(localStorage.getItem('carrito')) || [];
    if (carritoInicial.length === 0) {
      mostrarMensajeBolsaVacia();
    }
  
    document.querySelector('.form').addEventListener('submit', function(event) {
      event.preventDefault();
  
      const campos = ['identificacion', 'email', 'prov', 'can', 'dis'];
      let faltanCampos = false;
  
      campos.forEach(id => {
        const campo = id === 'email' ? document.querySelector('input[name="email"]') : document.getElementById(id);
        if (!campo || !campo.value.trim()) {
          faltanCampos = true;
          campo?.classList.add('campo-error');
        } else {
          campo.classList.remove('campo-error');
        }
      });
  
      if (faltanCampos) {
        alert('Por favor completa todos los campos obligatorios (Cédula, Correo, Provincia, Cantón y Distrito)');
        return;
      }
  
      const btn = document.getElementById('button');
      const valorOriginalBtn = btn.value;
      btn.value = 'Enviando...';
  
      const identificacion = document.getElementById('identificacion').value;
      const nombres = document.getElementById('nombres').value || identificacion;
      const email = document.querySelector('input[name="email"]').value;
  
      let provincia = '', canton = '', distrito = '';
      try {
        provincia = document.getElementById('prov').options[document.getElementById('prov').selectedIndex].text;
        canton = document.getElementById('can').options[document.getElementById('can').selectedIndex].text;
        distrito = document.getElementById('dis').options[document.getElementById('dis').selectedIndex].text;
      } catch (e) {
        alert('Error al obtener datos de ubicación. Por favor selecciona Provincia, Cantón y Distrito.');
        btn.value = valorOriginalBtn;
        return;
      }
  
      const metodoPago = document.querySelector('input[name="metodo-pago"]:checked').value;
  
      const parametrosPlantilla = {
        identificacion,
        nombres,
        email,
        direccion: `${provincia}, ${canton}, ${distrito}`,
        metodo_pago: metodoPago
      };
  
      if (metodoPago === 'Tarjeta de Crédito') {
        const nombreTarjeta = document.getElementById('tarjeta').value;
        const numeroTarjeta = document.getElementById('numero-tarjeta').value;
        const expiracion = document.getElementById('tarjeta-expiracion').value;
        const cvv = document.getElementById('tarjeta-cvv').value;
  
        if (!nombreTarjeta || !numeroTarjeta || !expiracion || !cvv) {
          alert("Por favor completa todos los campos de la tarjeta de crédito");
          btn.value = valorOriginalBtn;
          return;
        }
  
        const numeroTarjetaEnmascarado = numeroTarjeta.replace(/\d(?=\d{4})/g, "*");
  
        parametrosPlantilla.tarjeta_nombre = nombreTarjeta;
        parametrosPlantilla.tarjeta_numero = numeroTarjetaEnmascarado;
        parametrosPlantilla.tarjeta_expiracion = expiracion;
      } else if (metodoPago === 'SINPE') {
        parametrosPlantilla.info_sinpe = "Pago mediante SINPE Móvil al número +506 7191 4947";
        parametrosPlantilla.instrucciones_sinpe = "Por favor enviar comprobante de pago por WhatsApp al +506 7191 4947";
      }
  
      try {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        if (carrito.length > 0) {
          parametrosPlantilla.productos = carrito.map(item => `${item.nombre} - Cantidad: ${item.cantidad} - Precio: ₡${item.precio}`).join('\n');
          parametrosPlantilla.total = '₡' + carrito.reduce((total, item) => total + (parseFloat(item.precio) * item.cantidad), 0).toFixed(2);
        } else {
          parametrosPlantilla.productos = "No se encontraron productos en el carrito";
          parametrosPlantilla.total = "₡0.00";
        }
      } catch (e) {
        parametrosPlantilla.productos = "Error al procesar los productos del carrito";
        parametrosPlantilla.total = "Error al calcular el total";
      }
  
      const serviceID = 'default_service';
      const templateID = 'template_icc09wk';
  
      emailjs.send(serviceID, templateID, parametrosPlantilla)
        .then(() => {
          btn.value = valorOriginalBtn;
          alert('¡Compra finalizada con éxito! Te hemos enviado un correo con los detalles.');
  
          localStorage.removeItem('carrito');
          mostrarMensajeBolsaVacia();
          document.querySelector('.form').reset();
          document.getElementById('formularioCompra').style.display = 'none';
          window.scrollTo({ top: 0, behavior: 'smooth' });
        })
        .catch((err) => {
          btn.value = valorOriginalBtn;
          alert('Error al procesar la compra: ' + err.message);
        });
    });
  });

  //EMAIL JS ______________________________________________________________________________________________________________
  document.getElementById("formularioCompra").addEventListener("submit", function (event) {
    event.preventDefault();
  
    // Capturar datos del formulario
    const nombre = document.getElementById("nombres").value || 'No especificado';
    const email = document.getElementById("email").value || 'No especificado';
    const provincia = document.getElementById("prov").value || 'No especificado';
    const canton = document.getElementById("can").value || 'No especificado';
    const distrito = document.getElementById("dis").value || 'No especificado';
    const metodoPago = document.querySelector('input[name="metodo-pago"]:checked')?.value || 'No especificado';
  
    // Obtener los productos del carrito (suponiendo que están en localStorage)
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    
    // Crear la tabla de productos
    const productosHTML = carrito.length > 0
      ? carrito.map(producto => `
          <tr>
            <td>${producto.nombre}</td>
            <td>${producto.cantidad}</td>
          </tr>
        `).join('')
      : '<tr><td colspan="2">No hay productos en el carrito.</td></tr>';
  
    // Crear el contenido del correo con los datos del formulario y los productos
    const contenidoCorreo = `
      <div style="font-family: Arial, sans-serif; font-size: 14px; color: #333; padding: 14px 8px; background-color: #f5f5f5;">
        <div style="max-width: 600px; margin: auto; background-color: #fff;">
          <div style="border-top: 6px solid #458500; padding: 16px;">
            <img src="cid:logo.png" alt="logo" style="height: 32px;">&nbsp;
            <span style="font-size: 16px; padding-left: 8px;"><strong>Gracias por tu orden!</strong></span>
          </div>
          <div style="padding: 16px;">
            <h3>Resumen del Pedido</h3>
            <p><strong>Nombre:</strong> ${nombre}</p>
            <p><strong>Correo:</strong> ${email}</p>
            <p><strong>Dirección:</strong> ${provincia}, ${canton}, ${distrito}</p>
            <p><strong>Método de Pago:</strong> ${metodoPago}</p>
  
            <h4 style="margin-top: 20px;">Productos:</h4>
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr>
                  <th style="padding: 8px; border: 1px solid #ddd;">Producto</th>
                  <th style="padding: 8px; border: 1px solid #ddd;">Cantidad</th>
                </tr>
              </thead>
              <tbody>
                ${productosHTML}
              </tbody>
            </table>
          </div>
        </div>
        <div style="max-width: 600px; margin: auto;">
          <p style="color: #999;">Este correo fue enviado a ${email}<br>Recibiste este correo porque realizaste una compra.</p>
        </div>
      </div>
    `;
  
    // Enviar el correo utilizando EmailJS
    emailjs.send(
      'default_service', // Reemplaza con tu service ID
      'template_icc09wk', // Reemplaza con tu template ID
      {

        from_name: nombre,
        from_email: email,
        message_html: contenidoCorreo, // Contenido generado
      },
      'YOUR_USER_ID' // Reemplaza con tu user ID
    )
    .then(function (response) {
      console.log('Correo enviado exitosamente', response);
      // Vaciar carrito si el correo se envía correctamente
      localStorage.removeItem('carrito');
      alert("Gracias por tu compra. El correo de confirmación fue enviado.");
    }, function (error) {
      console.log('Error al enviar el correo', error);
      alert("Hubo un error al enviar el correo. Intenta nuevamente.");
    });
  });