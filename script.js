let torpedo;

function startGame() {
    torpedo = new component(20, 50, "black", 315, 430);
    gameArea.start();
}

let gameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = 640;
        this.canvas.height = 480;
        this.context = this.canvas.getContext("2d");
        document.body.querySelector('.canvas').insertBefore(this.canvas, document.body.querySelector('.canvas').childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0
    this.x = x;
    this.y = y;
    this.update = function () {
        ctx = gameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function () {
        this.x += this.speedX;
        this.y += this.speedY;
    }
}

function updateGameArea() {
    gameArea.clear();
    torpedo.newPos();
    torpedo.update();
}

function moveLeft() {
    torpedo.speedX = -5;
}

function moveRight() {
    torpedo.speedX = 5;
}

function moveFire() {
    torpedo.speedY = -10;
}

function clearMove() {
    torpedo.speedX = 0;
}