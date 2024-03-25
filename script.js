import { updateGround, setupGround } from "./ground.js";

const GAME_WIDTH = 100; 
const GAME_HEIGHT = 100;
const gameStage = document.querySelector('[data-game]');

setPixelToGameStage();
window.addEventListener("resize", setPixelToGameStage)


setupGround() 

let lastTime  

function update(time){
    if(lastTime == null ){
        lastTime = time;
        window.requestAnimationFrame(update);
        return;
    }
    const deltaTime = time - lastTime;
    updateGround(deltaTime,1);

    lastTime = time
    window.requestAnimationFrame(update);
}
window.requestAnimationFrame(update);

function setPixelToGameStage() {
    let gameToPixelScale 
    if(window.innerWidth/window.innerHeight < GAME_WIDTH/GAME_HEIGHT) {
        gameToPixelScale = window.innerWidth/GAME_WIDTH;
    }
    else {
        gameToPixelScale = window.innerHeight/GAME_HEIGHT;
    }
    gameStage.style.width = `${GAME_WIDTH*gameToPixelScale}px`;
    gameStage.style.height = `${GAME_HEIGHT*gameToPixelScale}px`;
}

