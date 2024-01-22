//flags

let showOption = false;
let showPencilTool = false;
let showEraserTool = false;

//dom

const hamburgerMenu = document.querySelector(".options-cont");
const toolsCont = document.querySelector(".tools-cont");
const pencil = document.querySelector(".pencil");
const pencilTool = document.querySelector(".pencil-tool-cont");
const pencilColor = document.querySelectorAll(".pencil-color");
const eraser = document.querySelector(".eraser");
const eraserTool = document.querySelector(".eraser-tool-cont");
const stickyNote = document.querySelector(".sticky-notes");
const upload = document.querySelector(".upload");
const pencilWidth = document.querySelector(".pencil-width-cont input");
const eraserWidth = document.querySelector(".eraser-tool-cont input");
const download = document.querySelector(".download");

//default values

let eraserWidthValue = eraserWidth.value;
let eraserColorValue = "white";
let pencilWidthValue = pencilWidth.value;
let pencilColorValue = "blue";

tool.lineWidth = pencilWidthValue;
tool.strokeStyle = pencilColorValue;

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
      tool.lineWidth = pencilWidthValue;
      tool.strokeStyle = pencilColorValue;
    }
    pencil.style.color = "royalblue";
    pencilTool.style.display = "flex";
  } else {
    pencil.style.color = "black";
    pencilTool.style.display = "none";
  }
});
pencilWidth.addEventListener("change", () => {
  pencilWidthValue = pencilWidth.value;
  tool.lineWidth = pencilWidthValue;
});
pencilColor.forEach((ele) => {
  ele.addEventListener("click", () => {
    pencilColor.forEach((ele1) => {
      ele1.classList.remove("selected-color");
    });
    pencilColorValue = ele.classList[0];
    ele.style.outlineColor = pencilColorValue;
    tool.strokeStyle = pencilColorValue;
    ele.classList.add("selected-color");
  });
});
eraser.addEventListener("click", () => {
  showEraserTool = !showEraserTool;
  if (showEraserTool) {
    if (showPencilTool) {
      showPencilTool = !showPencilTool;
      pencil.style.color = "black";
      pencilTool.style.display = "none";
    }
    tool.strokeStyle = eraserColorValue;
    tool.lineWidth = eraserWidthValue;
    eraser.style.color = "royalblue";
    eraserTool.style.display = "flex";
  } else {
    tool.lineWidth = pencilWidthValue;
    tool.strokeStyle = pencilColorValue;
    eraser.style.color = "black";
    eraserTool.style.display = "none";
  }
});

eraserWidth.addEventListener("change", () => {
  eraserWidthValue = eraserWidth.value;
  tool.lineWidth = eraserWidthValue;
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
<textarea spellcheck="false" class="sticky-taskarea"></textarea>`;
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

upload.addEventListener("click", () => {
  closeAllTools();
  //opne file explorer
  let selectFile = document.createElement("input");
  selectFile.setAttribute("type", "file");
  selectFile.click();
  //
  selectFile.addEventListener("change", (e) => {
    let selectedFile = selectFile.files[0];
    let fileUrl = URL.createObjectURL(selectedFile);
    console.log(fileUrl);
    const obj = document.createElement("div");
    obj.classList.add("sticky-note-cont");
    obj.innerHTML = `<div class="sticky-tool-cont">
                      <div class="sticky-min"><span class="material-icons">remove</span></div>
                      <div class="sticky-remove"><span class="material-icons">close</span></div>
                    </div>
                    <img class="sticky-taskarea" src="${fileUrl}">
                  `;
    obj.querySelector(".sticky-taskarea").style.padding = "0";
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
});

download.addEventListener("click", () => {
  console.log("downlaoded");
  const url = canvas.toDataURL();
  let anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "board.jpg";
  anchor.click();
});

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
