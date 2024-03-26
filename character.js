const characterElement = document.querySelector("[data-character]")
const JUMPSPEED = .45
const GRAVITY = .015
const CHARACTER_FRAME_COUNT =2
const FRAME_TIME = 100


let isJumping 
let characterFrame
let currentFrameTime

export function setUpCharacter () { 
   isJumping = false    
   characterFrame = 0
   currentFrameTime = 0
}

export function updateCharacter(deltaTime,speedScale){
   handleRun(deltaTime,speedScale)
    handleJump()
}

function handleRun(deltaTime,speedScale){
    if(isJumping) {
        characterElement = `url(./game_images/characters/homer_sprite_jumping.png)`
        return
    }

    if(currentFrameTime >= FRAME_TIME){
        characterFrame = (characterFrame + 1) % CHARACTER_FRAME_COUNT
        characterElement.src = `./game_images/characters/homer_sprite_run${characterFrame}.png`
        currentFrameTime -= FRAME_TIME

    }

    currentFrameTime += deltaTime * speedScale}

function handleJump(){
    const top = parseFloat(characterElement.style.getPropertyValue("--top"))
   
}