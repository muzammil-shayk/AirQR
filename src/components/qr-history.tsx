"use client";

import React from "react";
import { Clock, X, Download, Copy } from "lucide-react";
import { QRHistoryItem } from "@/hooks/use-qr-history";
import { QRCodeOptions } from "@/types/qr";
import {
  downloadQRCode,
  copyToClipboard,
  generateQRCode,
} from "@/lib/qr-utils";

interface QRHistoryProps {
  history: QRHistoryItem[];
  onRemoveItem: (id: string) => void;
  onClearHistory: () => void;
  onLoadItem: (options: QRCodeOptions) => void;
}

export function QRHistory({
  history,
  onRemoveItem,
  onClearHistory,
  onLoadItem,
}: QRHistoryProps) {
  const [expandedItems, setExpandedItems] = React.useState<Set<string>>(
    new Set()
  );
  const [loadingItems, setLoadingItems] = React.useState<Set<string>>(
    new Set()
  );

  const toggleExpanded = (id: string) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleDownload = async (item: QRHistoryItem) => {
    try {
      setLoadingItems((prev) => new Set(prev).add(item.id));

      let dataUrl = item.dataUrl;
      if (!dataUrl) {
        dataUrl = await generateQRCode(item.options);
      }

      const filename = `qr-${item.text
        .slice(0, 20)
        .replace(/[^a-zA-Z0-9]/g, "_")}-${Date.now()}`;
      downloadQRCode(dataUrl, filename, "png");
    } catch (error) {
      console.error("Failed to download QR code:", error);
    } finally {
      setLoadingItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(item.id);
        return newSet;
      });
    }
  };

  const handleCopy = async (text: string) => {
    try {
      await copyToClipboard(text);
    } catch (error) {
      console.error("Failed to copy text:", error);
    }
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString();
  };

  if (history.length === 0) {
    return (
      <div className="text-center py-12">
        <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-black mb-2">No QR codes yet</h3>
        <p className="text-sm text-gray-600">
          Generate some QR codes and they&apos;ll appear here
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Recent QR Codes</h3>
        <button
          onClick={onClearHistory}
          className="text-sm text-destructive hover:underline"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {history.map((item) => {
          const isExpanded = expandedItems.has(item.id);
          const isLoading = loadingItems.has(item.id);
          const truncatedText =
            item.text.length > 50 ? item.text.slice(0, 50) + "..." : item.text;

          return (
            <div
              key={item.id}
              className="border border-border rounded-lg p-3 bg-card hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <button
                    onClick={() => toggleExpanded(item.id)}
                    className="text-left w-full"
                  >
                    <p className="text-sm font-medium truncate">
                      {isExpanded ? item.text : truncatedText}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDate(item.createdAt)} • 256×256px • EC: Medium
                    </p>
                  </button>

                  {isExpanded && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      <button
                        onClick={() => onLoadItem(item.options)}
                        className="inline-flex items-center gap-1 rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground hover:bg-secondary/80"
                      >
                        Load
                      </button>
                      <button
                        onClick={() => handleCopy(item.text)}
                        className="inline-flex items-center gap-1 rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground hover:bg-secondary/80"
                      >
                        <Copy className="h-3 w-3" />
                        Copy
                      </button>
                      <button
                        onClick={() => handleDownload(item)}
                        disabled={isLoading}
                        className="inline-flex items-center gap-1 rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground hover:bg-secondary/80 disabled:opacity-50"
                      >
                        <Download className="h-3 w-3" />
                        {isLoading ? "Loading..." : "Download"}
                      </button>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="flex-shrink-0 p-1 text-muted-foreground hover:text-destructive"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
