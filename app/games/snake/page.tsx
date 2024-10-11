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

const Snake: React.FC = () => {
  const getRandomPosition = (): Position => {
    return [
      Math.floor(Math.random() * GRID_SIZE),
      Math.floor(Math.random() * GRID_SIZE),
    ];
  };

  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [direction, setDirection] = useState<Position>(INITIAL_DIRECTION);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [food, setFood] = useState<Position>(getRandomPosition());
  const [score, setScore] = useState<number>(0);

  const checkCollisionToWall = (head: Position, body: Position[]): boolean => {
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

  const checkCollisionToBody = (head: Position, body: Position[]): boolean => {
    console.log(head);
    console.log(body);
    // 머리가 몸통과 부딪혔는지 체크
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

  const moveSnake = useCallback(() => {
    if (gameOver) return;

    const newSnake = [...snake];
    const head = newSnake[0];
    const newHead: Position = [head[0] + direction[0], head[1] + direction[1]];

    // 벽 충돌 체크
    if (checkCollisionToWall(newHead, newSnake)) {
      setGameOver(true);
      return;
    }

    // 몸통 충돌 체크
    if (checkCollisionToBody(newHead, newSnake.slice(1))) {
      setGameOver(true);
      return;
    }

    newSnake.unshift(newHead);

    // 먹이를 먹었는지 체크
    if (newHead[0] === food[0] && newHead[1] === food[1]) {
      generateFood(); // 먹이를 먹었으면 새로운 먹이 생성
      setScore((prevScore) => prevScore + 1); // 점수 증가
    } else {
      newSnake.pop(); // 먹이를 먹지 않았으면 꼬리 제거
    }

    setSnake(newSnake);
  }, [snake, direction, food, gameOver, generateFood]);

  const restartGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setGameOver(false);
    setScore(0);
    generateFood();
  };

  useEffect(() => {
    const gameLoop = setInterval(moveSnake, 200);
    return () => clearInterval(gameLoop);
  }, [moveSnake]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameOver) return;

      const [dx, dy] = direction; // 현재 방향

      switch (e.key) {
        case "ArrowUp":
          // 현재 아래로 이동 중일 때 위로 전환 불가
          if (dy !== 1) setDirection([0, -1]);
          break;
        case "ArrowDown":
          // 현재 위로 이동 중일 때 아래로 전환 불가
          if (dy !== -1) setDirection([0, 1]);
          break;
        case "ArrowLeft":
          // 현재 오른쪽으로 이동 중일 때 왼쪽 전환 불가
          if (dx !== 1) setDirection([-1, 0]);
          break;
        case "ArrowRight":
          // 현재 왼쪽으로 이동 중일 때 오른쪽 전환 불가
          if (dx !== -1) setDirection([1, 0]);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [gameOver, direction]);

  return (
    <main className="text-center">
      <h1>Snake Game</h1>
      {gameOver ? (
        <div className="mt-4">
          <h2 className="text-xl font-bold text-red-600">Game Over!</h2>
          <p>Final Score: {score}</p> {/* 점수 표시 */}
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
            const isFood = food[0] === x && food[1] === y; // 먹이 체크

            return (
              <div
                key={index}
                style={{
                  width: `${CELL_SIZE}px`,
                  height: `${CELL_SIZE}px`,
                  backgroundColor: isSnake ? "blue" : isFood ? "red" : "white", // 먹이는 빨간색
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
