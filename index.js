
//variables3
let frogDie = false;
let playerLocation = {"x":450, "y":650 , "w":50, "h":50};
let winZone = {"x":400, "y": 0, "w": 200, "h": 50};
//bigX use to move the levelUp sign
let bigX = 0;
let playerColor = "blue";
let carArray = [];
let boatLeftArray = [];
let boatRightArray = [];
let level = 1;
let speedForEachLevel = [];
let currentSpeedForBoatLeft = 1
let currentSpeedForBoatRight = 1;
let currentSpeedForCar = 1;
let frogOnBoat = null;
let boatCurrentDirection = null;

//document for level
let levelDoc= document.querySelector(".level");

//create 2d canas
//pass this to every functions that need to draw
let froggerCanvas = document.querySelector("#frogger-canvas");
let ctx = froggerCanvas.getContext("2d");

//function draw to clearRect
function draw(myCtx, myFroggerCanvas){
    myCtx.clearRect(0, 0, myFroggerCanvas.width, myFroggerCanvas.height);
    startArea(myCtx, 0, 650, myFroggerCanvas.width, 100);
    roadArea(myCtx, 0 , 350, myFroggerCanvas.width, 300);
    middleStop(myCtx, 0, 300, myFroggerCanvas.width, 50 );
    riverArea(myCtx, 0 ,50, myFroggerCanvas.width, 250);
    endStop(myCtx,0,0,myFroggerCanvas.width,50);
    drawGoal(myCtx, winZone.x, winZone.y, winZone.w, winZone.h);
}
//functions
//areas
function startArea(myCtx,x,y,w,h){
    myCtx.fillStyle = "green";
    myCtx.fillRect(x,y,w,h);
}
function roadArea(myCtx,x,y,w,h){
    myCtx.fillStyle = "hsl(25, 15%, 64%)";
    myCtx.fillRect(x,y,w,h);
}
function middleStop(myCtx,x,y,w,h){
    myCtx.fillStyle = "green";
    myCtx.fillRect(x,y,w,h);
}
function riverArea(myCtx,x,y,w,h){
    myCtx.fillStyle = "hsl(206, 70%, 61%)";
    myCtx.fillRect(x,y,w,h);
}
function endStop(myCtx,x,y,w,h){
    myCtx.fillStyle = "hsl(11, 95%, 43%)";
    myCtx.fillRect(x,y,w,h);
}
//player (frogger)
function drawFrogger(myCtx,x,y,w,h, color=playerColor){
    myCtx.fillStyle = color;
    myCtx.fillRect(x,y,w,h);
}
//car
function drawCar(myCtx,x,y,w,h){
    myCtx.fillStyle = "hsl(349,98%,34%)";
    myCtx.fillRect(x,y,w,h);
}
//Wood
function drawWood(myCtx,x,y,w,h,color){
    myCtx.fillStyle = color;
    myCtx.fillRect(x,y,w,h);
}
//goal
function drawGoal(myCtx,x,y,w,h){
    myCtx.fillStyle = "green";
    myCtx.fillRect(x,y,w,h);
}
//function draw game over
function drawGameOver(ctx, x,y, fontSize, fontName, textAlign){
    ctx.fillStyle = "black";
    ctx.font = `${fontSize}px ${fontName}`;
    ctx.textAlign = `${textAlign}`;
    ctx.fillText("You Died!", x, y)
}
//function draw level up
function drawLevelUp(ctx, x,y, fontSize, fontName, textAlign, myLevel, hide){
    ctx.fillStyle = "black";
    ctx.font = `${fontSize}px ${fontName}`;
    ctx.textAlign = `${textAlign}`;
    if(hide){
        console.log("true")
        ctx.fillText("", x, y)
    }else{
        console.log("false")
        ctx.fillText("Level Up " + myLevel, x, y)
    }
   
}

//update player location
function updatePlayerLocation(myCtx, playerLocation, myColor){
    drawFrogger(myCtx,playerLocation.x,playerLocation.y, playerLocation.w, playerLocation.h, myColor);
}
function updatePlayerLocationWrapper(){
    window.requestAnimationFrame(updatePlayerLocationWrapper);
    updatePlayerLocation(ctx, playerLocation, playerColor);
}

