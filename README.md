# 🚀 AirQR - Modern QR Code Generator

A secure, fast, and privacy-focused QR code generator built with Next.js 15, TypeScript, and Tailwind CSS. Generate QR codes instantly with advanced customization options, batch processing, and history tracking.

## ✨ Features

### Core Functionality

- **🎯 Multiple QR Types**: URL, Text, Email, Phone, SMS, WiFi, vCard
- **🎨 Full Customization**: Colors, sizes, error correction levels, margins
- **📱 Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **🌙 Dark/Light Theme**: Automatic system detection with manual toggle
- **⚡ Real-time Preview**: Instant QR code generation as you type

### Advanced Features

- **📚 History Tracking**: Automatic saving of generated QR codes
- **🔄 Batch Generation**: Create multiple QR codes and download as ZIP
- **📁 CSV Import**: Upload CSV files for bulk QR code generation
- **💾 Multiple Formats**: PNG, SVG download options
- **📋 Easy Sharing**: Copy text, share QR codes natively

### Security & Privacy

- **🔒 Client-side Processing**: No data sent to servers
- **🛡️ Content Security Policy**: Strict CSP headers for security
- **🚫 Input Sanitization**: XSS protection and validation
- **⚖️ Rate Limiting**: Protection against abuse
- **🔐 Secure Headers**: HSTS, X-Frame-Options, and more

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **QR Generation**: QRCode.js
- **Theme**: next-themes
- **Icons**: Lucide React
- **File Handling**: file-saver, JSZip
- **Validation**: Zod + React Hook Form

## 🚀 Quick Start

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/airqr.git
   cd airqr
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables** (optional)

   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configurations
   ```

4. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Visit [http://localhost:3000](http://localhost:3000)

## 📖 Usage

### Basic QR Code Generation

1. Select the QR code type (URL, Text, Email, etc.)
2. Enter your content
3. Customize appearance (colors, size, error correction)
4. Download or share your QR code

### Batch Generation

1. Switch to the "Batch" tab
2. Add multiple items manually or upload a CSV file
3. Customize base options
4. Generate and download all QR codes as a ZIP file

### CSV Format for Batch Import

```csv
text,filename
https://example.com,example-website
Hello World,greeting-message
john@example.com,contact-email
```

## 🔧 Configuration

### Environment Variables

See `.env.example` for all available configuration options.

### Security Configuration

The app includes several security measures:

- Content Security Policy (CSP)
- Rate limiting for API routes
- Input sanitization and validation
- Secure HTTP headers

## 📦 Build & Deploy

### Build for Production

```bash
npm run build
```

### Deploy to Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Deploy to Other Platforms

The app is a standard Next.js application and can be deployed to:

- Netlify
- AWS Amplify
- Railway
- Render
- Self-hosted with PM2

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### Code Standards

- Use TypeScript for all new code
- Follow the existing code style
- Run `npm run lint` before submitting
- Ensure all tests pass

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Lucide](https://lucide.dev/) - Beautiful icons
- [QRCode.js](https://github.com/soldair/node-qrcode) - QR code generation
- [Vercel](https://vercel.com/) - Deployment platform

## 📞 Support

- 📧 Email: support@airqr.dev
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/airqr/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/yourusername/airqr/discussions)

---

<div align="center">
  <strong>Made with ❤️ by the AirQR Team</strong>
  <br>
  <sub>Privacy-focused • Open Source • Modern</sub>
</div>
