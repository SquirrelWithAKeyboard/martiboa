const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 400;

// Game Variables
let player = { x: 100, y: 300, width: 50, height: 50, color: 'blue', speed: 5 };
let toilet = { x: -100, y: 300, width: 50, height: 50, color: 'red', speed: 2 };
let gravity = 0.5;
let jump = -10;
let isJumping = false;
let distance = 0;

// Controls
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && !isJumping) {
        player.y += jump;
        isJumping = true;
    }
});

function update() {
    // Apply gravity
    if (player.y + player.height < canvas.height) {
        player.y += gravity;
    } else {
        isJumping = false;
    }

    // Move player forward
    player.x += player.speed;
    distance += player.speed;

    // Move toilet closer as a chase mechanic
    if (toilet.x < player.x - 200) {
        toilet.x += toilet.speed;
    }

    // Reset position for endless scrolling effect
    if (player.x > canvas.width - 100) {
        player.x = 100;
    }

    // Check if the toilet caught the player
    if (toilet.x >= player.x - 50) {
        alert('Caught by the Skibidi Toilet! Game Over');
        resetGame();
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Player
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Draw Skibidi Toilet
    ctx.fillStyle = toilet.color;
    ctx.fillRect(toilet.x, toilet.y, toilet.width, toilet.height);

    // Display Score
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText(`Distance: ${distance}`, 10, 20);
}

function resetGame() {
    player.x = 100;
    distance = 0;
    toilet.x = -100;
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
