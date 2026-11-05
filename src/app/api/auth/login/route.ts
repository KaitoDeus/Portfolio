import { NextResponse, type NextRequest } from 'next/server';
import {
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE_SECONDS,
  createSessionToken,
  getAdminPassword,
  checkRateLimit,
  recordFailedLogin,
  recordSuccessfulLogin,
} from '@/shared/lib/auth';

function getClientIp(req: NextRequest): string {
  const forwardedFor = req.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  const realIp = req.headers.get('x-real-ip');
  if (realIp) return realIp.trim();
  return '127.0.0.1';
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    const userAgent = req.headers.get('user-agent') || 'Unknown';

    // 1. Rate Limit & Brute-Force Lock Check
    const rateStatus = checkRateLimit(ip);
    if (!rateStatus.allowed) {
      return NextResponse.json(
        {
          error: `Account temporarily locked due to multiple failed attempts. Please retry in ${rateStatus.retryAfterSeconds} seconds.`,
          locked: true,
          retryAfterSeconds: rateStatus.retryAfterSeconds,
        },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { password } = body;

    if (!password || typeof password !== 'string') {
      return NextResponse.json({ error: 'Please enter administrator password.' }, { status: 400 });
    }

    const expectedPassword = getAdminPassword();

    // 2. Validate Password
    if (password !== expectedPassword) {
      const failStatus = recordFailedLogin(ip, userAgent);

      if (failStatus.locked) {
        return NextResponse.json(
          {
            error: `5 consecutive failed attempts. Access from this IP is temporarily locked for ${Math.ceil(failStatus.retryAfterSeconds / 60)} minutes.`,
            locked: true,
            retryAfterSeconds: failStatus.retryAfterSeconds,
          },
          { status: 429 }
        );
      }

      return NextResponse.json(
        {
          error: `Incorrect password. You have ${failStatus.attemptsLeft} attempt(s) remaining.`,
          attemptsLeft: failStatus.attemptsLeft,
        },
        { status: 401 }
      );
    }

    // 3. Authentication Succeeded
    recordSuccessfulLogin(ip, userAgent);
    const token = await createSessionToken();

    const response = NextResponse.json({
      success: true,
      message: 'Administrator authenticated successfully.',
    });

    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: token,
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: SESSION_MAX_AGE_SECONDS,
      path: '/',
    });

    return response;
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error('Error in POST /api/auth/login:', msg);
    return NextResponse.json({ error: 'An error occurred during authentication.' }, { status: 500 });
  }
}
