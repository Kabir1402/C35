var ball;
var database;
var position;

function setup(){

    //create a database inside the vble called database using firebase.database();
    database = firebase.database();
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    //to create a vble called ballPosition and make it to refer to the 'position' value that is created in the database using database.ref()
    var ballPosition = database.ref('ball/position');


    //create a listener for the ballPosition to listen to the values changing in the database using .on("value",function1,function2,...)
    ballPosition.on("value",readPosition,showError)
}

function draw(){
    if(position!==undefined){

    
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }

    drawSprites();
}
}

function writePosition(x,y){
    //to refer to the position value in the database and update the 'x' and 'y' entries there using the .set({})
    database.ref('ball/position').set({
       'x': position.x+x,
       'y': position.y+y
    })
  
}

function readPosition(data){
    //to store the listened values inside the variable called position using data.val()
//data.val() = brain
    position = data.val();

//assign the values of the position to the ball
ball.x = position.x;
ball.y = position.y;
}

function showError(){
    console.log("Error in reading/writing the values")
}
