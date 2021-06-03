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

  ctx.strokeStyle = "#00ba15";
  ctx.moveTo(x, canvas.height);
  ctx.lineTo(x, y);
  ctx.stroke();

  ctx.closePath();

  ctx.beginPath();

  ctx.strokeStyle = "brown";
  ctx.moveTo(x, canvas.height);
  ctx.lineTo(x, y + 10);
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

  if (type === "cactus") {
    renderCactus(x, y);
  }

}

function randomNumber(min, max) {
  var diff = max - min;
  return max - Math.round(Math.random() * diff);
}

var world_data = []

var height = canvas.height / 2;
var last_tree = 0;

function addMoreLand(index) {
  var change = randomNumber(-5, 5);
  height += change;

  var has_tree = false;
  if (index - last_tree > randomNumber(5, 100)) {
    last_tree = index;
    has_tree = true;
  }

  world_data.push([height, has_tree]);
}

var world_pos = 0;

function renderLandscape() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  var status = document.getElementById("status");
  status.textContent = world_pos;

  for (xpos = 0; xpos < canvas.width; xpos += 1) {
    if (xpos + world_pos >= world_data.length) {
      addMoreLand(xpos + world_pos);
    }
    var data = world_data[xpos + world_pos];
    var ypos = data[0];
    var tree = data[1];
    renderObject("ground", xpos, ypos);
    if (tree) {
      renderObject("tree", xpos, ypos);
    }
  }
}


function keyDownHandler(e) {
  if(e.key == "Right" || e.key == "ArrowRight") {
    world_pos += 1;

    renderLandscape();
  }
  else if(e.key == "Left" || e.key == "ArrowLeft") {
    if (world_pos > 0) {
      world_pos -= 1;
    }
    renderLandscape();
  }
  /*
  else if(e.key == "Down" || e.key == "ArrowDown") {
    y = y + speed;
  }
  else if(e.key == "Up" || e.key == "ArrowUp") {
    y = y - speed;
  }
  */
}

document.addEventListener("keydown", keyDownHandler, false);

renderLandscape();
