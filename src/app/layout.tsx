import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react"; // <--- 1. Import Suspense
import "./globals.css";
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
        {/* 2. Wrap Navbar in Suspense with a simple fallback */}
        <Suspense fallback={<div className="h-20 bg-white border-b border-gray-100" />}>
          <Navbar />
        </Suspense>
        {children}
      </body>
    </html>
  );
}