//Create variables here
var dog, dogImg, dogImgHappy, FoodS, foodStock, food;
var database;
function preload()
{
	//load images here
  dogImg = loadImage("images/dogImg.png");
  dogImgHappy = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500, 500);
  dog = createSprite(250,250,40,40);

  dog.addImage(dogImg);
  dog.scale = 0.3;
  database = firebase.database();
  
  food = 'Food';
  database.ref('/').update({
    Food : 15 
  })//foodStock = 15//foodStock = database.ref(food);
  getFoodCount();
  
}


function draw() {  
  background("yellow")
  
  if(keyDown("space")){
    writeStock();
    dog.addImage(dogImgHappy);
  }
  
  drawSprites();
  fill("red");
  text("Food remaining : "+ foodStock, 250,100);
  text("To feed the dog a milk bottle, press the space bar", 150,50);
  //add styles here

}
function getFoodCount(){
  foodCountRef = database.ref(food);
  foodCountRef.on("value",function(data){
    foodStock = data.val();
    //console.log(foodStock);
 })
}



function writeStock(){
  if(foodStock <= 0){
    foodStock = 0;
  }
  else{foodStock = foodStock-1}
  database.ref('/').update({
    Food : foodStock 
  })
  console.log(foodStock);
}