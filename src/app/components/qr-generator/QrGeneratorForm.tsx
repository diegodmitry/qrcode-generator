'use client';

import { useState } from 'react';
import { UrlInput } from './url-input/UrlInput';
import { QrDisplay } from './qr-display/QrDisplay';

/**
 * QrGeneratorForm Component
 * 
 * The main form component that manages the QR code generation process.
 * It coordinates between URL input and QR code display, managing the state
 * of the URL and its validation status.
 * 
 * Features:
 * - Manages URL state and validation
 * - Coordinates between URL input and QR display
 * - Handles conditional rendering of QR code
 * 
 * @component
 * @example
 * ```tsx
 * // Basic usage
 * <QrGeneratorForm />
 * ```
 */
export function QrGeneratorForm() {
  // State for URL and its validation status
  const [url, setUrl] = useState('');
  const [isValid, setIsValid] = useState(false);

  /**
   * Handles URL changes from the UrlInput component
   * Updates both the URL value and its validation status
   * 
   * @param {string} newUrl - The new URL value entered by the user
   * @param {boolean} valid - Whether the URL is valid according to validation rules
   */
  const handleUrlChange = (newUrl: string, isValidUrl: boolean) => {
    setUrl(newUrl);
    setIsValid(isValidUrl);
  };

  return (
    <div className="bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 transform transition-all duration-500">
      {/* URL Input Section */}
      <div className="p-8 sm:p-10">
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
            Enter your URL
          </h2>
          <UrlInput onUrlChange={handleUrlChange} />
        </div>
      </div>

      {/* QR Code Display Section */}
      <div className="border-t border-gray-100">
        <div className="p-8 sm:p-10">
          <div className="max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
              Your QR Code
            </h2>
            {!isValid && (
              <p className="text-gray-500 text-lg mb-6">
                Enter a valid URL above to generate a QR code
              </p>
            )}
            <div className="flex justify-center">
              <QrDisplay url={url} isValid={isValid} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 