"use client";
import { useState, useRef, useEffect } from "react";

const DotLogoMaker = () => {
  const [width, setWidth] = useState<number>(6);
  const [height, setHeight] = useState<number>(6);
  const [primaryColor, setPrimaryColor] = useState<string>("#FFBE98");
  const [secondaryColor, setSecondaryColor] = useState<string>("#CA848A");
  const [rectangles, setRectangles] = useState<boolean[][]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (width < 1) setWidth(1);
    if (height < 1) setHeight(1);
    if (width > 20) setWidth(20);
    if (height > 20) setHeight(20);

    // false로 채워진 2차원 배열 생성
    const newRectangles = Array.from({ length: height }, () =>
      Array(width).fill(false)
    );
    setRectangles(newRectangles);
    drawOnCanvas(newRectangles);
  }, [width, height]);

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
            context.fillStyle = col ? secondaryColor : primaryColor;
            context.fillRect(colIndex * 50, rowIndex * 50, 50, 50);
          });
        });

        // // 중앙 십자형 하얀색 선 그리기
        // context.strokeStyle = secondaryColor;
        // context.lineWidth = 1;

        // // 세로 중앙선
        // context.beginPath();
        // context.moveTo(canvas.width / 2, 0);
        // context.lineTo(canvas.width / 2, canvas.height);
        // context.stroke();

        // // 가로 중앙선
        // context.beginPath();
        // context.moveTo(0, canvas.height / 2);
        // context.lineTo(canvas.width, canvas.height / 2);
        // context.stroke();
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
    <main>
      <div className="flex items-center gap-2.5 mb-5">
        <label>
          Width:
          <input
            type="number"
            value={width}
            onChange={(e) => setWidth(Number(e.target.value))}
            className="ml-2.5"
          />
        </label>
        <label>
          Height:
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            className="ml-2.5"
          />
        </label>
        <label>
          Primary Color:
          <input
            type="color"
            value={primaryColor}
            onChange={(e) => setPrimaryColor(e.target.value)}
            className="ml-2.5"
          />
        </label>
        <label>
          Secondary Color:
          <input
            type="color"
            value={secondaryColor}
            onChange={(e) => setSecondaryColor(e.target.value)}
            className="ml-2.5"
          />
        </label>
      </div>
      <div
        className={`grid`}
        style={{ gridTemplateColumns: `repeat(${width}, 50px)` }}
      >
        {rectangles.map((row, rowIndex) =>
          row.map((col, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              onClick={() => toggleRectangle(rowIndex, colIndex)}
              className={`w-[50px] h-[50px]`}
              style={{ backgroundColor: col ? secondaryColor : primaryColor }}
            ></div>
          ))
        )}
      </div>
      <button onClick={downloadImage} className="my-5">
        Download Image
      </button>
      <canvas ref={canvasRef} className="hidden"></canvas>
    </main>
  );
};

export default DotLogoMaker;
