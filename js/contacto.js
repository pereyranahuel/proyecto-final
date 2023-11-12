document.getElementById("formularioDatosUsuario").addEventListener("submit", (event) => {
  event.preventDefault(); // Evitar que el formulario se envíe de manera convencional
  enviarDatosUsuario();
});

function enviarDatosUsuario() {
  // Obtener los datos del formulario
  const datosUsuario = {
    nombre: document.getElementById("nombre").value,
    telefono: document.getElementById("telefono").value,
    email: document.getElementById("email").value
  };

  // Enviar los datos al servidor (en este caso, al local storage)
  guardarDatosEnLocalStorage(datosUsuario);

  // Mostrar los datos en la consola
  mostrarDatosEnConsola(datosUsuario);

  alert('¡Datos enviados correctamente!');
}

function guardarDatosEnLocalStorage(datosUsuario) {
  // Convertir los datos a formato JSON y guardarlos en el local storage
  localStorage.setItem('datosUsuario', JSON.stringify(datosUsuario));
}

function mostrarDatosEnConsola(datosUsuario) {
  // Mostrar los datos en la consola
  console.log('Datos del usuario:', datosUsuario);
}

  