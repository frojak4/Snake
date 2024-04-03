const blockSize = 25;
const rows = 20;
const cols = 20;
let board;
let context;
let snakeY = 3 * blockSize;
let snakeX = 4 * blockSize;
let foodX = 3 * blockSize;
let foodY = 7 * blockSize;
let velocityX = 0;
let velocityY = 0;
let snakeBody = []
let score = 0;
const mainDiv = document.getElementById("maindiv");
const scoreDiv = document.getElementById("score");

window.onload = function() {
    board = document.getElementById("board")
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");

    gameTimer = setInterval(updateView, 100);
    document.addEventListener("keyup", changeDirection);
}



function updateView() {
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height)

    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize)

    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY])
        score ++;
        placeFood();
    }


    //får kver del til å kopiere posisjonen til delen forran seg
    for (let i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1]
    }

    //setter posisjonen før hodet til posisjonen av hodet
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY]
    }

    

    context.fillStyle = "lime";

    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;

    context.fillRect(snakeX, snakeY, blockSize, blockSize)

    // 'maler' inn delene av slangen
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize)
    }

    
    

    scoreDiv.innerHTML = /*HTML*/`
    <h3> Score: ${score} </h3>
    `

    gameOver();
}


function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;

    

}

function gameOver() {
if (snakeX > cols * blockSize || snakeX < 0 || snakeY > rows * blockSize || snakeY < 0) {
    clearInterval(gameTimer);
    alert("Game over");
}

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeBody[i][0] == snakeX && snakeBody[i][1] == snakeY) {
            clearInterval(gameTimer);
            alert("Game over");
        }
    }
}