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
  <div class="sticky-remove">
    <span class="material-icons">close</span>
  </div>
</div>
<textarea class="sticky-taskarea"></textarea>`;
  document.body.appendChild(obj);
  let stickyMinimize = obj.querySelector(".sticky-min");
  let stickyRemove = obj.querySelector(".sticky-remove");
  noteActions(stickyMinimize, stickyRemove, obj);
  obj.onmousedown = function (e) {
    dragAndDrop(obj, e);
  };
  obj.ondragstart = function () {
    return false;
  };
});

function noteActions(min, remove, note) {
  min.addEventListener("click", () => {
    console.log("minimize notes taskarea");
    let stickyTaskArea = note.querySelector(".sticky-taskarea");
    if (
      getComputedStyle(stickyTaskArea).getPropertyValue("display") === "none"
    ) {
      min.children[0].innerText = "remove";
      stickyTaskArea.style.display = "block";
    } else {
      min.children[0].innerText = "open_in_full";
      stickyTaskArea.style.display = "none";
    }
  });
  remove.addEventListener("click", () => {
    note.remove();
  });
}

function dragAndDrop(obj, event) {
  let shiftX = event.clientX - obj.getBoundingClientRect().left;
  let shiftY = event.clientY - obj.getBoundingClientRect().top;

  obj.style.position = "absolute";
  obj.style.zIndex = 1000;

  moveAt(event.pageX, event.pageY);

  // moves the ball at (pageX, pageY) coordinates
  // taking initial shifts into account
  function moveAt(pageX, pageY) {
    obj.style.left = pageX - shiftX + "px";
    obj.style.top = pageY - shiftY + "px";
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  // move the ball on mousemove
  document.addEventListener("mousemove", onMouseMove);

  // drop the ball, remove unneeded handlers
  obj.onmouseup = function () {
    document.removeEventListener("mousemove", onMouseMove);
    obj.onmouseup = null;
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
