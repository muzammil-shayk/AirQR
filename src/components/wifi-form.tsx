"use client";

import React, { useState, useCallback, useEffect } from "react";

interface WiFiFormData {
  ssid: string;
  password: string;
  security: "WPA" | "WEP" | "nopass";
  hidden: boolean;
}

interface WiFiFormProps {
  onChange: (wifiString: string) => void;
}

export function WiFiForm({ onChange }: WiFiFormProps) {
  const [formData, setFormData] = useState<WiFiFormData>({
    ssid: "",
    password: "",
    security: "WPA",
    hidden: false,
  });

  const generateWiFiString = useCallback((data: WiFiFormData) => {
    return `WIFI:T:${data.security};S:${data.ssid};P:${data.password};H:${data.hidden};;`;
  }, []);

  const handleChange = useCallback(
    (field: keyof WiFiFormData, value: string | boolean) => {
      const newData = { ...formData, [field]: value };
      setFormData(newData);
      onChange(generateWiFiString(newData));
    },
    [formData, onChange, generateWiFiString]
  );

  // Initialize with empty WiFi string on mount - only once
  useEffect(() => {
    onChange(generateWiFiString(formData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-4">
      {/* Form Fields */}
      <div className="space-y-4">
        <div>
          <label
            htmlFor="ssid"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Network Name (SSID) *
          </label>
          <input
            id="ssid"
            type="text"
            value={formData.ssid}
            onChange={(e) => handleChange("ssid", e.target.value)}
            placeholder="Your WiFi Network Name"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) => handleChange("password", e.target.value)}
            placeholder="WiFi Password (leave empty for open network)"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
            autoComplete="new-password"
            data-form-type="other"
          />
        </div>

        <div>
          <label
            htmlFor="security"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Security Type
          </label>
          <select
            id="security"
            value={formData.security}
            onChange={(e) =>
              handleChange(
                "security",
                e.target.value as WiFiFormData["security"]
              )
            }
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
          >
            <option value="WPA">WPA/WPA2 (Most Common)</option>
            <option value="WEP">WEP (Legacy)</option>
            <option value="nopass">No Password (Open Network)</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <input
            id="hidden"
            type="checkbox"
            checked={formData.hidden}
            onChange={(e) => handleChange("hidden", e.target.checked)}
            className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
          />
          <label htmlFor="hidden" className="text-sm font-medium text-gray-700">
            Hidden Network
          </label>
        </div>
      </div>
    </div>
  );
}
