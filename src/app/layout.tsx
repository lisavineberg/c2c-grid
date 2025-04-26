import React from "react";
import type { Metadata } from "next";
import Menu from "../components/Menu";

export const metadata: Metadata = {
  title: `Lisa's Crochet App`,
  description: "Corner to corner crochet App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Menu />
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
