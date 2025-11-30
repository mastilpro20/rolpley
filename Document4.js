// Botón inicio
document.getElementById("btn-empezar").addEventListener("click", () => {
  document.getElementById("pantalla-inicio").style.display = "none";
  document.querySelector("main").style.display = "grid";
  document.getElementById("musica").play();
});

// Guardar ficha
document.getElementById("form-personaje").addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = document.getElementById("p-nombre").value;
  const rol = document.getElementById("p-rol").value;
  const rasgos = document.getElementById("p-rasgos").value;

  document.getElementById("f-nombre").textContent = nombre;
  document.getElementById("f-rol").textContent = rol;
  document.getElementById("f-rasgos").textContent = rasgos;
});

// Turnos
let turno = "Narrador";
document.getElementById("btn-siguiente-turno").addEventListener("click", () => {
  turno = (turno === "Narrador") ? "Jugador" : "Narrador";
  document.getElementById("jugador-actual").textContent = turno;
});

// Chat
document.getElementById("form-mensaje").addEventListener("submit", (e) => {
  e.preventDefault();

  const modo = document.getElementById("modo").value;
  const mensaje = document.getElementById("mensaje").value;
  const chat = document.getElementById("chat-log");

  const li = document.createElement("li");
  li.classList.add(modo);
  li.textContent = `[${turno}] ${mensaje}`;

  chat.appendChild(li);
  document.getElementById("mensaje").value = "";
});

// Mapa (simple fondo)
const canvas = document.getElementById("canvas-mapa");
const ctx = canvas.getContext("2d");

ctx.fillStyle = "#a3d9ff";
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.fillStyle = "green";
ctx.fillRect(50, 350, 200, 50); // pradera

ctx.fillStyle = "brown";
ctx.fillRect(300, 300, 100, 150); // montaña
