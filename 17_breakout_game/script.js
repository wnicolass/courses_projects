const rulesBtn = document.getElementById("rules-btn");
const closeBtn = document.getElementById("close-btn");
const rules = document.getElementById("rules");

let score = 0;

const brickRowCount = 9;
const brickColumnCount = 5;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

//ball properties
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 10,
  speed: 3,
  dx: 3,
  dy: -3,
  visible: true,
};

//paddle properties
const paddle = {
  x: canvas.width / 2 - 40,
  y: canvas.height - 20,
  w: 300,
  h: 10,
  speed: 8,
  dx: 0,
  visible: true,
};

const brickInfo = {
  w: 70,
  h: 20,
  padding: 10,
  offsetX: 45,
  offsetY: 60,
  visible: true,
};

const bricks = [];

for (let i = 0; i < brickRowCount; i++) {
  bricks[i] = [];
  for (let j = 0; j < brickColumnCount; j++) {
    const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
    const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
    bricks[i][j] = { x, y, ...brickInfo };
  }
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
  ctx.fillStyle = "#fff";
  ctx.fill();
  ctx.closePath();
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
  ctx.fillStyle = "#f5f505";
  ctx.fill();
  ctx.closePath();
}

function drawScore() {
  ctx.font = "20px Arial";
  ctx.fillText(`Score: ${score}`, canvas.width - 100, 30);
}

function drawBricks() {
  bricks.forEach((column) => {
    column.forEach((brick) => {
      ctx.beginPath();
      ctx.rect(brick.x, brick.y, brick.w, brick.h);
      ctx.fillStyle = brick.visible ? "#fff" : "transparent";
      ctx.fill();
      ctx.closePath();
    });
  });
}

function movePaddle() {
  paddle.x += paddle.dx;

  if (paddle.x + paddle.w > canvas.width) {
    paddle.x = canvas.width - paddle.w;
  }

  if (paddle.x < 0) {
    paddle.x = 0;
  }
}

function increaseScore() {
  score++;

  if (score % (brickRowCount * brickColumnCount) === 0) {
    paddle.visible = false;
    ball.visible = false;

    setTimeout(() => {
      showAllBricks();
      score = 0;
      paddle.x = canvas.width / 2 - 40;
      paddle.y = canvas.height - 20;
      ball.x = canvas.width / 2;
      ball.y = canvas.height / 2;
      ball.visible = true;
      paddle.visible = true;
    }, 700);
  }
}

function showAllBricks() {
  bricks.forEach((column) => {
    column.forEach((brick) => {
      brick.visible = true;
    });
  });
}

function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;

  //walls collision detection
  if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
    ball.dx *= -1; //reverse direction
  }

  if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
    ball.dy *= -1;
  }

  //paddle collision detection
  if (
    ball.x - ball.size > paddle.x && //left paddle side check
    ball.x + ball.size < paddle.x + paddle.w && //right paddle side check
    ball.y + ball.size > paddle.y //top paddle side check
  ) {
    ball.dy = -ball.speed;
  }

  //bricks collision
  bricks.forEach((column) => {
    column.forEach((brick) => {
      if (brick.visible) {
        if (
          ball.x - ball.size > brick.x && // left side check
          ball.x + ball.size < brick.x + brick.w && // right side check
          ball.y + ball.size > brick.y && // top side check
          ball.y - ball.size < brick.y + brick.h // bottom side check
        ) {
          ball.dy *= -1;
          brick.visible = false;

          increaseScore();
        }
      }
    });
  });

  if (ball.y + ball.size > canvas.height) {
    showAllBricks();
    score = 0;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  drawScore();
  drawBricks();
}

function update() {
  movePaddle();
  moveBall();

  draw();

  requestAnimationFrame(update);
}

update();

function keyDown(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    paddle.dx = paddle.speed;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    paddle.dx = -paddle.speed;
  }
}

function keyUp(e) {
  if (
    e.key === "Right" ||
    e.key === "ArrowRight" ||
    e.key === "Left" ||
    e.key === "ArrowLeft"
  ) {
    paddle.dx = 0;
  }
}

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

rulesBtn.addEventListener("click", () => rules.classList.add("show"));
closeBtn.addEventListener("click", () => rules.classList.remove("show"));
