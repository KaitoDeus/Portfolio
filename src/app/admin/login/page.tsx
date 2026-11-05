'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { 
  ShieldAlert, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowLeft, 
  ShieldCheck, 
  AlertTriangle,
  Loader2,
  Clock
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/admin';

  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [attemptsLeft, setAttemptsLeft] = useState<number | null>(null);
  const [lockCountdown, setLockCountdown] = useState<number | null>(null);

  // Check if already authenticated on initial mount
  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated) {
          router.replace(redirectPath);
        }
      })
      .catch(() => {});
  }, [router, redirectPath]);

  // Lockout countdown timer
  useEffect(() => {
    if (lockCountdown === null || lockCountdown <= 0) return;

    const timer = setInterval(() => {
      setLockCountdown((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(timer);
          setErrorMessage(null);
          return null;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [lockCountdown]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim() || loading || lockCountdown !== null) return;

    setLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.replace(redirectPath);
      } else {
        setErrorMessage(data.error || 'Mật khẩu quản trị viên không chính xác.');

        if (data.attemptsLeft !== undefined) {
          setAttemptsLeft(data.attemptsLeft);
        }

        if (data.locked && data.retryAfterSeconds) {
          setLockCountdown(data.retryAfterSeconds);
        }
      }
    } catch {
      setErrorMessage('Không thể kết nối đến máy chủ. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  const formatCountdown = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden bg-background text-foreground select-none">
      {/* Subtle Background Glow */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-500/10 dark:bg-red-500/15 rounded-full blur-3xl pointer-events-none" 
      />

      <div className="w-full max-w-md relative z-10 space-y-6">
        
        {/* Back Link */}
        <div>
          <Button asChild variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
            <Link href="/">
              <ArrowLeft className="w-4 h-4" />
              <span>Quay lại trang chủ</span>
            </Link>
          </Button>
        </div>

        {/* Security Gate Card */}
        <Card className="border-border/80 bg-card/70 backdrop-blur-xl shadow-2xl overflow-hidden rounded-2xl">
          
          {/* Top Security Banner */}
          <div className="bg-red-500/10 dark:bg-red-950/40 border-b border-red-500/20 px-6 py-3 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span>Restricted System Area</span>
            </div>
            <span className="text-[10px] text-muted-foreground font-mono">AUTH_GATE_v2</span>
          </div>

          <CardHeader className="text-center pt-8 pb-4">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-secondary/80 border border-border/80 flex items-center justify-center mb-3 shadow-inner relative group">
              <ShieldAlert className="w-8 h-8 text-red-500" />
              <div className="absolute inset-0 rounded-2xl bg-red-500/20 blur-md -z-10" />
            </div>

            <CardTitle className="text-2xl font-extrabold tracking-tight">
              Xác thực Quản trị viên
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground pt-1.5 max-w-xs mx-auto">
              Khu vực nhạy cảm được bảo vệ bởi tường lửa &amp; giám sát bảo mật. Vui lòng nhập mật mã quản trị để tiếp tục.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-5 px-6 pb-8">
            
            {/* Error / Lockout Alert Banner */}
            {errorMessage && (
              <div
                className={`p-3.5 rounded-xl border text-xs flex items-start gap-3 animate-in fade-in-50 duration-200 ${
                  lockCountdown !== null
                    ? 'bg-red-500/15 border-red-500/30 text-red-600 dark:text-red-400'
                    : 'bg-amber-500/15 border-amber-500/30 text-amber-700 dark:text-amber-400'
                }`}
              >
                {lockCountdown !== null ? (
                  <Clock className="w-4 h-4 shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                )}
                <div className="space-y-1">
                  <p className="font-semibold leading-relaxed">{errorMessage}</p>
                  {lockCountdown !== null && (
                    <p className="font-mono font-bold text-sm">
                      Mở khóa sau: {formatCountdown(lockCountdown)}
                    </p>
                  )}
                  {attemptsLeft !== null && attemptsLeft > 0 && lockCountdown === null && (
                    <p className="text-[11px] opacity-80">
                      Cảnh báo: Sai {5 - attemptsLeft}/5 lần. Quá số lần cho phép sẽ tạm khóa IP.
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label 
                  htmlFor="admin-password" 
                  className="text-xs font-semibold text-foreground flex items-center justify-between"
                >
                  <span>Mật mã truy cập</span>
                  <span className="text-[10px] text-muted-foreground font-mono">Master Key</span>
                </label>

                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                    <Lock className="w-4 h-4" />
                  </div>

                  <Input
                    id="admin-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Nhập mật khẩu quản trị..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading || lockCountdown !== null}
                    autoFocus
                    required
                    className="pl-10 pr-10 h-11 bg-background/80 border-border/80 text-sm font-medium focus-visible:ring-red-500/30"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading || !password.trim() || lockCountdown !== null}
                className="w-full h-11 font-bold rounded-xl bg-foreground text-background hover:opacity-90 transition-all cursor-pointer shadow-md"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Đang thẩm tra danh tính...</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span>Xác thực &amp; Mở khóa Admin</span>
                  </span>
                )}
              </Button>
            </form>

            {/* Security Notice Footer */}
            <div className="pt-2 border-t border-border/40 text-center space-y-1 text-[11px] text-muted-foreground">
              <p className="flex items-center justify-center gap-1.5 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>HMAC-SHA256 Encrypted Session Cookie</span>
              </p>
              <p className="text-[10px] opacity-70">
                Mọi hành vi xâm nhập trái phép đều được ghi nhận địa chỉ IP và mã thiết bị.
              </p>
            </div>

          </CardContent>
        </Card>

      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen w-full flex items-center justify-center bg-background text-muted-foreground text-xs font-mono">
          <Loader2 className="w-5 h-5 animate-spin mr-2 text-foreground" />
          <span>Khởi tạo cổng bảo mật...</span>
        </div>
      }
    >
      <AdminLoginForm />
    </React.Suspense>
  );
}
