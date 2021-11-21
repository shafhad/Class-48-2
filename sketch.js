var canvas;
var backgroundImage, bgImg, car1_img, car2_img,car3_img, track;
var database, gameState;
var form, player, playerCount,track;
var allPlayers=[]
var car1, car2;
var cars = [];

function preload() {
  backgroundImage = loadImage("Assets/Background.jpeg");
  car1_img = loadImage("Assets/Car1.png");
  car2_img = loadImage("Assets/Car2.png");
  car3_img = loadImage("Assets/Car3.png");
 track = loadImage("Assets/Background.jpeg");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}

function draw() {
  background(backgroundImage);
  if (playerCount === 1) {
    game.update(1);
  }

  if (gameState === 1) {
    game.play();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

 





