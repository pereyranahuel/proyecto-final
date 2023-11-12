document.getElementById("mostrarUsuario").addEventListener("click", function () {
    mostrarUsuarioForm();
});

document.getElementById("crearUsuario").addEventListener("click", function () {
    mostrarCrearUsuarioForm();
});

document.getElementById("ingresarUsuario").addEventListener("click", function () {
    let nombreUsuarioInput = document.getElementById("nombreUsuario");
    if (nombreUsuarioInput) {
        let nombreUsuario = nombreUsuarioInput.value;
        let contrasena = document.getElementById("contrasena").value;

        autenticarUsuario(nombreUsuario, contrasena);

        // Puedes ocultar el formulario después de procesar la información
        ocultarUsuarioForm();
    }
});

document.getElementById("crearNuevoUsuario").addEventListener("click", function () {
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let validarEdad = validarCampoNumerico(document.getElementById("edad"));
    let validarTelefono = validarCampoNumerico(document.getElementById("telefono"));
    let correo = document.getElementById("correo").value;
    let crearContrasena = document.getElementById("crearContrasena").value;
    let confirmarContrasena = document.getElementById("confirmarContrasena").value;

    // Validar campos numéricos
    if (!validarEdad() || !validarTelefono()) {
        alert("Por favor, ingresa solo números en los campos de Edad y Teléfono.");
        return;
    }

    // Validar que las contraseñas coincidan
    if (crearContrasena !== confirmarContrasena) {
        alert("Las contraseñas no coinciden. Vuelve a escribir las contraseñas.");
        return;
    }

    // Crear objeto de usuario
    let nuevoUsuario = {
        nombreUsuario: nombre, // Cambié el nombre del campo a nombreUsuario
        nombre: nombre,
        apellido: apellido,
        edad: document.getElementById("edad").value,
        telefono: document.getElementById("telefono").value,
        correo: correo,
        contrasena: crearContrasena
    };

    // Guardar el usuario en localStorage
    guardarUsuarioEnLocalStorage(nuevoUsuario);

    // Puedes mostrar un mensaje de bienvenida
    alert("¡Bienvenido/a a Mas Rack, " + nombre + "!");

    // Puedes ocultar el formulario después de procesar la información
    ocultarCrearUsuarioForm();
});

function mostrarUsuarioForm() {
    document.getElementById("miUsuarioForm").style.display = "block";
    document.getElementById("crearUsuarioForm").style.display = "none";
}

function mostrarCrearUsuarioForm() {
    document.getElementById("crearUsuarioForm").style.display = "block";
    document.getElementById("miUsuarioForm").style.display = "none";
}

function ocultarUsuarioForm() {
    document.getElementById("miUsuarioForm").style.display = "none";
}

function ocultarCrearUsuarioForm() {
    document.getElementById("crearUsuarioForm").style.display = "none";
}

function autenticarUsuario(nombreUsuario, contrasena) {
    // Obtener la lista de usuarios almacenados
    let usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Buscar el usuario por nombre de usuario
    let usuarioEncontrado = usuariosGuardados.find(user => user.nombreUsuario === nombreUsuario);

    if (usuarioEncontrado && usuarioEncontrado.contrasena === contrasena) {
        console.log("¡Bienvenido/a, " + nombreUsuario + "!");
        alert("¡Bienvenido/a, " + nombreUsuario + "!");
    } else {
        console.log("Error de autenticación para el usuario: " + nombreUsuario);
        alert("Error de autenticación. Nombre de usuario o contraseña incorrectos.");
    }
}

function validarCampoNumerico(campo) {
    return function () {
        let valor = campo.value;
        return !isNaN(valor) && valor !== "";
    };
}

function guardarUsuarioEnLocalStorage(usuario) {
    // Obtener la lista actual de usuarios almacenados en localStorage
    let usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Agregar el nuevo usuario a la lista
    usuariosGuardados.push(usuario);

    // Guardar la lista actualizada en localStorage
    localStorage.setItem("usuarios", JSON.stringify(usuariosGuardados));
}