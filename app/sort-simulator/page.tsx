"use client";

import { useEffect, useMemo, useState } from "react";

const SortSimulator = () => {
  const size = useMemo(() => 100000, []);

  const [waiting, setWaiting] = useState(false);
  const [lawArray, setLawArray] = useState(new Array(size).fill(0));
  const [insertSortArray, setInsertSortArray] = useState(
    new Array(size).fill(0)
  );
  const [insertSortTime, setInsertSortTime] = useState("0.00");

  useEffect(() => {
    const randomArray: number[] = lawArray.map(() =>
      Math.floor(Math.random() * size)
    );
    setLawArray(randomArray);
    setInsertSortArray(randomArray);
  }, []);

  const insertSort = () => {
    setWaiting(true);
    const start = performance.now();
    const law = [...insertSortArray];
    for (let i = 1; i < law.length; i++) {
      const key = law[i];
      let j = i - 1;
      while (j >= 0 && law[j] > key) {
        law[j + 1] = law[j];
        j = j - 1;
      }
      law[j + 1] = key;
    }
    setInsertSortArray(law);
    const end = performance.now();
    setInsertSortTime(((end - start) / 1000).toFixed(2));
    setWaiting(false);
  };

  return (
    <main>
      <h1>Sort Simulator</h1>
      <h2>Array Size: {size}</h2>
      <div>
        <h4>Law Array</h4>
        <p>
          {lawArray.slice(0, 5).join(", ") + " "}...
          {" " + lawArray.slice(size - 5, size).join(", ")}
        </p>
      </div>

      <div>
        <h4>Insert Sort Array</h4>
        <p>
          {insertSortArray.slice(0, 5).join(", ") + " "}...
          {" " + insertSortArray.slice(size - 5, size).join(", ")}
        </p>
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={insertSort}>Insert Sort</button>
          <p>{insertSortTime}s</p>
        </div>
      </div>
    </main>
  );
};

export default SortSimulator;
