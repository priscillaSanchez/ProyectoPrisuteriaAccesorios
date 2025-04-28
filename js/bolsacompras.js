    document.addEventListener('DOMContentLoaded', () => {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || []; // recuperación del carrito desde localStorage
  
    function agregarProducto(e) { //Agregar productos al carrito
      const card = e.target.closest('.product-card');
      const titulo = card.querySelector('.product-title').innerText;
      const precioTexto = card.querySelector('.product-price').innerText;
      const precio = parseInt(precioTexto.replace('₡', '').replace('.', '').replace(',', ''));
      const imagen = card.querySelector('img').src;
  
      const producto = { titulo, precio, imagen, cantidad: 1 };
  
      const index = carrito.findIndex(p => p.titulo === producto.titulo);
      if (index >= 0) {
        carrito[index].cantidad += 1;
      } else {
        carrito.push(producto);
      }
  
      localStorage.setItem('carrito', JSON.stringify(carrito));
      mostrarMensaje();
      actualizarContador();

        // Mostrar mensaje con el nombre del producto
  const mensaje = document.getElementById('mensajeExito');
  mensaje.innerHTML = `“${titulo}” agregado a la bolsa `;
  mensaje.style.display = 'block';

  // Ocultar mensaje después de 2.5 segundos
  setTimeout(() => {
    mensaje.style.display = 'none';
  }, 2500);
}


    function actualizarContador() { //Actualizar el contador de productos en el carrito
      const contador = document.getElementById('contadorCarrito');
      const totalProductos = carrito.reduce((total, p) => total + p.cantidad, 0);
      contador.innerText = totalProductos;
      contador.style.display = totalProductos > 0 ? 'inline-block' : 'none';
    }
  
    function mostrarMensaje() {
      const mensaje = document.getElementById('mensajeExito');
      if (!mensaje) return;
      mensaje.style.display = 'block';
      setTimeout(() => mensaje.style.display = 'none', 2000);
    }
  
    document.querySelectorAll('.add-to-cart').forEach(boton => {
      boton.addEventListener('click', agregarProducto);
    });
  
    actualizarContador();
  });


