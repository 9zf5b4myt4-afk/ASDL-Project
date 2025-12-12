import type { Metadata, Viewport } from "next"; // Added Viewport
import { Inter } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const inter = Inter({ subsets: ["latin"] });

// 1. Better Mobile Viewport Settings
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#15803d", // The browser bar will turn Green on mobile!
};

// 2. Rich SEO Metadata
export const metadata: Metadata = {
  title: {
    default: "ASDL - Association Sénégalaise pour le Développement Local",
    template: "%s | ASDL Senegal" // Pages will look like "About | ASDL Senegal"
  },
  description: "Agir local, grandir ensemble. Empowering communities in Senegal through sustainable development in education, health, and environment.",
  keywords: ["Senegal", "NGO", "Association", "Development", "Education", "Women Empowerment", "Environment", "Dakar"],
  authors: [{ name: "ASDL Team" }],
  
  // 3. Open Graph (For WhatsApp/Facebook sharing)
  openGraph: {
    type: "website",
    locale: "fr_SN",
    url: "https://www.asdl-senegal.org",
    title: "ASDL - Association Sénégalaise pour le Développement Local",
    description: "Agir local, grandir ensemble. Empowering communities through sustainable action.",
    siteName: "ASDL Senegal",
  },
  
  // 4. Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "ASDL Senegal",
    description: "Agir local, grandir ensemble.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense fallback={<div className="h-20 bg-white" />}>
          <Navbar />
        </Suspense>
        
        {children}
        
        <Suspense fallback={<div className="h-20 bg-gray-900" />}>
          <Footer />
        </Suspense>
      </body>
    </html>
  );
}