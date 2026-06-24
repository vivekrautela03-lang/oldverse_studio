import {
  GRID_SIZE,
  TICK_MS,
  createInitialState,
  queueDirection,
  stepGame,
} from "./snakeLogic.js";

const board = document.getElementById("board");
const scoreValue = document.getElementById("score");
const bestScoreValue = document.getElementById("best-score");
const statusValue = document.getElementById("status");
const startButton = document.getElementById("start-button");
const pauseButton = document.getElementById("pause-button");
const restartButton = document.getElementById("restart-button");
const controlButtons = Array.from(document.querySelectorAll("[data-direction]"));

const BEST_SCORE_KEY = "snake-best-score";

let state = createInitialState();
let intervalId = null;
let isRunning = false;
let isPaused = false;
let bestScore = readBestScore();

setupBoard();
render();

function setupBoard() {
  const cells = GRID_SIZE * GRID_SIZE;

  for (let i = 0; i < cells; i += 1) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.setAttribute("role", "gridcell");
    board.appendChild(cell);
  }
}

function readBestScore() {
  try {
    return Number(window.localStorage.getItem(BEST_SCORE_KEY) ?? 0);
  } catch {
    return 0;
  }
}

function writeBestScore(value) {
  try {
    window.localStorage.setItem(BEST_SCORE_KEY, String(value));
  } catch {
    // Ignore storage failures and keep gameplay unaffected.
  }
}

function startGame() {
  if (state.isGameOver) {
    resetGame();
  }

  if (isRunning) {
    return;
  }

  isRunning = true;
  isPaused = false;
  intervalId = window.setInterval(runTick, TICK_MS);
  render();
}

function pauseGame() {
  if (!isRunning) {
    return;
  }

  isRunning = false;
  isPaused = true;
  window.clearInterval(intervalId);
  intervalId = null;
  render();
}

function resetGame() {
  window.clearInterval(intervalId);
  intervalId = null;
  state = createInitialState();
  isRunning = false;
  isPaused = false;
  render();
}

function runTick() {
  state = stepGame(state);

  if (state.score > bestScore) {
    bestScore = state.score;
    writeBestScore(bestScore);
  }

  if (state.isGameOver) {
    isRunning = false;
    isPaused = false;
    window.clearInterval(intervalId);
    intervalId = null;
  }

  render();
}

function handleDirectionInput(direction) {
  state = {
    ...state,
    pendingDirection: queueDirection(state, direction),
  };

  if (!isRunning && !state.isGameOver) {
    startGame();
  } else {
    render();
  }
}

function render() {
  const cells = Array.from(board.children);
  const snakeMap = new Map(
    state.snake.map((segment, index) => [`${segment.x},${segment.y}`, index])
  );
  const foodKey = state.food ? `${state.food.x},${state.food.y}` : null;

  for (let y = 0; y < GRID_SIZE; y += 1) {
    for (let x = 0; x < GRID_SIZE; x += 1) {
      const index = y * GRID_SIZE + x;
      const cell = cells[index];
      const key = `${x},${y}`;
      cell.className = "cell";

      if (snakeMap.has(key)) {
        cell.classList.add("snake");
        if (snakeMap.get(key) === 0) {
          cell.classList.add("head");
        }
      } else if (key === foodKey) {
        cell.classList.add("food");
      }
    }
  }

  scoreValue.textContent = String(state.score);
  bestScoreValue.textContent = String(bestScore);
  statusValue.textContent = getStatusText();
  pauseButton.textContent = isRunning ? "Pause" : "Resume";
}

function getStatusText() {
  if (state.isGameOver) {
    return "Game over";
  }

  if (isRunning) {
    return "Running";
  }

  if (isPaused) {
    return "Paused";
  }

  return "Ready";
}

function handleKeydown(event) {
  const key = event.key.toLowerCase();
  const direction =
    {
      arrowup: "up",
      w: "up",
      arrowdown: "down",
      s: "down",
      arrowleft: "left",
      a: "left",
      arrowright: "right",
      d: "right",
    }[key] ?? null;

  if (!direction) {
    if (key === " ") {
      event.preventDefault();
      if (isRunning) {
        pauseGame();
      } else {
        startGame();
      }
    }
    return;
  }

  event.preventDefault();
  handleDirectionInput(direction);
}

startButton.addEventListener("click", startGame);
pauseButton.addEventListener("click", () => {
  if (isRunning) {
    pauseGame();
  } else {
    startGame();
  }
});
restartButton.addEventListener("click", resetGame);
document.addEventListener("keydown", handleKeydown);

for (const button of controlButtons) {
  button.addEventListener("click", () => {
    handleDirectionInput(button.dataset.direction);
  });
}
