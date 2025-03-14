let WIDTH, HEIGHT;

const canvas = document.getElementById("canvas"),
  ctx = canvas.getContext("2d"),
  // array of square widths
  initialSize = 0,
  squares = [],
  speeds = [],
  increase = 2,
  separation = 10;

const requestAnimationFrame =
  window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame;

function init() {
  WIDTH = window.innerWidth;
  HEIGHT = window.innerHeight;

  canvas.setAttribute("width", WIDTH);
  canvas.setAttribute("height", HEIGHT);

  squares.push(initialSize);

  for (let i = 0; i < Math.floor(WIDTH / separation); i++) {
    speeds.push(i === 0 ? 0.5 : speeds[i - 1] * 1.2);
  }

  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  ctx.strokeStyle = "white";
  ctx.beginPath();
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  ctx.closePath();
  ctx.translate(WIDTH / 2, HEIGHT / 2);

  ani();
}

function ani() {
  ctx.fillRect(-WIDTH / 2, -HEIGHT / 2, WIDTH, HEIGHT);
  if (squares[squares.length - 1] > WIDTH) {
    squares.pop();
  }
  if (squares[0] > separation) {
    squares.unshift(initialSize);
  }
  squares.forEach((h, idx) => {
    const ry = h / 2;
    const w = scale(h, 0, HEIGHT, 0, WIDTH);
    const rx = w / 2;
    ctx.beginPath();
    ctx.rect(-rx, -ry, w, h);
    ctx.closePath();
    ctx.stroke();
    squares[idx] += speeds[idx];
  });

  requestAnimationFrame(ani);
}

init();
