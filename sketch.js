var gun,bullet,backBoard;
var gunImg,redBubbleImg,bulletImg,blastImg,backBoardImg;
var redBubbleGroup,redbubble,bulletGroup;
var blast;

var scoreboard,heading;

var life = 3;
var score = 0;
var gameState = 1;

var score = 0;

function preload()
{
  gunImg = loadImage("gun1.png")
  blastImg = loadImage("blast.png")
  bulletImg = loadImage("bullet1.png")
  //blueBubbleImg = loadImage("waterBubble.png")
  redBubbleImg = loadImage("redbubble.png")
  backBoardImg = loadImage("back.jpg")
}

function setup() 
{
  createCanvas(800,800);

  backBoard = createSprite(50, width/2, 100,height);
  backBoard.addImage(backBoardImg)
  
  gun = createSprite(100, height/2, 50,50);
  gun.addImage(gunImg)
  gun.scale = 0.2
  
  bulletGroup = createGroup();   
  blueBubbleGroup = createGroup();   
  redBubbleGroup = createGroup();    

  heading = createElement("h1");
  scoreboard = createElement("h1");

  scoreboard.html("Score: "+score);
  scoreboard.style('color:red'); 
  scoreboard.position(width-200,20);

  heading.html("Life: "+life);
  heading.style('color:red'); 
  heading.position(width-600,20);
}

function draw() 
{
  background("#BDA297");

  //display Score and number of lifes

  if(gameState===1){
    gun.y = mouseY 
  }

  if(keyDown("space")){
    shootBullets();
  }
  
  if(redBubbleGroup.collide(bulletGroup)){
    redBubbleGroup.destroyEach();
    bulletGroup.destroyEach();
    handleBubbleCollision();
  }

  if(redBubbleGroup.collide(backBoard)){
    life = life - 1;
    redBubbleGroup.destroyEach();
  }

  if(redBubbleGroup.collide(backBoard) && life === 1){
    life = 0;
    backBoard.destroy();
    gun.destroy();
    redBubbleGroup.destroyEach();
    bulletGroup.destroyEach();
    gameOver();
  }

//calling fucntions
  DrawRedBubbles();

  drawSprites();
}

function shootBullets()
{
  bullet = createSprite(gun.position.x,gun.position.y-30,20,10);
  bullet.addImage(bulletImg);
  bullet.scale = 0.2;
  bullet.velocityX = 30;
  bullet.lifetime = 24;
  bulletGroup.add(bullet);
}

function DrawRedBubbles()
{
  if(frameCount % 80 === 0){
  redbubble = createSprite(800,Math.round(random(50,760)),30,30);
  redbubble.addImage(redBubbleImg);
  redbubble.scale = 0.1;
  redbubble.velocityX = -4;
  redbubble.lifetime = 180;
  redBubbleGroup.add(redbubble);
  }
}

function handleBubbleCollision(redBubbleGroup)
{
  if(life > 0){
    score = score + 1;
  }
  blast = createSprite(400,gun.position.y,30,30);
  blast.addImage(blastImg);
  blast.scale = 0.5;
  blast.lifetime = 20;
}

function gameOver(redBubbleGroup)
{
  swal({
    title: `Game Over`, 
    text: "Oops you lost the game....!!!", 
    text: "Your Score is " + score, 
    imageUrl:
    "https://cdn.shopify.com/s/files/1/1961/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios1", 
    imageSize: "100x100",
    confirmButtonText: "Thanks For Playing", });
}
