"use client";

import React, { useState, useCallback, useEffect } from "react";

interface VCardFormData {
  firstName: string;
  lastName: string;
  organization: string;
  title: string;
  phone: string;
  email: string;
  website: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

interface VCardFormProps {
  onChange: (vCardString: string) => void;
}

export function VCardForm({ onChange }: VCardFormProps) {
  const [formData, setFormData] = useState<VCardFormData>({
    firstName: "",
    lastName: "",
    organization: "",
    title: "",
    phone: "",
    email: "",
    website: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  const [emailError, setEmailError] = useState<string>("");

  const generateVCardString = useCallback((data: VCardFormData) => {
    let vCard = "BEGIN:VCARD\nVERSION:3.0\n";

    // Full name (formatted display name)
    const fullName = `${data.firstName} ${data.lastName}`.trim();
    if (fullName) {
      vCard += `FN:${fullName}\n`;
    }

    // Structured name (last;first;;;) - better for contact apps
    if (data.lastName || data.firstName) {
      vCard += `N:${data.lastName};${data.firstName};;;\n`;
    }

    // Organization - separate from name for proper mapping
    if (data.organization) {
      vCard += `ORG:${data.organization}\n`;
    }

    // Job title
    if (data.title) {
      vCard += `TITLE:${data.title}\n`;
    }

    // Contact information
    if (data.phone) {
      vCard += `TEL:${data.phone}\n`;
    }
    if (
      data.email &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) &&
      !data.email.endsWith("@example.com")
    ) {
      vCard += `EMAIL:${data.email}\n`;
    }
    if (data.website) {
      vCard += `URL:${data.website}\n`;
    }

    // Address - only add if at least one field is filled
    const hasAddress =
      data.street || data.city || data.state || data.zip || data.country;
    if (hasAddress) {
      vCard += `ADR:;;${data.street};${data.city};${data.state};${data.zip};${data.country}\n`;
    }

    vCard += "END:VCARD";
    return vCard;
  }, []);

  const handleChange = useCallback(
    (field: keyof VCardFormData, value: string) => {
      const newData = { ...formData, [field]: value };
      setFormData(newData);

      // Validate email
      if (field === "email") {
        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          setEmailError("Invalid email format");
        } else if (value && value.endsWith("@example.com")) {
          setEmailError("Please enter a valid email address");
        } else {
          setEmailError("");
        }
      }

      onChange(generateVCardString(newData));
    },
    [formData, onChange, generateVCardString]
  );

  // Initialize with empty vCard string on mount - only once
  useEffect(() => {
    onChange(generateVCardString(formData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentVCardString = generateVCardString(formData);

  return (
    <div className="space-y-4">
      {/* Form Fields */}
      <div className="space-y-4">
        {/* Name Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              id="firstName"
              type="text"
              value={formData.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
              placeholder="John"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              id="lastName"
              type="text"
              value={formData.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
              placeholder="Doe"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
              required
            />
          </div>
        </div>

        {/* Optional Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="organization"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Company/Organization
            </label>
            <input
              id="organization"
              type="text"
              value={formData.organization}
              onChange={(e) => handleChange("organization", e.target.value)}
              placeholder="Your Company"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
          </div>

          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Job Title
            </label>
            <input
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="Software Developer"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="+1234567890"
              maxLength={17}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="john@example.com"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
            {emailError && (
              <p className="text-sm text-red-600 mt-1">{emailError}</p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="website"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Website
          </label>
          <input
            id="website"
            type="url"
            value={formData.website}
            onChange={(e) => handleChange("website", e.target.value)}
            placeholder="https://yourwebsite.com"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
        </div>

        {/* Address Section */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-700">
            Address (Optional)
          </h4>
          <div>
            <label
              htmlFor="street"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Street Address
            </label>
            <input
              id="street"
              type="text"
              value={formData.street}
              onChange={(e) => handleChange("street", e.target.value)}
              placeholder="123 Main Street"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                City
              </label>
              <input
                id="city"
                type="text"
                value={formData.city}
                onChange={(e) => handleChange("city", e.target.value)}
                placeholder="Dallas"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
            </div>

            <div>
              <label
                htmlFor="state"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                State
              </label>
              <input
                id="state"
                type="text"
                value={formData.state}
                onChange={(e) => handleChange("state", e.target.value)}
                placeholder="TX"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
            </div>

            <div>
              <label
                htmlFor="zip"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Zip Code
              </label>
              <input
                id="zip"
                type="text"
                value={formData.zip}
                onChange={(e) => handleChange("zip", e.target.value)}
                placeholder="10001"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
            </div>

            <div>
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Country
              </label>
              <input
                id="country"
                type="text"
                value={formData.country}
                onChange={(e) => handleChange("country", e.target.value)}
                placeholder="USA"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Live Preview */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="text-sm font-medium text-gray-700 mb-2">
          vCard String Preview:
        </h4>
        <pre className="text-xs text-gray-600 bg-white p-3 rounded border font-mono whitespace-pre-wrap overflow-x-auto">
          {currentVCardString}
        </pre>
      </div>
    </div>
  );
}
