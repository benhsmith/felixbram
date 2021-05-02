var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

function renderTree(x, y) {
	// trunk
  ctx.beginPath();

  ctx.strokeStyle = "brown";
  ctx.moveTo(x, y);
  ctx.lineTo(x, y + 10);
  ctx.stroke();

  ctx.closePath();

  // treetop
  ctx.beginPath();

  ctx.arc(x, y - 10, 10, 0, Math.PI * 2, false);
  ctx.fillStyle = "green";
  ctx.fill();

  ctx.closePath();
}

function renderObject(type, x, y) {

  ctx.beginPath();

  if (type === "tree") {
    renderTree(x, y);
  }

}

var xpos = 5;
var ypos = canvas.height / 2;

for (;xpos < canvas.width;xpos += 15) {
	renderObject("tree", xpos, ypos);
}
