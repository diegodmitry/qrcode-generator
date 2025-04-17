import type { Metadata } from "next";
import { QrGeneratorForm } from "./components/qr-generator/QrGeneratorForm";

export const metadata: Metadata = {
  title: "QR Code Generator",
  description: "A modern, fast, and user-friendly QR code generator",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -left-1/4 -top-1/4 w-1/2 h-1/2 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -right-1/4 -bottom-1/4 w-1/2 h-1/2 bg-gradient-to-br from-purple-200/30 to-blue-200/30 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="container mx-auto max-w-4xl px-4 py-12 sm:py-20">
        {/* Header Section */}
        <header className="text-center space-y-6 mb-12">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 tracking-tighter">
            QR Code Generator
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto font-medium">
            Generate QR codes instantly for your URLs. Simple, fast, and reliable.
          </p>
        </header>

        {/* Main Content */}
        <div className="mt-12 px-4">
          <QrGeneratorForm />
        </div>

        {/* Footer */}
        <footer className="mt-20 text-center">
          <p className="text-sm text-gray-500 font-medium">
            Built on a laptop 💻 that sounds like a jet engine 🚀.
          </p>
        </footer>
      </div>
    </main>
  );
}
