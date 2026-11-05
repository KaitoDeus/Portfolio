import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import { Redis } from '@upstash/redis';

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

// Support both standard Upstash keys and Vercel KV Marketplace keys
const redisUrl = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

let redisClient: Redis | null = null;
if (redisUrl && redisToken) {
  try {
    redisClient = new Redis({
      url: redisUrl,
      token: redisToken,
    });
  } catch (err) {
    console.warn('Could not initialize Upstash Redis client:', err);
  }
}

/**
 * Records a visitor by IP address:
 * - If Upstash Redis is configured, uses atomic SET with NX + 24h EX and INCR for cloud persistence.
 * - Otherwise falls back to local file storage for local development.
 */
export async function recordVisit(ip: string): Promise<{ uniqueVisitors: number; isNewVisit: boolean }> {
  // Hash IP with SHA-256 for privacy and fast indexing
  const ipHash = crypto.createHash('sha256').update(ip).digest('hex').substring(0, 16);

  // 1. Upstash Redis (Vercel Serverless & Production Mode)
  if (redisClient) {
    try {
      // SET with NX=true (only if not exists) and EX=86400 (expire in 24 hours)
      const isNew = await redisClient.set(`portfolio:ip:${ipHash}`, '1', {
        nx: true,
        ex: 86400,
      });

      if (isNew) {
        // First visit within 24h: increment unique visitors counter atomically
        const count = await redisClient.incr('portfolio:unique_visitors');
        return {
          uniqueVisitors: Number(count),
          isNewVisit: true,
        };
      } else {
        // Repeated visit within 24 hours (F5, click, reload): DO NOT increment
        const count = (await redisClient.get<number>('portfolio:unique_visitors')) || 0;
        return {
          uniqueVisitors: Number(count),
          isNewVisit: false,
        };
      }
    } catch (err) {
      console.warn('Upstash Redis operation failed, using local file fallback:', err);
    }
  }

  // 2. Local File Fallback (Local Development & when Redis env keys are not yet provided)
  const now = Date.now();
  let data: IAnalyticsData = {
    uniqueVisitors: 0,
    totalPageViews: 0,
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

/**
 * Retrieves the current unique visitor count without recording an additional visit.
 */
export async function getAnalytics(): Promise<{ uniqueVisitors: number; totalPageViews: number }> {
  // 1. Upstash Redis
  if (redisClient) {
    try {
      const count = (await redisClient.get<number>('portfolio:unique_visitors')) || 0;
      return {
        uniqueVisitors: Number(count),
        totalPageViews: 0,
      };
    } catch (err) {
      console.warn('Upstash Redis read failed, using local file fallback:', err);
    }
  }

  // 2. Local File Fallback
  try {
    const raw = await fs.readFile(ANALYTICS_PATH, 'utf-8');
    const data: IAnalyticsData = JSON.parse(raw);
    return {
      uniqueVisitors: data.uniqueVisitors || 0,
      totalPageViews: data.totalPageViews || 0,
    };
  } catch {
    return { uniqueVisitors: 0, totalPageViews: 0 };
  }
}
