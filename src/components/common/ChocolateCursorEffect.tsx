import React, { useEffect, useRef, useState } from 'react';

interface TouchRipple {
  id: number;
  x: number;
  y: number;
}

export const ChocolateCursorEffect: React.FC = () => {
  const glowRef = useRef<HTMLDivElement>(null);
  const [ripples, setRipples] = useState<TouchRipple[]>([]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    let rafId: number | null = null;
    let rippleCounter = 0;

    const handlePointerMove = (e: PointerEvent) => {
      if (rafId !== null) return;
      const clientX = e.clientX;
      const clientY = e.clientY;
      rafId = window.requestAnimationFrame(() => {
        if (glowRef.current) {
          glowRef.current.style.transform = `translate3d(${clientX - 70}px, ${clientY - 70}px, 0)`;
          glowRef.current.style.opacity = '1';
        }
        rafId = null;
      });
    };

    const handlePointerDown = (e: PointerEvent) => {
      const id = ++rippleCounter;
      setRipples((prev) => [...prev.slice(-3), { id, x: e.clientX, y: e.clientY }]);
      window.setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 650);
    };

    const handlePointerLeave = () => {
      if (glowRef.current) {
        glowRef.current.style.opacity = '0';
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerleave', handlePointerLeave);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
      aria-hidden="true"
    >
      {/* Ultra-lightweight GPU-composited soft caramel-cocoa smudge following pointer */}
      <div
        ref={glowRef}
        className="fixed top-0 left-0 w-[140px] h-[140px] rounded-full opacity-0 transition-opacity duration-300 pointer-events-none will-change-transform"
        style={{
          background:
            'radial-gradient(circle, rgba(201, 156, 118, 0.22) 0%, rgba(216, 187, 177, 0.12) 45%, transparent 72%)',
          filter: 'blur(18px)',
        }}
      />

      {/* Lightweight CSS-transitioned touch/click ripples */}
      {ripples.map((r) => (
        <span
          key={r.id}
          className="fixed rounded-full pointer-events-none animate-ping"
          style={{
            left: `${r.x - 18}px`,
            top: `${r.y - 18}px`,
            width: '36px',
            height: '36px',
            backgroundColor: 'rgba(201, 156, 118, 0.22)',
            border: '1px solid rgba(136, 81, 55, 0.25)',
            animationDuration: '650ms',
          }}
        />
      ))}
    </div>
  );
};
