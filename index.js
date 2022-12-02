let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

let cellSize = 50;
let snakeCells = [[0,0]];

let boardWidth=1000;
let boardHeight=600;

let foodCells = generateRandomCoords();

let direction = 'right';

let gameOver = false;  

let score = 0;

let intervalId = setInterval(function(){
    update();
    draw();
}, 125);

document.addEventListener('keydown', function(event){
    if(event.key === 'ArrowUp'){
        direction = 'up';
    }else if(event.key === 'ArrowDown'){
        direction = 'down';
    }else if(event.key === 'ArrowLeft'){
        direction = 'left';
    }else if(event.key === 'ArrowRight'){
        direction = 'right';
    }
});



function update(){
    //getting snake head
    let headX = snakeCells[snakeCells.length - 1][0];
    let headY = snakeCells[snakeCells.length - 1][1];

    //updating snake head
    let newHeadX;
    let newHeadY;

    if (direction === 'right'){
        newHeadX = headX + cellSize;
        newHeadY = headY;

        if(newHeadX === boardWidth){
            gameOver = true;
        }
        
    }else if(direction === 'down'){
        newHeadX = headX;
        newHeadY = headY + cellSize;

        if(newHeadY === boardHeight){
            gameOver = true;
        }

    }else if(direction === 'up'){
        newHeadX = headX;
        newHeadY = headY - cellSize;

        if(newHeadY < 0){
            gameOver = true;
        }

    }else{
        newHeadX = headX - cellSize;
        newHeadY = headY;

        if(newHeadX < 0){
            gameOver = true;
        }
    }

    //updating snakeCells array
    snakeCells.push([newHeadX, newHeadY]);

    if(newHeadX === foodCells[0] && newHeadY === foodCells[1]){
        foodCells = generateRandomCoords();
        score+=1;
    }else{
        snakeCells.shift();
    }
}

function draw(){

    if(gameOver === true){
        clearInterval(intervalId);
        ctx.font = '50px sans-serif';
        ctx.fillText('Game Over!', 100, 100);
        return;
    }

    ctx.clearRect(0,0,boardWidth,boardHeight);

    //Snake Draw
    snakeCells.forEach((cell,index) => {
        if(index!==snakeCells.length-1){
            ctx.fillStyle = 'aqua';
            ctx.fillRect(cell[0], cell[1], cellSize, cellSize);
            ctx.strokeStyle = 'black';
            ctx.strokeRect(cell[0], cell[1], cellSize, cellSize);    
        }else{
            ctx.fillStyle = 'blue';
            ctx.fillRect(cell[0], cell[1], cellSize, cellSize);
            ctx.strokeStyle = 'black';
            ctx.strokeRect(cell[0], cell[1], cellSize, cellSize);
        }
    })

    //Food Draw
    ctx.fillStyle = 'white';
    ctx.fillRect(foodCells[0], foodCells[1], cellSize, cellSize);

    //Draw Score
    ctx.font = '24px sans-serif';
    ctx.fillText(`Score: ${score}`, 20, 20)

}

function generateRandomCoords(){
    return[
        Math.round(Math.random()*(boardWidth - cellSize)/cellSize) * cellSize,
        Math.round(Math.random()*(boardHeight - cellSize)/cellSize) * cellSize
    ]
}