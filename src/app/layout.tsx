import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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
        {/* HEADER (Navbar) at the TOP */}
        <Suspense fallback={<div className="h-20 bg-white" />}>
          <Navbar />
        </Suspense>
        
        {/* MAIN PAGE CONTENT */}
        {children}
        
        {/* FOOTER at the BOTTOM */}
        <Suspense fallback={<div className="h-20 bg-gray-900" />}>
          <Footer />
        </Suspense>
      </body>
    </html>
  );
}