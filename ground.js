import { incrementCustomProperty } from "./customProperty.js";


const SPEED = 0.05;
const groundElement = document.querySelectorAll("[data-ground]");


export function updateGround(deltaTime) { 
groundElement.forEach(ground => {

    incrementCustomProperty(ground, "--left", deltaTime * SPEED * -1)

})}