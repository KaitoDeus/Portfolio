import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

interface IVisitorRecord {
  lastVisit: number;
  visitCount: number;
}

interface IAnalyticsData {
  uniqueVisitors: number;
  totalPageViews: number;
  visitors: Record<string, IVisitorRecord>;
}

const ANALYTICS_PATH = path.join(process.cwd(), 'src', 'core', 'data', 'analytics.json');
const DEDUPLICATION_WINDOW_MS = 24 * 60 * 60 * 1000; // 24 hours per unique IP

export async function recordVisit(ip: string): Promise<{ uniqueVisitors: number; isNewVisit: boolean }> {
  // Hash IP with SHA-256 for privacy and fast indexing
  const ipHash = crypto.createHash('sha256').update(ip).digest('hex').substring(0, 16);
  const now = Date.now();

  let data: IAnalyticsData = {
    uniqueVisitors: 128,
    totalPageViews: 312,
    visitors: {},
  };

  try {
    const raw = await fs.readFile(ANALYTICS_PATH, 'utf-8');
    data = JSON.parse(raw);
  } catch {
    // If file doesn't exist, start with defaults
  }

  data.totalPageViews = (data.totalPageViews || 0) + 1;

  if (!data.visitors) {
    data.visitors = {};
  }

  const existing = data.visitors[ipHash];
  let isNewVisit = false;

  // If IP has never visited or visited more than 24 hours ago, treat as a unique visitor
  if (!existing || (now - existing.lastVisit > DEDUPLICATION_WINDOW_MS)) {
    isNewVisit = true;
    data.uniqueVisitors = (data.uniqueVisitors || 0) + 1;
    data.visitors[ipHash] = {
      lastVisit: now,
      visitCount: (existing?.visitCount || 0) + 1,
    };
  } else {
    // Repeated visit within 24 hours (F5 refresh, navigating, click spamming)
    // DO NOT increment uniqueVisitors
    existing.visitCount += 1;
    data.visitors[ipHash] = existing;
  }

  // Prune entries older than 60 days to prevent unbounded growth
  const sixtyDaysAgo = now - 60 * 24 * 60 * 60 * 1000;
  for (const key of Object.keys(data.visitors)) {
    if (data.visitors[key].lastVisit < sixtyDaysAgo) {
      delete data.visitors[key];
    }
  }

  try {
    await fs.writeFile(ANALYTICS_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to save analytics.json:', err);
  }

  return {
    uniqueVisitors: data.uniqueVisitors,
    isNewVisit,
  };
}

export async function getAnalytics(): Promise<{ uniqueVisitors: number; totalPageViews: number }> {
  try {
    const raw = await fs.readFile(ANALYTICS_PATH, 'utf-8');
    const data: IAnalyticsData = JSON.parse(raw);
    return {
      uniqueVisitors: data.uniqueVisitors || 128,
      totalPageViews: data.totalPageViews || 312,
    };
  } catch {
    return { uniqueVisitors: 128, totalPageViews: 312 };
  }
}
