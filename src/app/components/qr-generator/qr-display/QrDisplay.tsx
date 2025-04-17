'use client';

import React, { useRef, useState, useEffect } from 'react';
import QRCode from 'react-qr-code';

/**
 * Props for the QrDisplay component
 * @interface
 */
interface QrDisplayProps {
  /** The URL to encode in the QR code */
  url: string;
  /** Whether the URL is valid and can be encoded */
  isValid: boolean;
}

interface RateLimitError {
  retryAfter: number;
  limit: number;
  remaining: number;
  reset: number;
}

/**
 * Sanitizes a URL by:
 * 1. Removing any script tags or potentially harmful content
 * 2. Ensuring proper URL encoding
 * 3. Validating protocol (only allows http:// and https://)
 */
const sanitizeUrl = (url: string): string => {
  try {
    // Remove any HTML/script tags
    const sanitized = url.replace(/<[^>]*>?/gm, '');
    
    // Create URL object to validate and standardize the URL
    const urlObject = new URL(sanitized);
    
    // Only allow http and https protocols
    if (!['http:', 'https:'].includes(urlObject.protocol)) {
      throw new Error('Invalid protocol. Only HTTP and HTTPS are allowed.');
    }
    
    return urlObject.toString();
  } catch (error) {
    console.error('URL Sanitization Error:', error);
    throw error; // Re-throw the error to be handled by the component
  }
};

/**
 * Checks if the response contains rate limit headers
 * @param headers Response headers
 * @returns Rate limit information if present
 */
const getRateLimitInfo = (headers: Headers): RateLimitError | null => {
  const retryAfter = headers.get('Retry-After');
  const limit = headers.get('X-RateLimit-Limit');
  const remaining = headers.get('X-RateLimit-Remaining');
  const reset = headers.get('X-RateLimit-Reset');

  if (retryAfter && limit && remaining && reset) {
    return {
      retryAfter: parseInt(retryAfter, 10),
      limit: parseInt(limit, 10),
      remaining: parseInt(remaining, 10),
      reset: parseInt(reset, 10)
    };
  }

  return null;
};

/**
 * QrDisplay Component
 * 
 * Renders a QR code for a given URL and provides download functionality.
 * The component handles both display and export of QR codes, with proper
 * error handling and loading states.
 * 
 * Features:
 * - High-quality QR code generation
 * - PNG download functionality
 * - Loading state management
 * - Error handling
 * - Responsive design
 * 
 * @component
 * @example
 * ```tsx
 * <QrDisplay url="https://example.com" isValid={true} />
 * ```
 */
export const QrDisplay: React.FC<QrDisplayProps> = ({ url, isValid }) => {
  const [rateLimitError, setRateLimitError] = useState<RateLimitError | null>(null);
  const qrRef = useRef<HTMLDivElement>(null);

  // Reset rate limit error when URL changes
  useEffect(() => {
    setRateLimitError(null);
  }, [url]);

  const handleDownload = async () => {
    try {
      // Check rate limit before proceeding
      const response = await fetch('/api/qr/check-limit');
      const rateLimitInfo = getRateLimitInfo(response.headers);
      
      if (response.status === 429) {
        setRateLimitError(rateLimitInfo);
        return;
      }

      if (!qrRef.current) {
        throw new Error('QR code reference not found');
      }

      const svg = qrRef.current.querySelector('svg');
      if (!svg) {
        throw new Error('SVG element not found');
      }

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        throw new Error('Failed to get canvas context');
      }

      const svgData = new XMLSerializer().serializeToString(svg);
      const img = new Image();

      canvas.width = 600;
      canvas.height = 600;

      img.onload = () => {
        // Fill white background
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw QR code centered
        ctx.drawImage(img, 44, 44, 512, 512);

        try {
          // Create download link
          const pngUrl = canvas
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");
          const downloadLink = document.createElement("a");
          downloadLink.href = pngUrl;
          downloadLink.download = 'qrcode-inaaveiro.png';
          
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
        } catch (error) {
          console.error('Download Error:', error);
          alert('Failed to download QR code. Please try again.');
        }
      };

      img.onerror = () => {
        console.error('Image loading failed');
        alert('Failed to generate QR code image. Please try again.');
      };

      const sanitizedSvgData = encodeURIComponent(svgData);
      img.src = "data:image/svg+xml;base64," + btoa(unescape(sanitizedSvgData));
    } catch (error) {
      console.error('QR Code Generation Error:', error);
      alert('Failed to generate QR code. Please try again.');
    }
  };

  if (rateLimitError) {
    const resetDate = new Date(rateLimitError.reset);
    return (
      <div className="flex items-center justify-center p-4 bg-yellow-50 text-yellow-700 rounded-lg">
        <p>
          Rate limit exceeded. Please try again after{' '}
          {Math.ceil(rateLimitError.retryAfter / 1000)} seconds.
          <br />
          <small>
            Limit: {rateLimitError.limit} requests per minute
            <br />
            Next reset: {resetDate.toLocaleTimeString()}
          </small>
        </p>
      </div>
    );
  }

  if (!url) {
    return null; // Return nothing if URL is empty
  }

  if (!isValid) {
    return (
      <div className="flex items-center justify-center p-4 bg-red-50 text-red-700 rounded-lg">
        Please enter a valid URL
      </div>
    );
  }

  // Sanitize URL before generating QR code
  let sanitizedUrl;
  try {
    sanitizedUrl = sanitizeUrl(url);
  } catch (error: unknown) {
    console.error('URL Processing Error:', error);
    return (
      <div className="flex items-center justify-center p-4 bg-red-50 text-red-700 rounded-lg">
        Invalid URL format. Please check your input.
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <div ref={qrRef} className="relative bg-white p-4 rounded-2xl shadow-lg transform transition-all duration-500 hover:shadow-xl">
        <QRCode
          value={sanitizedUrl}
          size={256}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          viewBox={`0 0 256 256`}
          level="H"
        />
      </div>
      
      <button
        onClick={handleDownload}
        className="group flex items-center justify-center gap-3 rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:bg-blue-700 hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/20"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        </svg>
        Download QR Code
      </button>
    </div>
  );
}

export default QrDisplay; 