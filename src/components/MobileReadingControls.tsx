'use client';

import { ArrowLeft } from 'lucide-react';

interface MobileReadingControlsProps {
  onClose: () => void;
  onBackToCover: () => void;
  onBackToLanding?: () => void;
  onPropertiesClick?: () => void;
  scrollProgress: number;
  topLabel?: string;
  styles: {
    textPrimary: string;
    textAccent: string;
  };
}

export function MobileReadingControls({
  onClose,
  onBackToCover,
  onBackToLanding,
  onPropertiesClick,
  scrollProgress,
  topLabel,
  styles
}: MobileReadingControlsProps) {
  return (
    <>
      {/* Top Controls Bar - ALWAYS VISIBLE - Fixed 375px width, centered and scaled */}
      <div
        className="absolute z-50"
        style={{
          top: '0',
          left: 'calc(50% - 0.5px)',
          width: '375px',
          transform: `translateX(-50%) scale(${typeof window !== 'undefined' ? window.innerWidth / 375 : 1})`,
          transformOrigin: 'top center',
          background: 'linear-gradient(to bottom, rgba(26, 26, 26, 0.95) 0%, rgba(26, 26, 26, 0.8) 70%, transparent 100%)',
          paddingTop: 'env(safe-area-inset-top, 0px)' // iOS safe area
        }}
      >
        <div className="flex items-center justify-between px-[19px] py-[16px]">
          {/* Left Side - Back to Cover */}
          <button
            onClick={onBackToCover}
            className="flex items-center gap-[6px] px-[10px] py-[8px] rounded-lg transition-all active:scale-95"
            style={{
              backgroundColor: 'rgba(42, 42, 42, 0.9)',
              border: '1px solid #3a3a3a',
              color: styles.textPrimary
            }}
          >
            <ArrowLeft size={16} strokeWidth={2} />
            <span className="text-[12px] font-semibold">Cover</span>
          </button>

          {/* Center - Top Label (if available) */}
          {topLabel && (
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-[10px] py-[6px] rounded"
              style={{
                backgroundColor: 'rgba(17, 255, 73, 0.1)',
                border: `1px solid ${styles.textAccent}`
              }}
            >
              <p
                className="font-['Inter:Medium',sans-serif] font-medium text-[9px] tracking-wider uppercase"
                style={{
                  color: styles.textAccent,
                  letterSpacing: '0.8px'
                }}
              >
                {topLabel}
              </p>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div
          className="h-[2px] w-full"
          style={{ backgroundColor: 'rgba(42, 42, 42, 0.5)' }}
        >
          <div
            className="h-full transition-all duration-100"
            style={{
              width: `${scrollProgress * 100}%`,
              backgroundColor: styles.textAccent
            }}
          />
        </div>
      </div>
    </>
  );
}