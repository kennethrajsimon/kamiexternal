'use client';

import { useEffect, useState } from 'react';

interface ShakeEffectProps {
  children: React.ReactNode;
  enabled?: boolean;
}

export function ShakeEffect({ children, enabled = true }: ShakeEffectProps) {
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    // Random initial delay between 0-5 seconds so images don't shake in sync
    const initialDelay = Math.random() * 5000;
    
    const startShaking = () => {
      const shakeInterval = setInterval(() => {
        setIsShaking(true);
        
        // Random shake duration between 300-500ms (shorter, more intense)
        const shakeDuration = 300 + Math.random() * 200;
        
        setTimeout(() => {
          setIsShaking(false);
        }, shakeDuration);
      }, 5000 + Math.random() * 3000); // Random interval between 5-8 seconds

      return shakeInterval;
    };

    const initialTimeout = setTimeout(() => {
      const interval = startShaking();
      return () => clearInterval(interval);
    }, initialDelay);

    return () => clearTimeout(initialTimeout);
  }, [enabled]);

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes shake-violent {
            0%, 100% { transform: translate(0, 0) rotate(0deg); }
            10% { transform: translate(-8px, 2px) rotate(-2deg); }
            20% { transform: translate(8px, -3px) rotate(2deg); }
            30% { transform: translate(-6px, 4px) rotate(-1deg); }
            40% { transform: translate(7px, -2px) rotate(1deg); }
            50% { transform: translate(-9px, 3px) rotate(-2deg); }
            60% { transform: translate(6px, -4px) rotate(2deg); }
            70% { transform: translate(-7px, 2px) rotate(-1deg); }
            80% { transform: translate(5px, -3px) rotate(1deg); }
            90% { transform: translate(-4px, 4px) rotate(-1deg); }
          }

          @keyframes shake-intensity {
            0%, 100% { 
              transform: translate(0, 0) rotate(0deg) scale(1);
              filter: blur(0px);
            }
            10% { 
              transform: translate(-6px, 3px) rotate(-1.5deg) scale(1.02);
              filter: blur(1px);
            }
            20% { 
              transform: translate(7px, -4px) rotate(1.5deg) scale(0.98);
              filter: blur(2px);
            }
            30% { 
              transform: translate(-5px, 2px) rotate(-1deg) scale(1.01);
              filter: blur(1px);
            }
            40% { 
              transform: translate(6px, -3px) rotate(1deg) scale(0.99);
              filter: blur(1.5px);
            }
            50% { 
              transform: translate(-7px, 4px) rotate(-1.5deg) scale(1.02);
              filter: blur(2px);
            }
            60% { 
              transform: translate(5px, -2px) rotate(1.5deg) scale(0.98);
              filter: blur(1px);
            }
            70% { 
              transform: translate(-6px, 3px) rotate(-1deg) scale(1.01);
              filter: blur(1.5px);
            }
            80% { 
              transform: translate(4px, -3px) rotate(1deg) scale(0.99);
              filter: blur(1px);
            }
            90% { 
              transform: translate(-3px, 2px) rotate(-0.5deg) scale(1.01);
              filter: blur(0.5px);
            }
          }

          .shake-wrapper {
            position: relative;
            display: block;
            width: 100%;
            height: 100%;
          }

          .shake-wrapper.active .shake-content {
            animation: shake-intensity 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97);
          }

          .shake-content {
            position: relative;
            width: 100%;
            height: 100%;
            z-index: 0;
          }
        `
      }} />
      <div className={`shake-wrapper ${isShaking ? 'active' : ''}`}>
        <div className="shake-content">
          {children}
        </div>
      </div>
    </>
  );
}