//movement function
function move(myCtx, playerLocation, myZoneWin){
    document.addEventListener("keydown", function detectMovement(e){
        if(!frogDie){
            if(e.keyCode == 37){
                if(playerLocation.x - 50 < 0){
                    playerLocation.x = 0;
                }else {
                    playerLocation.x -= 50;
                }
                updatePlayerLocation(myCtx, playerLocation)
            }else if (e.keyCode == 39){
                if(playerLocation.x + 50 >= 1000){
                    playerLocation.x = 950;
                }else {
                    playerLocation.x += 50;
                }
                updatePlayerLocation(myCtx, playerLocation)
            }else if (e.keyCode == 38){
                if(playerLocation.y == 50 && playerLocation.x >= myZoneWin.x && playerLocation.x + playerLocation.w <= myZoneWin.x + myZoneWin.w){
                    if( playerLocation.y - 50 < 0){
                        playerLocation.y = 0;
                    }else {
                        playerLocation.y -= 50;
                    }
                }else if (playerLocation.y != 50){
                    if( playerLocation.y - 50 < 0){
                        playerLocation.y = 0;
                    }else {
                        playerLocation.y -= 50;
                    }
                }
                updatePlayerLocation(myCtx, playerLocation)
            }else if (e.keyCode == 40){
                if( playerLocation.y + 50 >= 700){
                    playerLocation.y = 650;
                }else {
                    playerLocation.y += 50;
                }
                
                updatePlayerLocation(myCtx, playerLocation)
            }
        }
    });
};

//create car
function generateCar(myCarArray){
    let placeY = 350;
    let tempCar = [];
    let placeX = 1000;
    for ( let i = 0; i < 6; i++){
        for(let j = 0; j < 6; j++){
            tempCar.push({"x":  placeX, "y": placeY, "w": 50 , "h": 50 })
            placeX -= 250;
        }
        placeX = 1000
        placeY += 50;
        myCarArray.push(tempCar);
        tempCar = [];
    }
}
//call to generate car block
generateCar(carArray);

//update car location and draw it,
function updateCarLocation(myCtx, myCarArray, myCarSpeed){
    let speed = myCarSpeed;
    for(let i = 0; i < myCarArray.length; i++){
        let x = -250;
        if(i % 2 == 0){
            speed += 1;
        }else{
            speed = myCarSpeed;
        }
        for(let j = 0; j < 6; j++){
            drawCar(myCtx, myCarArray[i][j].x, myCarArray[i][j].y, myCarArray[i][j].w, myCarArray[i][j].h);
            if(myCarArray[i][j].x < 1000){
                myCarArray[i][j].x += speed;
            }else{
                myCarArray[i][j].x = x;
                x -= 250;
            }
        }  
        x = -250;
    }
   
}
function updateCarWrapper(){
    window.requestAnimationFrame(updateCarWrapper);
    updateCarLocation(ctx, carArray, currentSpeedForCar);
}

//generate boat
function generateBoat(boatLeft,boatRight){
    let tempLeft = [];
    let tempRight = [];
    let placeY = 50;
    let placeX = 1000;
    let placeRX = 1250;
    for(let i = 0; i < 5; i++){
        for(let j = 0; j < 6; j++){
            if(i % 2 == 1){
                tempLeft.push({"x":  placeX, "y": placeY, "w": 150 , "h": 50 })
                placeX -= 350;
            }else{
                tempRight.push({"x":  placeRX, "y": placeY, "w": 150 , "h": 50 })
                placeRX += 350;
            }
          
        }
        placeX = 1000;
        placeRX = 1250;
        placeY += 50;
        if(i % 2 == 1){
            boatLeft.push(tempLeft);
            tempLeft = [];
        }else{
            boatRight.push(tempRight);
            tempRight = [];
        }
    }
    console.log(boatLeft)
    console.log(boatRight)
}
//call to generate boat
generateBoat(boatLeftArray, boatRightArray);
//update boat location
function updateBoatLeftLocation(myCtx, boatLeft, myBoatLeftSpeed){
    let speed = myBoatLeftSpeed;
    let x = -350;
    for(let i = 0; i < boatLeft.length; i++){
        for(let j = 0; j < boatLeft[i].length; j++){
            drawWood(myCtx, boatLeft[i][j].x,boatLeft[i][j].y, boatLeft[i][j].w, boatLeft[i][j].h, "#87696e");
            if(boatLeft[i][j].x < 1350){
                boatLeft[i][j].x += speed;
            }else{
                boatLeft[i][j].x = x;
                //console.log("x",  boatLeft[i][j].x)
                x -= 350;    
            }
        
        }
        x = -350;
    }
}
function updateBoatRightLocation(myCtx, boatRight, myBoatRightSpeed){
    let speed =  myBoatRightSpeed;
    for(let i = 0; i < boatRight.length; i++){
        let x = 1350;
        for(let j = 0; j < boatRight[i].length; j++){
            drawWood(myCtx, boatRight[i][j].x,boatRight[i][j].y, boatRight[i][j].w, boatRight[i][j].h, "#634e51");
            if(boatRight[i][j].x  > -350){
                boatRight[i][j].x -= speed;
            }else{
                boatRight[i][j].x  = x;
                //console.log("xR",  boatRight[i][j].x)
                x += 350;
            }
        }
        x = 1350;
    }
}
//updateBoat wrapper
function updateBoatWrapper(){
    window.requestAnimationFrame(updateBoatWrapper);
    updateBoatLeftLocation(ctx, boatLeftArray, currentSpeedForBoatLeft);
    updateBoatRightLocation(ctx, boatRightArray, currentSpeedForBoatRight);
}

