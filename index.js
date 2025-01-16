// Seleccionamos la sección de progreso y las barras de progreso
const progresoSection = document.getElementById("progreso");
const barrasDeProgreso = document.querySelectorAll(".progress-value");

// Función para comprobar si la sección está en el viewport
function estaEnVista() {
    const rect = progresoSection.getBoundingClientRect();
    // Si la parte superior de la sección está dentro del viewport
    return rect.top <= window.innerHeight && rect.bottom >= 0;
}

// Función para iniciar la animación de las barras de progreso
function animarBarrasDeProgreso() {
    if (estaEnVista()) {
        barrasDeProgreso.forEach((barra) => {
            const anchoFinal = barra.getAttribute("data-valor");
            barra.style.width = anchoFinal;
        });
    }
}

// Ejecutamos la función cada vez que el usuario haga scroll
window.addEventListener("scroll", animarBarrasDeProgreso);


document.getElementById("formulario").addEventListener("submit", function(event) {
    event.preventDefault();

    // Obtener valores de los campos
    const nombre = document.getElementById("nombre");
    const correo = document.getElementById("correo");
    const telefono = document.getElementById("telefono");
    const mensaje = document.getElementById("mensaje");

    let mensajeError = "";

    // Validar nombre
    if (nombre.value.trim() === "") {
        mensajeError += "El nombre no puede estar vacío.\n";
        nombre.style.borderColor = "red";  // Cambiar borde a rojo
    } else {
        nombre.style.borderColor = "green";  // Cambiar borde a verde si es válido
    }

    // Validar correo electrónico con regex
    const regexCorreo = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regexCorreo.test(correo.value)) {
        mensajeError += "El correo electrónico no es válido.\n";
        correo.style.borderColor = "red";  // Cambiar borde a rojo
    } else {
        correo.style.borderColor = "green";  // Cambiar borde a verde si es válido
    }

    // Validar teléfono solo si no está vacío
    const regexTelefono = /^\d{9}$/;
    if (telefono.value.trim() !== "" && !regexTelefono.test(telefono.value)) {
        mensajeError += "El número de teléfono debe tener exactamente 9 dígitos.\n";
        telefono.style.borderColor = "red";  // Cambiar borde a rojo
    } else if (telefono.value.trim() !== "") {
        telefono.style.borderColor = "green";  // Cambiar borde a verde si es válido
    } else {
        telefono.style.borderColor = "";  // Restablecer estilo si está vacío
    }

    // Validar mensaje
    if (mensaje.value.trim() === "") {
        mensajeError += "El mensaje no puede estar vacío.\n";
        mensaje.style.borderColor = "red";  // Cambiar borde a rojo
    } else {
        mensaje.style.borderColor = "green";  // Cambiar borde a verde si es válido
    }

    // Mostrar errores o simular envío
    if (mensajeError) {
        alert("Por favor, corrige los siguientes errores:\n" + mensajeError);
    } else {
        // Limpiar formulario
        document.getElementById("formulario").reset();
        // Opcional: Resetea el color de los bordes a su valor inicial si es necesario
        nombre.style.borderColor = "";
        correo.style.borderColor = "";
        telefono.style.borderColor = "";
        mensaje.style.borderColor = "";
    }
});

// Selecciona el botón hamburguesa y los enlaces de navegación
const menuHamburguesa = document.querySelector('.menu-hamburguesa');
const enlacesNavegacion = document.querySelector('.enlaces-navegacion');

// Agrega un event listener para el clic en el menú hamburguesa
menuHamburguesa.addEventListener('click', () => {
    // Alterna la clase "active" en los enlaces de navegación
    enlacesNavegacion.classList.toggle('active');
});
