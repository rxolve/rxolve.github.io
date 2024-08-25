"use client";

import React from "react";

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const GAP_SIZE = 1;

const Snake: React.FC = () => {
  return (
    <main className="text-center">
      <h1>Snake Game</h1>
      <div
        className="grid bg-gray-300 border border-gray-400 mx-auto"
        style={{
          gridTemplateColumns: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`,
          gap: "1px",
          width: `${GRID_SIZE * (CELL_SIZE + GAP_SIZE)}px`,
        }}
      >
        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => (
          <div
            key={index}
            className="bg-white"
            style={{
              width: `${CELL_SIZE}px`,
              height: `${CELL_SIZE}px`,
            }}
          />
        ))}
      </div>
    </main>
  );
};

export default Snake;
