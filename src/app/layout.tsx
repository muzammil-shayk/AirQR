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
      <head>
        {/* Primary favicon - ICO for Chrome tabs (preferred color scheme) */}
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />

        {/* PNG Favicons as fallbacks for other contexts */}
        {/* <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        /> */}

        {/* Apple Touch Icon for iOS devices */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />

        {/* Android Chrome Icons via Web Manifest */}
        <link rel="manifest" href="/site.webmanifest" />

        {/* Additional meta tags for better PWA support */}
        <meta name="theme-color" content="#ffffff" />
        <meta name="msapplication-TileColor" content="#ffffff" />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased bg-white text-black`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
