"use client";

import React, { useEffect, useRef } from "react";
import mermaid from "mermaid";

type MermaidProps = {
  chart: string;
};

const Mermaid: React.FC<MermaidProps> = ({ chart }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      mermaid.initialize({ startOnLoad: true });
      mermaid.contentLoaded();
    }
  }, [chart]);

  return (
    <div className="mermaid" ref={chartRef}>
      {chart}
    </div>
  );
};

export default Mermaid;
