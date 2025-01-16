const palabras = ["LONDRES", "PARIS", "TOKIO"];
let palabraActual = palabras[Math.floor(Math.random() * palabras.length)];
let letrasAdivinadas = [];
let vidas = 10;
let racha = 0;

function actualizarPalabra() {
    const contenedorPalabra = document.getElementById('palabra-oculta');
    let palabraMostrar = '';

    for (let i = 0; i < palabraActual.length; i++) {
        if (letrasAdivinadas.includes(palabraActual[i])) {
            palabraMostrar += palabraActual[i];
        } else {
            palabraMostrar += '_';
        }
        palabraMostrar += ' ';
    }

    contenedorPalabra.textContent = palabraMostrar.trim();
}

function actualizarVidas() {
    document.getElementById('vidas').textContent = `Vidas: ${vidas}`;
}

function actualizarRacha() {
    document.getElementById('racha').textContent = `Racha: ${racha}`;
}

function adivinarLetra(letra, celda) {
    if (letrasAdivinadas.includes(letra) || vidas <= 0) return;

    letrasAdivinadas.push(letra);
    actualizarPalabra();

    if (!palabraActual.includes(letra)) {
        vidas--;
        actualizarVidas();
        celda.style.visibility = 'hidden';
    }

    if (vidas === 0) {
        alert("¡Te has quedado sin vidas! La palabra era: " + palabraActual);
        reiniciarJuego();
    } else if (!document.getElementById('palabra-oculta').textContent.includes('_')) {
        alert("¡Adivinaste la palabra!");
        racha++;
        actualizarRacha();
        reiniciarJuego();
    }
}

function reiniciarJuego() {
    palabraActual = palabras[Math.floor(Math.random() * palabras.length)];
    letrasAdivinadas = [];
    vidas = 10; // Restaura las vidas
    actualizarVidas();
    actualizarPalabra();
    const celdas = document.querySelectorAll('#alfabeto td');
    celdas.forEach(celda => celda.style.visibility = 'visible');
}

const celdas = document.querySelectorAll('#alfabeto td');
celdas.forEach(celda => {
    celda.addEventListener('click', () => adivinarLetra(celda.textContent, celda));
});

actualizarVidas();
actualizarRacha();
actualizarPalabra();
