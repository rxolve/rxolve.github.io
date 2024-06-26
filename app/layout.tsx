"use client";

import Analytics from "./ui/analytics";
import "./globals.css";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <Analytics />
      </head>
      <body className="container">{children}</body>
    </html>
  );
};

export default RootLayout;
