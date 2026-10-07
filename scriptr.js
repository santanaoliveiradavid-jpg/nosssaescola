document.addEventListener("DOMContentLoaded", () => {
const container = document.getElementById("game-container");
if (!container) return;
container.innerHTML = '<canvas id="canvasFlappy" width="800" height="450" style="display:block;"></canvas>';
const canvas = document.getElementById("canvasFlappy");
const ctx = canvas.getContext("2d");
let bird = { x: 50, y: 150, width: 20, height: 20, gravity: 0.4, velocity: 0, jump: -6 };
let pipes = [];
let frame = 0;
let score = 0;
let gameOver = false;
function resetGame() {
bird.y = 150;
bird.velocity = 0;
pipes = [];
frame = 0;
score = 0;
gameOver = false;
}
function createPipe() {
let gap = 120;
let minHeight = 40;
let maxHeight = canvas.height - gap - minHeight;
let height = Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;
pipes.push({ x: canvas.width, top: height, bottom: canvas.height - height - gap, passed: false });
}
function update() {
if (gameOver) return;
bird.velocity += bird.gravity;
bird.y += bird.velocity;
if (bird.y + bird.height > canvas.height || bird.y < 0) {
gameOver = true;
}
if (frame % 100 === 0) createPipe();
for (let i = pipes.length - 1; i >= 0; i--) {
let p = pipes[i];
p.x -= 3;
if (bird.x < p.x + 40 && bird.x + bird.width > p.x && (bird.y < p.top || bird.y + bird.height > canvas.height - p.bottom)) {
gameOver = true;
}
if (!p.passed && p.x + 40 < bird.x) {
score++;
p.passed = true;
}
if (p.x + 40 < 0) pipes.splice(i, 1);
}
frame++;
}
function draw() {
ctx.fillStyle = "#70c5ce";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = "#f5d742";
ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
ctx.fillStyle = "#73bf2e";
for (let p of pipes) {
ctx.fillRect(p.x, 0, 40, p.top);
ctx.fillRect(p.x, canvas.height - p.bottom, 40, p.bottom);
}
ctx.fillStyle = "#fff";
ctx.font = "24px Arial";
ctx.fillText("Pontos: " + score, 20, 40);
if (gameOver) {
ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = "#fff";
ctx.font = "40px Arial";
ctx.textAlign = "center";
ctx.fillText("Fim de Jogo!", canvas.width / 2, canvas.height / 2 - 20);
ctx.font = "20px Arial";
ctx.fillText("Clique ou pressione Espaço para reiniciar", canvas.width / 2, canvas.height / 2 + 20);
ctx.textAlign = "left";
}
}
function loop() {
update();
draw();
requestAnimationFrame(loop);
}
function handleAction() {
if (gameOver) {
resetGame();
} else {
bird.velocity = bird.jump;
}
}
window.addEventListener("keydown", (e) => {
if (e.code === "Space") {
e.preventDefault();
handleAction();
}
});
canvas.addEventListener("click", handleAction);
loop();
});