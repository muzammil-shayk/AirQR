"use client";

import React, { useCallback, useMemo } from "react";
import {
  Type,
  Link,
  Mail,
  Phone,
  MessageSquare,
  Wifi,
  User,
} from "lucide-react";
import {
  QRCodeOptions,
  QR_CODE_TYPES,
  ERROR_CORRECTION_LEVELS,
  PRESET_COLORS,
} from "@/types/qr";

interface QRInputFormProps {
  options: QRCodeOptions;
  onOptionsChange: (options: QRCodeOptions) => void;
}

const iconMap = {
  Type,
  Link,
  Mail,
  Phone,
  MessageSquare,
  Wifi,
  User,
};

export const QRInputForm = React.memo(function QRInputForm({
  options,
  onOptionsChange,
}: QRInputFormProps) {
  const [selectedType, setSelectedType] = React.useState("text");
  const [customColors, setCustomColors] = React.useState(false);

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
        onOptionsChange({
          ...options,
          text: type.id === "text" ? options.text : "",
        });
      }
    },
    [options, onOptionsChange]
  );

  const handlePresetColor = useCallback(
    (preset: (typeof PRESET_COLORS)[0]) => {
      onOptionsChange({
        ...options,
        color: {
          dark: preset.dark,
          light: preset.light,
        },
      });
      setCustomColors(false);
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

  return (
    <div className="space-y-6">
      {/* Type Selection */}
      <div className="space-y-3">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          QR Code Type
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {QR_CODE_TYPES.map((type) => {
            const IconComponent = iconMap[type.icon as keyof typeof iconMap];
            return (
              <button
                key={type.id}
                onClick={() => handleTypeChange(type.id)}
                className={`flex flex-col items-center gap-2 rounded-lg border p-3 text-sm transition-colors hover:bg-accent hover:text-accent-foreground ${
                  selectedType === type.id
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-input bg-background"
                }`}
              >
                <IconComponent className="h-4 w-4" />
                <span className="font-medium">{type.name}</span>
              </button>
            );
          })}
        </div>
        {selectedQRType && (
          <p className="text-sm text-muted-foreground">
            {selectedQRType.description}
          </p>
        )}
      </div>

      {/* Text Input */}
      <div className="space-y-2">
        <label
          htmlFor="qr-text"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Content
        </label>
        {selectedType === "wifi" ? (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Format: WIFI:T:WPA;S:NetworkName;P:Password;H:false;;
            </p>
            <textarea
              id="qr-text"
              placeholder={selectedQRType?.placeholder}
              value={currentDisplayText}
              onChange={(e) => handleTextChange(e.target.value)}
              className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
            />
          </div>
        ) : selectedType === "vcard" ? (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              vCard format for contact information
            </p>
            <textarea
              id="qr-text"
              placeholder={selectedQRType?.placeholder}
              value={currentDisplayText}
              onChange={(e) => handleTextChange(e.target.value)}
              className="flex min-h-[160px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none font-mono"
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
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            {selectedQRType?.validation &&
              currentDisplayText &&
              !selectedQRType.validation(currentDisplayText) && (
                <p className="text-sm text-destructive">
                  Invalid format for {selectedQRType.name.toLowerCase()}
                </p>
              )}
          </div>
        )}
      </div>

      {/* Customization Options */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Size */}
        <div className="space-y-3">
          <label
            htmlFor="size"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Size ({options.size}px)
          </label>
          <input
            id="size"
            type="range"
            min="128"
            max="512"
            step="32"
            value={options.size}
            onChange={(e) =>
              onOptionsChange({ ...options, size: parseInt(e.target.value) })
            }
            className="flex h-2 w-full cursor-pointer appearance-none rounded-lg bg-secondary"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>128px</span>
            <span>512px</span>
          </div>
        </div>

        {/* Error Correction */}
        <div className="space-y-3">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Error Correction
          </label>
          <div className="grid grid-cols-2 gap-2">
            {ERROR_CORRECTION_LEVELS.map((level) => (
              <button
                key={level.value}
                onClick={() =>
                  onOptionsChange({
                    ...options,
                    errorCorrectionLevel: level.value,
                  })
                }
                className={`rounded-md border px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground ${
                  options.errorCorrectionLevel === level.value
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-input bg-background"
                }`}
                title={level.description}
              >
                {level.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Margin */}
      <div className="space-y-3">
        <label
          htmlFor="margin"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Margin ({options.margin}px)
        </label>
        <input
          id="margin"
          type="range"
          min="0"
          max="20"
          step="1"
          value={options.margin}
          onChange={(e) =>
            onOptionsChange({ ...options, margin: parseInt(e.target.value) })
          }
          className="flex h-2 w-full cursor-pointer appearance-none rounded-lg bg-secondary"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>0px</span>
          <span>20px</span>
        </div>
      </div>

      {/* Colors */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Colors
          </label>
          <button
            onClick={() => setCustomColors(!customColors)}
            className="text-sm text-primary hover:underline"
          >
            {customColors ? "Use Presets" : "Custom Colors"}
          </button>
        </div>

        {customColors ? (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="dark-color" className="text-sm font-medium">
                Foreground
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="dark-color"
                  type="color"
                  value={options.color.dark}
                  onChange={(e) =>
                    onOptionsChange({
                      ...options,
                      color: { ...options.color, dark: e.target.value },
                    })
                  }
                  className="h-10 w-16 rounded border border-input bg-background cursor-pointer"
                />
                <input
                  type="text"
                  value={options.color.dark}
                  onChange={(e) =>
                    onOptionsChange({
                      ...options,
                      color: { ...options.color, dark: e.target.value },
                    })
                  }
                  className="flex h-10 flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm font-mono"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="light-color" className="text-sm font-medium">
                Background
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="light-color"
                  type="color"
                  value={options.color.light}
                  onChange={(e) =>
                    onOptionsChange({
                      ...options,
                      color: { ...options.color, light: e.target.value },
                    })
                  }
                  className="h-10 w-16 rounded border border-input bg-background cursor-pointer"
                />
                <input
                  type="text"
                  value={options.color.light}
                  onChange={(e) =>
                    onOptionsChange({
                      ...options,
                      color: { ...options.color, light: e.target.value },
                    })
                  }
                  className="flex h-10 flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm font-mono"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-2">
            {PRESET_COLORS.map((preset) => (
              <button
                key={preset.name}
                onClick={() => handlePresetColor(preset)}
                className={`group relative rounded-lg border-2 p-3 transition-all hover:scale-105 ${
                  options.color.dark === preset.dark &&
                  options.color.light === preset.light
                    ? "border-primary ring-2 ring-primary ring-offset-2"
                    : "border-border hover:border-primary/50"
                }`}
                title={preset.name}
              >
                <div className="flex h-8 overflow-hidden rounded">
                  <div
                    className="flex-1"
                    style={{ backgroundColor: preset.dark }}
                  />
                  <div
                    className="flex-1"
                    style={{ backgroundColor: preset.light }}
                  />
                </div>
                <p className="mt-2 text-xs font-medium text-center">
                  {preset.name}
                </p>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
});
