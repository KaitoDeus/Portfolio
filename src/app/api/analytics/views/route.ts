import { NextResponse, type NextRequest } from 'next/server';
import { recordVisit, getAnalytics } from '@/shared/lib/analytics';

function getClientIp(req: NextRequest): string {
  const forwardedFor = req.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  const realIp = req.headers.get('x-real-ip');
  if (realIp) return realIp.trim();
  return '127.0.0.1';
}

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const shouldRecord = searchParams.get('record') !== 'false';

    if (!shouldRecord) {
      const data = await getAnalytics();
      return NextResponse.json({
        uniqueVisitors: data.uniqueVisitors,
        totalPageViews: data.totalPageViews,
      });
    }

    const ip = getClientIp(req);
    const result = await recordVisit(ip);

    return NextResponse.json({
      uniqueVisitors: result.uniqueVisitors,
      isNewVisit: result.isNewVisit,
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error('Error in /api/analytics/views:', msg);
    return NextResponse.json({ uniqueVisitors: 128 }, { status: 500 });
  }
}
