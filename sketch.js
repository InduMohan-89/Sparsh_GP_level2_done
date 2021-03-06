var ground,player;
var monster,meteor,monsterImg,meteorImg,meteorGroup,playerLives=3
var monsterLives=5;

var gameState = 0;
var count =0;

var ans, ropeObj,x;

const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

function preload(){
  bg1 = loadImage("background.jpg");
  playerImg = loadImage("player.png");
  monsterImg=loadImage("creeper.png")
  meteorImg=loadImage("meteor.png")
}

function setup() {
  createCanvas(displayWidth,displayHeight);

  engine = Engine.create();
  world = engine.world;

  ground = createSprite(width/2, height/2, width+100, height);
  ground.addImage(bg1);
  ground.scale =2.5;
  ground.velocityX = -2;

  ground2 = createSprite(width/2, height-20, width+100, 20);  

  player = createSprite(200, height-170);
  player.addImage(playerImg);
  player.scale = 0.5;
  player.velocityX=5

meteorGroup= new Group()



monster=createSprite(-50,height-170)
monster.addImage(monsterImg)
monster.scale=0.8
monster.velocityX=5

ques = new Question();

ropeObj = new Rope(6,{x:200,y:200});

}

function draw() {
  //background("red"); 

if(gameState === 0){

  if(keyDown(RIGHT_ARROW)){
    player.velocityX+=2
    
    }

  if(ground.x <width/2 - 150){
        ground.x = width/2;
  }
    
      player.collide(ground2);
  //player control
  if(keyDown("space")){
    player.velocityY = -12;
  } 

//gravity
  player.velocityY += 0.5;

//resetting the player's and monster's position
  if(player.x>width) {
    player.x=200
   
     }
   
   if(monster.x>width) {
   monster.x=-50
   
   }

if(monster.isTouching(player)) {
playerLives-=1;

}

//player.overlap(meteorGroup, function(collector, collected){

 // playerLives -=1;

  //collected.remove();
//})


monster.collide(meteorGroup, function(collector, collected){
  playerLives -=1;

  collected.remove();

  count +=1;
})


if(playerLives===0) {
stop();
gameOver();

}


  spawnMeteors();

  drawSprites();




  textSize(50)
  fill("black")
  text("Lives:"+playerLives,width-200,100)
  
  text("Meteor touched the monster: "+ count + " times",20,100);

  if(count === 1){
    gameState =1;
    
  }

}

    if(gameState ===1){
      background("beige");

      ques.display();
      ques.handleButton();
      
      if(ans){
        gameState = 3;
      }
      else if(x === "2"){
        gameState = "end";
      }
      else if(x === "3"){
        gameState = "end";
      }
      else if(x === "4"){
        gameState = "end";
      }

    }

if(gameState === 3){
  ques.hide();

  ropeObj.show();
}

if(gameState === "end"){
  gameOver();
}
}
function spawnMeteors() {
  if(frameCount%100===0) {
  meteor=createSprite(random(10,width-100),0,50,50)
  meteor.velocityY=10
  meteor.addImage(meteorImg)
  meteor.scale=0.5
  meteorGroup.add(meteor)
  
  
  }
  
  
  
  }
  function gameOver()
  { swal({
    title: `Game Over`, text: "Oops you lost the race....!!!",
 
 imageUrl: "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
  imageSize: "100x100", confirmButtonText: "Thanks For Playing"
  },
  function(isConfirm){
    window.location.reload()
  }); }



   function stop() {
meteorGroup.destroyEach()
//player.remove()
monster.remove()


   }
   function victory()
   { swal({
     title: `Well Done`, text: "Proceed to the next level....!!!",
  
  imageUrl: "https://www.google.com/url?sa=i&url=https%3A%2F%2Ftenor.com%2Fview%2Fthumbs-up-people-joypixels-approved-agreed-gif-17522439&psig=AOvVaw0i6RPw9YKVmHWKICh-w2UX&ust=1645350731328000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCIjj4qG_i_YCFQAAAAAdAAAAABAN",
   imageSize: "100x100", confirmButtonText: "Move onto the Next Level!"
   }); }  