// script.js
const board = document.getElementById('board');
const bgMusic = document.getElementById('bg-music');
const moveSound = document.getElementById('move-sound');
const winSound = document.getElementById('win-sound');
const drawSound = document.getElementById('draw-sound');

let currentPlayer = 'X';
let gameActive = true;

const cells = Array(9).fill(null);

function checkWinner() {
  const wins = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  for (const [a, b, c] of wins) {
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      gameActive = false;
      winSound.play();
      alert(`Player ${cells[a]} wins!`);
      return;
    }
  }

  if (!cells.includes(null)) {
    gameActive = false;
    drawSound.play();
    alert("It's a draw!");
  }
}

function handleClick(index, cellDiv) {
  if (!gameActive || cells[index]) return;
  cells[index] = currentPlayer;
  cellDiv.textContent = currentPlayer;
  moveSound.play();
  checkWinner();
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function createBoard() {
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.addEventListener('click', () => handleClick(i, cell));
    board.appendChild(cell);
  }
}

// Start game
createBoard();
bgMusic.volume = 0.3;
bgMusic.play();
