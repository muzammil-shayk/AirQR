import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "AirQR - Modern QR Code Generator",
  description:
    "Generate secure, customizable QR codes instantly. Modern, fast, and privacy-focused QR code generator with advanced customization options.",
  keywords: [
    "QR code",
    "generator",
    "secure",
    "customizable",
    "modern",
    "privacy",
  ],
  authors: [{ name: "AirQR Team" }],
  robots: "index, follow",
  openGraph: {
    title: "AirQR - Modern QR Code Generator",
    description: "Generate secure, customizable QR codes instantly",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "AirQR - Modern QR Code Generator",
    description: "Generate secure, customizable QR codes instantly",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased bg-white text-black`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
