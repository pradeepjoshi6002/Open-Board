//flags

let showOption = false;
let showPencilTool = false;
let showEraserTool = false;

//dom

const hamburgerMenu = document.querySelector(".options-cont");
const toolsCont = document.querySelector(".tools-cont");
const tools = document.querySelectorAll(".tools-cont div");
const pencil = document.querySelector(".pencil");
const pencilTool = document.querySelector(".pencil-tool-cont");
const pencilColor = document.querySelectorAll(".pencil-color");
const eraser = document.querySelector(".eraser");
const eraserTool = document.querySelector(".eraser-tool-cont");
const stickyNote = document.querySelector(".sticky-notes");
const stickyNoteCont = document.querySelector(".sticky-note-cont");

//functions

hamburgerMenu.addEventListener("click", () => {
  showOption = !showOption;
  if (showOption) {
    hamburgerMenu.children[0].innerText = "close";
    toolsCont.style.display = "flex";
  } else {
    hamburgerMenu.children[0].innerText = "menu";
    toolsCont.style.display = "none";
    closeAllTools();
  }
});

pencil.addEventListener("click", () => {
  showPencilTool = !showPencilTool;
  if (showPencilTool) {
    if (showEraserTool) {
      showEraserTool = !showEraserTool;
      eraser.style.color = "black";
      eraserTool.style.display = "none";
    }
    pencil.style.color = "royalblue";
    pencilTool.style.display = "flex";
  } else {
    pencil.style.color = "black";
    pencilTool.style.display = "none";
  }
});
eraser.addEventListener("click", () => {
  showEraserTool = !showEraserTool;
  if (showEraserTool) {
    if (showPencilTool) {
      showPencilTool = !showPencilTool;
      pencil.style.color = "black";
      pencilTool.style.display = "none";
    }
    eraser.style.color = "royalblue";
    eraserTool.style.display = "flex";
  } else {
    eraser.style.color = "black";
    eraserTool.style.display = "none";
  }
});

stickyNote.addEventListener("click", (e) => {
  closeAllTools();
  const obj = document.createElement("div");
  obj.classList.add("sticky-note-cont");
  obj.innerHTML = `<div class="sticky-tool-cont">
  <div class="sticky-min">
    <span class="material-icons">remove</span>
  </div>
  <div class="sticky-close">
    <span class="material-icons">close</span>
  </div>
</div>
<textarea class="sticky-taskarea"></textarea>`;
  document.body.appendChild(obj);
  obj.onmousedown = function (e) {
    dragAndDrop(obj, e);
  };
  obj.ondragstart = function () {
    return false;
  };
});

function dragAndDrop(ball, event) {
  let shiftX = event.clientX - ball.getBoundingClientRect().left;
  let shiftY = event.clientY - ball.getBoundingClientRect().top;

  ball.style.position = "absolute";
  ball.style.zIndex = 1000;

  moveAt(event.pageX, event.pageY);

  // moves the ball at (pageX, pageY) coordinates
  // taking initial shifts into account
  function moveAt(pageX, pageY) {
    ball.style.left = pageX - shiftX + "px";
    ball.style.top = pageY - shiftY + "px";
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  // move the ball on mousemove
  document.addEventListener("mousemove", onMouseMove);

  // drop the ball, remove unneeded handlers
  ball.onmouseup = function () {
    document.removeEventListener("mousemove", onMouseMove);
    ball.onmouseup = null;
  };
}

function closeAllTools() {
  if (showPencilTool) {
    showPencilTool = !showPencilTool;
    pencil.style.color = "black";
    pencilTool.style.display = "none";
  } else if (showEraserTool) {
    showEraserTool = !showEraserTool;
    eraser.style.color = "black";
    eraserTool.style.display = "none";
  }
}
