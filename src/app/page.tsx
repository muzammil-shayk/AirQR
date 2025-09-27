"use client";

import React, { useState } from "react";
import { QrCode, Github, Heart, History } from "lucide-react";
import { QRDisplay } from "@/components/qr-display";
import { QRInputForm } from "@/components/qr-input-form";
import { QRHistory } from "@/components/qr-history";
import { QRCodeOptions, DEFAULT_QR_OPTIONS } from "@/types/qr";
import { useQRHistory } from "@/hooks/use-qr-history";

export default function Home() {
  const [qrOptions, setQrOptions] = useState<QRCodeOptions>(DEFAULT_QR_OPTIONS);
  const [activeTab, setActiveTab] = useState<"generator" | "history">(
    "generator"
  );
  const [shouldGenerate, setShouldGenerate] = useState(false);
  const { history, addToHistory, removeFromHistory, clearHistory } =
    useQRHistory();

  const handleQRGenerated = React.useCallback(
    (options: QRCodeOptions, dataUrl: string) => {
      if (options.text.trim()) {
        addToHistory(options, dataUrl);
      }
    },
    [addToHistory]
  );

  const handleGenerate = React.useCallback(() => {
    setShouldGenerate(true);
  }, []);

  const handleGenerateComplete = React.useCallback(() => {
    setShouldGenerate(false);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/95 backdrop-blur sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-500 text-white">
              <QrCode className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-black">AirQR</h1>
              <p className="text-sm text-gray-600 hidden sm:block">
                Modern QR Code Generator
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-gray-300 bg-white text-sm font-medium transition-colors hover:bg-teal-50 hover:text-teal-600 hover:border-teal-300 cursor-pointer"
              aria-label="View on GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mx-auto max-w-6xl">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-black sm:text-5xl lg:text-6xl">
              Generate QR Codes
              <span className="block text-teal-500">Instantly</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
              Create secure QR codes for any purpose. Modern, fast, and
              privacy-focused.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-1 rounded-lg bg-gray-100 p-1 mb-8">
            <button
              onClick={() => setActiveTab("generator")}
              className={`flex-1 flex items-center justify-center gap-2 rounded-md py-2 px-3 text-sm font-medium transition-colors cursor-pointer ${
                activeTab === "generator"
                  ? "bg-white text-black shadow-sm"
                  : "text-gray-600 hover:text-teal-600 hover:bg-teal-50"
              }`}
            >
              <QrCode className="h-4 w-4" />
              Generator
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`flex-1 flex items-center justify-center gap-2 rounded-md py-2 px-3 text-sm font-medium transition-colors cursor-pointer ${
                activeTab === "history"
                  ? "bg-white text-black shadow-sm"
                  : "text-gray-600 hover:text-teal-600 hover:bg-teal-50"
              }`}
            >
              <History className="h-4 w-4" />
              History ({history.length})
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "generator" && (
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
              {/* Input Form */}
              <div className="space-y-6">
                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2 text-black">
                      Configure QR Code
                    </h2>
                    <p className="text-sm text-gray-600">
                      Choose your content type and click generate
                    </p>
                  </div>
                  <QRInputForm
                    options={qrOptions}
                    onOptionsChange={setQrOptions}
                    onGenerate={handleGenerate}
                  />
                </div>
              </div>

              {/* QR Display */}
              <div className="space-y-6">
                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2 text-black">
                      Preview & Download
                    </h2>
                    <p className="text-sm text-gray-600">
                      Your QR code will appear here after generation
                    </p>
                  </div>
                  <QRDisplay
                    options={qrOptions}
                    onGenerated={handleQRGenerated}
                    shouldGenerate={shouldGenerate}
                    onGenerateComplete={handleGenerateComplete}
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === "history" && (
            <div className="max-w-2xl mx-auto">
              <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <QRHistory
                  history={history}
                  onRemoveItem={removeFromHistory}
                  onClearHistory={clearHistory}
                  onLoadItem={setQrOptions}
                />
              </div>
            </div>
          )}

          {/* Features Section */}
          <div className="mt-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-black">
                Why Choose AirQR?
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Built with modern web technologies for the best user experience
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <div className="mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-teal-50">
                    <QrCode className="h-6 w-6 text-teal-600" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-black">
                  Multiple Formats
                </h3>
                <p className="text-sm text-gray-600">
                  Support for URLs, text, email, WiFi, vCard with smart
                  formatting
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <div className="mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-teal-50">
                    <Heart className="h-6 w-6 text-teal-600" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-black">
                  Privacy First
                </h3>
                <p className="text-sm text-gray-600">
                  All processing happens in your browser. No data is sent to
                  servers or stored online
                </p>
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <div className="mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-teal-50">
                    <Github className="h-6 w-6 text-teal-600" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-black">
                  Simple & Fast
                </h3>
                <p className="text-sm text-gray-600">
                  Clean interface with error correction levels to match your
                  needs
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="flex items-center gap-2">
              <QrCode className="h-5 w-5 text-teal-500" />
              <span className="font-semibold text-black">AirQR</span>
            </div>
            <p className="text-sm text-gray-600">
              Made with <Heart className="inline h-4 w-4 text-red-500" /> using
              Next.js, TypeScript, and Tailwind CSS
            </p>
            <p className="text-xs text-gray-500">
              © 2025 AirQR. Open source and privacy-focused.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
