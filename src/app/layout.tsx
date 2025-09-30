import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://airqr.vercel.app"),
  title:
    "AirQR - Free Lightweight QR Code Generator | Privacy-First & Lightning Fast",
  description:
    "Generate QR codes instantly with AirQR - the fastest, most lightweight QR generator. Privacy-first design, no data collection, works offline. Create WiFi, vCard, URL, and text QR codes on-the-go.",
  keywords: [
    "QR code generator",
    "free QR code",
    "lightweight QR generator",
    "privacy QR code",
    "fast QR generator",
    "WiFi QR code",
    "vCard QR code",
    "URL QR code",
    "text QR code",
    "secure QR generator",
    "offline QR generator",
    "mobile QR generator",
    "instant QR code",
    "quick QR generator",
    "privacy-first QR",
    "lightweight web app",
    "no registration QR",
    "browser QR generator",
    "on-the-go QR",
    "portable QR tool",
    "Muhammad Muzammil",
  ],
  authors: [
    { name: "Muhammad Muzammil", url: "https://m-muzammil.vercel.app" },
  ],
  creator: "Muhammad Muzammil",
  publisher: "Muhammad Muzammil",
  robots: "index, follow",
  category: "Technology",
  applicationName: "AirQR",
  referrer: "origin-when-cross-origin",
  openGraph: {
    title:
      "AirQR - Free Lightweight QR Code Generator | Privacy-First & Lightning Fast",
    description:
      "Generate QR codes instantly with AirQR - the fastest, most lightweight QR generator. Privacy-first design, no data collection, works offline. Perfect for WiFi, contacts, URLs & more.",
    type: "website",
    locale: "en_US",
    url: "https://airqr.vercel.app",
    siteName: "AirQR",
    images: [
      {
        url: "/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "AirQR - Lightweight QR Code Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AirQR - Free Lightweight QR Generator | Privacy-First",
    description:
      "Generate QR codes instantly with AirQR. Lightweight, privacy-first, and lightning fast. No data collection, works offline.",
    creator: "@muzammil_shayk",
    images: ["/android-chrome-512x512.png"],
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

        {/* Google Search Console Verification */}
        <meta
          name="google-site-verification"
          content="sQvmL0WADTzA0_IXlqlnFwWW2QberYsEZXoWkgY2eH0"
        />

        {/* Canonical URL */}
        <link rel="canonical" href="https://airqr.vercel.app" />

        {/* Language and Region */}
        <meta name="language" content="en" />
        <meta name="geo.region" content="US" />
        <meta name="geo.placename" content="United States" />

        {/* Additional SEO Meta Tags */}
        <meta name="revisit-after" content="7 days" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />

        {/* DNS Prefetch for external resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />

        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "AirQR",
              alternateName: "AirQR - QR Code Generator",
              description:
                "Free lightweight QR code generator with privacy-first design. Generate WiFi, vCard, URL, and text QR codes instantly without data collection.",
              url: "https://airqr.vercel.app",
              applicationCategory: "UtilityApplication",
              operatingSystem: "Web Browser",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              author: {
                "@type": "Person",
                name: "Muhammad Muzammil",
                url: "https://m-muzammil.vercel.app",
              },
              creator: {
                "@type": "Person",
                name: "Muhammad Muzammil",
                url: "https://m-muzammil.vercel.app",
              },
              featureList: [
                "Generate WiFi QR codes",
                "Create vCard contact QR codes",
                "Generate URL QR codes",
                "Create text QR codes",
                "Privacy-first design",
                "No data collection",
                "Offline functionality",
                "Lightweight and fast",
                "Mobile responsive",
                "Free to use",
              ],
              screenshot: "https://airqr.vercel.app/android-chrome-512x512.png",
              softwareVersion: "1.0.0",
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "5.0",
                ratingCount: "1",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased bg-white text-black`}
        suppressHydrationWarning
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
