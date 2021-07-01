var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

ctx.beginPath();

ctx.lineWidth = 3;
ctx.strokeStyle = "green";
ctx.moveTo(100, 0);
ctx.lineTo(100, 600);
ctx.stroke();

ctx.closePath();

ctx.beginPath();

// x, y, radius, start angle, end angle
ctx.arc(300, 300, 100, 0, Math.PI * 2, false);
ctx.fillStyle = "blue";
ctx.fill();

ctx.closePath();
