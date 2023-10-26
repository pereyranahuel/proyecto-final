// Array de productos
var productos = [
    { nombre: 'almacenamiento dinamico', precio: 100, stock: 2 },
    { nombre: 'almacenaje movil', precio: 120, stock: 1 },
    { nombre: 'estanterias push-back', precio: 80, stock: 2 },
    { nombre: 'estanterias compactas', precio: 90, stock: 1 }
];

// Carrito de compras
var carrito = [];
var totalCarrito = 0;

// Función para comprar un producto
function comprar(nombre, precio) {
    // Buscar el producto por nombre
    var producto = productos.find(function (p) {
        return p.nombre === nombre;
    });

    if (producto && producto.stock > 0) {
        // Restar 1 al stock
        producto.stock--;

        var item = {
            nombre: producto.nombre,
            precio: producto.precio
        };

        carrito.push(item);
        totalCarrito += producto.precio;

        actualizarCarrito();
        console.log(`Producto "${producto.nombre}" agregado al carrito.`);
    } else if (!producto) {
        console.error('Producto no encontrado.');
    } else if (producto.stock === 0) {
        console.error(`Producto "${producto.nombre}" sin stock.`);
        alert(`El producto "${producto.nombre}" está agotado.`);
    }
}

// Función para aplicar el 21% de IVA a la compra
function aplicarIVA() {
    var iva = totalCarrito * 0.21;
    totalCarrito += iva;
    console.log(`IVA (21%) aplicado al total del carrito: $${iva.toFixed(2)}`);
    actualizarCarrito();
}

// Función para vaciar el carrito
function vaciarCarrito() {
    // Restaurar el stock de los productos en el carrito
    carrito.forEach(function (item) {
        var producto = productos.find(function (p) {
            return p.nombre === item.nombre;
        });

        if (producto) {
            producto.stock++;
        }
    });

    carrito = [];
    totalCarrito = 0;
    actualizarCarrito();
    console.log('Carrito vaciado.');
}

// Función para actualizar la visualización del carrito
function actualizarCarrito() {
    var listaCarrito = document.getElementById('lista-carrito');
    var totalCarritoElement = document.getElementById('total-carrito');
    var totalCarritoSinIVAElement = document.getElementById('total-sin-iva'); // Corregir el ID aquí
    var pagarButton = document.getElementById('pagar-button');

    if (listaCarrito && totalCarritoElement && totalCarritoSinIVAElement) {
        // Limpiar la lista antes de volver a llenarla
        listaCarrito.innerHTML = '';

        carrito.forEach(function (item) {
            var listItem = document.createElement('li');
            listItem.textContent = item.nombre + ' - $' + item.precio;
            listaCarrito.appendChild(listItem);
        });

        totalCarritoElement.textContent = '$' + totalCarrito.toFixed(2);

        // Calcular el total sin IVA
        var totalSinIVA = totalCarrito / 1.21; // Dividir por 1 + tasa de IVA
        totalCarritoSinIVAElement.textContent = '$' + totalSinIVA.toFixed(2);

        if (carrito.length > 0) {
            pagarButton.disabled = false;
        } else {
            pagarButton.disabled = true;
        }
    }
}

function pagar() {
    console.log('Procesando pago...');

    // Simulación de proceso de pago (puede incluir una llamada a una API de pago real)
    setTimeout(function () {
        alert('Lo siento, estamos estudiando para solucionar este problema. Gracias por tu comprensión.');
        console.log('¡Pago exitoso!');
        vaciarCarrito();
    }, 2000); // Simulación de 2 segundos de tiempo de procesamiento
}
