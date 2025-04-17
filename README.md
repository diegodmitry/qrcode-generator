# QR Code Generator

A modern, fast, and user-friendly QR code generator built with Next.js 14.

## Features

- 🚀 Instant QR code generation
- 🔗 URL validation and sanitization
- 💾 Download QR codes in multiple formats
- 📱 Fully responsive design
- 🎨 Clean and modern UI
- 🔒 Secure URL handling
- 🛡️ Rate limiting protection
- 🔄 Automatic error handling
- 📊 Real-time QR code preview
- 🌐 Cross-browser compatibility

## Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **QR Generation:** qrcode.js
- **Testing:** Jest & React Testing Library
- **Linting:** ESLint
- **Formatting:** Prettier
- **API Protection:** Custom rate limiting middleware
- **Performance:** SWC compiler, automatic minification
- **State Management:** React hooks
- **Error Handling:** Custom error boundaries

### Dependencies Versions

```json
{
  "next": "14.1.0",
  "react": "18.2.0",
  "typescript": "5.3.0",
  "tailwindcss": "3.4.0",
  "qrcode.js": "1.0.0"
}
```

## Getting Started

### Prerequisites

- Node.js 20.11.0 or later
- npm 10.2.4 or later

### Installation

1. Clone the repository:
   ```bash
   git clone [your-repo-url]
   cd nextjs-qrcode
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. Enter a URL in the input field
2. The QR code will be generated automatically
3. Click the download button to save the QR code as PNG
4. Share the QR code with others

### Rate Limiting

The API is protected with rate limiting:
- 10 requests per minute per IP
- Automatic token bucket algorithm
- Headers show remaining requests

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   └── qr/           # QR code endpoints
│   ├── components/        # React components
│   │   └── qr-generator/ # QR generation components
│   ├── lib/              # Utility functions
│   └── types/            # TypeScript types
├── middleware.ts          # Rate limiting middleware
└── styles/               # Global styles
```

## API Endpoints

- `POST /api/qr/generate` - Generate QR code
- `GET /api/qr/check-limit` - Check rate limit status

## Performance Optimizations

- SWC minification enabled
- Automatic code splitting
- Image optimization with next/image
- Tree shaking for smaller bundles
- Efficient error boundaries

## Security Features

- URL sanitization
- Rate limiting protection
- Content Security Policy
- Secure HTTP headers
- Input validation

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Run production server
npm start

# Run tests
npm test

# Lint code
npm run lint
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation
- `style:` Code style
- `refactor:` Code refactoring
- `test:` Testing
- `chore:` Maintenance

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Next.js team for the amazing framework
- QR code libraries contributors
- Open source community
- Tailwind CSS team

## Contact

[Your Name] - [Your Email]

Project Link: [your-repo-url]

## Roadmap

- [ ] Add support for more QR code formats
- [ ] Implement custom QR code styling
- [ ] Add authentication system
- [ ] Create API documentation with Swagger
- [ ] Add more test coverage
- [ ] Implement analytics
