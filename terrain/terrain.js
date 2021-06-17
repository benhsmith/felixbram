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
  ctx.moveTo(x, y + 10);
  ctx.lineTo(x, y );
  ctx.stroke();

  ctx.closePath();

  ctx.beginPath();

  ctx.lineWidth = 2;
  ctx.strokeStyle = "rgb(160,82,45)";
  ctx.moveTo(x, canvas.height);
  ctx.lineTo(x, y + 10);
  ctx.stroke();

  ctx.closePath();
}

function renderCactus(x, y) {
  // trunk
  ctx.beginPath();

  ctx.lineWidth = 3;
  ctx.strokeStyle = "green";
  ctx.moveTo(x, y);
  ctx.lineTo(x, y - 20);
  ctx.stroke();

  ctx.closePath();
}

function renderDesert(x, y) {

  ctx.beginPath();

  ctx.lineWidth = 2;
  ctx.strokeStyle = "yellow";
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

  if (type === "desert") {
    renderDesert(x, y);
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

// 0 - grassy
// 1 - desert
var current_biome = 0;

function addMoreLand(index) {
  var change = randomNumber(-5, 5);
  height += change;

  var has_object = false;
  if (index - last_tree > randomNumber(5, 100)) {
    last_tree = index;
    has_object = true;
  }

  if (randomNumber(0,100) == 50) {
    if (current_biome == 0) {
      current_biome = 1;
    } else {
      current_biome = 0;
    }
  }

  world_data.push([current_biome, height, has_object]);
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
    var biome = data[0];
    var ypos = data[1];
    var has_object = data[2];

    if (biome == 0) {
      renderObject("ground", xpos, ypos);
      if (has_object) {
        renderObject("tree", xpos, ypos);
      }
    } else if (biome == 1) {
      renderObject("desert", xpos, ypos);
      if (has_object) {
        renderObject("cactus", xpos, ypos);
      }
    }
  }
}


function keyDownHandler(e) {
  if(e.key == "Right" || e.key == "ArrowRight") {
    world_pos += 10;

    renderLandscape();
  }
  else if(e.key == "Left" || e.key == "ArrowLeft") {
    if (world_pos > 0) {
      world_pos -= 10;
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