//Mostrar el carrito de compras

  document.addEventListener('DOMContentLoaded', () => {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const contenedor = document.getElementById('carritoContainer');
  
    if (carrito.length === 0) {
      contenedor.innerHTML = '<p>Tu bolsa está vacía </p>';
      actualizarContadorCarrito();
      return;
    }
  
    mostrarCarrito(carrito);
    actualizarContadorCarrito();
  });
  
  //Mostrar los productos en el carrito
  function mostrarCarrito(carrito) {
    const contenedor = document.getElementById('carritoContainer');
    let total = 0;
  
    contenedor.innerHTML = carrito.map((p, index) => {
      total += p.precio * p.cantidad;
      return `
        <div class="productoEnCarrito">
          <div class="productoInfo">
            <img src="${p.imagen}" alt="${p.titulo}" width="80">
            <div>
              <h4>${p.titulo}</h4>
              <p>Precio: ₡${p.precio.toLocaleString()} por unidad</p>
              <label for="cantidad-${index}">Cantidad:</label>
              <input type="number" id="cantidad-${index}" value="${p.cantidad}" min="1" onchange="actualizarCantidad(${index}, ${p.precio})">
              <p>Total por producto: ₡${(p.precio * p.cantidad).toLocaleString()}</p>
            </div>
          </div>
          <button class="eliminarBtn" onclick="eliminarProducto(${index})" title="Eliminar producto">
           ✕ 
          </button>
        </div>
        <hr>
      `;
    }).join('') + `
    <button onclick="finalizarCompra()">Finalizar compra</button>
      <h3>Total: ₡${total.toLocaleString()} CRC</h3>
    `;
  }
  
  function eliminarProducto(index) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.splice(index, 1); // Elimina el producto en esa posición
  
    const contenedor = document.getElementById('carritoContainer'); // Definimos el contenedor
  
    localStorage.setItem('carrito', JSON.stringify(carrito));
  
    // Verificamos si el carrito quedó vacío después de eliminar
    if (carrito.length === 0) {
      contenedor.innerHTML = '<p>Tu bolsa está vacía </p>';
    } else {
      mostrarCarrito(carrito);
    }
  
    // Actualizamos el contador del carrito
    actualizarContadorCarrito();
  
    // Cerramos el formulario si está abierto
    const formularioCompra = document.getElementById('formularioCompra');
    if (formularioCompra.style.display === 'block') {
      formularioCompra.style.display = 'none'; // Cierra el formulario
    }
  }
  

  function actualizarCantidad(index, precio) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const nuevaCantidad = parseInt(document.getElementById(`cantidad-${index}`).value);
    const contenedor = document.getElementById('carritoContainer'); // Aseguramos acceso al contenedor
  
    if (nuevaCantidad > 0) {
      carrito[index].cantidad = nuevaCantidad;
    } else {
      // Si la cantidad es 0 o menor, se elimina el producto
      carrito.splice(index, 1);
    }
  
    localStorage.setItem('carrito', JSON.stringify(carrito));
  
    // Verificamos si el carrito quedó vacío después de eliminar
    if (carrito.length === 0) {
      contenedor.innerHTML = '<p>Tu bolsa está vacía </p>';
    } else {
      mostrarCarrito(carrito);
    }
  
    actualizarContadorCarrito();

      // Cerramos el formulario si está abierto
      const formularioCompra = document.getElementById('formularioCompra');
      if (formularioCompra.style.display === 'block') {
        formularioCompra.style.display = 'none'; // Cierra el formulario
      }
  }

  function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const contadorCarrito = document.getElementById('contadorCarrito');
  
    // Contamos la cantidad total de productos en el carrito
    const totalProductos = carrito.reduce((total, producto) => total + producto.cantidad, 0);
  
    // Actualizamos el contador en el ícono del carrito
    if (contadorCarrito) {
      contadorCarrito.textContent = totalProductos;
    }
  }
  
  function finalizarCompra() {
    // Mostrar el formulario de compra
    document.getElementById('formularioCompra').style.display = 'block';
    // Hacer scroll suave hasta el formulario
    document.getElementById('formularioCompra').scrollIntoView({ behavior: 'smooth' });
  
    // Opcionalmente, si quieres ocultar el carrito después de mostrar el formulario
    document.getElementById('carritoContainer').style.display = 'none';
  }
  //-------------------------------------------------------------------------------------------------------------------EMAILJS

  document.addEventListener('DOMContentLoaded', function () {
    const radioTarjeta = document.getElementById('tarjeta-credito');
    const radioSinpe = document.getElementById('SINPE');
  
    const formularioTarjeta = document.getElementById('formulario-tarjeta');
    const mensajeSinpe = document.getElementById('mensaje-sinpe');
    const formularioCompra = document.getElementById('formularioCompra');
  
    // Función para actualizar la visibilidad de los campos según el método de pago
    function actualizarMetodoPago() {
      if (radioTarjeta.checked) {
        formularioTarjeta.style.display = 'block';
        mensajeSinpe.style.display = 'none';
        
        // Hacer obligatorios los campos de tarjeta
        document.getElementById('tarjeta').required = true;
        document.getElementById('numero-tarjeta').required = true;
        document.getElementById('tarjeta-expiracion').required = true;
        document.getElementById('tarjeta-cvv').required = true;
      } else if (radioSinpe.checked) {
        formularioTarjeta.style.display = 'none';
        mensajeSinpe.style.display = 'block';
        
        // Quitar obligatoriedad de los campos de tarjeta
        document.getElementById('tarjeta').required = false;
        document.getElementById('numero-tarjeta').required = false;
        document.getElementById('tarjeta-expiracion').required = false;
        document.getElementById('tarjeta-cvv').required = false;
      }
    }
  
    // Escuchar los cambios de los radio buttons para el método de pago
    radioTarjeta.addEventListener('change', actualizarMetodoPago);
    radioSinpe.addEventListener('change', actualizarMetodoPago);
  
    // Ejecutar la función al cargar la página
    actualizarMetodoPago();
    
    // Función para vaciar el carrito y actualizar la UI
    function vaciarCarritoYActualizarUI() {
      // Vaciar el carrito en localStorage
      localStorage.removeItem('carrito');
      
      // Ocultar el formulario de compra
      formularioCompra.style.display = 'none';
      
      // Reiniciar el formulario
      formularioCompra.reset();
      
      // Obtener el contenedor del carrito y actualizarlo
      const contenedorCarrito = document.getElementById('contenedorCarrito') || 
                               document.querySelector('.carrito-container') || 
                               document.querySelector('.cart-items');
      
      if (contenedorCarrito) {
        contenedorCarrito.innerHTML = '<p>No hay productos en el carrito</p>';
      }
      
      // Actualizar cualquier contador de carrito si existe
      const contadorCarrito = document.getElementById('contador-carrito') || 
                             document.querySelector('.cart-count');
      if (contadorCarrito) {
        contadorCarrito.textContent = '0';
      }
      
      // Actualizar el total si existe
      const totalCarrito = document.getElementById('total-carrito') || 
                          document.querySelector('.cart-total');
      if (totalCarrito) {
        totalCarrito.textContent = '₡0.00';
      }
      
      // Si tienes un elemento que muestra/oculta dependiendo de si hay productos
      const carritoVacio = document.querySelector('.carrito-vacio');
      const carritoLleno = document.querySelector('.carrito-lleno');
      
      if (carritoVacio) carritoVacio.style.display = 'block';
      if (carritoLleno) carritoLleno.style.display = 'none';
      
      // Si hay un botón de finalizar compra, ocultarlo
      const btnFinalizarCompra = document.getElementById('btnFinalizarCompra');
      if (btnFinalizarCompra) btnFinalizarCompra.style.display = 'none';
    }
    
    // Enviar el correo de confirmación al momento de hacer submit
    formularioCompra.addEventListener('submit', function (event) {
      event.preventDefault();
      
      const nombre = document.getElementById("nombres").value || 'No especificado';
      const email = document.querySelector('input[name="email"]').value || 'No especificado';
    
      const prov = document.getElementById("prov");
      const can = document.getElementById("can");
      const dis = document.getElementById("dis");
      const provincia = prov.options[prov.selectedIndex]?.text || 'No especificado';
      const canton = can.options[can.selectedIndex]?.text || 'No especificado';
      const distrito = dis.options[dis.selectedIndex]?.text || 'No especificado';
      const metodoPago = document.querySelector('input[name="metodo-pago"]:checked')?.value || 'No especificado';
  
      // Obtener los productos del carrito
      let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
      const productos_comprados = carrito.length > 0
        ? carrito.map(producto => `${producto.titulo || producto.nombre} - Cantidad: ${producto.cantidad} - Precio: ₡${producto.precio}`).join('\n')
        : "No hay productos en el carrito.";
  
      const total_compra = carrito.reduce((acc, p) => acc + (p.precio * p.cantidad), 0).toLocaleString();
  
      // Crear parámetros básicos para la plantilla
      const templateParams = {
        nombre_cliente: nombre,
        correo_cliente: email,
        direccion_completa: `${provincia}, ${canton}, ${distrito}`,
        metodo_pago: metodoPago,
        productos_comprados: productos_comprados,
        total_compra: total_compra
      };
  
      // Si el método es tarjeta, añadir información de tarjeta
      if (metodoPago === "Tarjeta de Crédito") {
        const nombreTarjeta = document.getElementById('tarjeta').value;
        const numeroTarjeta = document.getElementById('numero-tarjeta').value;
        const expiracion = document.getElementById('tarjeta-expiracion').value;
        
        // Enmascarar el número de tarjeta por seguridad
        const numeroTarjetaEnmascarado = numeroTarjeta.replace(/\d(?=\d{4})/g, "*");
        
        templateParams.tarjeta_nombre = nombreTarjeta;
        templateParams.tarjeta_numero = numeroTarjetaEnmascarado;
        templateParams.tarjeta_expiracion = expiracion;
      }
      
      // Botón de envío
      const btnEnviar = document.getElementById('button');
      const valorOriginalBtn = btnEnviar ? btnEnviar.value : 'Enviar';
      if (btnEnviar) btnEnviar.value = 'Enviando...';
      
      // Enviar el email
      emailjs.send(
        'default_service',
        'template_icc09wk',
        templateParams,
        '77o0jYfFOfzNdg3Mj'
      ).then(function (response) {
        console.log('Correo enviado exitosamente', response);
        
        // Mostrar mensaje de éxito
        alert("¡Gracias por tu compra! Te hemos enviado un correo con los detalles.");
        
        // Vaciar carrito y actualizar UI
        vaciarCarritoYActualizarUI();
        
        // Opcional: recargar la página o redirigir después de un breve retraso
        setTimeout(() => {
          window.location.href = window.location.pathname; // Recargar sin parámetros de URL
        }, 1000);
        
      }, function (error) {
        console.log('Error al enviar el correo', error);
        alert("Hubo un error al procesar tu compra. Por favor intenta nuevamente.");
        
        // Restablecer el botón
        if (btnEnviar) btnEnviar.value = valorOriginalBtn;
      });
    });
  });