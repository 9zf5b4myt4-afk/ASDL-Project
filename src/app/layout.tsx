import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/react"; // <--- 1. Fixed Import
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#15803d",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.asdl-senegal.org"),
  
  title: {
    default: "ASDL - Association Sénégalaise pour le Développement Local",
    template: "%s | ASDL Senegal"
  },
  description: "Agir local, grandir ensemble. Empowering communities in Senegal through sustainable development in education, health, and environment.",
  keywords: ["Senegal", "NGO", "Association", "Development", "Education", "Women Empowerment", "Environment", "Dakar", "ASDL"],
  authors: [{ name: "ASDL Team" }],
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  verification: {
    google: "YOUR_GOOGLE_VERIFICATION_CODE_HERE", 
  },

  openGraph: {
    type: "website",
    locale: "fr_SN",
    url: "https://www.asdl-senegal.org",
    title: "ASDL - Association Sénégalaise pour le Développement Local",
    description: "Agir local, grandir ensemble. Empowering communities through sustainable action.",
    siteName: "ASDL Senegal",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "ASDL Senegal - Community Development",
      },
    ],
  },
  
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
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NGO",
    "name": "Association Sénégalaise pour le Développement Local",
    "alternateName": "ASDL",
    "url": "https://www.asdl-senegal.org",
    "logo": "https://www.asdl-senegal.org/logo.png",
    "description": "Association humanitaire œuvrant pour le développement local au Sénégal.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Dakar",
      "addressCountry": "SN"
    },
    "sameAs": [
      "https://facebook.com/asdl-senegal",
      "https://linkedin.com/company/asdl-senegal"
    ]
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <Suspense fallback={<div className="h-20 bg-white" />}>
          <Navbar />
        </Suspense>
        
        {children}
        
        {/* 2. Component Added Here */}
        <Analytics />
        
        <Suspense fallback={<div className="h-20 bg-gray-900" />}>
          <Footer />
        </Suspense>
      </body>
    </html>
  );
}