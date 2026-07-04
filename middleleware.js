import { NextResponse } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Connect 2 d Upstash Redis db usn e. v.
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '10 s'), // Max 5 requests every 10 seconds
});

export async function middleware(request) {
  // Only target our logging API endpoint
  if (request.nextUrl.pathname === '/api/log') {
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    const { success } = await ratelimit.limit(ip);

    if (!success) {
      return new NextResponse(
        JSON.stringify({ error: 'Too many requests. Slow down!' }),
        { status: 429, headers: { 'Content-Type': 'application/json' } }
      );
    }
  }
  
  return NextResponse.next();
}