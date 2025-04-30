let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;
let mode = "2player";
let device = "desktop";
let score = { X: 0, O: 0 };
let winCount = { X: 0, O: 0 };

const winCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6],            // diagonals
];

// Fetch DOM elements
const soundToggle = document.getElementById("soundToggle");
const boardContainer = document.getElementById("board-container");
const bgMusic = document.getElementById("bg-music");
const moveSound = document.getElementById("move-sound");
const winSound = document.getElementById("win-sound");
const drawSound = document.getElementById("draw-sound");
const clickSound = document.getElementById("move-sound");

bgMusic.volume = 0.2; // Adjust volume as needed

soundToggle.addEventListener("click", () => {
  const mute = !bgMusic.muted;
  setMuteState(mute);
  soundToggle.textContent = mute ? "Unmute Sound" : "Mute Sound";
  soundToggle.classList.toggle("muted", mute);
});

// Add other game logic
function setMuteState(mute) {
  bgMusic.muted = mute;
  moveSound.muted = mute;
  winSound.muted = mute;
  drawSound.muted = mute;
}

function playMoveSound() {
  moveSound.currentTime = 0;
  moveSound.play();
}

function playWinSound() {
  winSound.play();
}

function playDrawSound() {
  drawSound.play();
}

function startGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  turnIndicator.textContent = "Player X's Turn";
  renderBoard();
}

function renderBoard() {
  boardContainer.innerHTML = "";
  board.forEach((cell, index) => {
    const cellElement = document.createElement("div");
    cellElement.classList.add("cell");
    cellElement.dataset.index = index;
    cellElement.textContent = cell;
    cellElement.addEventListener("click", handleMove);
    boardContainer.appendChild(cellElement);
  });
}

function handleMove(e) {
  const index = e.target.dataset.index;
  if (!gameActive || board[index]) return;

  board[index] = currentPlayer;
  clickSound.play();
  renderBoard();
  checkResult();

  if (gameActive && mode === "computer" && currentPlayer === "O") {
    setTimeout(aiMove, 500);
  }
}

function aiMove() {
  const emptyIndexes = board.map((v, i) => v === "" ? i : null).filter(v => v !== null);
  const randomIndex = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
  board[randomIndex] = "O";
  clickSound.play();
  renderBoard();
  checkResult();
}

function checkResult() {
  let roundWon = false;
  for (const combo of winCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    winSound.play();
    gameActive = false;
    score[currentPlayer]++;
    document.getElementById(`score${currentPlayer}`).textContent = score[currentPlayer];
    turnIndicator.textContent = `Player ${currentPlayer} Wins!`;

    if (++winCount[currentPlayer] === 3) {
      showWinner(currentPlayer);
    }

    setTimeout(startGame, 2000);
    return;
  }

  if (!board.includes("")) {
    drawSound.play();
    gameActive = false;
    turnIndicator.textContent = "It's a Draw!";
    setTimeout(startGame, 2000);
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  turnIndicator.textContent = `Player ${currentPlayer}'s Turn`;
}

function resetGame() {
  score = { X: 0, O: 0 };
  winCount = { X: 0, O: 0 };
  document.getElementById("scoreX").textContent = "0";
  document.getElementById("scoreO").textContent = "0";
  startGame();
}

function showWinner(player) {
  turnIndicator.textContent = `Player ${player} is the Champion!`;
  launchConfetti();
  setTimeout(() => {
    resetGame();
  }, 5000);
}

// Confetti Animation using canvas-confetti
function launchConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  const confetti = window.confetti.create(canvas, { resize: true });
  confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
}