//detect is the frog hit any car
//if hit game over
//clear moveInterval
//worked!(done)
function detectFrogHitTheCar(myFrog, myCarArray){
   // console.log("frog:", myFrog);
    for(let i = 0; i < myCarArray.length; i++){
        for(let j = 0; j < myCarArray[i].length; j++){
            if(myCarArray[i][j].x < myFrog.x + myFrog.w && myCarArray[i][j].x + myCarArray[i][j].w > myFrog.x && myCarArray[i][j].y < myFrog.y + myFrog.h && myCarArray[i][j].y + myCarArray[i][j].h > myFrog.y){
                console.log("hit!!!!!")
                frogDie = true;
            }
        }
        
    }
};
//next we will have to detect frog on the wooden boat
//if any part of the frog not on the boat, it's consider a fall into water
//it mean the frog will not travel on the boat, if frog is not travel on the boat from a certain position to certain position, it's consider fall on water and die
//if all 4 side of the frog are on the boat top = , bottom = , left < or = , right = or <
//then the frog will travel with that boat,
//if that boat hit left 0 or right 1000
//frog will not go on, and fall on water if more than 100 of  boat (150) are into the 1000 or 0 zone
//the moment it no longer all the water (all side), it will fall and die
//all function like moving backward and forward are still the same
function detectFrogOnTheLeftBoat(myFrog, myLeftBoat){
    for(let i = 0; i < myLeftBoat.length; i++){
        for(let j = 0; j < myLeftBoat[i].length; j++){
            //forg x must be less than boat x or equal, frog right(x+w) must be = or < boat x + w
            //top must be equal
            //work!!! 
            //need to done ||||||
            if(myLeftBoat[i][j].x <= myFrog.x && myLeftBoat[i][j].x + myLeftBoat[i][j].w > myFrog.x + myFrog.w && myLeftBoat[i][j].y >= myFrog.y && myLeftBoat[i][j].y + myLeftBoat[i][j].h >= myFrog.y + myFrog.h){
                //console.log("Your frog is on the wooden Left boat now!")
                frogOnBoat = myLeftBoat[i][j];
                return true;
            } else {
                //nothing
            }
        }
    }
};
function detectFrogOnTheRightBoat(myFrog, myRightBoat){
    for(let i = 0; i < myRightBoat.length; i++){
        for(let j = 0; j < myRightBoat[i].length; j++){
            if(myRightBoat[i][j].x <= myFrog.x && myRightBoat[i][j].x + myRightBoat[i][j].w > myFrog.x + myFrog.w && myRightBoat[i][j].y >=  myFrog.y && myRightBoat[i][j].y + myRightBoat[i][j].h >= myFrog.y + myFrog.h){
               //if it's on any of the boat in here, then capture that currentBoat
               frogOnBoat = myRightBoat[i][j];
               return true;
            } else {
                //nothing happen, fade into the void
            }
        }
    }
};

