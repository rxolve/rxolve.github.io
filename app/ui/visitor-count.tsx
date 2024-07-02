"use client";

import { emojiNumber } from "@/lib/emoji-number";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const VisitorCount = ({ initCount = 0 }: { initCount?: number }) => {
  const [visitorCount, setVisitorCount] = useState(initCount);

  const getVisitorCount = async () => {
    const { data } = await supabase
      .from("visitors")
      .select("count")
      .eq("id", 1);

    setVisitorCount(data?.length ? data[0].count : initCount);
  };

  useEffect(() => {
    getVisitorCount();
  }, []);

  return (
    <small style={{ margin: "0 0.2rem" }}>
      🎉 {visitorCount ? emojiNumber(visitorCount) : "❓❓❓"}
    </small>
  );
};

export default VisitorCount;
