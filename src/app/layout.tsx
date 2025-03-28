import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Handcrafted Haven | Unique Artisan Products",
  description:
    "Discover unique handcrafted items made by talented artisans from around the world. Support local craftsmanship and bring unique character to your life.",
  keywords: [
    "handcrafted",
    "artisan",
    "handmade",
    "marketplace",
    "crafts",
    "unique gifts",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
