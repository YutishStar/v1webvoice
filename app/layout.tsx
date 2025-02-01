import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

import { cn } from "@/utils";
import Script from "next/script";

export const metadata: Metadata = {
  title: "StarCy",
  description: "AI that feels human",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          GeistSans.variable,
          GeistMono.variable,
          "flex flex-col min-h-screen"
        )}
      >

        {children}
        <Script src="./cursor.js" strategy="afterInteractive"/>
      </body>
    </html>
  );
}
