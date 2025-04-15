    document.addEventListener('DOMContentLoaded', () => {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  
    function agregarProducto(e) {
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


    function actualizarContador() {
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
      <h3>Total: ₡${total.toLocaleString()} CRC</h3>
      <button onclick="finalizarCompra()">Finalizar compra</button>
    `;
  }
  
  function eliminarProducto(index) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.splice(index, 1); // Elimina el producto en esa posición
  
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito(carrito);
    actualizarContadorCarrito();
  }

  function actualizarCantidad(index, precio) {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const nuevaCantidad = document.getElementById(`cantidad-${index}`).value;
  
    // Verificamos que la cantidad sea mayor a 0
    if (nuevaCantidad > 0) {
      carrito[index].cantidad = parseInt(nuevaCantidad);
  
      // Actualizamos el carrito en el localStorage
      localStorage.setItem('carrito', JSON.stringify(carrito));
  
      // Volvemos a mostrar el carrito actualizado
      mostrarCarrito(carrito);
  
      // Actualizamos el contador en el ícono del carrito
      actualizarContadorCarrito();
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
    alert("¡Gracias por tu compra! 🛍️");
    localStorage.removeItem('carrito');
    location.reload();
  }