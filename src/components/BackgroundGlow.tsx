'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './BackgroundGlow.module.css';

export default function BackgroundGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window === 'undefined') return;
    const isMobile = window.matchMedia('(pointer: coarse)').matches;
    if (isMobile) return;

    const glow = glowRef.current;
    if (!glow) return;

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY + window.scrollY; // Include page scroll height
    };

    const updatePosition = () => {
      currentX += (mouseX - currentX) * 0.05; // Slightly slower lerp for soft, organic movement
      currentY += (mouseY - currentY) * 0.05;

      if (glow) {
        // Centered translate
        glow.style.transform = `translate3d(${currentX - 300}px, ${currentY - 300}px, 0)`;
      }

      requestAnimationFrame(updatePosition);
    };

    window.addEventListener('mousemove', onMouseMove);
    const animId = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  if (!mounted) return null;

  return <div ref={glowRef} className={styles.globalGlow} />;
}
