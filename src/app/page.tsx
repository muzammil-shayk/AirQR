"use client";

import React, { useState } from "react";
import { QrCode, Github, Heart, Linkedin, User } from "lucide-react";
import Image from "next/image";
import { QRDisplay } from "@/components/qr-display";
import { QRInputForm } from "@/components/qr-input-form";
import { QRCodeOptions, DEFAULT_QR_OPTIONS } from "@/types/qr";

export default function Home() {
  const [qrOptions, setQrOptions] = useState<QRCodeOptions>(DEFAULT_QR_OPTIONS);
  const [shouldGenerate, setShouldGenerate] = useState(false);

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
        <div className="w-full flex h-16 items-center justify-between px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <Image
              src="/airqr-logo.svg"
              alt="AirQR Logo"
              width={64}
              height={64}
            />
            <div>
              <h1 className="text-xl font-bold text-black">AirQR</h1>
              <p className="text-sm text-gray-600 hidden sm:block">
                Modern QR Code Generator
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://github.com/muzammil-shayk"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-gray-300 bg-white text-sm font-medium transition-colors hover:bg-teal-50 hover:text-teal-600 hover:border-teal-300 cursor-pointer"
              aria-label="View on GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="https://linkedin.com/in/muhammad-muzammil-8771a4309/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-gray-300 bg-white text-sm font-medium transition-colors hover:bg-teal-50 hover:text-teal-600 hover:border-teal-300 cursor-pointer"
              aria-label="View on LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href="https://m-muzammil.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-gray-300 bg-white text-sm font-medium transition-colors hover:bg-teal-50 hover:text-teal-600 hover:border-teal-300 cursor-pointer"
              aria-label="View Portfolio"
            >
              <User className="h-4 w-4" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full px-4 sm:px-6 lg:px-8 py-8">
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

          {/* Main Content */}
          <div className="w-full max-w-4xl mx-auto grid gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Input Form */}
            <div className="w-full max-w-sm mx-auto sm:max-w-md lg:max-w-none lg:mx-0 space-y-6">
              <div className="rounded-lg border border-gray-200 bg-white p-4 sm:p-6 shadow-sm">
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
            <div className="w-full max-w-sm mx-auto sm:max-w-md lg:max-w-none lg:mx-0 space-y-6">
              <div className="rounded-lg border border-gray-200 bg-white p-4 sm:p-6 shadow-sm">
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
                  shouldGenerate={shouldGenerate}
                  onGenerateComplete={handleGenerateComplete}
                />
              </div>
            </div>
          </div>

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
      <footer className="bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center text-gray-600">
          <div className="flex justify-center mb-3">
            <Image
              src="/airqr-txt-logo.svg"
              alt="AirQR Logo"
              width={120}
              height={40}
            />
          </div>
          <div className="flex justify-center gap-4 mb-4">
            <a
              href="https://github.com/muzammil-shayk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-teal-600 transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com/in/muhammad-muzammil-8771a4309/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-teal-600 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="https://m-muzammil.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-teal-600 transition-colors"
              aria-label="Portfolio"
            >
              <User className="h-5 w-5" />
            </a>
          </div>
          <p className="text-sm">
            Built by{" "}
            <a
              href="https://m-muzammil.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-teal-600 hover:underline"
            >
              M. Muzammil
            </a>
            .
          </p>
          <p className="text-xs mt-2 text-gray-500">
            © 2025 M. Muzammil. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
