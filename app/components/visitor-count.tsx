"use client";

import { emojiNumber } from "@/lib/emoji-number";
import { useEffect, useState } from "react";

const VisitorCount = () => {
  const [visitorCount, setVisitorCount] = useState(0);
  const handleVisitorCount = async () => {
    const res = await fetch("/api/visitors");
    const data = await res.json();
    setVisitorCount(data.visitCount);
  };

  useEffect(() => {
    handleVisitorCount();
  }, []);

  return (
    <small style={{ margin: "0 0.2rem" }}>🎉 {emojiNumber(visitorCount)}</small>
  );
};

export default VisitorCount;
