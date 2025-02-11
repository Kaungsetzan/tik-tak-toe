let currentPlayer = "X";
let cells = document.querySelectorAll(".items");
let playerX = document.querySelector(".playerX");
let playerO = document.querySelector(".playerO");
function updatePlayerDisplay() {
  if (currentPlayer === "X") {
    playerX.style.fontWeight = "bold";
    playerX.style.fontSize = "2rem";
    playerO.style.fontWeight = "normal";
    playerO.style.fontSize = "1rem";
  } else {
    playerO.style.fontWeight = "bold";
    playerO.style.fontSize = "2rem";
    playerX.style.fontWeight = "normal";
    playerX.style.fontSize = "1rem";
  }
}
cells.forEach((cell) => {
  cell.addEventListener("click", function(event) {
    let button = event.target;
    if (!button.textContent) {
      button.textContent = currentPlayer;
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      updatePlayerDisplay();
    }
  });
});
updatePlayerDisplay();
//# sourceMappingURL=main.js.map
