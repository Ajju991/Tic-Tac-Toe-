const buttons = document.querySelectorAll('.grid-button');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('reset-button');

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

// Handle move
function handleMove(index) {
  if (gameState[index] !== '' || !gameActive) return;

  gameState[index] = currentPlayer;
  buttons[index].textContent = currentPlayer;
  buttons[index].disabled = true;
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
    statusText.textContent = `Player ${currentPlayer} wins!`;
    sounds.win.play();
    gameActive = false;
    return;
  }

  if (!gameState.includes('')) {
    statusText.textContent = 'It\'s a draw!';
    sounds.draw.play();
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

// Reset game
resetButton.addEventListener('click', () => {
  gameState = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;
  statusText.textContent = `Player ${currentPlayer}'s Turn`;

  buttons.forEach(button => {
    button.textContent = '';
    button.disabled = false;
  });
});

// Add event listeners to buttons
buttons.forEach((button, index) => {
  button.addEventListener('click', () => handleMove(index));
});createBoard();
