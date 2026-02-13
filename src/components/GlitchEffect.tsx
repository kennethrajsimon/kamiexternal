'use client';

import { useEffect, useState } from 'react';

interface GlitchEffectProps {
  children: React.ReactNode;
  enabled?: boolean;
}

export function GlitchEffect({ children, enabled = true }: GlitchEffectProps) {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    // Random initial delay between 0-5 seconds so images don't glitch in sync
    const initialDelay = Math.random() * 5000;
    
    const startGlitching = () => {
      const glitchInterval = setInterval(() => {
        setIsGlitching(true);
        
        // Random glitch duration between 150-250ms
        const glitchDuration = 150 + Math.random() * 100;
        
        setTimeout(() => {
          setIsGlitching(false);
        }, glitchDuration);
      }, 5000 + Math.random() * 3000); // Random interval between 5-8 seconds

      return glitchInterval;
    };

    const initialTimeout = setTimeout(() => {
      const interval = startGlitching();
      return () => clearInterval(interval);
    }, initialDelay);

    return () => clearTimeout(initialTimeout);
  }, [enabled]);

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes glitch-skew {
            0% {
              transform: skew(0deg, 0deg);
            }
            10% {
              transform: skew(-2deg, 1deg);
            }
            20% {
              transform: skew(1deg, -1deg);
            }
            30% {
              transform: skew(-1deg, 2deg);
            }
            40% {
              transform: skew(2deg, -1deg);
            }
            50% {
              transform: skew(-1deg, 1deg);
            }
            60% {
              transform: skew(1deg, -2deg);
            }
            70% {
              transform: skew(-2deg, 1deg);
            }
            80% {
              transform: skew(1deg, 1deg);
            }
            90% {
              transform: skew(-1deg, -1deg);
            }
            100% {
              transform: skew(0deg, 0deg);
            }
          }

          @keyframes glitch-rgb {
            0% {
              filter: hue-rotate(0deg) saturate(100%);
            }
            14% {
              filter: hue-rotate(180deg) saturate(150%);
            }
            28% {
              filter: hue-rotate(-90deg) saturate(200%);
            }
            42% {
              filter: hue-rotate(90deg) saturate(150%);
            }
            56% {
              filter: hue-rotate(-180deg) saturate(100%);
            }
            70% {
              filter: hue-rotate(45deg) saturate(175%);
            }
            84% {
              filter: hue-rotate(-45deg) saturate(125%);
            }
            100% {
              filter: hue-rotate(0deg) saturate(100%);
            }
          }

          .glitch-wrapper {
            position: relative;
            display: block;
            width: 100%;
            height: 100%;
          }

          .glitch-wrapper.active {
            animation: glitch-skew 0.2s ease-in-out;
          }

          .glitch-wrapper.active .glitch-content {
            animation: glitch-rgb 0.2s steps(4, end);
          }

          .glitch-wrapper::before,
          .glitch-wrapper::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            opacity: 0;
            pointer-events: none;
            z-index: 1;
          }

          .glitch-wrapper.active::before {
            opacity: 0.7;
            background: rgba(255, 0, 255, 0.3);
            mix-blend-mode: screen;
            animation: glitch-flicker-1 0.2s steps(3, end);
          }

          .glitch-wrapper.active::after {
            opacity: 0.7;
            background: rgba(0, 255, 255, 0.3);
            mix-blend-mode: screen;
            animation: glitch-flicker-2 0.2s steps(3, end);
          }

          @keyframes glitch-flicker-1 {
            0% {
              clip-path: inset(40% 0 61% 0);
              transform: translate(-3px, 3px);
            }
            20% {
              clip-path: inset(92% 0 1% 0);
              transform: translate(3px, -3px);
            }
            40% {
              clip-path: inset(43% 0 1% 0);
              transform: translate(-3px, 3px);
            }
            60% {
              clip-path: inset(25% 0 58% 0);
              transform: translate(3px, -3px);
            }
            80% {
              clip-path: inset(54% 0 7% 0);
              transform: translate(-3px, 3px);
            }
            100% {
              clip-path: inset(58% 0 43% 0);
              transform: translate(0);
            }
          }

          @keyframes glitch-flicker-2 {
            0% {
              clip-path: inset(65% 0 15% 0);
              transform: translate(3px, -3px);
            }
            20% {
              clip-path: inset(45% 0 40% 0);
              transform: translate(-3px, 3px);
            }
            40% {
              clip-path: inset(14% 0 80% 0);
              transform: translate(3px, -3px);
            }
            60% {
              clip-path: inset(80% 0 5% 0);
              transform: translate(-3px, 3px);
            }
            80% {
              clip-path: inset(12% 0 70% 0);
              transform: translate(3px, -3px);
            }
            100% {
              clip-path: inset(26% 0 60% 0);
              transform: translate(0);
            }
          }

          .glitch-content {
            position: relative;
            width: 100%;
            height: 100%;
            z-index: 0;
          }
        `
      }} />
      <div className={`glitch-wrapper ${isGlitching ? 'active' : ''}`}>
        <div className="glitch-content">
          {children}
        </div>
      </div>
    </>
  );
}
