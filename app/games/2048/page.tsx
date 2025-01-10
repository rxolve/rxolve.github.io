"use client";
import { useState, useEffect } from "react";

type Cell = 2 | 4 | 8 | 16 | 32 | 64 | 128 | 256 | 512 | 1024 | 2048 | null;
type Board = Cell[][];

const createEmptyBoard = (): Board =>
  Array(4)
    .fill(null)
    .map(() => Array(4).fill(null));

const addRandomTile = (board: Board): Board => {
  const emptyTiles = [];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] === null) {
        emptyTiles.push({ i, j });
      }
    }
  }
  if (emptyTiles.length === 0) return board;

  const { i, j } = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
  const newBoard = [...board];
  newBoard[i][j] = Math.random() < 0.9 ? 2 : 4;
  return newBoard;
};

const moveLeft = (board: Board): Board => {
  return board.map((row) => {
    const filteredRow = row.filter((cell) => cell !== null);
    const newRow: Cell[] = [];
    for (let i = 0; i < filteredRow.length; i++) {
      if (i < filteredRow.length - 1 && filteredRow[i] === filteredRow[i + 1]) {
        newRow.push((filteredRow[i]! * 2) as Cell);
        i++;
      } else {
        newRow.push(filteredRow[i]!);
      }
    }
    while (newRow.length < 4) newRow.push(null);
    return newRow;
  });
};

const rotate = (board: Board): Board => {
  const newBoard: Board = createEmptyBoard();
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      newBoard[i][j] = board[3 - j][i];
    }
  }
  return newBoard;
};

const move = (board: Board, direction: string): Board => {
  let newBoard = [...board];
  if (direction === "ArrowUp") {
    newBoard = rotate(newBoard);
    newBoard = moveLeft(newBoard);
    newBoard = rotate(newBoard);
    newBoard = rotate(newBoard);
    newBoard = rotate(newBoard);
  } else if (direction === "ArrowRight") {
    newBoard = rotate(newBoard);
    newBoard = rotate(newBoard);
    newBoard = moveLeft(newBoard);
    newBoard = rotate(newBoard);
    newBoard = rotate(newBoard);
  } else if (direction === "ArrowDown") {
    newBoard = rotate(newBoard);
    newBoard = rotate(newBoard);
    newBoard = rotate(newBoard);
    newBoard = moveLeft(newBoard);
    newBoard = rotate(newBoard);
  } else if (direction === "ArrowLeft") {
    newBoard = moveLeft(newBoard);
  }
  return newBoard;
};

const Game: React.FC = () => {
  const [board, setBoard] = useState<Board>(() =>
    addRandomTile(addRandomTile(createEmptyBoard()))
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        ["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"].includes(event.key)
      ) {
        const newBoard = move(board, event.key);
        if (JSON.stringify(newBoard) !== JSON.stringify(board)) {
          setBoard(addRandomTile(newBoard));
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [board]);

  return (
    <div>
      <h1>2048 Game</h1>
      <div>
        {board.map((row, i) =>
          row.map((cell, j) => <div key={`${i}-${j}`}>{cell}</div>)
        )}
      </div>
    </div>
  );
};

export default Game;
