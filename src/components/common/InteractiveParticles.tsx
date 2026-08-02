import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  angle: number;
  spin: number;
}

const COLORS = [
  '#4285F4', // Google Blue
  '#EA4335', // Google Red
  '#FBBC05', // Google Yellow
  '#34A853', // Google Green
  '#8AB4F8', // Soft Cyan
  '#C58AF9', // Soft Purple
];

export default function InteractiveParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let isTabVisible = true;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = {
      x: -1000,
      y: -1000,
      radius: 140,
      radiusSq: 140 * 140,
    };

    // Mobile vs Desktop particle density optimization
    const isMobile = width < 768;
    const maxCount = isMobile ? 35 : 65;
    const count = Math.min(Math.floor((width * height) / 14000), maxCount);
    const particles: Particle[] = [];

    const initParticles = () => {
      particles.length = 0;
      for (let i = 0; i < count; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        particles.push({
          x,
          y,
          originX: x,
          originY: y,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          size: Math.random() * 3 + 2,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          alpha: Math.random() * 0.5 + 0.2,
          angle: Math.random() * Math.PI * 2,
          spin: (Math.random() - 0.5) * 0.03,
        });
      }
    };

    initParticles();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
      }
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (isTabVisible) {
        render();
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const render = () => {
      if (!isTabVisible) return;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Drift naturally
        p.originX += p.vx;
        p.originY += p.vy;
        p.angle += p.spin;

        // Wrap boundaries
        if (p.originX < 0) p.originX = width;
        if (p.originX > width) p.originX = 0;
        if (p.originY < 0) p.originY = height;
        if (p.originY > height) p.originY = 0;

        // Fast squared distance check to cursor
        if (mouse.x > 0) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < mouse.radiusSq && distSq > 0) {
            const dist = Math.sqrt(distSq);
            const force = (mouse.radius - dist) / mouse.radius;
            p.x -= (dx / dist) * force * 7;
            p.y -= (dy / dist) * force * 7;
          } else {
            p.x += (p.originX - p.x) * 0.05;
            p.y += (p.originY - p.y) * 0.05;
          }
        } else {
          p.x += (p.originX - p.x) * 0.05;
          p.y += (p.originY - p.y) * 0.05;
        }

        // Fast canvas drawing
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        if (i % 3 === 0) {
          ctx.ellipse(p.x, p.y, p.size * 1.4, p.size * 0.8, p.angle, 0, Math.PI * 2);
        } else {
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        }
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[1] opacity-85 transition-opacity duration-500"
    />
  );
}
