"use client";

import { emojiNumber } from "@/lib/emoji-number";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const VisitorCount = () => {
  const [visitorCount, setVisitorCount] = useState(0);

  const getVisitorCount = async () => {
    const { data, error } = await supabase
      .from("visitors")
      .select("count")
      .eq("id", 1);

    if (error) {
      console.error(error);
      return;
    }

    if (data?.length) {
      setVisitorCount(data[0].count);
    }
  };

  useEffect(() => {
    getVisitorCount();
  }, []);

  return (
    <small style={{ margin: "0 0.2rem" }}>🎉 {emojiNumber(visitorCount)}</small>
  );
};

export default VisitorCount;
