"use client";

import React, { useState } from "react";
import { User, Copy, Check, Terminal, Wifi, Mail, MessageSquare, Phone } from "lucide-react";
import { LuGithub as Github, LuLinkedin as Linkedin } from "react-icons/lu";
import Image from "next/image";
import Link from "next/link";

function CodeBlock({ title, code }: { title: string, code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mb-6 overflow-hidden rounded-xl border border-gray-200 bg-gray-50/50">
      <div className="flex items-center justify-between border-b border-gray-200 bg-gray-100/50 px-4 py-2">
        <span className="text-sm font-medium text-gray-600">{title}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-gray-500 hover:bg-gray-200 hover:text-gray-900 transition-colors"
          aria-label="Copy code"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-green-600" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? <span className="text-green-600">Copied!</span> : "Copy"}
        </button>
      </div>
      <div className="p-4 overflow-x-auto">
        <pre className="text-sm text-gray-800">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}

export default function ApiDocs() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/95 backdrop-blur sticky top-0 z-50">
        <div className="w-full flex h-16 items-center justify-between px-4 sm:px-6 max-w-7xl mx-auto">
          <Link href="/" className="flex items-center gap-3 cursor-pointer">
            <Image
              src="/airqr-logo.svg"
              alt="AirQR Logo"
              width={64}
              height={64}
            />
            <div>
              <h1 className="text-xl font-bold text-black hover:text-teal-600 transition-colors">AirQR</h1>
              <p className="text-sm text-gray-600 hidden sm:block">
                Modern QR Code Generator
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-2 text-gray-700">
            <Link
              href="/"
              className="mr-2 hidden sm:inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-4 text-sm font-medium transition-colors hover:bg-gray-50 text-gray-600 cursor-pointer"
            >
              Back to Generator
            </Link>
            <a
              href="https://github.com/muzammil-shayk"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-gray-300 bg-white text-sm font-medium transition-colors hover:bg-teal-50 hover:text-teal-600 hover:border-teal-300 cursor-pointer"
              aria-label="View on GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="https://linkedin.com/in/muhammad-muzammil-8771a4309/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-gray-300 bg-white text-sm font-medium transition-colors hover:bg-teal-50 hover:text-teal-600 hover:border-teal-300 cursor-pointer"
              aria-label="View on LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href="https://m-muzammil.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-gray-300 bg-white text-sm font-medium transition-colors hover:bg-teal-50 hover:text-teal-600 hover:border-teal-300 cursor-pointer"
              aria-label="View Portfolio"
            >
              <User className="h-4 w-4" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="mx-auto max-w-4xl">
          
          <div className="mb-12">
            <div className="inline-flex items-center justify-center rounded-full bg-teal-50 px-3 py-1 text-sm font-medium text-teal-600 mb-4">
              <Terminal className="h-4 w-4 mr-2" />
              Developer API
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-black sm:text-5xl">
              AirQR Public API
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              A free, lightning fast, and edge-ready API to generate extremely crisp SVG QR codes instantly. No authentication required. No rate limits (subject to fair use). Full CORS support.
            </p>
          </div>

          {/* Endpoint Section */}
          <section className="mb-12 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-black mb-4">Base Endpoint</h2>
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-2">Base URL for all requests:</p>
              <code className="rounded-md bg-gray-100 px-3 py-2 text-sm font-mono text-teal-700 block w-full overflow-x-auto border border-gray-200">
                GET https://airqr.vercel.app/api/qr
              </code>
            </div>

            <h3 className="text-lg font-semibold text-black mt-8 mb-4 border-b border-gray-100 pb-2">Global UI Parameters</h3>
            <p className="text-sm text-gray-600 mb-4">These parameters can be appended to ANY type of QR code to customize its appearance:</p>
            <div className="overflow-x-auto rounded-lg border border-gray-200 mb-8">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-gray-50 text-gray-600">
                  <tr>
                    <th className="px-4 py-3 font-medium">Parameter</th>
                    <th className="px-4 py-3 font-medium">Type</th>
                    <th className="px-4 py-3 font-medium">Default</th>
                    <th className="px-4 py-3 font-medium">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white text-gray-800">
                  <tr>
                    <td className="px-4 py-3 font-mono text-teal-600">color</td>
                    <td className="px-4 py-3">string (hex)</td>
                    <td className="px-4 py-3 font-mono">#000000</td>
                    <td className="px-4 py-3">Color of the dark blocks. E.g., <code className="bg-gray-100 px-1 rounded">%23ff0000</code></td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-teal-600">bg</td>
                    <td className="px-4 py-3">string (hex)</td>
                    <td className="px-4 py-3 font-mono">#ffffff</td>
                    <td className="px-4 py-3">Background color of the QR code.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-teal-600">margin</td>
                    <td className="px-4 py-3">number</td>
                    <td className="px-4 py-3 font-mono">2</td>
                    <td className="px-4 py-3">White space padding around the QR code border.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Usage Types */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold tracking-tight text-black flex items-center">
              Generating Specific Types
            </h2>
            <p className="text-gray-600 mb-6">AirQR automatically formats raw text into standardized QR schemes for you. Just pass the `type` parameter alongside the necessary info.</p>

            {/* Standard / URL */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <Terminal className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-black">1. Standard URL or Text (Default)</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">Pass your URL directly or plain text to the <code>data</code> parameter.</p>
              <CodeBlock 
                title="Example Request (URL)"
                code="https://airqr.vercel.app/api/qr?data=https://github.com/muzammil-shayk"
              />
            </div>

            {/* WiFi */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600">
                  <Wifi className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-black">2. Wi-Fi Auto-Connect</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">Creates a QR code that prompts devices to connect to a Wi-Fi network instantly.</p>
              <CodeBlock 
                title="Example Request (Wi-Fi)"
                code="https://airqr.vercel.app/api/qr?type=wifi&ssid=MyNetwork&password=SuperSecret123&encryption=WPA"
              />
              <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-700 mt-2 border border-gray-200">
                <strong>Parameters:</strong> <code>type=wifi</code>, <code>ssid</code> (Required), <code>password</code>, <code>encryption</code> (WPA, WEP, or nopass. Default is WPA).
              </div>
            </div>

            {/* Email */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
                  <Mail className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-black">3. Email Draft</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">Opens the default mail app with a pre-filled recipient and subject line.</p>
              <CodeBlock 
                title="Example Request (Email)"
                code="https://airqr.vercel.app/api/qr?type=email&email=contact@example.com&subject=Hello%20There&body=I%20have%20an%20inquiry..."
              />
              <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-700 mt-2 border border-gray-200">
                <strong>Parameters:</strong> <code>type=email</code>, <code>email</code> (Required), <code>subject</code>, <code>body</code>.
              </div>
            </div>

            {/* SMS */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-black">4. SMS Text Message</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">Opens the SMS/Messages app to a specific number with a pre-filled draft.</p>
              <CodeBlock 
                title="Example Request (SMS)"
                code="https://airqr.vercel.app/api/qr?type=sms&phone=+1234567890&message=RSVP%20Yes!"
              />
              <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-700 mt-2 border border-gray-200">
                <strong>Parameters:</strong> <code>type=sms</code>, <code>phone</code> (Required), <code>message</code>.
              </div>
            </div>
            
            {/* Phone */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-pink-50 text-pink-600">
                  <Phone className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-black">5. Queue Phone Call</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">Queues up the dialpad with the specified phone number.</p>
              <CodeBlock 
                title="Example Request (Phone)"
                code="https://airqr.vercel.app/api/qr?type=phone&phone=+1234567890"
              />
              <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-700 mt-2 border border-gray-200">
                <strong>Parameters:</strong> <code>type=phone</code>, <code>phone</code> (Required).
              </div>
            </div>

          </div>

          <div className="mt-16 text-center rounded-2xl bg-teal-50 border border-teal-100 p-8">
             <h2 className="text-2xl font-bold text-teal-900 mb-4">Ready to Integrate?</h2>
             <p className="text-teal-700 mb-6 max-w-xl mx-auto">Because the API returns native SVG with proper CORS headers, you can drop these API endpoints directly into your <code>&lt;img src=&quot;...&quot; /&gt;</code> tags without worrying about blocking.</p>
             <Link href="/" className="inline-flex h-12 items-center justify-center rounded-lg bg-teal-600 px-6 text-sm font-medium text-white transition-colors hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2">
               Test via AirQR Generator Interface
             </Link>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
        <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center text-gray-600">
          <div className="flex justify-center mb-3">
            <Image
              src="/airqr-txt-logo.svg"
              alt="AirQR Logo"
              width={120}
              height={40}
            />
          </div>
          <div className="flex justify-center gap-4 mb-4">
            <a
              href="https://github.com/muzammil-shayk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-teal-600 transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com/in/muhammad-muzammil-8771a4309/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-teal-600 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="https://m-muzammil.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-teal-600 transition-colors"
              aria-label="Portfolio"
            >
              <User className="h-5 w-5" />
            </a>
          </div>
          <p className="text-sm mb-2">
            Free QR Code Generator - No Registration Required | Built by{" "}
            <a
              href="https://m-muzammil.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-teal-600 hover:underline"
            >
              M. Muzammil
            </a>
          </p>
          <p className="text-xs text-gray-400 mb-2">
            Privacy-First • Lightweight • Secure • Fast QR Generation • Open API
          </p>
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} AirQR by M. Muzammil. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
