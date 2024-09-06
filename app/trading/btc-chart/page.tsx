"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";

interface PriceData {
  time: string;
  price: number;
}

const BtcChart = () => {
  const [data, setData] = useState<PriceData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.binance.com/api/v3/klines",
          {
            params: {
              symbol: "BTCUSDT",
              interval: "1s",
              limit: 10,
            },
          }
        );

        const rawData: any[][] = response.data;
        const processedData: PriceData[] = rawData.map((d) => ({
          time: dayjs(d[0]).format("HH:mm:ss"),
          price: parseFloat(d[4]),
        }));

        setData(processedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Bitcoin Price</h1>
      <div className="w-full h-[400px]">
        {data.map((d) => (
          <div key={d.time} className="flex justify-between">
            <span>{d.time}</span>
            <span>{d.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BtcChart;
