// Array de productos
const productos = [
    { nombre: 'almacenamiento dinamico', precio: 100, stock: 2 },
    { nombre: 'almacenaje movil', precio: 120, stock: 1 },
    { nombre: 'estanterias push-back', precio: 80, stock: 2 },
    { nombre: 'estanterias compactas', precio: 90, stock: 1 }
  ];
  
  // Carrito de compras
  let carrito = [];
  let totalCarrito = 0;
  let pagoProcesado = false; // Variable para evitar pagos múltiples
  
  // Función para cargar el carrito desde localStorage al cargar la página
  document.addEventListener('DOMContentLoaded', function () {
    cargarCarritoDesdeLocalStorage();
    actualizarCarrito();
  });
  
  // Función para cargar el carrito desde localStorage
  function cargarCarritoDesdeLocalStorage() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
      carrito = JSON.parse(carritoGuardado);
      // Actualizar el stock de los productos según el carrito cargado
      actualizarStockDesdeCarrito();
    }
  }
  
  // Función para actualizar el stock de los productos según el carrito
  function actualizarStockDesdeCarrito() {
    carrito.forEach(item => {
      const producto = productos.find(p => p.nombre === item.nombre);
      if (producto && producto.stock > 0) {
        producto.stock--;
      }
    });
  }
  
  // Función para guardar el carrito en localStorage
  function guardarCarritoEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }
  
  // Función para comprar un producto
  function comprar(nombre, precio) {
    const producto = productos.find(p => p.nombre === nombre);
  
    if (producto && producto.stock > 0) {
      producto.stock--;
  
      const item = {
        nombre: producto.nombre,
        precio: producto.precio
      };
  
      carrito.push(item);
      totalCarrito += producto.precio;
  
      actualizarCarrito();
      console.log(`Producto "${producto.nombre}" agregado al carrito.`);
  
      // Guardar el carrito actualizado en localStorage
      guardarCarritoEnLocalStorage();
    } else if (!producto) {
      console.error('Producto no encontrado.');
    } else if (producto.stock === 0) {
      console.error(`Producto "${producto.nombre}" sin stock.`);
      alert(`El producto "${producto.nombre}" está agotado.`);
    }
  }
  
  // Función para aplicar el 21% de IVA a la compra
  const aplicarIVA = () => {
    const iva = totalCarrito * 0.21;
    totalCarrito += iva;
    console.log(`IVA (21%) aplicado al total del carrito: $${iva.toFixed(2)}`);
    actualizarCarrito();
  };
  
  // Función para vaciar el carrito
  const vaciarCarrito = () => {
    carrito.forEach(item => {
      const producto = productos.find(p => p.nombre === item.nombre);
  
      if (producto) {
        producto.stock++;
      }
    });
  
    carrito = [];
    totalCarrito = 0;
    actualizarCarrito();
    console.log('Carrito vaciado.');
  
    // Guardar el carrito vacío en localStorage
    guardarCarritoEnLocalStorage();
  };
  
  // Función para eliminar un producto del carrito
  const eliminarProducto = nombre => {
    const index = carrito.findIndex(item => item.nombre === nombre);
  
    if (index !== -1) {
      const producto = productos.find(p => p.nombre === nombre);
  
      if (producto) {
        producto.stock++;
      }
  
      carrito.splice(index, 1);
      actualizarCarrito();
      console.log(`Producto "${nombre}" eliminado del carrito.`);
  
      // Guardar el carrito actualizado en localStorage
      guardarCarritoEnLocalStorage();
    } else {
      console.error('Producto no encontrado en el carrito.');
    }
  };
  
  // Función para actualizar la visualización del carrito
  const actualizarCarrito = () => {
    const listaCarrito = document.getElementById('lista-carrito');
    const totalCarritoElement = document.getElementById('total-carrito');
    const totalCarritoSinIVAElement = document.getElementById('total-sin-iva');
    const pagarButton = document.getElementById('pagar-button');
  
    if (listaCarrito && totalCarritoElement && totalCarritoSinIVAElement) {
      listaCarrito.innerHTML = '';
  
      carrito.forEach(item => {
        const listItem = document.createElement('li');
        const textElement = document.createTextNode(`${item.nombre} - $${item.precio}`);
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.addEventListener('click', () => eliminarProducto(item.nombre));
  
        listItem.appendChild(textElement);
        listItem.appendChild(deleteButton);
        listaCarrito.appendChild(listItem);
      });
  
      totalCarritoElement.textContent = `$${totalCarrito.toFixed(2)}`;
  
      const totalSinIVA = totalCarrito / 1.21;
      totalCarritoSinIVAElement.textContent = `$${totalSinIVA.toFixed(2)}`;
  
      pagarButton.disabled = carrito.length === 0;
      guardarCarritoEnLocalStorage();
    }
  };
 // Función para procesar el pago como una promesa
 function procesarPago() {
    return new Promise(function(resolve, reject) {
        console.log('Procesando pago...');

        // Simulación de proceso de pago (puede incluir una llamada a una API de pago real)
        setTimeout(function () {
            if (Math.random() < 0.90) {  // Simulación de un 90% de éxito
                resolve('¡Pago exitoso!');
            } else {
                reject('Lo siento, el pago no pudo ser procesado. Inténtalo de nuevo.');
            }
        }, 2000); // Simulación de 2 segundos de tiempo de procesamiento
    });
}

// Función para manejar el pago
function pagar() {
    procesarPago()
        .then(function (mensaje) {
            alert(mensaje);
            console.log(mensaje);
            vaciarCarrito();
        })
        .catch(function (error) {
            alert(error);
            console.error(error);
        });
}