//function that will updateplayerLocation to match boat speed as long as they are not out of boundary
function updatePlayerLocationWhenOnBoat(myFrog, mySpeedRight, mySpeedLeft, direction, frogOnBoat){
    //detectFrogOnTheLeftBoat(playerLocation, boatLeftArray);
    let trueOrFalseRIGHT = detectFrogOnTheRightBoat(playerLocation, boatRightArray);
    let trueOrFalseLEFT = detectFrogOnTheLeftBoat(playerLocation, boatLeftArray);
    //checking right Boat
    if(myFrog.y == 250 || myFrog.y == 150 || myFrog.y == 50){
        if(trueOrFalseRIGHT){
           // console.log("we are on a boat!")
            //console.log("frogonBoat:", frogOnBoat);
            //if you are on a boat, travel along on that boat with that speed
            if(myFrog.x > 0){
                myFrog.x -= mySpeedRight;
            }
           //console.log("myFrog:", myFrog.x);
           drawFrogger(ctx,playerLocation.x,playerLocation.y, playerLocation.w, playerLocation.h, );
        }else{
            //console.log("we are not on any of the boat at all!")
            //if you are not on that boat, you are dead!
            frogDie = true;
            drawFrogger(ctx,playerLocation.x,playerLocation.y, playerLocation.w, playerLocation.h, "red");
        }
    }else if (myFrog.y == 200 || myFrog.y == 100){
        if(trueOrFalseLEFT){
              drawFrogger(ctx,playerLocation.x,playerLocation.y, playerLocation.w, playerLocation.h, );
            //console.log("we are on a boat!")
            //console.log("frogonBoat:", frogOnBoat);
            //if you are on a boat, travel along on that boat with that speed
            if(myFrog.x + myFrog.w < 1000){
                myFrog.x += mySpeedLeft;
            }
         
        }else{
            frogDie = true;
            //console.log("we are not on any of the boat at all!")
            //if you are not on that boat, you are dead!
            drawFrogger(ctx,playerLocation.x,playerLocation.y, playerLocation.w, playerLocation.h, "red");
        }
    }
   
   
    
}

function updatePlayerOnBoatWrapper(){
    window.requestAnimationFrame(updatePlayerOnBoatWrapper)
    updatePlayerLocationWhenOnBoat(playerLocation, currentSpeedForBoatRight, currentSpeedForBoatLeft, boatCurrentDirection, frogOnBoat);
}
//stage- win condition
//levelUp- Update Speed
function isPlayerInGreenZone(myWinZone, myFrog){
    //console.log("Was i called?")
    if(myWinZone.x <= myFrog.x && myWinZone.x + myWinZone.w >= myFrog.x + myFrog.w && myWinZone.y == myFrog.y && myWinZone.y + myWinZone.h == myFrog.y + myFrog.h){
        return true;
    }else{
        return false;
    }
}
//is levelUpDraw?
function drawLevelUpWhenWin(){
    window.requestAnimationFrame(drawLevelUpWhenWin);
    if(bigX < 1000){
        drawLevelUp(ctx, bigX, 350, 100, "Arial", "Center", level, false)
        bigX +=5;
    }
}
function winAndLevelUp(myWinZone, myFrog){
    let winOrNot = isPlayerInGreenZone(myWinZone, myFrog);
    if(winOrNot){
        level += 1;
        currentSpeedForBoatLeft += 1;
        currentSpeedForBoatRight += 1;
        currentSpeedForCar += 1;
        myFrog.x = 450;
        myFrog.y = 650;
        //everytime frog win, reset bigX to 0
        bigX = 0;
        drawLevelUpWhenWin();
    }
   
}
function winAndLevelUpWrapper(){
    window.requestAnimationFrame(winAndLevelUpWrapper);
    winAndLevelUp(winZone, playerLocation);
}
//is game over?
function isGameOver() {
    window.requestAnimationFrame(isGameOver);
    if(frogDie){
        drawGameOver(ctx, 250, 350, 120, "Arial", "Center")
    }
}
//GAME RUN!!!!!!!
//CALL ALL THE FUNCTIONS FROM THE TOP THAT NEED TO BE CALL
//update Car

updateCarWrapper();
//update boat 
updateBoatWrapper();
//now frogger is on top of everything (all draws)
updatePlayerLocationWrapper();
//upateplayeronBoat
updatePlayerOnBoatWrapper();
//did you win, if so level up and increase speed, start at the bottom again
winAndLevelUpWrapper();
//is game over check
isGameOver();

//drawLevelUpWhenWinWrapper()
//move function to detect any movement
move(ctx, playerLocation, winZone);


//interval for draw to clear out the last draw
let gameSetinterval = setInterval(function game(){
    levelDoc.textContent = "LEVEL: " + level;
    draw(ctx, froggerCanvas);
    detectFrogHitTheCar(playerLocation, carArray);
},1)






