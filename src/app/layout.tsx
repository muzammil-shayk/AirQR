import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "AirQR - Modern QR Code Generator by Muhammad Muzammil",
  description:
    "Generate secure, customizable QR codes instantly. Built by Muhammad Muzammil.",
  keywords: [
    "QR code",
    "generator",
    "secure",
    "customizable",
    "modern",
    "privacy",
    "Muhammad Muzammil",
  ],
  authors: [
    { name: "Muhammad Muzammil", url: "https://m-muzammil.vercel.app" },
  ],
  robots: "index, follow",
  openGraph: {
    title: "AirQR - Modern QR Code Generator by Muhammad Muzammil",
    description:
      "Generate secure, customizable QR codes instantly. Built by Muhammad Muzammil.",
    type: "website",
    locale: "en_US",
    url: "https://airqr.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "AirQR - Modern QR Code Generator by Muhammad Muzammil",
    description:
      "Generate secure, customizable QR codes instantly. Built by Muhammad Muzammil.",
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
