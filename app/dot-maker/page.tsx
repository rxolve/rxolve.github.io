"use client";
import { useState, useRef } from "react";

export default function Home() {
  const [width, setWidth] = useState<number>(6);
  const [height, setHeight] = useState<number>(6);
  const [rectangles, setRectangles] = useState<boolean[][]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const createRectangles = () => {
    const newRectangles = Array.from({ length: height }, () =>
      Array(width).fill(false)
    );
    setRectangles(newRectangles);
    drawOnCanvas(newRectangles);
  };

  const toggleRectangle = (row: number, col: number) => {
    const newRectangles = rectangles.map((r, rowIndex) =>
      r.map((c, colIndex) => (rowIndex === row && colIndex === col ? !c : c))
    );
    setRectangles(newRectangles);
    drawOnCanvas(newRectangles);
  };

  const drawOnCanvas = (rectangles: boolean[][]) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        canvas.width = width * 50;
        canvas.height = height * 50;
        context.clearRect(0, 0, canvas.width, canvas.height);
        rectangles.forEach((row, rowIndex) => {
          row.forEach((col, colIndex) => {
            context.fillStyle = col ? "#CA848A" : "#FFBE98";
            context.fillRect(colIndex * 50, rowIndex * 50, 50, 50);
            // context.strokeRect(colIndex * 50, rowIndex * 50, 50, 50);
          });
        });

        // 중앙 십자형 하얀색 선 그리기
        context.strokeStyle = "#FFBE98";
        context.lineWidth = 1;

        // 세로 중앙선
        context.beginPath();
        context.moveTo(canvas.width / 2, 0);
        context.lineTo(canvas.width / 2, canvas.height);
        context.stroke();

        // 가로 중앙선
        context.beginPath();
        context.moveTo(0, canvas.height / 2);
        context.lineTo(canvas.width, canvas.height / 2);
        context.stroke();

        // 중앙 한칸 위
        context.beginPath();
        context.moveTo(0, canvas.height / 2 - 50);
        context.lineTo(canvas.width, canvas.height / 2 - 50);
        context.stroke();

        context.beginPath();
        context.moveTo(0, canvas.height - 50);
        context.lineTo(canvas.width / 2, canvas.height - 50);
        context.stroke();

        context.beginPath();
        context.moveTo(canvas.width / 2 + 100, canvas.height / 2);
        context.lineTo(canvas.width / 2 + 100, canvas.height);
        context.stroke();
      }
    }
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "rectangles.png";
      link.click();
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <div>
        <label>
          Width:
          <input
            type="number"
            value={width}
            onChange={(e) => setWidth(Number(e.target.value))}
          />
        </label>
        <label>
          Height:
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
          />
        </label>
        <button onClick={createRectangles}>Create Rectangles</button>
        <button onClick={downloadImage}>Download Image</button>
      </div>
      <div
        style={{
          marginTop: "20px",
          display: "grid",
          gridTemplateColumns: `repeat(${width}, 50px)`,
        }}
      >
        {rectangles.map((row, rowIndex) =>
          row.map((col, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              onClick={() => toggleRectangle(rowIndex, colIndex)}
              style={{
                width: "50px",
                height: "50px",
                backgroundColor: col ? "black" : "white",
                border: "1px solid black",
              }}
            ></div>
          ))
        )}
      </div>
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
    </div>
  );
}
