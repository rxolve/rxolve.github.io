"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface DailyWork {
  // 하루 작업 결과
  day: number; // 작업 일차
  yards: number; // 작업한 야드 수
  payment: number; // 받은 지불액 (코펙)
}

const RussianPainter: React.FC = () => {
  const [days, setDays] = useState<number>(3); // 작업 일수 (기본값: 3일)
  const [startYards, setStartYards] = useState<number>(300); // 시작 야드 수 (기본값: 300야드)
  const [results, setResults] = useState<DailyWork[]>([]); // 일별 작업 결과
  const [totalYards, setTotalYards] = useState<number>(0); // 총 작업 야드 수
  const [totalPayment, setTotalPayment] = useState<number>(0); // 총 받은 지불액

  const russianPainter = (days: number, startYards: number): DailyWork[] => {
    const result: DailyWork[] = [];

    const paint = (day: number, yards: number): void => {
      // 재귀적으로 각 날짜의 작업량을 계산
      if (day > days) return; // 지정된 일수를 초과하면 종료

      const payment = yards >= 30 ? 1 : 0; // 30야드 이상 작업 시 1코펙 지급
      result.push({ day, yards, payment });

      const nextYards = Math.floor(yards / 2); // 다음 날 작업량은 전날의 절반
      paint(day + 1, nextYards); // 다음 날 작업 계산 (재귀 호출)
    };

    paint(1, startYards); // 첫 날부터 작업 시작
    return result;
  };

  const handleRun = () => {
    const workDays = russianPainter(days, startYards);
    setResults(workDays);

    const total = workDays.reduce(
      // 총 작업량과 총 지불액 계산
      (acc, day) => ({
        yards: acc.yards + day.yards,
        payment: acc.payment + day.payment,
      }),
      { yards: 0, payment: 0 }
    );

    setTotalYards(total.yards);
    setTotalPayment(total.payment);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Russian Painter Algorithm</h1>
      <div className="mb-4">
        {/* 작업 일수 입력 필드 */}
        <Input
          type="number"
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          placeholder="작업 일수"
          className="mb-2"
        />
        {/* 시작 야드 수 입력 필드 */}
        <Input
          type="number"
          value={startYards}
          onChange={(e) => setStartYards(Number(e.target.value))}
          placeholder="시작 야드"
          className="mb-2"
        />
        {/* 실행 버튼 */}
        <Button onClick={handleRun} className="w-full">
          Run
        </Button>
      </div>
      {/* 결과 표시 영역 */}
      {results.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Daily Result:</h2>
          {/* 각 날짜별 작업 결과 표시 */}
          {results.map(({ day, yards, payment }) => (
            <p key={day} className="mb-1">
              Day {day}: Painted {yards} yards, Received {payment} kopeck
            </p>
          ))}
          <h2 className="text-xl font-semibold mt-4 mb-2">Total Result:</h2>
          {/* 총 작업량과 총 지불액 표시 */}
          <p>Total yards painted: {totalYards}</p>
          <p>Total payment received: {totalPayment} kopecks</p>
        </div>
      )}
    </div>
  );
};

export default RussianPainter;
