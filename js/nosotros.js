document.addEventListener("DOMContentLoaded", () => {
    // Elemento ul donde mostrarás los nombres y slogans
    const empleadosLista = document.getElementById("empleados-lista");

    // URL de la API para obtener usuarios
    const apiUrl = 'https://jsonplaceholder.typicode.com/users';

    // Realizar la solicitud fetch a la API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Tomar los primeros 10 usuarios
            const primerosDiezUsuarios = data.slice(0, 10);

            // Mostrar los nombres y slogans en la lista
            primerosDiezUsuarios.forEach(usuario => {
                const li = document.createElement("li");
                li.textContent = `Nombre: ${usuario.name}, sus aptitudes que destacaron : ${usuario.company.bs}`;
                empleadosLista.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error al obtener usuarios:', error);
        });
});
