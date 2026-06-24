import test from "node:test";
import assert from "node:assert/strict";

import {
  createInitialState,
  hitsSnake,
  hitsWall,
  placeFood,
  queueDirection,
  stepGame,
} from "./snakeLogic.js";

test("snake moves one cell in the queued direction", () => {
  const initial = createInitialState(8, () => 0);
  const next = stepGame(initial, () => 0);

  assert.deepEqual(next.snake[0], { x: 5, y: 4 });
  assert.equal(next.score, 0);
});

test("snake grows and score increments when eating food", () => {
  const initial = {
    size: 8,
    snake: [
      { x: 3, y: 3 },
      { x: 2, y: 3 },
      { x: 1, y: 3 },
    ],
    direction: "right",
    pendingDirection: "right",
    food: { x: 4, y: 3 },
    score: 0,
    isGameOver: false,
  };

  const next = stepGame(initial, () => 0);

  assert.equal(next.score, 1);
  assert.equal(next.snake.length, 4);
  assert.deepEqual(next.snake[0], { x: 4, y: 3 });
  assert.notDeepEqual(next.food, { x: 4, y: 3 });
});

test("reversing into the opposite direction is ignored", () => {
  const initial = createInitialState(8, () => 0);
  const nextDirection = queueDirection(initial, "left");

  assert.equal(nextDirection, "right");
});

test("wall collisions end the game", () => {
  const initial = {
    size: 5,
    snake: [
      { x: 4, y: 2 },
      { x: 3, y: 2 },
    ],
    direction: "right",
    pendingDirection: "right",
    food: { x: 0, y: 0 },
    score: 0,
    isGameOver: false,
  };

  const next = stepGame(initial, () => 0);

  assert.equal(next.isGameOver, true);
});

test("self collisions end the game", () => {
  const initial = {
    size: 6,
    snake: [
      { x: 2, y: 2 },
      { x: 2, y: 3 },
      { x: 1, y: 3 },
      { x: 1, y: 2 },
      { x: 1, y: 1 },
      { x: 2, y: 1 },
    ],
    direction: "up",
    pendingDirection: "left",
    food: { x: 5, y: 5 },
    score: 0,
    isGameOver: false,
  };

  const next = stepGame(initial, () => 0);

  assert.equal(next.isGameOver, true);
});

test("food placement skips occupied cells", () => {
  const food = placeFood(
    3,
    [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 2, y: 1 },
      { x: 0, y: 2 },
      { x: 1, y: 2 },
    ],
    () => 0
  );

  assert.deepEqual(food, { x: 2, y: 2 });
});

test("collision helpers report occupied positions correctly", () => {
  assert.equal(hitsWall({ x: -1, y: 0 }, 4), true);
  assert.equal(hitsWall({ x: 3, y: 3 }, 4), false);
  assert.equal(hitsSnake({ x: 1, y: 1 }, [{ x: 1, y: 1 }]), true);
  assert.equal(hitsSnake({ x: 0, y: 0 }, [{ x: 1, y: 1 }]), false);
});
