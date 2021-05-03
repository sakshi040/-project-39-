var path,mainCyclist;
var player1,player2,player3;
var pathImg,mainRacerImg1,mainRacerImg2,mainRacerStrt;

var oppPink1Img,oppPink2Img,oppPinkStop;
var oppYellow1Img,oppYellow2Img,oppYellowStop;
var oppRed1Img,oppRed2Img,oppRedStop;
var gameOverImg,cycleBell;
var start_line,finish_line;
var pinkCG, yellowCG,redCG; 

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;
var gameOver, restart;

function preload(){
  pathImg = loadImage("images/Road.png");
  mainRacerStrt = loadAnimation("images/mainPlayer2.png")
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  mainRacerImg2= loadAnimation("images/mainPlayer3.png");
  
  oppPink1Img = loadAnimation("images/opponent1.png","images/opponent2.png");
  oppPink2Img = loadAnimation("images/opponent3.png");
  oppPinkStop = loadAnimation("images/opponent2.png");
  

  oppYellow1Img = loadAnimation("images/opponent4.png","images/opponent5.png");
  oppYellow2Img = loadAnimation("images/opponent6.png");
  oppYellowStop = loadAnimation("images/opponent5.png");

  
  oppRed1Img = loadAnimation("images/opponent7.png","images/opponent8.png");
  oppRed2Img = loadAnimation("images/opponent9.png");
  oppRedStop = loadAnimation("images/opponent8.png");

  
  cycleBell = loadSound("sound/bell.mp3");
  gameOverImg = loadImage("images/gameOver.png");
}

function setup(){
  
createCanvas(windowWidth,windowHeight);
// Moving background
// path=createSprite(100,150);
//path.addImage(pathImg);
//path.velocityX = -5;
start_line =createSprite(-displayWidth*3.9,displayHeight/2,100,displayHeight)
start_line.shapeColor = "red"


//creating boy running
mainCyclist  = createSprite(-displayWidth*4,displayHeight/2);
mainCyclist.addAnimation("SahilRunning",mainRacerStrt);
mainCyclist.scale=0.07;
  
//set collider for mainCyclist
mainCyclist.setCollider("rectangle",0,0,40,40);
  

finish_line =createSprite(displayWidth-1700 ,displayHeight/2,500,displayHeight)
finish_line.shapeColor = "green"
gameOver = createSprite(mainCyclist.x+50,displayHeight/2);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.8;
gameOver.visible = false;  
  
pinkCG = new Group();
yellowCG = new Group();
redCG = new Group();
  
}

function draw() {
  background(0);
  camera.position.x=mainCyclist.x
  camera.position.y=displayHeight/2
  image(pathImg,-displayWidth*4.4,0,displayWidth*5,displayHeight)
  finish_line =createSprite(displayWidth-1700 ,displayHeight/2,500,displayHeight)
finish_line.shapeColor = "green"

console.log(mainCyclist.x)

  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,900,30);
  
  if(gameState===PLAY){
    
   distance = distance + Math.round(getFrameRate()/50);
  //  path.velocityX = -(6 + 2*distance/150);
  
  // mainCyclist.y = World.mouseY;
  
   edges= createEdgeSprites();
   mainCyclist .collide(edges);
  
  //code to reset the background
  // if(path.x < 0 ){
  //   path.x = width/2;
  // }
  if(keyWentDown("RIGHT_Arrow")){
    mainCyclist.velocityX = 20
    mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  }
  else if(keyWentUp("RIGHT_Arrow")){
    mainCyclist.velocityX = 0
    mainCyclist.addAnimation("SahilRunning",mainRacerStrt);
  }
  if(keyWentDown("UP_Arrow")){
    mainCyclist.velocityY = -8
    mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  }
  else if(keyWentUp("UP_Arrow")){
    mainCyclist.velocityY = 0
    mainCyclist.addAnimation("SahilRunning",mainRacerStrt);
  }

  if(keyWentDown("DOWN_Arrow")){
    mainCyclist.velocityY = 8
    mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  }
  else if(keyWentUp("DOWN_Arrow")){
    mainCyclist.velocityY = 0
    mainCyclist.addAnimation("SahilRunning",mainRacerStrt);
  }

    //code to play cycle bell sound
  if(keyDown("space")) {
    cycleBell.play();
  }
  
  //creating continous opponent players
  var select_oppPlayer = Math.round(random(1,3));
  
  if (World.frameCount % 40 == 0) {
    if (select_oppPlayer == 1) {
      pinkCyclists();
    } else if (select_oppPlayer == 2) {
      yellowCyclists();
    } else {
      redCyclists();
    }
  }
  
   if(pinkCG.isTouching(mainCyclist)){
    // gameState = END;
     player1.velocityY = 0;
     player1.addAnimation("opponentPlayer1",oppPink2Img);
    //  player2.addAnimation("opponentPlayer2",oppYellowStop);
    //  player3.addAnimation("opponentPlayer3",oppRedStop);
     

    }
    
    if(yellowCG.isTouching(mainCyclist)){
     // gameState = END;
      player2.velocityY = 0;
      player2.addAnimation("opponentPlayer2",oppYellow2Img);
    //  player3.addAnimation("opponentPlayer3",oppRedStop);
    //  player1.addAnimation("opponentPlayer1",oppPinkStop);


    }
    
    if(redCG.isTouching(mainCyclist)){
     // gameState = END;
      player3.velocityY = 0;
      player3.addAnimation("opponentPlayer3",oppRed2Img);
    //  player1.addAnimation("opponentPlayer1",oppPinkStop);
    //  player2.addAnimation("opponentPlayer2",oppYellowStop);
    
    }
    

}

