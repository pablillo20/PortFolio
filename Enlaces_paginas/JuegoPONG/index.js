let jugador1 = document.getElementById('jugador1');
let jugador2 = document.getElementById('jugador2');
let pelota = document.getElementById('pelota');
let pantalla = document.getElementById('pantalla');
let marcador = document.getElementById('marcador');
let modo2jugadores = document.getElementById('modo2jugadores');
let modoIA = document.getElementById('modoIA');

let posicionY1 = parseInt(jugador1.getAttribute("y"));
let posicionY2 = parseInt(jugador2.getAttribute("y"));
let pelotaX = parseInt(pelota.getAttribute("cx"));
let pelotaY = parseInt(pelota.getAttribute("cy"));
let r = parseInt(pelota.getAttribute("r"));

let velocidadX = 5;
let velocidadY = 5;

const limiteYArriba = 0;
const limiteYAbajo = parseInt(pantalla.getAttribute("height"));
const limiteXIzquierda = parseInt(jugador1.getAttribute("x"));
const limiteXDerecha = parseInt(jugador2.getAttribute("x")) + parseInt(jugador2.getAttribute("width"));

const velocidad = 10;

const alturaJugador = parseInt(jugador1.getAttribute("height"));
const anchoPantallaDerecha = parseInt(pantalla.getAttribute("width"));

let juegoIniciado = false;
let golesJugador1 = 0;
let golesJugador2 = 0;
let modoJuego = '';

// Inicia el juego
document.getElementById('Iniciar').addEventListener('click', () => {
    document.getElementById('Iniciar').style.display = 'none';
    modo2jugadores.style.display = 'block';
    modoIA.style.display = 'block';
});

// Selecciona el modo de juego
modo2jugadores.addEventListener('click', () => {
    modoJuego = 'jugador';
    modo2jugadores.style.display = 'none';
    modoIA.style.display = 'none';
    iniciarJuego();
});

modoIA.addEventListener('click', () => {
    modoJuego = 'ia';
    modo2jugadores.style.display = 'none';
    modoIA.style.display = 'none';
    iniciarJuego();
});

// Inicia el juego
function iniciarJuego() {
    juegoIniciado = true;
    lanzarPelota();
}

// Movimiento de jugadores
document.addEventListener("keydown", (e) => {
    if (!juegoIniciado) return;

    // Movimiento del Jugador 2
    if (e.key === "ArrowDown") {
        if (posicionY2 + alturaJugador < limiteYAbajo) {
            posicionY2 += velocidad;
            jugador2.setAttribute("y", posicionY2);
        }
    }
    else if (e.key === "ArrowUp") {
        if (posicionY2 > limiteYArriba) {
            posicionY2 -= velocidad;
            jugador2.setAttribute("y", posicionY2);
        }
    }

    // Movimiento del Jugador 1
    if (e.key === "s" || e.key === "S") {
        if (posicionY1 + alturaJugador < limiteYAbajo) {
            posicionY1 += velocidad;
            jugador1.setAttribute("y", posicionY1);
        }
    }
    else if (e.key === "w" || e.key === "W") {
        if (posicionY1 > limiteYArriba) {
            posicionY1 -= velocidad;
            jugador1.setAttribute("y", posicionY1);
        }
    }
});

// Movimiento pelota
function lanzarPelota() {
    setInterval(() => {
        if (!juegoIniciado) return;

        // Actualizar la posición de la pelota
        pelotaX += velocidadX;
        pelotaY += velocidadY;

        // Rebote en las paredes
        if (pelotaY <= limiteYArriba + r || pelotaY >= limiteYAbajo - r) {
            velocidadY = -velocidadY;
        }

        // Reinicio de la pelota y marcar goles
        if (pelotaX - r <= 0) {
            golesJugador2++;
            actualizarMarcador();
            resetPelota();
        } else  if (pelotaX + r >= anchoPantallaDerecha) {
            golesJugador1++;
            actualizarMarcador();
            resetPelota();
        } else {
            // Colisión con el Jugador 1
            if (pelotaX <= limiteXIzquierda + r && pelotaY >= posicionY1 && pelotaY <= posicionY1 + alturaJugador) {
                velocidadX++;
                velocidadY++;
                velocidadX = -velocidadX;
            }

            // Colisión con el Jugador 2
            if (pelotaX >= limiteXDerecha - r && pelotaY >= posicionY2 && pelotaY <= posicionY2 + alturaJugador) {
                velocidadX++;
                velocidadY++;
                velocidadX = -velocidadX;
            }
        }

        // Si es contra IA, mover IA
        if (modoJuego === 'ia') {
            ia();
        }

        pelota.setAttribute('cx', pelotaX);
        pelota.setAttribute('cy', pelotaY);

    }, 1000 / 60);
}

// Función para actualizar el marcador en la pantalla
function actualizarMarcador() {
    marcador.textContent = `Jugador 1: ${golesJugador1} | Jugador 2: ${golesJugador2}`;
}

// Función para reiniciar la pelota
function resetPelota() {
    pantalla.style.backgroundImage = "url('./fondo.gif')";
    setTimeout(() => {
        pantalla.style.backgroundImage = "url('pista.jpg')";
        pantalla.style.backgroundSize = "cover";
    }, 2000);

    pelotaX = parseInt(pantalla.getAttribute("width")) / 2;
    pelotaY = parseInt(pantalla.getAttribute("height")) / 2;
    velocidadY = 5;
    velocidadX = 5;
    velocidadX = -velocidadX;
}


function ia() {
    // Movimiento de la IA para seguir la pelota
    if (pelotaY > posicionY2 + alturaJugador / 2) {
        posicionY2+=3;
    } else if (pelotaY < posicionY2 + alturaJugador / 2) {
        posicionY2-=3;
    }

    if (posicionY2 < limiteYArriba) {
        posicionY2 = limiteYArriba;
    } else if (posicionY2 + alturaJugador > limiteYAbajo) {
        posicionY2 = limiteYAbajo - alturaJugador;
    }

    jugador2.setAttribute("y", posicionY2);
}
