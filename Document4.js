// 🎬 Pantalla de inicio y entrada al juego
const btnEmpezar = document.getElementById("btn-empezar");
const pantallaInicio = document.getElementById("pantalla-inicio");
const mainJuego = document.querySelector("main");
const musica = document.getElementById("musica");

if (btnEmpezar) {
  btnEmpezar.addEventListener("click", () => {
    pantallaInicio.style.display = "none";
    mainJuego.style.display = "grid";
    if (musica) musica.play();

    // Narrativa tipo RPG
    const introTexto = document.createElement("div");
    introTexto.className = "intro";
    introTexto.style.padding = "1rem";
    introTexto.style.background = "#fff3cd";
    introTexto.style.border = "2px solid #ff6f61";
    introTexto.style.borderRadius = "10px";
    introTexto.style.margin = "1rem";
    introTexto.style.fontSize = "1.2rem";
    introTexto.textContent = "🛡️ El Reino de Liria está en peligro...";
    mainJuego.prepend(introTexto);

    setTimeout(() => {
      introTexto.textContent = "👑 El Rey Demonio ha robado la luz del Alba...";
    }, 2000);
    setTimeout(() => {
      introTexto.textContent = "🌟 Solo tú puedes salvarnos. ¡Buena suerte!";
    }, 4000);
    setTimeout(() => {
      introTexto.remove();
    }, 7000);
  });
}

// 🧙‍♂️ Ficha de personaje
const formPersonaje = document.getElementById("form-personaje");
const fNombre = document.getElementById("f-nombre");
const fRol = document.getElementById("f-rol");
const fRasgos = document.getElementById("f-rasgos");

formPersonaje.addEventListener("submit", (e) => {
  e.preventDefault();
  fNombre.textContent = document.getElementById("p-nombre").value || "—";
  fRol.textContent = document.getElementById("p-rol").value || "—";
  fRasgos.textContent = document.getElementById("p-rasgos").value || "—";

  // Guardar en localStorage
  localStorage.setItem("ficha", JSON.stringify({
    nombre: fNombre.textContent,
    rol: fRol.textContent,
    rasgos: fRasgos.textContent
  }));
});

// Cargar ficha guardada
const fichaGuardada = JSON.parse(localStorage.getItem("ficha"));
if (fichaGuardada) {
  fNombre.textContent = fichaGuardada.nombre;
  fRol.textContent = fichaGuardada.rol;
  fRasgos.textContent = fichaGuardada.rasgos;
}

// 🔄 Turnos
const jugadores = ["Narrador", "Jugador 1", "Jugador 2"];
let indiceTurno = 0;
const jugadorActualEl = document.getElementById("jugador-actual");
const btnSiguienteTurno = document.getElementById("btn-siguiente-turno");

function actualizarTurno() {
  jugadorActualEl.textContent = jugadores[indiceTurno];
}
btnSiguienteTurno.addEventListener("click", () => {
  indiceTurno = (indiceTurno + 1) % jugadores.length;
  actualizarTurno();
});
actualizarTurno();

// 💬 Chat narrativo
const formMensaje = document.getElementById("form-mensaje");
const chatLog = document.getElementById("chat-log");
const modo = document.getElementById("modo");
const mensaje = document.getElementById("mensaje");

formMensaje.addEventListener("submit", (e) => {
  e.preventDefault();
  const texto = mensaje.value.trim();
  if (!texto) return;

  const li = document.createElement("li");
  li.classList.add(modo.value);

  const nombre = fNombre.textContent !== "—" ? fNombre.textContent : jugadores[indiceTurno];
  const etiqueta =
    modo.value === "dialogo" ? `${nombre} dice:` :
    modo.value === "pensamiento" ? `${nombre} piensa:` :
    `${nombre} realiza:`;

  li.innerHTML = `<strong>${etiqueta}</strong> ${texto}`;
  chatLog.appendChild(li);
  chatLog.scrollTop = chatLog.scrollHeight;

  mensaje.value = "";
});

// 🧭 Mapa y movimiento del caballero
const canvas = document.getElementById("mapa");
if (canvas) {
  const ctx = canvas.getContext("2d");
  const caballero = new Image();
  caballero.src = "https://copilot.microsoft.com/th/id/BCO.ea6bd291-5b71-455b-b356-75d383f42a3c.png";

  let x = 100;
  let y = 100;
  const velocidad = 5;

  function dibujar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < canvas.width; i += 64) {
      for (let j = 0; j < canvas.height; j += 64) {
        ctx.fillStyle = (i + j) % 128 === 0 ? "#1a1f26" : "#232a32";
        ctx.fillRect(i, j, 64, 64);
      }
    }
    ctx.drawImage(caballero, x, y, 64, 64);
  }
