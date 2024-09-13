"use client";

import React, { useCallback, useEffect, useState } from "react";

type Position = [number, number];

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const GAP_SIZE = 1;
const INITIAL_SNAKE: Position[] = [
  [2, 2],
  [2, 3],
];
const INITIAL_DIRECTION: Position = [0, 1];

const Snake: React.FC = () => {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [direction, setDirection] = useState<Position>(INITIAL_DIRECTION);
  const [gameOver, setGameOver] = useState<boolean>(false);

  const checkCollision = (head: Position, body: Position[]): boolean => {
    // 벽과의 충돌 체크
    if (
      head[0] < 0 ||
      head[0] >= GRID_SIZE ||
      head[1] < 0 ||
      head[1] >= GRID_SIZE
    ) {
      return true;
    }

    return false;
  };

  const moveSnake = useCallback(() => {
    if (gameOver) return;

    const newSnake = [...snake];
    const head = newSnake[0];
    const newHead: Position = [head[0] + direction[0], head[1] + direction[1]];

    newSnake.unshift(newHead);
    newSnake.pop();

    if (checkCollision(newHead, newSnake)) {
      setGameOver(true);
      return;
    }

    setSnake(newSnake);
  }, [snake, direction, gameOver]);

  const restartGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setGameOver(false);
  };

  useEffect(() => {
    const gameLoop = setInterval(moveSnake, 200);
    return () => clearInterval(gameLoop);
  }, [moveSnake]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameOver) return;

      switch (e.key) {
        case "ArrowUp":
          setDirection([0, -1]);
          break;
        case "ArrowDown":
          setDirection([0, 1]);
          break;
        case "ArrowLeft":
          setDirection([-1, 0]);
          break;
        case "ArrowRight":
          setDirection([1, 0]);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [gameOver]);

  return (
    <main className="text-center">
      <h1>Snake Game</h1>
      {gameOver ? (
        <div className="mt-4">
          <h2 className="text-xl font-bold text-red-600">Game Over!</h2>
          <button
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={restartGame}
          >
            Restart
          </button>
        </div>
      ) : (
        <div
          className="grid bg-gray-300 border border-gray-400 mx-auto"
          style={{
            gridTemplateColumns: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`,
            gap: "1px",
            width: `${GRID_SIZE * (CELL_SIZE + GAP_SIZE)}px`,
          }}
        >
          {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
            const x = index % GRID_SIZE;
            const y = Math.floor(index / GRID_SIZE);
            const isSnake = snake.some((pos) => pos[0] === x && pos[1] === y);

            return (
              <div
                key={index}
                style={{
                  width: `${CELL_SIZE}px`,
                  height: `${CELL_SIZE}px`,
                  backgroundColor: isSnake ? "blue" : "white",
                }}
              />
            );
          })}
        </div>
      )}
    </main>
  );
};

export default Snake;
