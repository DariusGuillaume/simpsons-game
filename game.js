function startGame() {
    window.location.href = "game.html";
}

function handleKeyDown(event) {
    if (event.code === 'Enter') {
        startGame();
    }
}
window.addEventListener('keydown', handleKeyDown);
