var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var oceanLevel = 350;
var figureUp = 0;
var inOcean = false;

// Change to a different filename to change the figure
var fig_image = new Image();
fig_image.src = "knight.png";

var tree_image = new Image();
tree_image.src = "tree.png";

var bad_image = new Image();
bad_image.src = "train.jpg";

function renderTree(x, y) {
  ctx.drawImage(tree_image, x, y - 10);
}

function renderKelp (x, y) {

  ctx.beginPath();

  ctx.strokeStyle = "green";
  ctx.moveTo(x, y);
  ctx.lineTo(x, y -10);
  ctx.stroke();

  ctx.closePath();
}

function renderGround(x, y) {

  // draw dirt
  ctx.beginPath();

  ctx.lineWidth = 2;
  ctx.strokeStyle = "#9e5907";
  ctx.moveTo(x, canvas.height);
  ctx.lineTo(x, y);
  ctx.stroke();

  ctx.closePath();

  // draw water if below (higher in y coordinates) oceanLevel
  if (y > oceanLevel) {
    ctx.beginPath();

    ctx.lineWidth = 2;
    ctx.strokeStyle = "blue";
    ctx.moveTo(x, y);
    ctx.lineTo(x, oceanLevel);
    ctx.stroke();

    ctx.closePath();
  } else {
  // draw grass if above water level
    ctx.beginPath();

    ctx.strokeStyle = "#00ba15";
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + 10);
    ctx.stroke();

    ctx.closePath();
  }
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

  if (type === "kelp") {
  renderKelp (x, y)
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

// World data going to the right from the starting point
var world_data_right = []

// World data going to the left from the starting point
var world_data_left = []

var height = canvas.height * .65;
var last_plant = 0;

// 0 - grassy with ocean
// 1 - desert
var current_biome = 0;
var biome_len = 0;

var height_change = 0;

function makeMoreLand(index) {
  height += height_change;

  if (height <= 50) {
    height = 50;
  } else if (height >= canvas.height ) {
    height = canvas.height;
  }

  height_change += randomNumber(-1, 1);

  if (height_change > 2) {
    height_change -= 1;
  }

  if (height_change < -2) {
    height_change += 1;
  }

  var has_plant = false;
  if (index - last_plant > randomNumber(5, 100)) {
    last_plant = index;
    has_plant = true;
  }

  if (height > oceanLevel) {
	if (index - last_plant > randomNumber(5, 100)) {
		if (height < oceanLevel) {
          last_plant = index;
		}
	  }
  } else {
    // 1 in 10 chance of switching biomes

    if (biome_len == 0) {
      if (current_biome == 0) {
        current_biome = 1;
      } else {
        current_biome = 0;
      }

      biome_len = randomNumber(50, 200);
    } else {
      biome_len = biome_len - 1;
    }
  }

  //return [current_biome, height, has_plant,];
  world_data_right.push([current_biome, height, has_plant,]);
}

function drawFigure(x, y)
{
  ctx.drawImage(fig_image, x, y + figureUp);
  
	if (y >= oceanLevel) {
      inOcean = true;
	}
	else 
	{
	  inOcean = false;
	}
}

function drawBadFigure(x, y)
{
  ctx.drawImage(bad_image, x, y + figureUp);

  if (y >= oceanLevel) {
    inOcean = true;
  }
  else
  {
    inOcean = false;
  }
}

var world_pos = 0;
var bad_pos = 10;

function renderLandscape() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  var status = document.getElementById("status");
  status.textContent = figureUp;

	var figureypos = 0;
	var figurexpos = canvas.width / 2;
	var badypos = 0;

  if (bad_pos > canvas.width) {
    bad_pos = 0;
  }

  for (xpos = 0; xpos < canvas.width; xpos += 1) {
    var data;

    if (world_pos >= 0 && xpos + world_pos >= world_data_right.length) {
      //world_data_right.push(makeMoreLand(xpos + world_pos));
      makeMoreLand(xpos + world_pos);

    } else if (world_pos < 0 && world_pos - xpos) {
    }

    data = world_data_right[xpos + world_pos];
    var biome = data[0];
    var ypos = data[1];
    var has_plant = data[2];
	
	if (xpos == figurexpos) {
		figureypos = ypos - fig_image.height;
	}

    if (xpos == bad_pos) {
        badypos = ypos - bad_image.height;
    }

    if (biome == 0) {
      renderObject("ground", xpos, ypos);
      if (has_plant) {
        if (ypos < oceanLevel) {
          renderObject("tree", xpos, ypos);
        } else {
          renderObject("kelp", xpos, ypos);
        }
	  }
    } else if (biome == 1) {
      renderObject("desert", xpos, ypos);
      if (has_plant) {
        renderObject("cactus", xpos, ypos);
      }
    }
  }

  drawFigure(figurexpos, figureypos);
  drawBadFigure(bad_pos, badypos);
}

function keyDownHandler(e) {
  bad_pos += 5;

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
  else if(e.key == "Up" || e.key == "ArrowUp") {
	if(inOcean){ 
	  figureUp -= 3;
	  renderLandscape();
	}
  }
  else if(e.key == "Down" || e.key == "ArrowDown") {
	if(inOcean){
      if( figureUp < 0 ) {
        figureUp += 3;
        renderLandscape();
      }
	}
  }
}


fig_image.onload = function() {
  createImageBitmap(fig_image);
  drawFigure(canvas.width / 2, canvas.height / 2);
}

document.addEventListener("keydown", keyDownHandler, false);

renderLandscape();

function run_train() {
  bad_pos += 15;

  renderLandscape();
}

setInterval(run_train, 100);