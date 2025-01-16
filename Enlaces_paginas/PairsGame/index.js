const valores = ['A', 'B', 'C', 'D', 'A', 'B', 'C', 'D'];
let cartasVolteadas = [];
let cartasCoincidentes = 0;

function barajar() {
    return valores.sort(() => Math.random() - 0.5);
}

function crearCartas() {
    const tablero = document.getElementById('tablero');
    tablero.innerHTML = '';

    const cartasBarajadas = barajar();

    cartasBarajadas.forEach(valor => {
        const carta = document.createElement('div');
        carta.classList.add('carta');
        carta.dataset.valor = valor;
        carta.addEventListener('click', voltearCarta);
        tablero.appendChild(carta);
    });
}

function voltearCarta() {
    const carta = this;
    if (!carta.classList.contains('volteada') && cartasVolteadas.length < 2) {
        carta.classList.add('volteada');
        carta.textContent = carta.dataset.valor;
        cartasVolteadas.push(carta);

        if (cartasVolteadas.length === 2) {
            verificarCoincidencia();
        }
    }
}

function verificarCoincidencia() {
    const [carta1, carta2] = cartasVolteadas;
    if (carta1.dataset.valor === carta2.dataset.valor) {
        carta1.classList.add('coincide');
        carta2.classList.add('coincide');
        cartasCoincidentes++;
        if (cartasCoincidentes === 4) {
            setTimeout(() => alert('¡Felicidades, has ganado!'), 500);
        }
    } else {
        setTimeout(() => {
            carta1.classList.remove('volteada');
            carta2.classList.remove('volteada');
            carta1.textContent = '';
            carta2.textContent = '';
        }, 100);
    }

    cartasVolteadas = [];
}

crearCartas();
