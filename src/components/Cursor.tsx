'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Cursor.module.css';

export default function Cursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const [isHidden, setIsHidden] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    // Only apply custom cursor on desktop devices with fine pointer precision
    if (typeof window === 'undefined') return;
    const isMobile = window.matchMedia('(pointer: coarse)').matches;
    if (isMobile) return;

    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setIsHidden(false);

      if (dot) {
        dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      // Check if hovering over any interactive elements
      const target = e.target as HTMLElement;
      if (target) {
        const interactive = target.closest('a, button, [role="button"], input, select, textarea, [data-cursor="expand"]');
        setIsHovered(!!interactive);
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsHidden(true);
    const onMouseEnter = () => setIsHidden(false);

    // Smooth ring transition using linear interpolation
    let animationFrameId: number;
    const renderRing = () => {
      // Linear interpolation factor (0.35 for fast, highly responsive follow effect)
      const lerp = 0.35;
      ringX += (mouseX - ringX) * lerp;
      ringY += (mouseY - ringY) * lerp;

      if (ring) {
        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(renderRing);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    animationFrameId = requestAnimationFrame(renderRing);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorDotRef}
        className={`${styles.cursorDot} ${isHidden ? styles.hidden : ''} ${
          isHovered ? styles.hoveredDot : ''
        }`}
      />
      <div
        ref={cursorRingRef}
        className={`${styles.cursorRing} ${isHidden ? styles.hidden : ''} ${
          isHovered ? styles.hoveredRing : ''
        } ${isClicking ? styles.clickingRing : ''}`}
      />
    </>
  );
}
