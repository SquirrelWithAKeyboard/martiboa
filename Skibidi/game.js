const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 400;

// Load Images for Enhanced Graphics
const playerImage = new Image();
playerImage.src = 'assets/images/player.png';
const toiletImage = new Image();
toiletImage.src = 'assets/images/toilet.png';

// Game Variables
let player = { x: 100, y: 300, width: 50, height: 50, hitbox: { xOffset: 5, yOffset: 5, width: 40, height: 40 }, speed: 5 };
let toilet = { x: -100, y: 300, width: 50, height: 50, speed: 2 };
let gravity = 0.5;
let jump = -10;
let isJumping = false;
let distance = 0;

// Tap to Jump (iPad Controls)
canvas.addEventListener('touchstart', () => {
    if (!isJumping) {
        player.y += jump;
        isJumping = true;
    }
});

// Player Jump Logic (For Desktop)
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

    // Check if the toilet caught the player with adjusted hitbox
    if (isColliding(player, toilet)) {
        alert('Caught by the Skibidi Toilet! Game Over');
        resetGame();
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Player with Enhanced Graphics
    ctx.drawImage(playerImage, player.x, player.y, player.width, player.height);

    // Draw Skibidi Toilet with Enhanced Graphics
    ctx.drawImage(toiletImage, toilet.x, toilet.y, toilet.width, toilet.height);

    // Display Score
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText(`Distance: ${distance}`, 10, 20);
}

function isColliding(a, b) {
    // Adjusted collision detection with hitbox offsets
    return (
        a.x + a.hitbox.xOffset < b.x + b.width &&
        a.x + a.hitbox.xOffset + a.hitbox.width > b.x &&
        a.y + a.hitbox.yOffset < b.y + b.height &&
        a.y + a.hitbox.yOffset + a.hitbox.height > b.y
    );
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
