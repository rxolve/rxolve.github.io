"use client";

import { emojiNumber } from "@/lib/emoji-number";
import { useEffect, useState } from "react";

const VisitorCount = () => {
  const [visitorCount, setVisitorCount] = useState(0);

  const handleVisitorCount = async () => {
    const res = await fetch("https://api-market.dev.solvook.com/main");
    const data = await res.json();
    console.log(data);
    // setVisitorCount(data.visitCount);
  };

  useEffect(() => {
    handleVisitorCount();
  }, []);

  return (
    <small style={{ margin: "0 0.2rem" }}>🎉 {emojiNumber(visitorCount)}</small>
  );
};

export default VisitorCount;
