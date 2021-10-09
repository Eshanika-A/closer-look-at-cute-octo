var PLAY = 0;
var END = 1;
var gameState = PLAY;
var octo , octoS, octoI ,  restart;
var f1,f2,f3,f4,c1,c2,c3,c4
var foodGroup, obstacleGroup, food, obstacle
var score=0;
var points=0;
var back, bgImage, jumpS, dieS;


function preload(){
  
  bgImage = loadImage("bg1.jpg");
 octoI= loadImage("octo.png")
 octoS= loadImage("octo s.png")
  f1 = loadImage("f1.png");
  f2= loadImage("f2.png");
  f3 = loadImage("f3.png");
  f4 = loadImage("f4.png");
 c1 = loadImage("c1.png");
 c2 = loadImage("c2.png");
 c3 = loadImage("c3.png");
 c4 = loadImage("c4.png");
 restartImg = loadImage("restart.png");
 jumpS = loadSound("water.wav")
 dieS = loadSound("checkPoint.mp3")

}


function setup() {
  createCanvas(600,400);


  back = createSprite(100, 100,10,10)
  back.addImage( bgImage);
  back.scale = 2;
  
 
  octo = createSprite(80,300,10,10);
  octo.scale = 0.4;
  octo.addImage(octoI);

  ground = createSprite(300,350,1700,10);
  ground.x= ground.width/2;
  ground.visible = false;

  restart = createSprite(250,180);
  restart.addImage(restartImg);
  restart.scale = 0.5;
  restart.visible = false;
 
  obstacleGroup = createGroup();
  foodGroup = createGroup();

  
}


function draw() {
background("cyan");

octo.x=camera.position.x=200;

drawSprites(); 
  
  if (gameState === PLAY){
     foods();
     obstacles();

     back.velocityX=-3

     if(back.x<100) {
        back.x=400
     }
   
    ground.velocityX = -(4+score*1.5/100);
    
   score = score + Math.round(getFrameRate()/60);
  
  
    if(keyDown("space")&&octo.y >= 225) {
     octo.velocityY = -10; 
  
    }
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
  
    octo.velocityY = octo.velocityY + 0.8;
  
    if (octo.isTouching(foodGroup)){
      points = points+1;
      score= score+5;  
      jumpS.play();
      foodGroup.destroyEach();
    
    }
    
    switch (score) {
        case 10:
          octo.scale = 0.5;
          break;
        case 20:
          octo.scale = 0.3;
          break;
        case 30:
          octo.scale = 0.6;
          break;
        case 40:
          octo.scale = 0.4;
          break;
        default:
          break;
      }
      
    
    
    if (octo.isTouching(obstacleGroup)){
       obstacleGroup.destroyEach();
       foodGroup.destroyEach();
       dieS.play();
      gameState = END;
    }
    
  }
  
  if (gameState === END){
  
    ground.velocityX = 0;
    back.velocityX = 0;
   
    restart.x=camera.position.x;
    
    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setVelocityXEach(0);
    foodGroup.setLifetimeEach(-1);
    restart.visible = true;
    octo.addImage(octoS);
    
    octo.scale=0.7;
      
    fill("red")
    stroke("white")
    textSize(35);
    text("GAME OVER", 100,160);
   
    
    if(mousePressedOver(restart)) {
      foodGroup.destroyEach();
      obstacleGroup.destroyEach();
      restart.visible = false;
      octo.addImage(octoI);
      octo.scale=0.4;
      score = 0;
      gameState = PLAY;
      points=0;
      
    }
    
  }
 octo.collide(ground);
  
  stroke("white");
  textSize(25);
  fill("magenta");
  text("Score:" + score,  camera.position.x,50);
  text("Points: "+points,50,55);
  
  
}


function foods(){
  if (frameCount%60 === 0){
    
  food = createSprite(camera.position.x+500,150,50, 50 )
  food.scale = 0.3;

  var rand = Math.round(random(1,4));
  switch(rand) {
    case 1: food.addImage(f4);
            break;
    case 2: food.addImage(f3);
            break;
    case 3: food.addImage(f2);
            break;
    case 4: food.addImage(f1);
            break;
    default: break;
  }
   
   food.velocityX =-(6+score*0.2/100);           
    food.lifetime = 300;
    foodGroup.add(food);
    
  }
}


function obstacles(){
  if (frameCount%60 === 0){
    
    obstacle = createSprite(camera.position.x+400,320,50,50);
    obstacle.scale = 0.4;
    obstacle.velocityX = -(6 + 3*score/100); 
 
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: obstacle.addImage(c4);
              break;
      case 2: obstacle.addImage(c3);
              break;
      case 3: obstacle.addImage(c2);
              break;
      case 4: obstacle.addImage(c1);
              break;
      default: break;
    }
    obstacle.lifetime = 300;
    obstacleGroup.add(obstacle);
      
  }
}




