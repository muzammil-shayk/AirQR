import QRCode from "qrcode";
import { saveAs } from "file-saver";
import { QRCodeOptions } from "@/types/qr";

export async function generateQRCode(options: QRCodeOptions): Promise<string> {
  try {
    const qrOptions = {
      errorCorrectionLevel: options.errorCorrectionLevel,
      margin: 4, // Fixed margin
      color: {
        dark: "#000000", // Fixed colors
        light: "#FFFFFF",
      },
      width: 256, // Fixed size
    };

    return await QRCode.toDataURL(options.text, qrOptions);
  } catch (error) {
    console.error("Error generating QR code:", error);
    throw new Error("Failed to generate QR code");
  }
}

export async function generateQRCodeSVG(
  options: QRCodeOptions
): Promise<string> {
  try {
    const qrOptions = {
      errorCorrectionLevel: options.errorCorrectionLevel,
      margin: 4, // Fixed margin
      color: {
        dark: "#000000", // Fixed colors
        light: "#FFFFFF",
      },
      width: 256, // Fixed size
    };

    return await QRCode.toString(options.text, { ...qrOptions, type: "svg" });
  } catch (error) {
    console.error("Error generating QR code SVG:", error);
    throw new Error("Failed to generate QR code SVG");
  }
}

export function downloadQRCode(
  dataUrl: string,
  filename: string,
  format: "png" | "jpg" = "png"
) {
  try {
    // Convert data URL to blob
    const arr = dataUrl.split(",");
    const mime = arr[0].match(/:(.*?);/)?.[1] || `image/${format}`;
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    const blob = new Blob([u8arr], { type: mime });
    saveAs(blob, `${filename}.${format}`);
  } catch (error) {
    console.error("Error downloading QR code:", error);
    throw new Error("Failed to download QR code");
  }
}

export function downloadQRCodeSVG(svgString: string, filename: string) {
  try {
    const blob = new Blob([svgString], { type: "image/svg+xml" });
    saveAs(blob, `${filename}.svg`);
  } catch (error) {
    console.error("Error downloading QR code SVG:", error);
    throw new Error("Failed to download QR code SVG");
  }
}

export function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text);
  } else {
    // Fallback for older browsers
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    return new Promise((resolve, reject) => {
      try {
        document.execCommand("copy");
        textArea.remove();
        resolve();
      } catch (error) {
        textArea.remove();
        reject(error);
      }
    });
  }
}

export function sanitizeInput(input: string): string {
  // Remove potentially dangerous characters and scripts
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<[^>]*>/g, "")
    .trim();
}

export function validateQRText(text: string): {
  isValid: boolean;
  error?: string;
} {
  if (!text.trim()) {
    return { isValid: false, error: "Text cannot be empty" };
  }

  if (text.length > 4296) {
    return { isValid: false, error: "Text is too long (max 4296 characters)" };
  }

  return { isValid: true };
}

export function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

export function getQRCodeCapacity(
  errorCorrectionLevel: "L" | "M" | "Q" | "H"
): number {
  const capacities = {
    L: 4296,
    M: 3391,
    Q: 2420,
    H: 1852,
  };
  return capacities[errorCorrectionLevel];
}
