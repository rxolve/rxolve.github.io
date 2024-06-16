"use client";

import Analytics from "./components/analytics";
import "./globals.css";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <Analytics />
        <meta
          name="google-site-verification"
          content="gkTTj41ACDdMmZQJURA1etAGm7NJ1sFkYwWJ8xDqzPM"
        />
      </head>
      <body className="container">{children}</body>
    </html>
  );
};

export default RootLayout;
