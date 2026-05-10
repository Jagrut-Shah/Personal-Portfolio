'use client';

import { ReactNode, useRef, useState, ElementType } from 'react';
import styles from './SpotlightCard.module.css';

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  [key: string]: any; // Allow other props like href, target, etc.
}

export default function SpotlightCard({ children, className = '', as: Component = 'div', ...props }: SpotlightCardProps) {
  const divRef = useRef<HTMLElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!divRef.current || isFocused) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <Component
      ref={divRef as any}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`${styles.cardWrapper} ${className}`}
      {...props}
    >
      <div
        className={styles.spotlight}
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(var(--foreground-rgb), 0.08), transparent 40%)`,
        }}
      />
      <div className={styles.content}>
        {children}
      </div>
    </Component>
  );
}
