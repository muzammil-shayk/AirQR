"use client";

import React, { useState, useCallback } from "react";
import { Download, Copy, Share2 } from "lucide-react";
import { QRCodeOptions } from "@/types/qr";
import {
  generateQRCode,
  downloadQRCode,
  copyToClipboard,
  sanitizeInput,
  validateQRText,
} from "@/lib/qr-utils";

interface QRDisplayProps {
  options: QRCodeOptions;
  shouldGenerate?: boolean;
  onGenerateComplete?: () => void;
}

export function QRDisplay({
  options,
  shouldGenerate,
  onGenerateComplete,
}: QRDisplayProps) {
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string>("");
  const [copySuccess, setCopySuccess] = useState(false);

  const handleGenerate = useCallback(async () => {
    const sanitizedText = sanitizeInput(options.text);

    if (!sanitizedText.trim()) {
      setError("Please enter some content");
      setQrDataUrl("");
      return;
    }

    const validation = validateQRText(sanitizedText);
    if (!validation.isValid) {
      setError(validation.error || "Invalid input");
      setQrDataUrl("");
      return;
    }

    setIsGenerating(true);
    setError("");

    try {
      const dataUrl = await generateQRCode({
        text: sanitizedText,
      });

      setQrDataUrl(dataUrl);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to generate QR code"
      );
      setQrDataUrl("");
    } finally {
      setIsGenerating(false);
    }
  }, [options]);

  // Generate QR code when shouldGenerate prop changes
  React.useEffect(() => {
    if (shouldGenerate) {
      handleGenerate();
      onGenerateComplete?.();
    }
  }, [shouldGenerate, handleGenerate, onGenerateComplete]);

  const handleDownload = useCallback(async () => {
    if (!qrDataUrl) return;

    try {
      const filename = `qr-code-${Date.now()}`;
      downloadQRCode(qrDataUrl, filename, "png");
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to download QR code"
      );
    }
  }, [qrDataUrl]);

  const handleCopy = useCallback(async () => {
    const sanitizedText = sanitizeInput(options.text);
    if (!sanitizedText) return;

    try {
      await copyToClipboard(sanitizedText);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch {
      setError("Failed to copy to clipboard");
    }
  }, [options.text]);

  const handleShare = useCallback(async () => {
    if (!qrDataUrl) return;

    try {
      if (navigator.share) {
        const blob = await fetch(qrDataUrl).then((r) => r.blob());
        const file = new File([blob], "qr-code.png", { type: "image/png" });
        await navigator.share({
          files: [file],
          title: "QR Code",
          text: "Generated QR Code",
        });
      } else {
        // Fallback to copying the data URL
        await navigator.clipboard.writeText(qrDataUrl);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      }
    } catch {
      setError("Failed to share QR code");
    }
  }, [qrDataUrl]);

  return (
    <div className="space-y-6">
      {/* QR Code Display */}
      <div className="flex items-center justify-center">
        <div className="rounded-lg border-2 border-gray-200 bg-white p-6 shadow-sm w-80 h-80">
          {error ? (
            <div className="flex h-full items-center justify-center text-center">
              <div className="space-y-2">
                <div className="text-red-500 text-sm font-medium">Error</div>
                <p className="text-xs text-red-400">{error}</p>
              </div>
            </div>
          ) : qrDataUrl ? (
            <div className="flex h-full items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={qrDataUrl}
                alt="Generated QR Code"
                className="w-64 h-64 object-contain rounded"
              />
            </div>
          ) : (
            <div className="flex h-full items-center justify-center text-center">
              <div className="space-y-2">
                <div className="text-gray-400 text-sm">
                  No QR Code Generated
                </div>
                <p className="text-xs text-gray-400">
                  Enter content and click Generate
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Loading State */}
      {isGenerating && (
        <div className="text-center">
          <div className="inline-flex items-center gap-2 text-sm text-teal-600">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-teal-600 border-t-transparent" />
            Generating QR Code...
          </div>
        </div>
      )}

      {/* Action Buttons */}
      {qrDataUrl && !isGenerating && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={handleDownload}
              className="flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-teal-50 hover:border-teal-300 hover:text-teal-600 cursor-pointer"
            >
              <Download className="h-4 w-4" />
              Download
            </button>
            <button
              onClick={handleCopy}
              className="flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-teal-50 hover:border-teal-300 hover:text-teal-600 cursor-pointer"
            >
              <Copy className="h-4 w-4" />
              {copySuccess ? "Copied!" : "Copy Text"}
            </button>
            <button
              onClick={handleShare}
              className="flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-teal-50 hover:border-teal-300 hover:text-teal-600 cursor-pointer"
            >
              <Share2 className="h-4 w-4" />
              Share
            </button>
          </div>

          {/* QR Code Details */}
          <div className="rounded-md bg-gray-50 p-3">
            <p className="text-xs text-gray-600">
              Size: 256×256px • Error Correction: Medium
            </p>
            <p className="text-xs text-gray-500 mt-1 break-all">
              Content: {sanitizeInput(options.text)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
