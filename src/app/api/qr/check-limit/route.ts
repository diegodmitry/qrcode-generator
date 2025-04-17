import { NextResponse } from 'next/server';

/**
 * API route to check rate limit before QR code generation
 * This endpoint is lightweight and only returns the current rate limit status
 */
export async function GET() {
  // The actual rate limiting is handled by the middleware
  // This endpoint just returns a success response
  return new NextResponse(JSON.stringify({ status: 'ok' }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
} 