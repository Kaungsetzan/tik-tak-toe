document.addEventListener("DOMContentLoaded", () => {
  const board = document.querySelectorAll<HTMLButtonElement>(".cell");
  const statusMessage = document.getElementById("status") as HTMLElement;
  const resetButton = document.getElementById("reset") as HTMLButtonElement;

  let currentPlayer: "X" | "O" = "X";
  let gameState: (string | null)[] = Array(9).fill(null);

  const winningPatterns: number[][] = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  function loadGame() {
    const savedState = localStorage.getItem("gameState");
    if (savedState) {
      gameState = JSON.parse(savedState);
      gameState.forEach((mark, index) => {
        if (mark) board[index].textContent = mark;
      });
      currentPlayer = (localStorage.getItem("currentPlayer") as "X" | "O") || "X";
      statusMessage.textContent = `Current Player: ${currentPlayer}`;
    }
  }

  function saveGame() {
    localStorage.setItem("gameState", JSON.stringify(gameState));
    localStorage.setItem("currentPlayer", currentPlayer);
  }

  function checkGameStatus() {
    for (const pattern of winningPatterns) {
      const [a, b, c] = pattern;
      if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
        statusMessage.textContent = `Winner: ${gameState[a]}!`;
        disableBoard();
        return;
      }
    }

    if (gameState.every(cell => cell !== null)) {
      statusMessage.textContent = "It's a draw!";
    }
  }

  function disableBoard() {
    board.forEach(cell => (cell.disabled = true));
  }

  board.forEach((cell, index) => {
    cell.addEventListener("click", () => {
      if (!gameState[index]) {
        gameState[index] = currentPlayer;
        cell.textContent = currentPlayer;
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusMessage.textContent = `Current Player: ${currentPlayer}`;
        saveGame();
        checkGameStatus();
      }
    });
  });

  resetButton.addEventListener("click", () => {
    gameState.fill(null);
    board.forEach(cell => {
      cell.textContent = "";
      cell.disabled = false;
    });
    currentPlayer = "X";
    statusMessage.textContent = "Current Player: X";
    localStorage.clear();
  });

  loadGame();
});
