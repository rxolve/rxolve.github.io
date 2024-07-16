"use client";

import React, { useState } from "react";
import { insertionSort, mergeSort, timSort } from "./sorting";

interface AlgorithmResult {
  [key: string]: number;
}

const AlgorithmTest: React.FC = () => {
  const [arraySize, setArraySize] = useState<number>(1000);
  const [results, setResults] = useState<AlgorithmResult>({});

  const generateRandomArray = (size: number): number[] => {
    return Array.from({ length: size }, () => Math.floor(Math.random() * 1000));
  };

  const runTest = () => {
    const testArray = generateRandomArray(arraySize);
    const algorithms = [
      { name: "Insertion Sort", func: insertionSort },
      { name: "Merge Sort", func: mergeSort },
      { name: "Tim Sort", func: timSort },
    ];

    const newResults: AlgorithmResult = {};

    algorithms.forEach(({ name, func }) => {
      const arrayCopy = [...testArray];
      const start = performance.now();
      func(arrayCopy);
      const end = performance.now();
      newResults[name] = end - start;
    });

    setResults(newResults);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">알고리즘 성능 테스트</h1>
      <div className="mb-4">
        <label htmlFor="arraySize" className="mr-2">
          배열 크기:
        </label>
        <input
          id="arraySize"
          type="number"
          value={arraySize}
          onChange={(e) => setArraySize(Number(e.target.value))}
          className="border p-1"
        />
      </div>
      <button
        onClick={runTest}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        테스트 실행
      </button>
      {Object.keys(results).length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">결과:</h2>
          <ul>
            {Object.entries(results).map(([name, time]) => (
              <li key={name}>
                {name}: {time.toFixed(2)}ms
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AlgorithmTest;
