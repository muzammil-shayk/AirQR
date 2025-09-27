"use client";

import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from "react";
import { Download, Copy, Share2, RefreshCw } from "lucide-react";
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
  onOptionsChange: (options: QRCodeOptions) => void;
  onGenerated?: (options: QRCodeOptions, dataUrl: string) => void;
}

export function QRDisplay({ options, onGenerated }: QRDisplayProps) {
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string>("");
  const [copySuccess, setCopySuccess] = useState(false);

  // Use refs to avoid dependency issues
  const onGeneratedRef = useRef(onGenerated);
  const lastGeneratedRef = useRef<string>("");

  useEffect(() => {
    onGeneratedRef.current = onGenerated;
  }, [onGenerated]);

  // Sanitize input text with memoization
  const sanitizedText = useMemo(
    () => sanitizeInput(options.text),
    [options.text]
  );

  // Stable options object to prevent unnecessary re-renders
  const stableOptions = useMemo(
    () => ({
      size: options.size,
      errorCorrectionLevel: options.errorCorrectionLevel,
      margin: options.margin,
      dark: options.color.dark,
      light: options.color.light,
    }),
    [
      options.size,
      options.errorCorrectionLevel,
      options.margin,
      options.color.dark,
      options.color.light,
    ]
  );

  // Debounced QR generation function
  const generateQR = useCallback(
    async (text: string, opts: typeof stableOptions) => {
      if (!text.trim()) {
        setQrDataUrl("");
        setError("");
        return;
      }

      const validation = validateQRText(text);
      if (!validation.isValid) {
        setError(validation.error || "Invalid input");
        setQrDataUrl("");
        return;
      }

      setIsGenerating(true);
      setError("");

      try {
        const dataUrl = await generateQRCode({
          text,
          size: opts.size,
          errorCorrectionLevel: opts.errorCorrectionLevel,
          margin: opts.margin,
          color: {
            dark: opts.dark,
            light: opts.light,
          },
        });

        setQrDataUrl(dataUrl);

        // Only call onGenerated if the data has actually changed
        const generatedKey = `${text}-${opts.size}-${opts.dark}-${opts.light}`;
        if (
          onGeneratedRef.current &&
          generatedKey !== lastGeneratedRef.current
        ) {
          onGeneratedRef.current({ ...options, text }, dataUrl);
          lastGeneratedRef.current = generatedKey;
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to generate QR code"
        );
        setQrDataUrl("");
      } finally {
        setIsGenerating(false);
      }
    },
    [options]
  );

  // Debounced effect for QR generation
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      generateQR(sanitizedText, stableOptions);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [sanitizedText, stableOptions, generateQR]);

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
    if (!sanitizedText) return;

    try {
      await copyToClipboard(sanitizedText);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch {
      setError("Failed to copy to clipboard");
    }
  }, [sanitizedText]);

  const handleShare = useCallback(async () => {
    if (
      !qrDataUrl ||
      typeof navigator === "undefined" ||
      !("share" in navigator)
    )
      return;

    try {
      const response = await fetch(qrDataUrl);
      const blob = await response.blob();
      const file = new File([blob], "qr-code.png", { type: "image/png" });

      await navigator.share({
        title: "QR Code",
        text: "Check out this QR code",
        files: [file],
      });
    } catch {
      setError("Failed to share QR code");
    }
  }, [qrDataUrl]);

  const regenerateQR = useCallback(() => {
    generateQR(sanitizedText, stableOptions);
  }, [generateQR, sanitizedText, stableOptions]);

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* QR Code Display */}
      <div className="relative">
        <div
          className="flex items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/50 transition-all duration-200"
          style={{
            width: Math.max(options.size, 200),
            height: Math.max(options.size, 200),
          }}
        >
          {isGenerating ? (
            <div className="flex flex-col items-center space-y-2">
              <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Generating...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center space-y-2 p-4 text-center">
              <div className="rounded-full bg-destructive/10 p-3">
                <RefreshCw className="h-6 w-6 text-destructive" />
              </div>
              <p className="text-sm text-destructive">{error}</p>
            </div>
          ) : qrDataUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={qrDataUrl}
              alt="Generated QR Code"
              className="max-w-full max-h-full object-contain rounded-md"
              style={{
                width: options.size,
                height: options.size,
              }}
            />
          ) : (
            <div className="flex flex-col items-center space-y-2 text-center p-4">
              <div className="rounded-full bg-muted p-3">
                <RefreshCw className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">
                Enter text to generate QR code
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      {qrDataUrl && !error && (
        <div className="flex flex-wrap gap-2 justify-center">
          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          >
            <Download className="h-4 w-4" />
            Download PNG
          </button>

          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          >
            <Copy className="h-4 w-4" />
            {copySuccess ? "Copied!" : "Copy Text"}
          </button>

          {typeof navigator !== "undefined" && "share" in navigator && (
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            >
              <Share2 className="h-4 w-4" />
              Share
            </button>
          )}

          <button
            onClick={regenerateQR}
            className="inline-flex items-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          >
            <RefreshCw className="h-4 w-4" />
            Regenerate
          </button>
        </div>
      )}

      {/* QR Code Info */}
      {qrDataUrl && !error && (
        <div className="text-center space-y-1">
          <p className="text-xs text-muted-foreground">
            Size: {options.size}×{options.size}px • Error Correction:{" "}
            {options.errorCorrectionLevel}
          </p>
          <p className="text-xs text-muted-foreground">
            Characters: {sanitizedText.length}
          </p>
        </div>
      )}
    </div>
  );
}
