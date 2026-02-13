'use client';

import { useEffect, useState } from 'react';

interface BlurEffectProps {
  children: React.ReactNode;
  enabled?: boolean;
}

export function BlurEffect({ children, enabled = true }: BlurEffectProps) {
  const [isBlurring, setIsBlurring] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    // Random initial delay between 0-5 seconds so images don't blur in sync
    const initialDelay = Math.random() * 5000;
    
    const startBlurring = () => {
      const blurInterval = setInterval(() => {
        setIsBlurring(true);
        
        // Random blur duration between 800-1200ms
        const blurDuration = 800 + Math.random() * 400;
        
        setTimeout(() => {
          setIsBlurring(false);
        }, blurDuration);
      }, 5000 + Math.random() * 3000); // Random interval between 5-8 seconds

      return blurInterval;
    };

    const initialTimeout = setTimeout(() => {
      const interval = startBlurring();
      return () => clearInterval(interval);
    }, initialDelay);

    return () => clearTimeout(initialTimeout);
  }, [enabled]);

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes blur-pulse {
            0% {
              filter: blur(0px);
            }
            50% {
              filter: blur(12px);
            }
            100% {
              filter: blur(0px);
            }
          }

          @keyframes blur-focus {
            0% {
              filter: blur(0px) brightness(100%);
            }
            25% {
              filter: blur(8px) brightness(80%);
            }
            50% {
              filter: blur(16px) brightness(60%);
            }
            75% {
              filter: blur(8px) brightness(80%);
            }
            100% {
              filter: blur(0px) brightness(100%);
            }
          }

          .blur-wrapper {
            position: relative;
            display: block;
            width: 100%;
            height: 100%;
          }

          .blur-wrapper.active .blur-content {
            animation: blur-focus 1s ease-in-out;
          }

          .blur-content {
            position: relative;
            width: 100%;
            height: 100%;
            z-index: 0;
          }
        `
      }} />
      <div className={`blur-wrapper ${isBlurring ? 'active' : ''}`}>
        <div className="blur-content">
          {children}
        </div>
      </div>
    </>
  );
}
