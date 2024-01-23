const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouseDownFlag = false;

let tool = canvas.getContext("2d");
tool.lineWidth = 3;

let tracker;
const undoRedoTracker = [];

// mousedown->start new path, mousemove->path fill graphics
canvas.addEventListener("mousedown", (e) => {
  mouseDownFlag = !mouseDownFlag;
  // beginPath({ x: e.clientX, y: e.clientY });
  let data = { x: e.clientX, y: e.clienty };
  socket.emit("beginPath", data);
});
canvas.addEventListener("mousemove", (e) => {
  if (mouseDownFlag) {
    let data = { x: e.clientX, y: e.clientY };
    socket.emit("drawStroke", data);
    // drawStroke({ x: e.clientX, y: e.clientY });
  }
});
canvas.addEventListener("mouseup", (e) => {
  mouseDownFlag = !mouseDownFlag;

  undoRedoTracker.push(canvas.toDataURL());
  tracker = undoRedoTracker.length - 1;
});

function beginPath(strokeObj) {
  tool.beginPath();
  tool.moveTo(strokeObj.x, strokeObj.y);
}
function drawStroke(strokeObj) {
  tool.lineTo(strokeObj.x, strokeObj.y);
  tool.stroke();
}

socket.on("beginPath", (data) => {
  beginPath(data);
});
socket.on("drawStroke", (data) => {
  drawStroke(data);
});
