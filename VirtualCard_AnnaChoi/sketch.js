let isGameOver = false;
let hasPlayedSuccessAudio = false;
let endGameImg;
let bee;
let honeyJarImg;
let honeyJarSize = 150;
let fullHoneyJarSize = 400; 
let flowerPink;
let flowerOrange;
let flowerBlue;
let flowerPurple;
let flowerRed;
let honeyCollected = 0;
let beeImg;
let flowerImgPink;
let flowerImgOrange;
let flowerImgBlue;
let flowerImgPurple;
let flowerImgRed;
let backgroundMusic, beeAudio, drinkingAudio, successAudio;

function preload() {
  //Images
  endGameImg = loadImage('images/EndGame.jpg');
  beeImg = loadImage('images/Bee.svg');
  honeyJarImg = loadImage('images/HoneyJar.svg');
  fullHoneyJarImg = loadImage('images/FullHoneyJar.svg');
  flowerImgPink = loadImage('images/Flower_Pink.svg');
  flowerImgOrange = loadImage('images/Flower_Orange.svg');
  flowerImgBlue = loadImage('images/Flower_Blue.svg');
  flowerImgPurple = loadImage('images/Flower_Purple.svg');
  flowerImgRed = loadImage('images/Flower_Red.svg');

  //Audio
  backgroundMusic = loadSound("Audio/Background.mp3");
  
  beeAudio = loadSound("Audio/Bee.mp3");
  drinkingAudio = loadSound("Audio/Drinking.mp3");
  drinkingAudio.setVolume(1.5);
  successAudio = loadSound("Audio/Success.mp3");
}

function setup() {
  createCanvas(800, 600);
  
  // Initialize bee and flower positions
  bee = { x: width / 2, y: height / 2, size: 100 };
  flowerPink = { x: width / 8.5, y: height / 1.8, size: 170, visible: true };
  flowerOrange = { x: width / 2.2, y: height / 1.6, size: 130, visible: true };
  flowerBlue = { x: width / 1.1, y: height / 1.7, size: 150, visible: true };
  flowerPurple = { x: width / 4, y: height / 1.1, size: 180, visible: true };
  flowerRed = { x: width / 1.4, y: height / 1.1, size: 190, visible: true };

  backgroundMusic.play(); // Start the background music
  backgroundMusic.setVolume(0.3);
}

function draw() {
  background('#81CBFC');
  
  // Draw garden (grass)
  fill('#4CAF50');
  rect(0, height * 0.7, width, height * 0.3);

   // Move bee towards mouse
   bee.x = lerp(bee.x, mouseX, 0.1);
   bee.y = lerp(bee.y, mouseY, 0.1);

   // If the bee is moving and the game is NOT over, play bee sound 
   if (dist(bee.x, bee.y, mouseX, mouseY) > 1 && !isGameOver) {
    if (!beeAudio.isPlaying()) {
        beeAudio.play();
    }
} else {
    beeAudio.stop();
}
  
  // Draw flowers
  if (flowerPink.visible) {
    image(flowerImgPink, flowerPink.x - flowerPink.size/2, flowerPink.y - flowerPink.size/2, flowerPink.size, flowerPink.size);
  }
  if (flowerOrange.visible) {
    image(flowerImgOrange, flowerOrange.x - flowerOrange.size/2, flowerOrange.y - flowerOrange.size/2, flowerOrange.size, flowerOrange.size);
  }
  if (flowerBlue.visible) {
    image(flowerImgBlue, flowerBlue.x - flowerBlue.size/2, flowerBlue.y - flowerBlue.size/2, flowerBlue.size, flowerBlue.size);
  }
  if (flowerPurple.visible) {
    image(flowerImgPurple, flowerPurple.x - flowerPurple.size/2, flowerPurple.y - flowerPurple.size/2, flowerPurple.size, flowerPurple.size);
  }
  if (flowerRed.visible) {
    image(flowerImgRed, flowerRed.x - flowerRed.size/2, flowerRed.y - flowerRed.size/2, flowerRed.size, flowerRed.size);
  }

// Draw bee image
image(beeImg, bee.x - bee.size/2, bee.y - bee.size/2, bee.size, bee.size);

// Draw HoneyJar image behind the honeyCollected counter
let jarX = -20;
let jarY = height - 550 - honeyJarSize / 2;  // Adjust Y position based on the size
image(honeyJarImg, jarX, jarY, honeyJarSize, honeyJarSize);

  // Display honey collection counter
  fill(0);
  textSize(30);
  text(` ${honeyCollected}`, 35, height - 547);

// Check if all flowers have been collected
if (honeyCollected >= 5 && !isGameOver) {
  isGameOver = true;
  backgroundMusic.stop();
  beeAudio.stop();
  if (!hasPlayedSuccessAudio) {
      successAudio.play();
      hasPlayedSuccessAudio = true; 
  }
}

// If the game is over, display the end screen
if (isGameOver) {
  image(endGameImg, 0, 0, width, height);  
}

}


function mousePressed() {
  // Check if bee is near any of the flowers and collect honey if so
  let pinkDist = dist(bee.x, bee.y, flowerPink.x, flowerPink.y);
  let orangeDist = dist(bee.x, bee.y, flowerOrange.x, flowerOrange.y);
  let blueDist = dist(bee.x, bee.y, flowerBlue.x, flowerBlue.y);
  let purpleDist = dist(bee.x, bee.y, flowerPurple.x, flowerPurple.y);
  let redDist = dist(bee.x, bee.y, flowerRed.x, flowerRed.y);
  
  if (pinkDist < (bee.size + flowerPink.size) / 2 && flowerPink.visible) {
    honeyCollected++;
    flowerPink.visible = false;  
    drinkingAudio.play(); 
  }
  if (orangeDist < (bee.size + flowerOrange.size) / 2 && flowerOrange.visible) {
    honeyCollected++;
    flowerOrange.visible = false; 
    drinkingAudio.play();  
  }
  if (blueDist < (bee.size + flowerBlue.size) / 2 && flowerBlue.visible) {
    honeyCollected++;
    flowerBlue.visible = false;  
    drinkingAudio.play(); 
  }
  if (purpleDist < (bee.size + flowerPurple.size) / 2 && flowerPurple.visible) {
    honeyCollected++;
    flowerPurple.visible = false; 
    drinkingAudio.play();  
  }
  if (redDist < (bee.size + flowerRed.size) / 2 && flowerRed.visible) {
    honeyCollected++;
    flowerRed.visible = false;  
    drinkingAudio.play(); 
  }
  
}

// function resetGame() {
//   honeyCollected = 0;
//   isGameOver = false;
  
//   // Reset flower visibility
//   flowerPink.visible = true;
//   flowerOrange.visible = true;
//   flowerBlue.visible = true;
//   flowerPurple.visible = true;
//   flowerRed.visible = true;
// }
