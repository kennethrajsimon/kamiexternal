'use client';

import { useEffect, useState } from 'react';

interface DistortEffectProps {
  children: React.ReactNode;
  enabled?: boolean;
}

export function DistortEffect({ children, enabled = true }: DistortEffectProps) {
  const [isDistorting, setIsDistorting] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    // Random initial delay between 0-5 seconds so images don't distort in sync
    const initialDelay = Math.random() * 5000;
    
    const startDistorting = () => {
      const distortInterval = setInterval(() => {
        setIsDistorting(true);
        
        // Random distortion duration between 700-1100ms
        const distortDuration = 700 + Math.random() * 400;
        
        setTimeout(() => {
          setIsDistorting(false);
        }, distortDuration);
      }, 5000 + Math.random() * 3000); // Random interval between 5-8 seconds

      return distortInterval;
    };

    const initialTimeout = setTimeout(() => {
      const interval = startDistorting();
      return () => clearInterval(interval);
    }, initialDelay);

    return () => clearTimeout(initialTimeout);
  }, [enabled]);

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes distort-wave {
            0% {
              transform: scaleX(1) scaleY(1) skewX(0deg) skewY(0deg);
              filter: hue-rotate(0deg);
            }
            20% {
              transform: scaleX(1.15) scaleY(0.85) skewX(5deg) skewY(2deg);
              filter: hue-rotate(30deg);
            }
            40% {
              transform: scaleX(0.85) scaleY(1.15) skewX(-5deg) skewY(-2deg);
              filter: hue-rotate(-30deg);
            }
            60% {
              transform: scaleX(1.1) scaleY(0.9) skewX(3deg) skewY(3deg);
              filter: hue-rotate(45deg);
            }
            80% {
              transform: scaleX(0.9) scaleY(1.1) skewX(-3deg) skewY(-3deg);
              filter: hue-rotate(-45deg);
            }
            100% {
              transform: scaleX(1) scaleY(1) skewX(0deg) skewY(0deg);
              filter: hue-rotate(0deg);
            }
          }

          @keyframes distort-ripple {
            0% {
              clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
            }
            10% {
              clip-path: polygon(0% 5%, 100% 0%, 100% 95%, 0% 100%);
            }
            20% {
              clip-path: polygon(5% 0%, 95% 5%, 100% 100%, 0% 95%);
            }
            30% {
              clip-path: polygon(0% 10%, 100% 5%, 95% 95%, 5% 100%);
            }
            40% {
              clip-path: polygon(10% 0%, 100% 10%, 90% 100%, 0% 90%);
            }
            50% {
              clip-path: polygon(0% 5%, 95% 0%, 100% 95%, 5% 100%);
            }
            60% {
              clip-path: polygon(5% 10%, 100% 5%, 95% 90%, 0% 95%);
            }
            70% {
              clip-path: polygon(0% 5%, 90% 10%, 100% 95%, 10% 100%);
            }
            80% {
              clip-path: polygon(5% 0%, 100% 5%, 95% 100%, 0% 95%);
            }
            90% {
              clip-path: polygon(0% 2%, 98% 0%, 100% 98%, 2% 100%);
            }
            100% {
              clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
            }
          }

          .distort-wrapper {
            position: relative;
            display: block;
            width: 100%;
            height: 100%;
          }

          .distort-wrapper::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            opacity: 0;
            pointer-events: none;
            z-index: 1;
            background: linear-gradient(45deg, rgba(255, 0, 150, 0.3), rgba(0, 255, 255, 0.3));
            mix-blend-mode: overlay;
          }

          .distort-wrapper.active::before {
            opacity: 1;
            animation: distort-ripple 0.9s ease-in-out;
          }

          .distort-wrapper.active .distort-content {
            animation: distort-wave 0.9s ease-in-out;
          }

          .distort-content {
            position: relative;
            width: 100%;
            height: 100%;
            z-index: 0;
          }
        `
      }} />
      <div className={`distort-wrapper ${isDistorting ? 'active' : ''}`}>
        <div className="distort-content">
          {children}
        </div>
      </div>
    </>
  );
}
