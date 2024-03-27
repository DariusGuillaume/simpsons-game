import { updateGround, setupGround } from "./ground.js";
import {updateCharacter,setUpCharacter,getCharacterRect,setCharacterLost} from "./character.js";
import {updateObstacle,setupObstacle, getObstacleRect} from "./obstacle.js";

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
    if(checkLost()){
       return handleLost()
    }

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
    startScreenElement.classList.add("hide")
    window.requestAnimationFrame(update)
} 

function checkLost(){
    const characterRect = getCharacterRect()
    return getObstacleRect().some(rect => isColliding(rect, characterRect))
}

function isColliding(rect1,rect2){
    return rect1.left < rect2.right && rect1.right > rect2.left && rect1.top < rect2.bottom && rect1.bottom > rect2.top

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

function handleLost(){
 setCharacterLost()
 setTimeout(() => {
     document.addEventListener("keydown",handleStart,{once:true})
        startScreenElement.classList.remove("hide") 
 }, 100)
}