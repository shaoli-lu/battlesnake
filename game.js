// Get the canvas element and game status element
const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');
const gameStatus = document.getElementById('gameStatus');

// Set up the game variables
const snakeSize = 20;
let snake = [
    { x: 0, y: 0 },
    { x: snakeSize, y: 0 },
    { x: snakeSize * 2, y: 0 }
];
let food = { x: 200, y: 200 };
let score = 0;
let dx = snakeSize;
let dy = 0;
let isGameOver = false;

// Handle keyboard input
document.addEventListener('keydown', changeDirection);


// Change the snake direction based on key press
function changeDirection(event) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    const keyPressed = event.keyCode;
    const goingUp = dy === -snakeSize;
    const goingDown = dy === snakeSize;
    const goingLeft = dx === -snakeSize;
    const goingRight = dx === snakeSize;

    if (keyPressed === LEFT_KEY && !goingRight) {
        dx = -snakeSize;
        dy = 0;
    }

    if (keyPressed === UP_KEY && !goingDown) {
        dx = 0;
        dy = -snakeSize;
    }

    if (keyPressed === RIGHT_KEY && !goingLeft) {
        dx = snakeSize;
        dy = 0;
    }

    if (keyPressed === DOWN_KEY && !goingUp) {
        dx = 0;
        dy = snakeSize;
    }
}

// Main game loop
function gameLoop() {

    if (isGameOver) {
        return;
    }
    console.log('In game loop');
    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Move the snake
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    // Check for collision with walls or itself
 /*    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height || checkCollision(head)) {
        console.log("In If then gameOver");
        gameOver();
        return;
    } */

    // Check if the snake ate the food
    if (head.x === food.x && head.y === food.y) {
        console.log("In If generate food");
        score += 10;
        gameStatus.textContent = 'Score: ' + score;
        // Generate new food position
        generateFood();

        // Increase the speed of the snake slightly
        if (score % 50 === 0) {
            increaseSpeed();
        }
    } else {
        console.log("In Else pop");
        // Remove the tail segment if the snake didn't eat food
        snake.pop();
    }
    console.log("before drawSnakeSegment");
    // Draw the snake
    snake.forEach(drawSnakeSegment);

    // Draw the food
    drawFood();

    // Request the next animation frame
    requestAnimationFrame(gameLoop);
}


// Draw a segment of the snake
function drawSnakeSegment(segment) {
    console.log("In drawSnakeSegment");
    context.fillStyle = 'green';
    context.fillRect(segment.x, segment.y, snakeSize, snakeSize);
}

// Draw the food
function drawFood() {
    context.fillStyle = 'red';
    context.fillRect(food.x, food.y, snakeSize, snakeSize);
}

// Check if the snake collides with itself
function checkCollision(head) {
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    return false;
}

// Game over
function gameOver() {
    isGameOver = true;
    gameStatus.textContent = 'Game Over! Final Score: ' + score;
}

// Generate new food position
function generateFood() {
    const maxX = canvas.width / snakeSize;
    const maxY = canvas.height / snakeSize;

    food.x = Math.floor(Math.random() * maxX) * snakeSize;
    food.y = Math.floor(Math.random() * maxY) * snakeSize;
}


// Increase the speed of the snake
function increaseSpeed() {
    if (dx > 0) {
        dx += 1;
    } else if (dx < 0) {
        dx -= 1;
    }
    if (dy > 0) {
        dy += 1;
    } else if (dy < 0) {
        dy -= 1;
    }
}

function restartGame() {
    console.log('Restart button clicked');

    snake = [
        { x: 0, y: 0 },
        { x: snakeSize, y: 0 },
        { x: snakeSize * 2, y: 0 }
    ];
    food = { x: 200, y: 200 };
    score = 0;
    dx = snakeSize;
    dy = 0;
    isGameOver = false;
    gameStatus.textContent = 'Score: ' + score;

    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Delay the game loop start
    setTimeout(gameLoop, 1000);
}


// Handle restart button click event
const restartButton = document.getElementById('restartButton');
restartButton.addEventListener('click', function() {
    console.log('Restart button clicked 1');

    restartGame();
});



// Start the game loop
gameLoop();
