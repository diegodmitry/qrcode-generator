'use client';

import { useState, useEffect } from 'react';
import { validateUrl } from '@/app/lib/validation/urlValidation';

/**
 * Props for the UrlInput component
 * @interface
 */
interface UrlInputProps {
  /** Callback function triggered when URL changes or is validated */
  onUrlChange: (url: string, isValid: boolean) => void;
}

/**
 * UrlInput Component
 * 
 * A form input component that handles URL entry and validation.
 * Features real-time validation, clear button, and visual feedback
 * for valid/invalid states.
 * 
 * Features:
 * - Real-time URL validation
 * - Visual feedback for valid/invalid states
 * - Clear button to reset input
 * - Accessibility support
 * 
 * @component
 * @example
 * ```tsx
 * const handleUrlChange = (url: string, isValid: boolean) => {
 *   console.log(url, isValid);
 * };
 * 
 * <UrlInput onUrlChange={handleUrlChange} />
 * ```
 */
export function UrlInput({ onUrlChange }: UrlInputProps) {
  const [url, setUrl] = useState('');
  const [validationMessage, setValidationMessage] = useState('');
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const result = validateUrl(url);
    setIsValid(result.isValid);
    setValidationMessage(result.message);
    onUrlChange(url, result.isValid);
  }, [url, onUrlChange]);

  return (
    <div className="space-y-3">
      <div className="relative">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          className={`
            w-full px-6 py-4 rounded-2xl text-lg
            bg-white/70 backdrop-blur-sm
            border-2 transition-all duration-300
            focus:outline-none focus:ring-4
            ${
              url
                ? isValid
                  ? 'border-green-500/50 focus:border-green-500 focus:ring-green-500/20'
                  : 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20'
                : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500/20'
            }
          `}
          aria-invalid={url ? !isValid : undefined}
          aria-describedby="url-validation"
        />
      </div>

      {url && (
        <p
          id="url-validation"
          className={`text-base font-semibold ${
            isValid ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {validationMessage}
        </p>
      )}
    </div>
  );
} 