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
const INITIAL_DIRECTION: Position = [1, 0];

const DIRECTIONS: Position[] = [
  [0, -1], // 위
  [0, 1], // 아래
  [-1, 0], // 왼쪽
  [1, 0], // 오른쪽
];

const Snake: React.FC = () => {
  const getRandomPosition = (): Position => {
    return [
      Math.floor(Math.random() * GRID_SIZE),
      Math.floor(Math.random() * GRID_SIZE),
    ];
  };

  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [food, setFood] = useState<Position>(getRandomPosition());
  const [score, setScore] = useState<number>(0);

  const checkCollisionToWall = (head: Position): boolean => {
    return (
      head[0] < 0 || head[0] >= GRID_SIZE || head[1] < 0 || head[1] >= GRID_SIZE
    );
  };

  const checkCollisionToBody = (head: Position, body: Position[]): boolean => {
    return body.some(
      (segment) => segment[0] === head[0] && segment[1] === head[1]
    );
  };

  const generateFood = useCallback(() => {
    let newFood: Position;
    do {
      newFood = getRandomPosition();
    } while (
      snake.some(
        (segment) => segment[0] === newFood[0] && segment[1] === newFood[1]
      )
    );
    setFood(newFood);
  }, [snake]);

  const calculateNextDirection = useCallback((): Position | null => {
    const [headX, headY] = snake[0];
    const [foodX, foodY] = food;

    // 가능한 모든 방향 중 벽과 몸통에 충돌하지 않는 방향 필터링
    const validDirections = DIRECTIONS.filter(([dx, dy]) => {
      const newHead: Position = [headX + dx, headY + dy];
      return (
        !checkCollisionToWall(newHead) &&
        !checkCollisionToBody(newHead, snake.slice(1))
      );
    });

    // 유효한 방향이 없다면 게임 종료
    if (validDirections.length === 0) return null;

    // 유효한 방향 중 먹이와의 맨해튼 거리가 가장 짧은 방향 선택
    const bestDirection = validDirections.reduce((best, current) => {
      const [currentDx, currentDy] = current;
      const newHead: Position = [headX + currentDx, headY + currentDy];

      const bestDistance =
        Math.abs(best[0] + headX - foodX) + Math.abs(best[1] + headY - foodY);
      const currentDistance =
        Math.abs(newHead[0] - foodX) + Math.abs(newHead[1] - foodY);

      return currentDistance < bestDistance ? current : best;
    });

    return bestDirection;
  }, [snake, food]);

  const moveSnake = useCallback(() => {
    if (gameOver) return;

    const newDirection = calculateNextDirection();
    if (!newDirection) {
      setGameOver(true); // 유효한 경로가 없을 경우 게임 종료
      return;
    }

    const newSnake = [...snake];
    const head = newSnake[0];
    const newHead: Position = [
      head[0] + newDirection[0],
      head[1] + newDirection[1],
    ];

    newSnake.unshift(newHead);

    if (newHead[0] === food[0] && newHead[1] === food[1]) {
      generateFood();
      setScore((prevScore) => prevScore + 1);
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  }, [snake, gameOver, calculateNextDirection, generateFood]);

  const restartGame = () => {
    setSnake(INITIAL_SNAKE);
    setGameOver(false);
    setScore(0);
    generateFood();
  };

  useEffect(() => {
    const gameLoop = setInterval(moveSnake, 200);
    return () => clearInterval(gameLoop);
  }, [moveSnake]);

  return (
    <main className="text-center">
      <h1>Snake Game</h1>
      {gameOver ? (
        <div className="mt-4">
          <h2 className="text-xl font-bold text-red-600">Game Over!</h2>
          <p>Final Score: {score}</p>
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
            const isFood = food[0] === x && food[1] === y;

            return (
              <div
                key={index}
                style={{
                  width: `${CELL_SIZE}px`,
                  height: `${CELL_SIZE}px`,
                  backgroundColor: isSnake ? "blue" : isFood ? "red" : "white",
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
