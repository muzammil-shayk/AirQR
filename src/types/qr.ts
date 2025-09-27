export interface QRCodeOptions {
  text: string;
  size: number;
  errorCorrectionLevel: "L" | "M" | "Q" | "H";
  margin: number;
  color: {
    dark: string;
    light: string;
  };
  logo?: string;
}

export interface QRCodeType {
  id: string;
  name: string;
  icon: string;
  description: string;
  placeholder: string;
  validation?: (value: string) => boolean;
  format?: (value: string) => string;
}

export const QR_CODE_TYPES: QRCodeType[] = [
  {
    id: "text",
    name: "Text",
    icon: "Type",
    description: "Plain text or message",
    placeholder: "Enter your text here...",
  },
  {
    id: "url",
    name: "URL",
    icon: "Link",
    description: "Website or webpage link",
    placeholder: "https://example.com",
    validation: (value: string) => {
      try {
        new URL(value);
        return true;
      } catch {
        return false;
      }
    },
  },
  {
    id: "email",
    name: "Email",
    icon: "Mail",
    description: "Email address",
    placeholder: "example@domain.com",
    validation: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    format: (value: string) => `mailto:${value}`,
  },
  {
    id: "phone",
    name: "Phone",
    icon: "Phone",
    description: "Phone number",
    placeholder: "+1234567890",
    validation: (value: string) => /^[+]?[1-9][\d\s\-()]{7,15}$/.test(value),
    format: (value: string) => `tel:${value}`,
  },
  {
    id: "sms",
    name: "SMS",
    icon: "MessageSquare",
    description: "SMS message",
    placeholder: "+1234567890:Your message here",
    format: (value: string) => {
      const [phone, ...messageParts] = value.split(":");
      const message = messageParts.join(":");
      return `sms:${phone}${
        message ? `?body=${encodeURIComponent(message)}` : ""
      }`;
    },
  },
  {
    id: "wifi",
    name: "WiFi",
    icon: "Wifi",
    description: "WiFi network credentials",
    placeholder: "WIFI:T:WPA;S:NetworkName;P:Password;H:false;;",
  },
  {
    id: "vcard",
    name: "vCard",
    icon: "User",
    description: "Contact information",
    placeholder: "BEGIN:VCARD\nVERSION:3.0\nFN:John Doe\nEND:VCARD",
  },
];

export const ERROR_CORRECTION_LEVELS = [
  {
    value: "L",
    label: "Low (~7%)",
    description: "Best for clean environments",
  },
  { value: "M", label: "Medium (~15%)", description: "Balanced option" },
  {
    value: "Q",
    label: "Quartile (~25%)",
    description: "Good for slightly damaged codes",
  },
  {
    value: "H",
    label: "High (~30%)",
    description: "Best for damaged environments",
  },
] as const;

export const PRESET_COLORS = [
  { name: "Classic", dark: "#000000", light: "#FFFFFF" },
  { name: "Blue", dark: "#1E40AF", light: "#FFFFFF" },
  { name: "Green", dark: "#059669", light: "#FFFFFF" },
  { name: "Purple", dark: "#7C3AED", light: "#FFFFFF" },
  { name: "Red", dark: "#DC2626", light: "#FFFFFF" },
  { name: "Orange", dark: "#EA580C", light: "#FFFFFF" },
  { name: "Pink", dark: "#DB2777", light: "#FFFFFF" },
  { name: "Teal", dark: "#0D9488", light: "#FFFFFF" },
];

export const DEFAULT_QR_OPTIONS: QRCodeOptions = {
  text: "",
  size: 256,
  errorCorrectionLevel: "M",
  margin: 4,
  color: {
    dark: "#000000",
    light: "#FFFFFF",
  },
};
