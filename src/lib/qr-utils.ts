import QRCode from "qrcode";
import { saveAs } from "file-saver";

export async function generateQRCode(options: {
  text: string;
  width?: number;
}): Promise<string> {
  try {
    const qrOptions: QRCode.QRCodeToDataURLOptions = {
      errorCorrectionLevel: "M", // Fixed error correction
      margin: 4, // Fixed margin
      color: {
        dark: "#000000", // Fixed colors
        light: "#FFFFFF",
      },
      width: options.width || 256, // Configurable size with default
    };

    return await QRCode.toDataURL(options.text, qrOptions);
  } catch (error) {
    console.error("Error generating QR code:", error);
    throw new Error("Failed to generate QR code");
  }
}

export async function generateQRCodeSVG(options: {
  text: string;
}): Promise<string> {
  try {
    const qrOptions: QRCode.QRCodeToStringOptions = {
      errorCorrectionLevel: "M", // Fixed error correction
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
