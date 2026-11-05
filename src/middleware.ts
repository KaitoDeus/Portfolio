import { NextResponse, type NextRequest } from 'next/server';
import { SESSION_COOKIE_NAME, verifySessionToken } from '@/shared/lib/auth';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1. If visiting the login page while already authenticated, redirect to /admin
  if (pathname === '/admin/login') {
    const sessionToken = req.cookies.get(SESSION_COOKIE_NAME)?.value;
    const isValid = await verifySessionToken(sessionToken);

    if (isValid) {
      return NextResponse.redirect(new URL('/admin', req.url));
    }
    return NextResponse.next();
  }

  // 2. Protect Admin Web Interface (/admin and /admin/*)
  if (pathname === '/admin' || pathname.startsWith('/admin/')) {
    const sessionToken = req.cookies.get(SESSION_COOKIE_NAME)?.value;
    const isValid = await verifySessionToken(sessionToken);

    if (!isValid) {
      const loginUrl = new URL('/admin/login', req.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  }

  // 3. Protect Admin API Routes (/api/admin/*)
  if (pathname.startsWith('/api/admin/')) {
    const sessionToken = req.cookies.get(SESSION_COOKIE_NAME)?.value;
    const isValid = await verifySessionToken(sessionToken);

    if (!isValid) {
      return NextResponse.json(
        {
          error: 'Unauthorized: Security check failed. Valid admin credentials required.',
          code: 'UNAUTHORIZED_ACCESS',
        },
        { status: 401 }
      );
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin/:path*', '/api/admin/:path*'],
};
