let torpedo;
let ship;

function startGame() {
    torpedo = new torpedoComponent(20, 50, "black", 315, 430);
    shipOne = new shipComponent(50, 10, "green", 0, 0);
    shipTwo = new shipComponent(50, 10, "olive", 0, 0);
    shipThree = new shipComponent(50, 10, "white", 0, 0);
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

function torpedoComponent(width, height, color, x, y) {
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
        this.hitSides();
    }
    this.hitSides = function () {
        let right = gameArea.canvas.width - this.width;
        let top = 0 - this.height;
        if (this.x >= right) {
            this.x = right;
        }
        if (this.x < 0) {
            this.x = 0;
        }
        if (this.y < top) {
            this.y = gameArea.canvas.height - this.height;
            this.speedY = 0;
        }
    }
}

function shipComponent(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.speedX = Math.floor(Math.random() * 4) + 1;
    this.x = x;
    this.y = Math.floor(Math.random() * 100);
    this.update = function () {
        ctx = gameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        this.bombed();
    }
    this.newPos = function () {
        this.x += this.speedX;
        this.goRounds();
    }
    this.goRounds = function () {
        let right = gameArea.canvas.width - this.width;
        if (this.x > right) {
            this.x = 0;
        }
    }

    this.bombed = function () {
        let shipLeft = this.x;
        let shipRight = this.x + this.width;
        let shipTop = this.y;
        let shipBottom = this.y + this.height;
        let torpedoLeft = torpedo.x;
        let torpedoRight = torpedo.x + torpedo.width;
        let torpedoTop = torpedo.y;
        let torpedoBottom = torpedo.y + torpedo.height;


        if (!((shipBottom < torpedoTop) || (shipTop > torpedoBottom) || (shipRight < torpedoLeft) || (shipLeft > torpedoRight))) {
            torpedo.y = gameArea.canvas.height - torpedo.height;
            torpedo.speedY = 0;
            this.y = gameArea.canvas.height - this.height;
            this.x = 0;
            this.speedX = 0;
            alert("Sunk!");
        }

    }

}

function updateGameArea() {
    gameArea.clear();
    shipOne.newPos();
    shipOne.update();
    shipTwo.newPos();
    shipTwo.update();
    shipThree.newPos();
    shipThree.update();
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