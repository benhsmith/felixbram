var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

function renderTree(x, y) {
	// trunk
  ctx.beginPath();

  ctx.strokeStyle = "brown";
  ctx.moveTo(x, y);
  ctx.lineTo(x, y - 10);
  ctx.stroke();

  ctx.closePath();

  // treetop
  ctx.beginPath();

  ctx.arc(x, y - 20, 10, 0, Math.PI * 2, false);
  ctx.fillStyle = "green";
  ctx.fill();

  ctx.closePath();
}

function renderGround(x, y) {
  ctx.beginPath();

  ctx.strokeStyle = "#622b10";
  ctx.moveTo(x, canvas.height);
  ctx.lineTo(x, y);
  ctx.stroke();

  ctx.closePath();

}

function renderObject(type, x, y) {

  ctx.beginPath();

  if (type === "ground") {
    renderGround(x, y);
  }

  if (type === "tree") {
    renderTree(x, y);
  }

}

function randomNumber(min, max) {
  var diff = max - min;
  return max - Math.round(Math.random() * diff);
}


var xpos = 5;
var ypos = canvas.height / 2;
var lastTree = 0;

// this doesn't do anything yet
var heights = []

for (; xpos < canvas.width; xpos += 1) {
  height = randomNumber(-10, 10);
  heights.push(height)
  ypos += height
  renderObject("ground", xpos, ypos);
  if (xpos - lastTree > randomNumber(5, 100)) {
    renderObject("tree", xpos, ypos);
    lastTree = xpos;
  }
}