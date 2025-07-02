import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ProtectedRoute from "@/components/ProtectedRoute";
import Head from 'next/head'; // Import Head component for custom favicon

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Tamboo Baba - Event Management Admin Panel | India",
  description: "Admin dashboard for Tamboo Baba, premier event management company offering complete event planning and coordination services.",
  keywords: [
    "Tamboo Baba admin",
    "event management system",
    "Ludhiana event planners",
    "Punjab event management",
    "wedding planners",
    "corporate event management"
  ],
  authors: [{ name: "Tamboo Baba", url: "https://www.tamboobaba.com" }],
  metadataBase: new URL("https://www.tamboobaba.com"),
  alternates: {
    canonical: "https://tamboobaba.com",
  },
  openGraph: {
    title: "Tamboo Baba Admin Panel",
    description: "Management system for Tamboo Baba event services",
    url: "https://admin.tamboobaba.com",
    siteName: "Tamboo Baba",
    images: [
      {
        url: "https://tamboobaba.com/hero-image.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: false,
      follow: true,
      noimageindex: true,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Favicon ICO and other icon formats */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/seo/favicon-16x16.png" type="image/png" sizes="16x16" />
        <link rel="icon" href="/seo/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/seo/apple-touch-icon.png" sizes="180x180" />
        <link rel="manifest" href="/seo/site.webmanifest" />
        
        {/* Recommended favicon tags */}
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ProtectedRoute>
        {children}
        </ProtectedRoute>
      </body>
    </html>
  );
}