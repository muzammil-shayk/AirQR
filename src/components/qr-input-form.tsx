"use client";

import React, { useCallback, useMemo, useState } from "react";
import { Type, Link, Mail, Wifi, User } from "lucide-react";
import { QRCodeOptions, QR_CODE_TYPES } from "@/types/qr";

interface QRInputFormProps {
  options: QRCodeOptions;
  onOptionsChange: (options: QRCodeOptions) => void;
  onGenerate: () => void;
}

const iconMap = {
  Type,
  Link,
  Mail,
  Wifi,
  User,
};

export const QRInputForm = React.memo(function QRInputForm({
  options,
  onOptionsChange,
  onGenerate,
}: QRInputFormProps) {
  const [selectedType, setSelectedType] = useState("text");

  const handleTextChange = useCallback(
    (text: string) => {
      const selectedQRType = QR_CODE_TYPES.find(
        (type) => type.id === selectedType
      );
      let formattedText = text;

      if (selectedQRType?.format) {
        formattedText = selectedQRType.format(text);
      }

      onOptionsChange({
        ...options,
        text: formattedText,
      });
    },
    [selectedType, options, onOptionsChange]
  );

  const handleTypeChange = useCallback(
    (typeId: string) => {
      setSelectedType(typeId);
      const type = QR_CODE_TYPES.find((t) => t.id === typeId);
      if (type) {
        // Pre-fill with skeleton for wifi and vcard, keep existing text for text type
        let newText = "";
        if (type.id === "text") {
          newText = options.text;
        } else if (type.skeleton) {
          newText = type.skeleton;
        }

        onOptionsChange({
          ...options,
          text: newText,
        });
      }
    },
    [options, onOptionsChange]
  );

  const selectedQRType = useMemo(
    () => QR_CODE_TYPES.find((type) => type.id === selectedType),
    [selectedType]
  );

  const currentDisplayText = useMemo(() => {
    if (selectedType === "text") return options.text;
    if (selectedQRType?.format) return options.text.replace(/^[^:]+:/, "");
    return options.text;
  }, [selectedType, options.text, selectedQRType]);

  const canGenerate = currentDisplayText.trim().length > 0;

  return (
    <div className="space-y-6">
      {/* Type Selection */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-black">QR Code Type</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {QR_CODE_TYPES.map((type) => {
            const IconComponent = iconMap[type.icon as keyof typeof iconMap];
            return (
              <button
                key={type.id}
                onClick={() => handleTypeChange(type.id)}
                className={`flex flex-col items-center gap-2 rounded-lg border p-3 text-sm transition-colors cursor-pointer hover:bg-teal-50 hover:border-teal-300 ${
                  selectedType === type.id
                    ? "border-teal-500 bg-teal-50 text-teal-700"
                    : "border-gray-300 bg-white text-gray-700"
                }`}
              >
                <IconComponent className="h-4 w-4" />
                <span className="font-medium">{type.name}</span>
              </button>
            );
          })}
        </div>
        {selectedQRType && (
          <p className="text-sm text-gray-600">{selectedQRType.description}</p>
        )}
      </div>

      {/* Text Input */}
      <div className="space-y-2">
        <label htmlFor="qr-text" className="text-sm font-medium text-black">
          Content
        </label>
        {selectedType === "wifi" ? (
          <div className="space-y-3">
            <p className="text-sm text-gray-600">
              Format: WIFI:T:WPA;S:NetworkName;P:Password;H:false;;
            </p>
            <textarea
              id="qr-text"
              placeholder={selectedQRType?.placeholder}
              value={currentDisplayText}
              onChange={(e) => handleTextChange(e.target.value)}
              className="flex min-h-[120px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-black placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:border-teal-500 resize-none"
            />
          </div>
        ) : selectedType === "vcard" ? (
          <div className="space-y-3">
            <p className="text-sm text-gray-600">
              vCard format for contact information
            </p>
            <textarea
              id="qr-text"
              placeholder={selectedQRType?.placeholder}
              value={currentDisplayText}
              onChange={(e) => handleTextChange(e.target.value)}
              className="flex min-h-[160px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-black placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:border-teal-500 resize-none font-mono"
            />
          </div>
        ) : (
          <div className="space-y-2">
            <input
              id="qr-text"
              type="text"
              placeholder={selectedQRType?.placeholder}
              value={currentDisplayText}
              onChange={(e) => handleTextChange(e.target.value)}
              className="flex h-12 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-black placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:border-teal-500"
            />
            {selectedQRType?.validation &&
              currentDisplayText &&
              !selectedQRType.validation(currentDisplayText) && (
                <p className="text-sm text-red-600">
                  Invalid format for {selectedQRType.name.toLowerCase()}
                </p>
              )}
          </div>
        )}
      </div>

      {/* Generate Button */}
      <div className="pt-4">
        <button
          onClick={onGenerate}
          disabled={!canGenerate}
          className={`w-full h-12 rounded-md text-sm font-medium transition-all cursor-pointer ${
            canGenerate
              ? "bg-teal-500 text-white hover:bg-teal-600 hover:shadow-md transform hover:scale-[1.02]"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Generate QR Code
        </button>
      </div>
    </div>
  );
});
