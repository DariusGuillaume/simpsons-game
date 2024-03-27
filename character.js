import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "./customProperty.js"

const characterElement = document.querySelector("[data-character]")
const JUMPSPEED = 1.32
const GRAVITY = .015
const CHARACTER_FRAME_COUNT =2
const FRAME_TIME = 100


let isJumping 
let characterFrame
let currentFrameTime
let yVelocity

export function setUpCharacter () { 
   isJumping = true  
   characterFrame = 0
   currentFrameTime = 0
    yVelocity = 0
     setCustomProperty(characterElement,"--bottom",0)
   document.removeEventListener("keydown",jump)
    document.addEventListener("keydown",jump)
}

export function updateCharacter(deltaTime,speedScale){
   handleRun(deltaTime,speedScale)
    handleJump(deltaTime)
}

function handleRun(deltaTime,speedScale){
    if(isJumping) {
        characterElement.src = `game_images/characters/homer_sprite_jumping.png`
        return
    }

    if(currentFrameTime >= FRAME_TIME){
        characterFrame = (characterFrame + 1) % CHARACTER_FRAME_COUNT
        characterElement.src = `./game_images/characters/homer_sprite_run${characterFrame}.png`
        currentFrameTime -= FRAME_TIME

    }

    currentFrameTime += deltaTime * speedScale}

function handleJump(deltaTime){
    if(!isJumping) return

    incrementCustomProperty(characterElement,"--bottom", yVelocity * deltaTime)
    
    if(getCustomProperty(characterElement,"--bottom") <= 0){
        isJumping = false
        setCustomProperty(characterElement,"--bottom",0)
    }
    yVelocity -= GRAVITY * deltaTime


}

function jump(e){ 
    if(e.code !== "Space" || isJumping) return
    yVelocity = JUMPSPEED
    isJumping = true

}



