// Web Crypto & Edge-compatible Security Utilities for Admin Authentication
export const SESSION_COOKIE_NAME = 'admin_session';
export const SESSION_MAX_AGE_SECONDS = 7 * 24 * 60 * 60; // 7 days

const getSecret = () => process.env.ADMIN_SESSION_SECRET || 'kaito-portfolio-default-secure-secret-2026';
export const getAdminPassword = () => process.env.ADMIN_PASSWORD || 'kaito@admin2026';

function bufferToHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function hexToBuffer(hex: string): ArrayBuffer {
  const buf = new ArrayBuffer(hex.length / 2);
  const bytes = new Uint8Array(buf);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
  }
  return buf;
}

async function getHmacKey(secret: string): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  return crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

/**
 * Creates a cryptographically signed session token: timestamp.signature
 */
export async function createSessionToken(): Promise<string> {
  const timestamp = Date.now().toString();
  const encoder = new TextEncoder();
  const key = await getHmacKey(getSecret());
  const signatureBuffer = await crypto.subtle.sign('HMAC', key, encoder.encode(timestamp));
  const signatureHex = bufferToHex(signatureBuffer);
  return `${timestamp}.${signatureHex}`;
}

/**
 * Verifies a session token against expiration and cryptographic signature.
 */
export async function verifySessionToken(token: string | null | undefined): Promise<boolean> {
  if (!token || typeof token !== 'string') return false;

  const parts = token.split('.');
  if (parts.length !== 2) return false;

  const [timestampStr, signatureHex] = parts;
  const timestamp = parseInt(timestampStr, 10);

  if (isNaN(timestamp)) return false;

  // Check if token has expired (7 days)
  const maxAgeMs = SESSION_MAX_AGE_SECONDS * 1000;
  if (Date.now() - timestamp > maxAgeMs) return false;

  try {
    const encoder = new TextEncoder();
    const key = await getHmacKey(getSecret());
    const signatureBytes = hexToBuffer(signatureHex);
    return await crypto.subtle.verify('HMAC', key, signatureBytes, encoder.encode(timestampStr));
  } catch {
    return false;
  }
}

// --- Brute-Force Rate Limiting & Security Audit Logging ---

export interface ISecurityEvent {
  id: string;
  timestamp: string;
  type: 'LOGIN_SUCCESS' | 'LOGIN_FAILED' | 'RATE_LIMITED' | 'LOGOUT';
  ip: string;
  userAgent?: string;
  details?: string;
}

const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000; // 15 minutes lockout

interface IRateLimitRecord {
  failedAttempts: number;
  lockedUntil: number;
  lastAttempt: number;
}

const rateLimitMap = new Map<string, IRateLimitRecord>();
const securityLogs: ISecurityEvent[] = [];

export function checkRateLimit(ip: string): { allowed: boolean; retryAfterSeconds: number; attemptsLeft: number } {
  const record = rateLimitMap.get(ip);
  const now = Date.now();

  if (!record) {
    return { allowed: true, retryAfterSeconds: 0, attemptsLeft: MAX_ATTEMPTS };
  }

  if (record.lockedUntil > now) {
    const retryAfterSeconds = Math.ceil((record.lockedUntil - now) / 1000);
    return { allowed: false, retryAfterSeconds, attemptsLeft: 0 };
  }

  // If lockout expired, reset
  if (record.lockedUntil > 0 && record.lockedUntil <= now) {
    rateLimitMap.delete(ip);
    return { allowed: true, retryAfterSeconds: 0, attemptsLeft: MAX_ATTEMPTS };
  }

  return {
    allowed: true,
    retryAfterSeconds: 0,
    attemptsLeft: Math.max(0, MAX_ATTEMPTS - record.failedAttempts),
  };
}

export function recordFailedLogin(ip: string, userAgent?: string): { locked: boolean; retryAfterSeconds: number; attemptsLeft: number } {
  const now = Date.now();
  const record = rateLimitMap.get(ip) || { failedAttempts: 0, lockedUntil: 0, lastAttempt: now };

  record.failedAttempts += 1;
  record.lastAttempt = now;

  let locked = false;
  let retryAfterSeconds = 0;

  if (record.failedAttempts >= MAX_ATTEMPTS) {
    record.lockedUntil = now + LOCKOUT_MS;
    locked = true;
    retryAfterSeconds = Math.ceil(LOCKOUT_MS / 1000);

    logSecurityEvent({
      type: 'RATE_LIMITED',
      ip,
      userAgent,
      details: `IP locked out for 15 minutes after ${record.failedAttempts} consecutive failed attempts.`,
    });
  } else {
    logSecurityEvent({
      type: 'LOGIN_FAILED',
      ip,
      userAgent,
      details: `Incorrect password attempt (${record.failedAttempts}/${MAX_ATTEMPTS}).`,
    });
  }

  rateLimitMap.set(ip, record);

  return {
    locked,
    retryAfterSeconds,
    attemptsLeft: Math.max(0, MAX_ATTEMPTS - record.failedAttempts),
  };
}

export function recordSuccessfulLogin(ip: string, userAgent?: string) {
  rateLimitMap.delete(ip);
  logSecurityEvent({
    type: 'LOGIN_SUCCESS',
    ip,
    userAgent,
    details: 'Authorized admin access granted.',
  });
}

export function recordLogout(ip: string, userAgent?: string) {
  logSecurityEvent({
    type: 'LOGOUT',
    ip,
    userAgent,
    details: 'Admin session terminated.',
  });
}

function logSecurityEvent(event: Omit<ISecurityEvent, 'id' | 'timestamp'>) {
  const newEvent: ISecurityEvent = {
    ...event,
    id: `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    timestamp: new Date().toISOString(),
  };

  securityLogs.unshift(newEvent);

  // Keep latest 50 security logs
  if (securityLogs.length > 50) {
    securityLogs.pop();
  }
}

export function getSecurityLogs(): ISecurityEvent[] {
  return [...securityLogs];
}