if (mainCyclist.distance>1000){
gameState=0
}

else if (gameState === END) {
  // gameOver = createSprite(mainCyclist.x+50,displayHeight/2);
  // gameOver.addImage(gameOverImg);
  // gameOver.scale = 0.8;
  // gameOver.visible = true
  textSize(80);
    fill("red");
   textFont("BroadWay")
    stroke("white")
    strokeWeight(10)
    text("GAME OVER", mainCyclist.x+50,displayHeight/2);
  
    textSize(20);
    fill(255);
   textFont("Ariel")
   strokeWeight(3)
    text("Press Up Arrow to Restart the game!", mainCyclist.x+50,displayHeight/2+100);
  
  //  path.velocityX = 0;
    mainCyclist.velocityY = 0;
    mainCyclist.velocityX = 0;

    mainCyclist.addAnimation("SahilRunning",mainRacerImg2);
  
    pinkCG.setVelocityXEach(0);
    pinkCG.setLifetimeEach(-1);
  
    yellowCG.setVelocityXEach(0);
    yellowCG.setLifetimeEach(-1);
  
    redCG.setVelocityXEach(0);
    redCG.setLifetimeEach(-1);
    
    if(keyDown("UP_ARROW")) {
      reset();
    }
}
}

function pinkCyclists(){
        player1 =createSprite(displayWidth,Math.round(random(70, displayHeight-100)));
        player1.scale =0.06;
        //if(mainCyclist.velocityX >= 10){
        player1.velocityX = -(6 + 2*distance/150);
      // }
      //   else{
      //   player1.velocityX = 0

      //   }
        player1.addAnimation("opponentPlayer1",oppPink1Img);
        player1.setLifetime=170;
        pinkCG.add(player1);
}

function yellowCyclists(){
        player2 =createSprite(displayWidth,Math.round(random(70, displayHeight-100)));
        player2.scale =0.06;
        // if(mainCyclist.velocityX >= 10){
          player2.velocityX = -(6 + 2*distance/150);
        // }
          // else{
          // player2.velocityX = 0
  
          // }
        player2.addAnimation("opponentPlayer2",oppYellow1Img);
        player2.setLifetime=170;
        yellowCG.add(player2);
}

function redCyclists(){
        player3 =createSprite(displayWidth,Math.round(random(70, displayHeight-100)));
        player3.scale =0.06;
        // if(mainCyclist.velocityX >= 10){
          player3.velocityX = -(6 + 2*distance/150);
        // }
        //   else{
        //   player3.velocityX = 0
  
        //   }
        player3.addAnimation("opponentPlayer3",oppRed1Img);
        player3.setLifetime=170;
        redCG.add(player3);
}

function reset(){
  gameState = PLAY;
  mainCyclist.x = -displayWidth*4
  mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  
  pinkCG.destroyEach();
  yellowCG.destroyEach();
  redCG.destroyEach();
  
  distance = 0;
}