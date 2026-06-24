export const GRID_SIZE = 16;
export const INITIAL_DIRECTION = "right";
export const TICK_MS = 140;

const OFFSETS = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

const OPPOSITES = {
  up: "down",
  down: "up",
  left: "right",
  right: "left",
};

export function createInitialState(size = GRID_SIZE, rng = Math.random) {
  const center = Math.floor(size / 2);
  const snake = [
    { x: center, y: center },
    { x: center - 1, y: center },
    { x: center - 2, y: center },
  ];

  return {
    size,
    snake,
    direction: INITIAL_DIRECTION,
    pendingDirection: INITIAL_DIRECTION,
    food: placeFood(size, snake, rng),
    score: 0,
    isGameOver: false,
  };
}

export function queueDirection(state, nextDirection) {
  if (!OFFSETS[nextDirection]) {
    return state.direction;
  }

  if (state.snake.length > 1 && OPPOSITES[state.direction] === nextDirection) {
    return state.direction;
  }

  return nextDirection;
}

export function stepGame(state, rng = Math.random) {
  if (state.isGameOver) {
    return state;
  }

  const direction = state.pendingDirection;
  const offset = OFFSETS[direction];
  const head = state.snake[0];
  const nextHead = { x: head.x + offset.x, y: head.y + offset.y };

  const willEat = nextHead.x === state.food.x && nextHead.y === state.food.y;
  const trimmedSnake = willEat ? state.snake : state.snake.slice(0, -1);

  if (hitsWall(nextHead, state.size) || hitsSnake(nextHead, trimmedSnake)) {
    return {
      ...state,
      direction,
      pendingDirection: direction,
      isGameOver: true,
    };
  }

  const nextSnake = [nextHead, ...trimmedSnake];
  const nextScore = willEat ? state.score + 1 : state.score;

  return {
    ...state,
    snake: nextSnake,
    direction,
    pendingDirection: direction,
    food: willEat ? placeFood(state.size, nextSnake, rng) : state.food,
    score: nextScore,
    isGameOver: false,
  };
}

export function placeFood(size, snake, rng = Math.random) {
  const occupied = new Set(snake.map((segment) => `${segment.x},${segment.y}`));
  const freeCells = [];

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const key = `${x},${y}`;
      if (!occupied.has(key)) {
        freeCells.push({ x, y });
      }
    }
  }

  if (freeCells.length === 0) {
    return null;
  }

  const index = Math.floor(rng() * freeCells.length);
  return freeCells[index];
}

export function hitsWall(position, size) {
  return (
    position.x < 0 ||
    position.y < 0 ||
    position.x >= size ||
    position.y >= size
  );
}

export function hitsSnake(position, snake) {
  return snake.some((segment) => segment.x === position.x && segment.y === position.y);
}
