'use client';

import { useEffect, useState } from 'react';

interface ChromaticEffectProps {
  children: React.ReactNode;
  enabled?: boolean;
}

export function ChromaticEffect({ children, enabled = true }: ChromaticEffectProps) {
  const [isAberrating, setIsAberrating] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    // Random initial delay between 0-5 seconds so images don't aberrate in sync
    const initialDelay = Math.random() * 5000;
    
    const startAberrating = () => {
      const aberrateInterval = setInterval(() => {
        setIsAberrating(true);
        
        // Random aberration duration between 600-1000ms
        const aberrateDuration = 600 + Math.random() * 400;
        
        setTimeout(() => {
          setIsAberrating(false);
        }, aberrateDuration);
      }, 5000 + Math.random() * 3000); // Random interval between 5-8 seconds

      return aberrateInterval;
    };

    const initialTimeout = setTimeout(() => {
      const interval = startAberrating();
      return () => clearInterval(interval);
    }, initialDelay);

    return () => clearTimeout(initialTimeout);
  }, [enabled]);

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes chromatic-split {
            0% {
              filter: contrast(100%) saturate(100%);
            }
            20% {
              filter: contrast(130%) saturate(180%);
            }
            40% {
              filter: contrast(110%) saturate(150%);
            }
            60% {
              filter: contrast(140%) saturate(200%);
            }
            80% {
              filter: contrast(120%) saturate(160%);
            }
            100% {
              filter: contrast(100%) saturate(100%);
            }
          }

          .chromatic-wrapper {
            position: relative;
            display: block;
            width: 100%;
            height: 100%;
          }

          .chromatic-wrapper::before,
          .chromatic-wrapper::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            opacity: 0;
            pointer-events: none;
            z-index: 1;
            mix-blend-mode: screen;
          }

          .chromatic-wrapper.active::before {
            opacity: 0.6;
            background: linear-gradient(90deg, rgba(255, 0, 0, 0.5) 0%, transparent 50%, rgba(0, 0, 255, 0.5) 100%);
            animation: chromatic-shift-1 0.7s ease-in-out;
          }

          .chromatic-wrapper.active::after {
            opacity: 0.6;
            background: linear-gradient(180deg, rgba(0, 255, 0, 0.5) 0%, transparent 50%, rgba(255, 0, 255, 0.5) 100%);
            animation: chromatic-shift-2 0.7s ease-in-out;
          }

          @keyframes chromatic-shift-1 {
            0% {
              transform: translate(0, 0);
            }
            25% {
              transform: translate(-4px, 0);
            }
            50% {
              transform: translate(4px, 0);
            }
            75% {
              transform: translate(-2px, 0);
            }
            100% {
              transform: translate(0, 0);
            }
          }

          @keyframes chromatic-shift-2 {
            0% {
              transform: translate(0, 0);
            }
            25% {
              transform: translate(0, -4px);
            }
            50% {
              transform: translate(0, 4px);
            }
            75% {
              transform: translate(0, -2px);
            }
            100% {
              transform: translate(0, 0);
            }
          }

          .chromatic-wrapper.active .chromatic-content {
            animation: chromatic-split 0.7s ease-in-out;
          }

          .chromatic-content {
            position: relative;
            width: 100%;
            height: 100%;
            z-index: 0;
          }
        `
      }} />
      <div className={`chromatic-wrapper ${isAberrating ? 'active' : ''}`}>
        <div className="chromatic-content">
          {children}
        </div>
      </div>
    </>
  );
}
