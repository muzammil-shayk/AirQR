export interface QRCodeOptions {
  text: string;
}

export interface QRCodeType {
  id: string;
  name: string;
  icon: string;
  description: string;
  placeholder: string;
  skeleton?: string;
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
    id: "wifi",
    name: "WiFi",
    icon: "Wifi",
    description:
      "WiFi network credentials - Replace the values below with your actual WiFi details",
    placeholder: "WIFI:T:WPA;S:NetworkName;P:Password;H:false;;",
    skeleton: "WIFI:T:WPA;S:YourNetworkName;P:YourPassword;H:false;;",
  },
  {
    id: "vcard",
    name: "vCard",
    icon: "User",
    description:
      "Contact information - Replace the values below with your actual details",
    placeholder: "BEGIN:VCARD\nVERSION:3.0\nFN:Your Name\nEND:VCARD",
    skeleton:
      "BEGIN:VCARD\nVERSION:3.0\nFN:Your Full Name\nORG:Your Company\nTITLE:Your Job Title\nTEL:+1234567890\nEMAIL:your@email.com\nURL:https://yourwebsite.com\nADR:;;Street Address;City;State;Zip;Country\nEND:VCARD",
  },
];

export const DEFAULT_QR_OPTIONS: QRCodeOptions = {
  text: "",
};
