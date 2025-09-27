"use client";

import React, { useState } from "react";
import { QrCode, Github, Heart, History, Layers } from "lucide-react";
import { QRDisplay } from "@/components/qr-display";
import { QRInputForm } from "@/components/qr-input-form";
import { QRHistory } from "@/components/qr-history";
import { QRBatchGenerator } from "@/components/qr-batch-generator";
import { ThemeToggle } from "@/components/theme-toggle";
import { QRCodeOptions, DEFAULT_QR_OPTIONS } from "@/types/qr";
import { useQRHistory } from "@/hooks/use-qr-history";

export default function Home() {
  const [qrOptions, setQrOptions] = useState<QRCodeOptions>(DEFAULT_QR_OPTIONS);
  const [activeTab, setActiveTab] = useState<"generator" | "batch" | "history">(
    "generator"
  );
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <QrCode className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">AirQR</h1>
              <p className="text-sm text-muted-foreground hidden sm:block">
                Modern QR Code Generator
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-input bg-background text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              aria-label="View on GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mx-auto max-w-6xl">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Generate QR Codes
              <span className="block text-primary">Instantly</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
              Create secure, customizable QR codes for any purpose. Modern,
              fast, and privacy-focused with advanced customization options.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-1 rounded-lg bg-muted p-1 mb-8">
            <button
              onClick={() => setActiveTab("generator")}
              className={`flex-1 flex items-center justify-center gap-2 rounded-md py-2 px-3 text-sm font-medium transition-colors ${
                activeTab === "generator"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <QrCode className="h-4 w-4" />
              Generator
            </button>
            <button
              onClick={() => setActiveTab("batch")}
              className={`flex-1 flex items-center justify-center gap-2 rounded-md py-2 px-3 text-sm font-medium transition-colors ${
                activeTab === "batch"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Layers className="h-4 w-4" />
              Batch
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`flex-1 flex items-center justify-center gap-2 rounded-md py-2 px-3 text-sm font-medium transition-colors ${
                activeTab === "history"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
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
                <div className="rounded-lg border bg-card p-6 shadow-sm">
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">
                      Configure QR Code
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Choose your content type and customize the appearance
                    </p>
                  </div>
                  <QRInputForm
                    options={qrOptions}
                    onOptionsChange={setQrOptions}
                  />
                </div>
              </div>

              {/* QR Display */}
              <div className="space-y-6">
                <div className="rounded-lg border bg-card p-6 shadow-sm">
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">
                      Preview & Download
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Your QR code will appear here as you type
                    </p>
                  </div>
                  <QRDisplay
                    options={qrOptions}
                    onOptionsChange={setQrOptions}
                    onGenerated={handleQRGenerated}
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === "batch" && (
            <div className="max-w-4xl mx-auto">
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <QRBatchGenerator baseOptions={qrOptions} />
              </div>
            </div>
          )}

          {activeTab === "history" && (
            <div className="max-w-2xl mx-auto">
              <div className="rounded-lg border bg-card p-6 shadow-sm">
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
              <h2 className="text-3xl font-bold tracking-tight text-foreground">
                Why Choose AirQR?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Built with modern web technologies for the best user experience
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <div className="mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <QrCode className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">Multiple Formats</h3>
                <p className="text-sm text-muted-foreground">
                  Support for URLs, text, email, phone, WiFi, vCard, and more
                  with smart formatting
                </p>
              </div>

              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <div className="mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">Privacy First</h3>
                <p className="text-sm text-muted-foreground">
                  All processing happens in your browser. No data is sent to
                  servers or stored online
                </p>
              </div>

              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <div className="mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Github className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">Customizable</h3>
                <p className="text-sm text-muted-foreground">
                  Adjust colors, size, error correction levels, and margins to
                  match your needs
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="flex items-center gap-2">
              <QrCode className="h-5 w-5 text-primary" />
              <span className="font-semibold">AirQR</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Made with <Heart className="inline h-4 w-4 text-red-500" /> using
              Next.js, TypeScript, and Tailwind CSS
            </p>
            <p className="text-xs text-muted-foreground">
              © 2024 AirQR. Open source and privacy-focused.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
