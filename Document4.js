const btnEmpezar = document.getElementById("btn-empezar");
const pantallaInicio = document.getElementById("pantalla-inicio");
const mainJuego = document.querySelector("main");

btnEmpezar.addEventListener("click", () => {
  pantallaInicio.style.display = "none";
  mainJuego.style.display = "grid"; // o "block" si usas diseño móvil
});
setTimeout(() => {
  alert("🛡️ ¡Bienvenido, valiente héroe! El Reino de Liria está en peligro. El Rey Demonio ha robado la luz del Alba. Solo tú puedes salvarnos.");
}, 500);


