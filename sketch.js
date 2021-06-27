
var shooter , bruce_running , shooter_running
var banana ,bananaImage, bruce, bruceImage
var shooterGroup,bulletGroup
var score=0
var ground
var survivalTime=0
var bruce
var END = 0
var PLAY = 1
var gameState = PLAY

function preload(){
  
  roar = loadSound("roar.mp3")
  
  tonyStark = loadSound("heat-vision.mp3")

  bruce_running = loadAnimation("bruce_1.png","bruce_2.png","bruce_3.png","bruce_4.png","bruce_5.png","bruce_6.png")
  
  shooter_running = loadAnimation("shooter_1.png","shooter_2.png","shooter_3.png","shooter_4.png")

  hulk_uppercut = loadAnimation("hulk_1.png","hulk_2.png","hulk_3.png","hulk_4.png","hulk_5.png","hulk_6.png","hulk_7.png")

  bg_1 = loadImage("bg-1.jpg") 

  die = loadAnimation("bruce_1.png")

  mario = loadSound("jump.wav")
}



function setup() {
  createCanvas(windowWidth,500);

  amazon=createSprite(windowWidth,550,0,0)
  amazon.addImage(bg_1)
  amazon.scale=1.4
  amazon.velocityX=-4

  ground=createSprite(400,485,1000,10);
  ground.visible=false
  //ground.velocityX=-4;
  //ground.x=ground.width/2;
  
  //bruce=createSprite(80,415,20,20);
  
  bruce=createSprite(160,415,10,10);
  bruce.addAnimation("moving(1)",bruce_running);
  bruce.addAnimation("upppercut",hulk_uppercut)
  bruce.addAnimation("marjaa",die)
  bruce.scale=2;
  bruce.mirrorX(-1)

  bruce.setCollider("RECTANGLE",+10,0,110,100)

  shooterGroup=createGroup()
  bulletGroup=createGroup()
}


function draw() {
  background(0000,0000,0000);
  if(gameState===PLAY){
    if(amazon.x<950){
      amazon.x=windowWidth;
    }

    survivalTime=Math.ceil(frameCount/frameRate())

    if(keyWentDown("UP_ARROW")&&bruce.y>170){
      bruce.velocityY=-15;
      mario.play()
    }
  
    if(keyDown("space")){
      bruce.changeAnimation("upppercut",hulk_uppercut)
      bruce.mirrorX(1)
      bruce.scale=3.5
      roar.play()
      bruce.setCollider("RECTANGLE",-5,0,80,100)
      for ( var a = 0; a < shooterGroup.length; a++){
        if(shooterGroup.get(a)!==null&&bruce.collide(shooterGroup.get(a))){
          shooterGroup.get(a).destroy()
          score++
          bruce.velocityX=0
          bruce.velocityY=0
        }
      }
    }
  
    if(keyWentUp("space")){
      bruce.changeAnimation("moving(1)",bruce_running)
      bruce.mirrorX(-1)
      bruce.scale=2
      roar.stop()
      bruce.setCollider("RECTANGLE",+10,0,110,100)
    }
    bruce.velocityY=bruce.velocityY+0.8;
    bruce.collide(ground);
    metalsoldier()
    for ( var i = 0; i < bulletGroup.length; i++){
      if(bulletGroup.get(i)!==null&&bruce.collide(bulletGroup.get(i))){
        bulletGroup.get(i).destroy()
        gameState=END
      }
    }

  }else if(gameState===END){
    shooterGroup.destroyEach()
    amazon.velocityX=0000
    bruce.destroy()
  }

  drawSprites()

  stroke("white");
  textSize(20);
  fill("white");
  text("score: "+score,500,50);
  
  stroke("green");
  textSize(20);
  fill("white");
  text("Survival Time: "+survivalTime,100,50);

  if(gameState===END){
    stroke("red")
    textSize(90)
    fill("red")
    text("GAME OVER",windowWidth/2-200,250)
  }
}


function metalsoldier(){
   if(frameCount%400==0){
    shooter=createSprite(windowWidth,355,20,20);
    shooter.addAnimation("moving",shooter_running);
    shooter.scale=0.65;
    shooter.mirrorX(-1)
    shooter.velocityX=-4;
    shooter.lifetime=windowWidth/4;
    shooter.debug=true
    shooter.setCollider("RECTANGLE",15,-5,290,320)
    shooterGroup.add(shooter);
    if(frameCount%400==0||frameCount%425==0){
      bullet=createSprite(shooter.x-100,325,35,5)
      bullet.shapeColor="red"
      bullet.velocityX=-11
      bullet.lifetime=windowWidth/7;
      bulletGroup.add(bullet)
      tonyStark.play()
    }
  }
}
