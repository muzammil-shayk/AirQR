"use client";

import React, { useState } from "react";
import { Plus, X, Download, Upload } from "lucide-react";
import { QRCodeOptions } from "@/types/qr";
import { generateQRCode } from "@/lib/qr-utils";
import JSZip from "jszip";
import { saveAs } from "file-saver";

interface BatchItem {
  id: string;
  text: string;
  filename?: string;
}

interface QRBatchGeneratorProps {
  baseOptions: QRCodeOptions;
}

export function QRBatchGenerator({ baseOptions }: QRBatchGeneratorProps) {
  const [batchItems, setBatchItems] = useState<BatchItem[]>([
    { id: "1", text: "", filename: "" },
  ]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);

  const addItem = () => {
    const newId = (
      Math.max(...batchItems.map((item) => parseInt(item.id) || 0)) + 1
    ).toString();
    setBatchItems((prev) => [...prev, { id: newId, text: "", filename: "" }]);
  };

  const removeItem = (id: string) => {
    if (batchItems.length > 1) {
      setBatchItems((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const updateItem = (id: string, field: keyof BatchItem, value: string) => {
    setBatchItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleCSVUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const csv = e.target?.result as string;
      const lines = csv.split("\n").filter((line) => line.trim());

      const newItems: BatchItem[] = lines.map((line, index) => {
        const [text, filename] = line
          .split(",")
          .map((s) => s.trim().replace(/"/g, ""));
        return {
          id: (index + 1).toString(),
          text: text || "",
          filename: filename || `qr-${index + 1}`,
        };
      });

      if (newItems.length > 0) {
        setBatchItems(newItems);
      }
    };
    reader.readAsText(file);
  };

  const generateBatch = async () => {
    const validItems = batchItems.filter((item) => item.text.trim());
    if (validItems.length === 0) return;

    setIsGenerating(true);
    setProgress(0);

    try {
      const zip = new JSZip();
      const results = [];

      for (let i = 0; i < validItems.length; i++) {
        const item = validItems[i];
        const options = { ...baseOptions, text: item.text.trim() };

        try {
          const dataUrl = await generateQRCode(options);

          // Convert data URL to blob
          const response = await fetch(dataUrl);
          const blob = await response.blob();

          const filename = item.filename?.trim() || `qr-${i + 1}`;
          zip.file(`${filename}.png`, blob);

          results.push({ item, success: true });
        } catch (error) {
          console.error(`Failed to generate QR for item ${item.id}:`, error);
          results.push({ item, success: false, error });
        }

        setProgress(((i + 1) / validItems.length) * 100);
      }

      // Generate and download zip file
      const zipBlob = await zip.generateAsync({ type: "blob" });
      const timestamp = new Date()
        .toISOString()
        .slice(0, 19)
        .replace(/:/g, "-");
      saveAs(zipBlob, `qr-codes-batch-${timestamp}.zip`);

      console.log(
        `Generated ${results.filter((r) => r.success).length} out of ${
          validItems.length
        } QR codes`
      );
    } catch (error) {
      console.error("Batch generation failed:", error);
    } finally {
      setIsGenerating(false);
      setProgress(0);
    }
  };

  const downloadTemplate = () => {
    const template =
      'text,filename\n"https://example.com","example-url"\n"Hello World","greeting"\n"Contact: john@example.com","contact-info"';
    const blob = new Blob([template], { type: "text/csv" });
    saveAs(blob, "qr-batch-template.csv");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Batch Generation</h3>
          <p className="text-sm text-muted-foreground">
            Generate multiple QR codes at once
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={downloadTemplate}
            className="inline-flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
          >
            <Download className="h-4 w-4" />
            Template
          </button>

          <label className="inline-flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground cursor-pointer">
            <Upload className="h-4 w-4" />
            Upload CSV
            <input
              type="file"
              accept=".csv"
              onChange={handleCSVUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      <div className="space-y-3 max-h-80 overflow-y-auto">
        {batchItems.map((item, index) => (
          <div
            key={item.id}
            className="flex gap-2 items-center p-3 border border-border rounded-lg"
          >
            <span className="text-sm text-muted-foreground w-8">
              {index + 1}.
            </span>

            <input
              type="text"
              placeholder="QR code content"
              value={item.text}
              onChange={(e) => updateItem(item.id, "text", e.target.value)}
              className="flex-1 flex h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />

            <input
              type="text"
              placeholder="Filename (optional)"
              value={item.filename}
              onChange={(e) => updateItem(item.id, "filename", e.target.value)}
              className="w-32 flex h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />

            <button
              onClick={() => removeItem(item.id)}
              disabled={batchItems.length === 1}
              className="p-2 text-muted-foreground hover:text-destructive disabled:opacity-50 disabled:hover:text-muted-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={addItem}
          className="inline-flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
        >
          <Plus className="h-4 w-4" />
          Add Item
        </button>

        <button
          onClick={generateBatch}
          disabled={
            isGenerating ||
            batchItems.filter((item) => item.text.trim()).length === 0
          }
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        >
          {isGenerating ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
              Generating... ({Math.round(progress)}%)
            </>
          ) : (
            <>
              <Download className="h-4 w-4" />
              Generate Batch (
              {batchItems.filter((item) => item.text.trim()).length})
            </>
          )}
        </button>
      </div>

      {isGenerating && (
        <div className="w-full bg-secondary rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}
