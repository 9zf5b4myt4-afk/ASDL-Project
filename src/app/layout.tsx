// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// IMPORT THE NAVBAR HERE
import Navbar from "../components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ASDL Website",
  description: "Association for Sustainable Development and Leadership",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* ADD THE NAVBAR HERE */}
        <Navbar />
        {children}
      </body>
    </html>
  );
}