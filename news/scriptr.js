document.addEventListener("DOMContentLoaded", () => {
console.log("Script do jogo conectado com sucesso!");
const gameContainer = document.getElementById("game-container");
if (gameContainer) {
gameContainer.innerHTML = "<p>O Javascript está pronto! Desenvolva a mecânica do jogo aqui.</p>";
}
});