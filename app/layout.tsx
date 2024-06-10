"use client";

import Analytics from "./components/analytics";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Analytics />
      </head>
      <body className="container">{children}</body>
    </html>
  );
}
