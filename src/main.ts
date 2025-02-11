let currentPlayer: "X" | "O" = "X"; // Track the current player

// Select all cells
let cells = document.querySelectorAll(".items");

// Select player headline elements
let playerX = document.querySelector(".playerX") as HTMLElement;
let playerO = document.querySelector(".playerO") as HTMLElement;

// Function to update the current player display
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

// Add event listeners to each cell
cells.forEach((cell) => {
  cell.addEventListener("click", function (event) {
    let button = event.target as HTMLButtonElement; // Ensure it's treated as a button

    if (!button.textContent) {
      // Check if the cell is empty
      button.textContent = currentPlayer; // Set the mark
      currentPlayer = currentPlayer === "X" ? "O" : "X"; // Switch player
      updatePlayerDisplay(); // Update the UI
    }
  });
});

// Initialize the display
updatePlayerDisplay();
