"use client";

import { useEffect } from "react";

// Google Analytics 4 configuration
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
    trackQRGeneration: (qrType: string) => void;
    trackQRDownload: (qrType: string, size: string) => void;
  }
}

interface GoogleAnalyticsProps {
  gaId: string;
}

export function GoogleAnalytics({ gaId }: GoogleAnalyticsProps) {
  useEffect(() => {
    // Load Google Analytics script
    const script1 = document.createElement("script");
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    script1.async = true;
    document.head.appendChild(script1);

    const script2 = document.createElement("script");
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${gaId}', {
        page_title: 'AirQR - Free QR Code Generator',
        page_location: window.location.href,
        send_page_view: true,
        anonymize_ip: true,
        allow_google_signals: false,
        allow_ad_personalization_signals: false
      });
    `;
    document.head.appendChild(script2);

    // Set up gtag function
    window.gtag = function (...args: unknown[]) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(args);
    };

    // Track QR code generation events
    const trackQRGeneration = (qrType: string) => {
      window.gtag("event", "qr_code_generated", {
        event_category: "QR Generation",
        event_label: qrType,
        value: 1,
      });
    };

    const trackQRDownload = (qrType: string, size: string) => {
      window.gtag("event", "qr_code_downloaded", {
        event_category: "QR Download",
        event_label: `${qrType}_${size}`,
        value: 1,
      });
    };

    // Make tracking functions available globally
    window.trackQRGeneration = trackQRGeneration;
    window.trackQRDownload = trackQRDownload;

    return () => {
      // Cleanup scripts on unmount
      const scripts = document.querySelectorAll(
        `script[src*="googletagmanager"]`
      );
      scripts.forEach((script) => script.remove());
    };
  }, [gaId]);

  return null;
}

// Privacy-focused Google Analytics setup
export function setupGoogleAnalytics() {
  // Only load in production and with user consent
  if (process.env.NODE_ENV !== "production") return null;

  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
  if (!GA_ID) return null;

  return <GoogleAnalytics gaId={GA_ID} />;
}

// Track custom events for QR code interactions
export const trackEvent = {
  qrGenerated: (type: string) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "qr_generated", {
        event_category: "engagement",
        event_label: type,
        value: 1,
      });
    }
  },
  qrDownloaded: (type: string, size: number) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "qr_downloaded", {
        event_category: "conversion",
        event_label: `${type}_${size}x${size}`,
        value: 1,
      });
    }
  },
  formSwitched: (fromType: string, toType: string) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "form_switched", {
        event_category: "navigation",
        event_label: `${fromType}_to_${toType}`,
        value: 1,
      });
    }
  },
};
