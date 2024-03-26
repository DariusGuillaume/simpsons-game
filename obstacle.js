import { setCustomProperty, incrementCustomProperty, getCustomProperty } from "./customProperty.js";

const SPEED = .05;
const OBSTACLE_TIME_MIN = 500;
const OBSTACLE_TIME_MAX = 2000;
const gameElement = document.querySelector('[data-ground]');


let nextObstacleTime 
export function setupObstacle() {
    nextObstacleTime = OBSTACLE_TIME_MIN
    document.querySelectorAll('[data-obstacle]').forEach(obstacle => {obstacle.remove()
})}

export function updateObstacle(deltaTime, speedScale) {

    document.querySelectorAll("[data-obstacle]").forEach(obstacle => {
       incrementCustomProperty(obstacle, "--left", deltaTime * speedScale * SPEED * -1)
         if(getCustomProperty(obstacle,"--left") <= -100){
              obstacle.remove()
        }
    })
  
    if(nextObstacleTime <= 0){
        createObstacle()
        nextObstacleTime = randomNumberBetween(OBSTACLE_TIME_MIN,OBSTACLE_TIME_MAX)/speedScale
    }
    nextObstacleTime -= deltaTime
}

export function getObstacleRect(){
return [...document.querySelectorAll('[data-obstacle]')].map(obstacle => {
    return obstacle.getBoundingClientRect()
})}

function createObstacle(){
    const obstacle = document.createElement('img')
    obstacle.dataset.obstacle = true
    obstacle.src = "game_images/obstacles/cactus.png"
    obstacle.classList.add("obstacle")
    setCustomProperty(obstacle,"--left",100)
    gameElement.append(obstacle)

}

function randomNumberBetween(min,max){
    return Math.floor(Math.random() * (max - min + 1) + min)
}

