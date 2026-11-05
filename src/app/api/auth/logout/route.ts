import { NextResponse, type NextRequest } from 'next/server';
import { SESSION_COOKIE_NAME, recordLogout } from '@/shared/lib/auth';

function getClientIp(req: NextRequest): string {
  const forwardedFor = req.headers.get('x-forwarded-for');
  if (forwardedFor) return forwardedFor.split(',')[0].trim();
  return '127.0.0.1';
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const userAgent = req.headers.get('user-agent') || 'Unknown';
  recordLogout(ip, userAgent);

  const response = NextResponse.json({
    success: true,
    message: 'Đăng xuất quản trị viên thành công.',
  });

  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: '',
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 0,
    path: '/',
  });

  return response;
}
