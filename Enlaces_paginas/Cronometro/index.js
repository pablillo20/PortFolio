let segundos = 0;
let minutos = 0;
let intervalo;

const tiempoElemento = document.getElementById("tiempo");
const botonIniciar = document.getElementById("iniciar");
const botonDetener = document.getElementById("detener");
const botonReiniciar = document.getElementById("reiniciar");

function actualizarTiempo() {
    segundos++;
    if (segundos === 60) {
        segundos = 0;
        minutos++;
    }

    const segundosTexto = segundos < 10 ? "0" + segundos : segundos;
    const minutosTexto = minutos < 10 ? "0" + minutos : minutos;

    tiempoElemento.textContent = `${minutosTexto}:${segundosTexto}`;
}

function iniciarCronometro() {
    if (!intervalo) {
        intervalo = setInterval(actualizarTiempo, 1000);
    }
}

function detenerCronometro() {
    clearInterval(intervalo);
    intervalo = null;
}

function reiniciarCronometro() {
    detenerCronometro();
    segundos = 0;
    minutos = 0;
    tiempoElemento.textContent = "00:00";
}

botonIniciar.addEventListener("click", iniciarCronometro);
botonDetener.addEventListener("click", detenerCronometro);
botonReiniciar.addEventListener("click", reiniciarCronometro);
