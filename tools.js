let showOption = false;
let showPencilTool = false;
const pencilTool = document.querySelector(".pencil-tool-cont");
const toolsCont = document.querySelector(".tools-cont");
const hamburgerMenu = document.querySelector(".options-cont");
const pencil = document.querySelector(".pencil");
hamburgerMenu.addEventListener("click", function () {
  showOption = !showOption;
  if (showOption) {
    toolsCont.style.display = "flex";
    // hamburgerMenu.style.transform = "rotate(90deg)";
    hamburgerMenu.children[0].innerText = "close";
  } else {
    toolsCont.style.display = "none";
    // hamburgerMenu.style.transform = "rotate(0deg)";
    hamburgerMenu.children[0].innerText = "menu";
    pencilTool.style.display = "none";
  }
});

pencil.addEventListener("click", function () {
  showPencilTool = !showPencilTool;
  if (showPencilTool) {
    pencilTool.style.display = "flex";
  } else {
    pencilTool.style.display = "none";
  }
});
