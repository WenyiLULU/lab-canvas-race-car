// get elements
const startScreen = document.querySelector('.game-intro');
const gameBord = document.querySelector('#game-board');
const canvas = document.querySelector('#canvas');


// canvas variables settings
const ctx = canvas.getContext("2d");
const imgRaod = new Image();
imgRaod.src = "../images/road.png";
const border = 35

// car variables settings
const imgCar = new Image();
imgCar.src = "../images/car.png"
const carWidth = 50;
const carHeight = 120;
let carX = (canvas.width - carWidth)/2;
let carY = canvas.height - carHeight - 25;
const carSpeed = 3;
let carGoLeft = false;
let carGoRight = false;

// blocks variables settings
const blockHeight = 20;
const blockWidthMax = canvas.width - carWidth * 6;
const blockSpeed = 1;
let spaceBlock = -220;

// score and finish game
let score = 0;
let gameOver = false;
let animationFrameID 



// ---- set game ground -------
function setGrameBord(){
  canvas.style.display = 'block';
}

// ---- create car ------
function drawCar (){
  ctx.drawImage(imgCar, carX, carY, carWidth, carHeight)
  carMove()
}
function carMove(){
  if (carGoLeft){
    if (carX > border){
      carX -= carSpeed;
    }
  }else if(carGoRight){
    if (carX < canvas.width - carWidth - border){
      carX += carSpeed;
    }
  }
}

// ---- creat blocks -------
function getRandomX(){
  return Math.floor(Math.random() * canvas.width) - 100;
}
function getRandomBlockW(){
  return Math.floor(Math.random() * blockWidthMax) + 200;
}
const blocks = [
  {
    x: getRandomX(),
    y: 0,
    w: getRandomBlockW(),
    h: blockHeight
  },
  {
    x: getRandomX(),
    y: spaceBlock,
    w: getRandomBlockW(),
    h: blockHeight
  },
  {
    x: getRandomX(),
    y: spaceBlock * 2,
    w: getRandomBlockW(),
    h: blockHeight
  },
]
function drawBlock(x, y, w, h) {
  ctx.beginPath();
  ctx.fillStyle = "tomato";
  ctx.fillRect(x, y, w, h);
  ctx.closePath(); 
}
function moveBlock(){  
  blocks.forEach((block) => {
   
    if (block.y + block.h === carY){
      if (carX <= block.x + block.w && carX >= block.x){
        gameOver = true;
      } else {
        score += 1;
      }
    }
    
    if(block.y > canvas.height){
      block.y = 0;
      block.x = getRandomX();
      block.w = getRandomBlockW();
    }
    block.y += blockSpeed;
    drawBlock(block.x, block.y, block.w, block.h);
  })
}

// ---- draw score -----
function drawScore() {
  ctx.beginPath();
  ctx.font = "30px sans-serif";
  ctx.fillStyle = "white";
  ctx.fillText(`Score : ${score}`, 80, 50);
  ctx.closePath();
}

// ---- draw game over board ----
function drawGameOverBoard() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, canvas.height/2, canvas.width, canvas.height/2);
  ctx.beginPath();
  ctx.font = "40px sans-serif";
  ctx.fillStyle = "red";
  ctx.fillText(`Game Over`, 140, canvas.height/10*7);
  ctx.fillStyle = "white";
  ctx.fillText(`Your score is`, 130, canvas.height/10*8);
  ctx.fillText(`${score}`, 230, canvas.height/10*9);
  ctx.closePath();
}

// ---- animate page -----
function animate(){
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(imgRaod, 0, 0, canvas.width, canvas.height)
  drawCar()
  moveBlock()
  drawScore()
  if (gameOver) {
    cancelAnimationFrame(animationFrameID);
    drawGameOverBoard();
  } else {
    animationFrameID = requestAnimationFrame(animate);
  }
}

// ---- initialize game -----
function startGame() {
  gameBord.style.display = 'block';
  setGrameBord()
  animate()
}



window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    startGame(); 
  };

  document.addEventListener("keydown", event => {
    if (event.code === "ArrowLeft") {
      carGoLeft = true;
    }
    if (event.code === "ArrowRight") {
      carGoRight = true;
    }
  });

  document.addEventListener("keyup", event => {
    carGoLeft = false;
    carGoRight = false;
  });
  
  
};
