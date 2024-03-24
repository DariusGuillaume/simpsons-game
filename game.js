const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('start-button');

// Set the canvas dimensions to match the game container
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Game state
let isGameStarted = false;

// Event listeners
startButton.addEventListener('click', startGame);
window.addEventListener('keydown', handleKeyDown);

function startGame() {
    isGameStarted = true;
    startButton.style.display = 'none';
    canvas.style.display = 'block';
    window.location.href = "game.html";
    // Initialize game objects and start the game loop

}

function handleKeyDown(event) {
    if (event.code === 'Enter' && !isGameStarted) {
        startGame();
    }
}

// Game loop
function gameLoop() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update game logic and render game objects

    // Request the next animation frame
    requestAnimationFrame(gameLoop);
}

// Start the game loop after all resources are loaded
window.addEventListener('load', gameLoop);
