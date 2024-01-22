const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouseDownFlag = false;

let tool = canvas.getContext("2d");
tool.lineWidth = 3;
tool.strokeStyle = "blue";

// mousedown->start new path, mousemove->path fill graphics
canvas.addEventListener("mousedown", (e) => {
  mouseDownFlag = !mouseDownFlag;
  beginPath({ x: e.clientX, y: e.clientY });
});
canvas.addEventListener("mousemove", (e) => {
  if (mouseDownFlag) {
    drawStroke({ x: e.clientX, y: e.clientY });
  }
});
canvas.addEventListener("mouseup", (e) => {
  mouseDownFlag = !mouseDownFlag;
});

function beginPath(strokeObj) {
  tool.beginPath();
  tool.moveTo(strokeObj.x, strokeObj.y);
}
function drawStroke(strokeObj) {
  tool.lineTo(strokeObj.x, strokeObj.y);
  tool.stroke();
}
