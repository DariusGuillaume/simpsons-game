import { updateGround, setupGround } from "./ground.js";
import {updateCharacter,setUpCharacter} from "./character.js";
import {updateObstacle,setupObstacle} from "./obstacle.js";

const GAME_WIDTH = 100
const GAME_HEIGHT = 100
const SPEEDSCALEINCREASE = 0.00001
const gameStage = document.querySelector('[data-game]')
const scoreElement = document.querySelector('[data-score]')
const startScreenElement = document.querySelector('[data-start-screen]')

setPixelToGameStage()
window.addEventListener("resize", setPixelToGameStage)
document.addEventListener("keydown",handleStart,{once:true})
 


setupGround() 

let lastTime  
let speedScale
let score 


function update(time){
    if(lastTime == null ){
        lastTime = time;
        window.requestAnimationFrame(update);
        return;
    }
    const deltaTime = time - lastTime
    updateGround(deltaTime,speedScale)
    updateCharacter(deltaTime,speedScale)
    updateObstacle(deltaTime,speedScale)
    updateSpeedScale(deltaTime)
    
    updateScore(deltaTime)

    lastTime = time
    window.requestAnimationFrame(update);
}

window.requestAnimationFrame(update);

function updateSpeedScale(deltaTime){ 
    speedScale += deltaTime* SPEEDSCALEINCREASE
}

function updateScore (deltaTime,speedScale){ 
    score += deltaTime * .01
    scoreElement.textContent = Math.floor(score)
}
function handleStart(){ 
    lastTime = null
    score = 0
    speedScale = 1 
    setupGround()
    setUpCharacter()
    setupObstacle()
    startScreenElement.style.display = "none"
    window.requestAnimationFrame(update)
} 


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

