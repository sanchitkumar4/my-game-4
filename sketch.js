GameState="play";
var backgroundImg;
var zhunter,zhunterImg;
var zombieImg;
var hunterShoot;
var bullet,bulletImg;
var score;
var zombieGroup;
var fallhunter;
var zombie;
var bulletGroup;


function preload(){
  backgroundImg=loadImage("backgroundimg.jpg");
  zhunterImg=loadAnimation("gun animation (3).png","gun animation (3).png","gun animation (3).png");
  hunterShoot=loadAnimation("gun animation.png","gun animation (2).png","gun animation (3).png","gun animation (4).png");
  fallhunter=loadAnimation("gun animation (5).png","gun animation (5).png","gun animation (5).png");
  zombieImg=loadImage("zombies.png")
  bulletImg=loadImage("bullet (1).png");
}

function setup() {
  createCanvas(1500,800);

  zhunter=createSprite(80,200,30,30);
  zhunter.addAnimation("hunter",zhunterImg);
  zhunter.addAnimation("shooting",hunterShoot);
  zhunter.addAnimation("fall",fallhunter);
  zhunter.scale=0.7;
  score=0;

  zombieGroup= new Group();



}

function draw() {
  background(backgroundImg);
  if(GameState==="play"){
    spawnZombies();

    if(keyDown("space")){
    zhunter.changeAnimation("shooting",hunterShoot);
    bullet =createSprite(zhunter.x+65,zhunter.y-45,10,10);
    bullet.addImage("bullet",bulletImg);
    bullet.velocityX=3;
    bullet.scale=0.06;
    bullet.lifetime=500;
    //bulletGroup.add(bullet);

  }
  
  if(keyWentUp("space")){
     zhunter.changeAnimation("hunter",zhunterImg);
  }
  
  if(keyDown("UP_ARROW")){
    zhunter.y=zhunter.y-50
  }
  
  if(keyDown("DOWN_ARROW")){
    zhunter.y=zhunter.y+50;
  }
   if(bullet.isTouching(zombie)){
     zombie.destroy();
   }

  if(zombieGroup.isTouching(zhunter)){
     GameState="end";
     
  }
  }else if(GameState=="end"){
     zhunter.changeAnimation("fall",fallhunter);
     zombieGroup.setVelocityXEach(0);
     zombieGroup.setLifetimeEach(-1);
  }

  
  
fill("red");
textSize(20);
text("score: "+score,1300,50);


  drawSprites();
}

function spawnZombies(){
 if(frameCount%60==0){
  zombie =  createSprite(1500,200,30,30);
  zombie.y=Math.round (random(130,600));
  zombie.addImage(zombieImg);
  zombie.velocityX= -4;
  zombie.scale=0.3;
  zombie.lifetime=400;
  zombieGroup.add(zombie);
 }
}




