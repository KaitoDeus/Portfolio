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
          error: `Tài khoản tạm thời bị khóa do nhập sai nhiều lần. Vui lòng thử lại sau ${rateStatus.retryAfterSeconds} giây.`,
          locked: true,
          retryAfterSeconds: rateStatus.retryAfterSeconds,
        },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { password } = body;

    if (!password || typeof password !== 'string') {
      return NextResponse.json({ error: 'Vui lòng nhập mật khẩu quản trị viên.' }, { status: 400 });
    }

    const expectedPassword = getAdminPassword();

    // 2. Validate Password
    if (password !== expectedPassword) {
      const failStatus = recordFailedLogin(ip, userAgent);

      if (failStatus.locked) {
        return NextResponse.json(
          {
            error: `Bạn đã nhập sai 5 lần liên tiếp. Hệ thống đã khóa truy cập IP này trong ${Math.ceil(failStatus.retryAfterSeconds / 60)} phút để bảo mật.`,
            locked: true,
            retryAfterSeconds: failStatus.retryAfterSeconds,
          },
          { status: 429 }
        );
      }

      return NextResponse.json(
        {
          error: `Mật khẩu không chính xác. Bạn còn ${failStatus.attemptsLeft} lần thử trước khi bị khóa tạm thời.`,
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
      message: 'Xác thực quản trị viên thành công.',
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
    return NextResponse.json({ error: 'Đã có lỗi xảy ra trong quá trình xác thực.' }, { status: 500 });
  }
}
