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
const blockHeight = 10;
const blockWidthMax = canvas.width - carWidth * 5;
const blockSpeed = 1;
let blockY = 0;

const blocks = [
  {
    x: getRandomX(),
    y: blockY,
    h: blockHeight,
    w: getRandomBlockW()
  },
  {
    x: getRandomX(),
    y: blockY-200,
    h: blockHeight,
    w: getRandomBlockW()
  },
  {
    x: getRandomX(),
    y: blockY-400,
    h: blockHeight,
    w: getRandomBlockW()
  },
]

function setGrameBord(){
  canvas.style.display = 'block';
}

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

function getRandomX(){
  return Math.floor(Math.random() * canvas.width);
}
function getRandomBlockW(){
  return Math.floor(Math.random() * blockWidthMax) + 200;
}

function drawBlock(x, y, w, h) {
  ctx.beginPath();
  ctx.fillStyle = "tomato";
  ctx.fillRect(x, y, w, h);
  ctx.closePath(); 
  
}

function moveBlock(){
  
  blocks.forEach(block => {
    block.y += blockSpeed;
    if(block.y > canvas.height){
      block.y = 0;
    }
    drawBlock(block.x, block.y, block.w, block.h);
  })

}

function animate(){
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(imgRaod, 0, 0, canvas.width, canvas.height)
  drawCar()
  moveBlock()

  requestAnimationFrame(animate)

}

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
