"use client";

import React, { useState, useEffect, useCallback } from "react";
import Head from "next/head";

type Position = [number, number];

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SNAKE: Position[] = [[2, 2]];
const INITIAL_DIRECTION: Position = [1, 0];
const INITIAL_FOOD: Position = [10, 10];

const Snake: React.FC = () => {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [direction, setDirection] = useState<Position>(INITIAL_DIRECTION);
  const [food, setFood] = useState<Position>(INITIAL_FOOD);
  const [gameOver, setGameOver] = useState<boolean>(false);

  const moveSnake = useCallback(() => {
    const newSnake = [...snake];
    const head = newSnake[0];
    const newHead: Position = [
      (head[0] + direction[0] + GRID_SIZE) % GRID_SIZE,
      (head[1] + direction[1] + GRID_SIZE) % GRID_SIZE,
    ];

    if (newHead[0] === food[0] && newHead[1] === food[1]) {
      setFood(getRandomPosition());
    } else {
      newSnake.pop();
    }

    newSnake.unshift(newHead);

    if (checkCollision(newHead, newSnake.slice(1))) {
      setGameOver(true);
    } else {
      setSnake(newSnake);
    }
  }, [snake, direction, food]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
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
  }, []);

  useEffect(() => {
    if (!gameOver) {
      const gameLoop = setInterval(moveSnake, 200);
      return () => clearInterval(gameLoop);
    }
  }, [gameOver, moveSnake]);

  const getRandomPosition = (): Position => {
    return [
      Math.floor(Math.random() * GRID_SIZE),
      Math.floor(Math.random() * GRID_SIZE),
    ];
  };

  const checkCollision = (head: Position, body: Position[]): boolean => {
    return body.some(
      (segment) => segment[0] === head[0] && segment[1] === head[1]
    );
  };

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(INITIAL_FOOD);
    setGameOver(false);
  };

  return (
    <div>
      <Head>
        <title>Snake Game</title>
        <meta
          name="description"
          content="Snake game built with Next.js and TypeScript"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Snake Game</h1>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`,
            gap: "1px",
            backgroundColor: "#ccc",
            border: "1px solid #999",
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
                  width: CELL_SIZE,
                  height: CELL_SIZE,
                  backgroundColor: isSnake ? "green" : isFood ? "red" : "white",
                }}
              />
            );
          })}
        </div>
        {gameOver && (
          <div>
            <h2>Game Over</h2>
            <button onClick={resetGame}>Restart</button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Snake;
