/*fetch("http://localhost:3000/contactos")
    .then((response) => response.json())  // Convertir la respuesta a JSON
    .then((data) => {
        // Aquí ya tienes los datos del servidor
        console.log(data);
    });*/




function mostrarContactos(){
    // 1. Usa fetch() para hacer GET a la URL del API
    fetch("http://localhost:3000/contactos")
    // 2. Convierte la respuesta a JSON con .then((response) => response.json())
    .then((response) => response.json()) // SE CONVIERTE LA RESPUESTA EN JSON
    // 3. En el siguiente .then((data) => { ... }):
    .then((data) => {
        // AQUI SE HARAN TODAS LAS OPERACIONES NECESARIAS PARA HACER EL TRABAJO
        //    - Obtén el tbody: document.getElementById("tablaContactos")
        const tbody = document.getElementById("tablaContactos");
        // - Limpia su contenido: tbody.innerHTML = ""
        tbody.innerHTML = "";
       // - Recorre data con forEach
        data.data.forEach(element => {
            // tbody.insertRow(-1) crea un <tr> nuevo al final.
            const fila = tbody.insertRow(-1);

            // fila.insertCell(0) crea la primera celda de esa fila

            const celdaId = fila.insertCell(0);
            celdaId.textContent = element.id;

            // SE LLENAN LAS CELDAS CON textContent

            const celdaName = fila.insertCell(1);
            celdaName.textContent = element.nombre;

            const celdaPhone = fila.insertCell(2);
            celdaPhone.textContent = element.telefono;

            const celdaAccion = fila.insertCell(3);
            const botonEliminar = document.createElement("button");
            botonEliminar.textContent = "Eliminar";
            botonEliminar.onclick = () => eliminarContacto(element.id);

            celdaAccion.appendChild(botonEliminar);
            

        });
        
    })
} 

/*fetch("http://localhost:3000/contactos", {
    method: "POST",                              // Método HTTP
    headers: {
        "Content-Type": "application/json",      // Indicar que enviamos JSON
    },
    body: JSON.stringify({ nombre: "...", telefono: "..." })  // Los datos
});*/ 

function agregarContactos(e){
    
    // 1. Prevén el submit por defecto
    e.preventDefault();
    // 2. Obtén los valores de los inputs
    const nombre = document.getElementById("nombre").value;
    const telefono = document.getElementById("telefono").value;
    
    fetch("http://localhost:3000/contactos", {
        method: "POST", // METODO HTTP
        headers: { 
            "Content-Type": "application/json", // INDICAR QUE ENVIAMOS JSON
        },

        body: JSON.stringify({ nombre: nombre, telefono: telefono})
    })
    .then((response) => response.json())

    .then((data) =>{
        console.log("Contacto agregado:", data);
        mostrarContactos();
    })


}

/*Ejercicio 3: Eliminar un contacto (DELETE)*/

function eliminarContacto(id){

    fetch(`http://localhost:3000/contactos/${id}`, {
    method: "DELETE",
    headers: {
        "Content-Type": "application/json",
    },
    })
    .then((response) => response.json())
    .then((data) => {
        console.log("Contacto eliminado:", data);
        mostrarContactos();
    })

}

document.getElementById("contactForm").addEventListener("submit", agregarContactos);

mostrarContactos()  
