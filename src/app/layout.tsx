import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
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
  // Base URL is critical for SEO so Google knows the "official" link
  metadataBase: new URL("https://www.asdl-senegal.org"),
  
  title: {
    default: "ASDL - Association Sénégalaise pour le Développement Local",
    template: "%s | ASDL Senegal"
  },
  description: "Agir local, grandir ensemble. Empowering communities in Senegal through sustainable development in education, health, and environment.",
  keywords: ["Senegal", "NGO", "Association", "Development", "Education", "Women Empowerment", "Environment", "Dakar", "ASDL"],
  authors: [{ name: "ASDL Team" }],
  
  // This tells Google bots they are allowed to read your site
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

  // If you use the "HTML Tag" method for Google Search Console, paste the code here:
  verification: {
    google: "YOUR_GOOGLE_VERIFICATION_CODE_HERE", // Optional: Delete if verifying via DNS
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
        url: "/opengraph-image.png", // Make sure you actually have an image at this path in /public
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
    // images: ["/twitter-image.png"], // Optional: Add if you have a specific twitter image
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  // This script defines your organization for Google's Knowledge Graph
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NGO",
    "name": "Association Sénégalaise pour le Développement Local",
    "alternateName": "ASDL",
    "url": "https://www.asdl-senegal.org",
    "logo": "https://www.asdl-senegal.org/logo.png", // Ensure you have a logo.png in /public
    "description": "Association humanitaire œuvrant pour le développement local au Sénégal.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Dakar",
      "addressCountry": "SN"
    },
    "sameAs": [
      "https://facebook.com/asdl-senegal", // Add your actual social links here if they exist
      "https://linkedin.com/company/asdl-senegal"
    ]
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Render JSON-LD Script */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

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