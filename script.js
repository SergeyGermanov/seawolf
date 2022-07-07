let torpedo;
let ship;
let win = 0;

function startGame() {
    torpedo = new torpedoComponent(64, 64, "./Img/torpedo.png", 300, 430, "image");
    shipOne = new shipComponent(64, 64, "./Img/warship1.png", 0, 0, "image");
    shipTwo = new shipComponent(64, 64, "./Img/warship2.png", 0, 0, "image");
    shipThree = new shipComponent(64, 64, "./Img/warship3.png", 0, 0, "image");
    scoreField = new scoreComponent("25px", "Consolas", "black", 500, 25, "text");
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

function scoreComponent(width, height, color, x, y, type) {
    this.type = type;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.update = function () {
        ctx = gameArea.context;
        ctx.font = this.width + " " + this.height;
        ctx.fillStyle = color;
        ctx.fillText(this.text, this.x, this.y);
    }
}


function torpedoComponent(width, height, color, x, y, type) {
    this.type = type;
    if (type === "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0
    this.x = x;
    this.y = y;
    this.update = function () {
        ctx = gameArea.context;
        if (type === "image") {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
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

function shipComponent(width, height, color, x, y, type) {
    this.type = type;
    if (type === "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.plusOrMinus = Math.random() < 0.5 ? -1 : 1;
    this.width = width;
    this.height = height;
    this.speedX = this.plusOrMinus * (Math.floor(Math.random() * 4) + 1);
    if (this.plusOrMinus < 0) {
        this.x = 640 - this.width;
    } else {
        this.x = x;
    }
    this.y = Math.floor(Math.random() * 200);
    this.update = function () {
        ctx = gameArea.context;
        if (type === "image") {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
        this.bombed();
    }
    this.newPos = function () {
        this.x += this.speedX;
        this.goRounds();
    }
    this.goRounds = function () {
        let right = gameArea.canvas.width - this.width;
        if (this.plusOrMinus < 0) {
            if (this.x < 0) {
                this.x = 640 - this.width;
            }
        } else {
            if (this.x > right) {
                this.x = 0;
            }
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
            win++;
            if (win === 3) {
                document.body.querySelector(".canvas").innerHTML = "<h1 style='color:red'>You Won!</h1>";
            }
            play("explosion.wav");
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
    scoreField.text = "SCORE: " + win;
    scoreField.update();
}

function moveLeft() {
    torpedo.speedX = -5;
}

function moveRight() {
    torpedo.speedX = 5;
}

function moveFire() {
    torpedo.speedY = -10;
    play("torpedo.mp3");
}

function clearMove() {
    torpedo.speedX = 0;
}

function play(sound) {
    let audio = new Audio(`./Sounds/${sound}`);
    audio.play();
}

window.addEventListener('keydown', function (e) {
    e.preventDefault();
    if (win < 3) {
        (e.key == "ArrowLeft") && moveLeft();
        (e.key == "ArrowRight") && moveRight();
        (e.key == "ArrowUp" || e.key == " ") && moveFire();
    }
})

window.addEventListener('keyup', function (e) {
    clearMove();
})