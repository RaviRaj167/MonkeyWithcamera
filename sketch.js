var backImage,backg;
var player, player_running;
var ground,ground_img;
var FoodGroup, bananaImage;
var obstaclesGroup, obstacle_img;
var gameOver;
var score=0;


function preload(){
  backImage=loadImage("jungle.jpg");
  player_running=  loadAnimation ( "Monkey_01.png" ,"Monkey_02.png", "Monkey_03.png", "Monkey_04.png","Monkey_05.png" ,"Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png","Monkey_10.png");
  bananaImage = loadImage("banana.png");
  obstacle_img = loadImage("stone.png"); 
  
}

function setup() {
  createCanvas(displayWidth,displayHeight);
  
  backg=createSprite(0,0,displayWidth,displayHeight);
  backg.addImage(backImage);
  backg.scale=3.5;
  backg.x=backg.width/2;
  backg.velocityX=-4;
  
  player = createSprite(10,displayHeight-100,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.3;
 
  ground = createSprite(100,displayHeight-80,800,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=false;
  
  FoodGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  
  background(255);
  camera.position.x=player.x
  camera.position.y=player.y
   
    
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  if(backg.x<100){
    backg.x=backg.width/2;
  }
  
    if(FoodGroup.isTouching(player)){
      FoodGroup.destroyEach();
    score = score + 2;
    }
    switch(score){
        case 10: player.scale=0.12;
                break;
        case 20: player.scale=0.14;
                break;
        case 30: player.scale=0.16;
                break;
        case 40: player.scale=0.18;
                break;
        default: break;
    }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);
    spawnFood();
    spawnObstacles();
 
    if(obstaclesGroup.isTouching(player)){ 
        player.scale=0.08;
     
    }
  
  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);


}

function spawnFood() {
  
  if (frameCount % 80 === 0) {
    var banana = createSprite(displayWidth+200,displayHeight-100,40,10);
    banana.y = random(displayHeight-200,displayHeight-300);    
    banana.addImage(bananaImage);
    banana.scale = 0.09;
    banana.velocityX = -5;
    banana.lifetime = 500;
    player.depth = banana.depth + 1;
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(displayWidth+200,displayHeight-90,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacle_img);
    obstacle.scale = 0.2;
    obstacle.lifetime = 500;
    obstaclesGroup.add(obstacle);
  }
}
