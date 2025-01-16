const formulario = document.getElementById('formulario');
const lista = document.getElementById('lista');
const mensaje = document.getElementById('mensaje');

// Cargar los ítems desde localStorage al cargar la página
window.addEventListener('load', function() {
    const itemsGuardados = JSON.parse(localStorage.getItem('items')) || [];
    itemsGuardados.forEach(function(item) {
        agregarItemLista(item);
    });
});

// Función para agregar un ítem a la lista y al localStorage
function agregarItemLista(item) {
    const nuevoItem = document.createElement('li');
    nuevoItem.textContent = item.texto;

    const btnEditar = document.createElement('button');
    btnEditar.textContent = 'Editar';
    btnEditar.onclick = function() {
        mensaje.value = item.texto;
        nuevoItem.remove();
        eliminarItemDeLocalStorage(item.texto);  // Eliminar el ítem antiguo de localStorage
    };

    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = 'Eliminar';
    btnEliminar.classList.add('delete');
    btnEliminar.onclick = function() {
        nuevoItem.remove();
        eliminarItemDeLocalStorage(item.texto);  // Eliminar el ítem de localStorage
    };

    nuevoItem.appendChild(btnEditar);
    nuevoItem.appendChild(btnEliminar);
    lista.appendChild(nuevoItem);
}

// Función para guardar los ítems en localStorage
function guardarEnLocalStorage() {
    const items = [];
    const itemsLista = lista.getElementsByTagName('li');
    for (let i = 0; i < itemsLista.length; i++) {
        items.push({ texto: itemsLista[i].textContent.replace('EditarEliminar', '') }); // Eliminar los botones para guardar solo el texto
    }
    localStorage.setItem('items', JSON.stringify(items));
}

// Función para eliminar un ítem de localStorage
function eliminarItemDeLocalStorage(itemTexto) {
    const itemsGuardados = JSON.parse(localStorage.getItem('items')) || [];
    const itemsFiltrados = itemsGuardados.filter(item => item.texto !== itemTexto);
    localStorage.setItem('items', JSON.stringify(itemsFiltrados));
}

// Manejo del evento de agregar un ítem
formulario.addEventListener('submit', function(event) {
    event.preventDefault();

    const item = mensaje.value.trim();

    if (item) {
        // Agregar el ítem a la lista
        agregarItemLista({ texto: item });

        // Guardar el ítem en localStorage
        guardarEnLocalStorage();

        // Limpiar el input
        mensaje.value = '';
    } else {
        mensaje.setAttribute('placeholder', 'Por favor, escribe un ítem.');
    }
});
