import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Store for rate limiting (in production, use Redis or similar)
const rateLimit = new Map<string, { tokens: number; last: number }>()

// Rate limit configuration
const RATE_LIMIT_WINDOW = 300 * 1000 // 5 minute in milliseconds
const MAX_TOKENS = 5 // Maximum number of requests per window
const TOKENS_PER_INTERVAL = 5 // Number of tokens to restore each window

/**
 * Rate limiting middleware using token bucket algorithm
 * Limits QR code generation requests per IP address
 */
export function middleware(request: NextRequest) {
  // Only apply rate limiting to QR code generation endpoint
  if (!request.nextUrl.pathname.startsWith('/api/qr')) {
    return NextResponse.next()
  }

  const ip = request.ip ?? 'anonymous'
  const now = Date.now()

  // Get or create rate limit entry for this IP
  let rateLimitInfo = rateLimit.get(ip)
  if (!rateLimitInfo) {
    rateLimitInfo = { tokens: MAX_TOKENS, last: now }
    rateLimit.set(ip, rateLimitInfo)
  }

  // Calculate tokens to restore based on time elapsed
  const timeElapsed = now - rateLimitInfo.last
  const tokensToRestore = Math.floor(timeElapsed / RATE_LIMIT_WINDOW) * TOKENS_PER_INTERVAL

  // Update tokens
  rateLimitInfo.tokens = Math.min(
    MAX_TOKENS,
    rateLimitInfo.tokens + tokensToRestore
  )
  rateLimitInfo.last = now

  // Check if request can be processed
  if (rateLimitInfo.tokens <= 0) {
    return new NextResponse('Rate limit exceeded. Please try again later.', {
      status: 429,
      headers: {
        'Retry-After': RATE_LIMIT_WINDOW.toString(),
        'X-RateLimit-Limit': MAX_TOKENS.toString(),
        'X-RateLimit-Remaining': '0',
        'X-RateLimit-Reset': (now + RATE_LIMIT_WINDOW).toString(),
      },
    })
  }

  // Consume one token
  rateLimitInfo.tokens -= 1

  // Add rate limit headers to response
  const response = NextResponse.next()
  response.headers.set('X-RateLimit-Limit', MAX_TOKENS.toString())
  response.headers.set('X-RateLimit-Remaining', rateLimitInfo.tokens.toString())
  response.headers.set('X-RateLimit-Reset', (now + RATE_LIMIT_WINDOW).toString())

  return response
}

// Configure which paths the middleware applies to
export const config = {
  matcher: '/api/qr/:path*',
} 