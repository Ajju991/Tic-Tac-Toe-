const board = document.getElementById('board');
const status = document.getElementById('status');
const resetButton = document.getElementById('reset');

// Sound effects
const sounds = {
  background: new Audio('sounds/background.wav'),
  move: new Audio('sounds/move.wav'),
  win: new Audio('sounds/win.wav'),
  draw: new Audio('sounds/draw.wav')
};

// Start background music
sounds.background.loop = true;
sounds.background.play();

let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Create game board
function createBoard() {
  board.innerHTML = '';
  gameState.forEach((cell, index) => {
    const cellDiv = document.createElement('div');
    cellDiv.classList.add('cell');
    cellDiv.dataset.index = index;
    cellDiv.addEventListener('click', handleCellClick);
    board.appendChild(cellDiv);
  });
}

// Handle cell click
function handleCellClick(e) {
  const cell = e.target;
  const index = cell.dataset.index;

  if (gameState[index] !== '' || !gameActive) return;

  gameState[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add('taken');
  sounds.move.play();

  checkResult();
}

// Check game result
function checkResult() {
  let roundWon = false;

  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (gameState[a] && gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    status.textContent = `Player ${currentPlayer} wins!`;
    sounds.win.play();
    gameActive = false;
    return;
  }

  if (!gameState.includes('')) {
    status.textContent = 'It\'s a draw!';
    sounds.draw.play();
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  status.textContent = `Player ${currentPlayer}'s turn`;
}

// Reset game
resetButton.addEventListener('click', () => {
  gameState = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;
  status.textContent = `Player ${currentPlayer}'s turn`;
  createBoard();
});

createBoard();