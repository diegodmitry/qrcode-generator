interface ValidationResult {
  isValid: boolean;
  message: string;
}

export function validateUrl(url: string): ValidationResult {
  // Empty URL check
  if (!url.trim()) {
    return {
      isValid: false,
      message: 'Please enter a URL',
    };
  }

  try {
    // Try to create a URL object
    const urlObject = new URL(url);

    // Check for supported protocols
    if (!['http:', 'https:'].includes(urlObject.protocol)) {
      return {
        isValid: false,
        message: 'Only HTTP and HTTPS URLs are supported',
      };
    }

    // Check for valid domain
    if (!urlObject.hostname) {
      return {
        isValid: false,
        message: 'Invalid domain name',
      };
    }

    return {
      isValid: true,
      message: 'Valid URL',
    };
  } catch {
    // URL constructor will throw for invalid URLs
    return {
      isValid: false,
      message: 'Invalid URL format',
    };
  }
} 