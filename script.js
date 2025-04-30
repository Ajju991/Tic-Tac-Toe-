// Selectors
const cells = document.querySelectorAll('[data-cell]');
const winnerMessage = document.getElementById('winner-message');
const drawMessage = document.getElementById('draw-message');
const winnerSpan = document.getElementById('winner');
const restartButton = document.getElementById('restart-button');
const board = document.getElementById('board');

// Sounds
const backgroundMusic = new Audio('sounds/background.mp3');
const moveSound = new Audio('sounds/move.mp3');
const winSound = new Audio('sounds/win.mp3');
const drawSound = new Audio('sounds/draw.mp3');

let currentPlayer = 'X';
let gameActive = true;
const boardState = Array(9).fill(null);

// Play background music
backgroundMusic.loop = true;
backgroundMusic.play();

// Handle cell click
cells.forEach((cell, index) => {
  cell.addEventListener('click', () => {
    if (!gameActive || boardState[index]) return;

    boardState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add('taken');
    moveSound.play();

    if (checkWin()) {
      gameActive = false;
      winnerMessage.classList.remove('hidden');
      winnerSpan.textContent = currentPlayer;
      winSound.play();
    } else if (boardState.every(cell => cell)) {
      gameActive = false;
      drawMessage.classList.remove('hidden');
      drawSound.play();
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  });
});

// Restart game
restartButton.addEventListener('click', () => {
  boardState.fill(null);
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('taken');
  });
  currentPlayer = 'X';
  gameActive = true;
  winnerMessage.classList.add('hidden');
  drawMessage.classList.add('hidden');
});

// Check for win
function checkWin() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c];
  });
}createBoard();
