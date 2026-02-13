'use client';

import { useState, useEffect, useRef } from 'react';

interface CoverData {
  id: string;
  category: string;
  title: string;
  backgroundText: string;
  backgroundColor: string;
  backgroundTextColor: string;
  heroImage: string;
  heroImage2: string | null;
  backgroundImage: string | null;
  imageFit: 'cover' | 'contain';
  showHeroImage: boolean;
  showBackgroundText: boolean;
  showBackgroundColor: boolean;
  backgroundTextStyle: 'fill' | 'stroke';
  selectedStyle: number;
  iconCount1: string;
  iconCount2: string;
}

interface MobileCoverCarouselProps {
  covers: CoverData[];
  onCoverClick: (coverId: string) => void;
  styles: {
    textPrimary: string;
    textAccent: string;
  };
}

export function MobileCoverCarousel({ covers, onCoverClick, styles }: MobileCoverCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isSwipeUp = distance > minSwipeDistance;
    const isSwipeDown = distance < -minSwipeDistance;

    if (isSwipeUp && currentIndex < covers.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
    if (isSwipeDown && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Auto-scroll to center cover on index change
  useEffect(() => {
    if (containerRef.current) {
      const coverHeight = containerRef.current.clientHeight;
      containerRef.current.scrollTo({
        top: currentIndex * coverHeight,
        behavior: 'smooth'
      });
    }
  }, [currentIndex]);

  const getCoverScale = (index: number) => {
    if (index === currentIndex) return 1;
    if (index === currentIndex - 1 || index === currentIndex + 1) return 0.9;
    return 0.85;
  };

  const getCoverOpacity = (index: number) => {
    if (index === currentIndex) return 1;
    if (index === currentIndex - 1 || index === currentIndex + 1) return 0.6;
    return 0.3;
  };

  return (
    <div className="relative w-full h-full overflow-hidden" style={{ paddingBottom: '80px' }}>
      {/* Scrollable Cover Container */}
      <div
        ref={containerRef}
        className="w-full h-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        {covers.map((cover, index) => {
          const isCenter = index === currentIndex;
          const scale = getCoverScale(index);
          const opacity = getCoverOpacity(index);

          return (
            <div
              key={cover.id}
              className="w-full h-full snap-center flex items-center justify-center"
              style={{
                minHeight: '100dvh'
              }}
            >
              {/* Cover Card */}
              <div
                className="relative w-full transition-all duration-500 ease-out cursor-pointer overflow-hidden"
                style={{
                  height: '100%',
                  transform: `scale(${scale})`,
                  opacity: opacity,
                  borderRadius: isCenter ? '0px' : '24px'
                }}
                onClick={() => isCenter && onCoverClick(cover.id)}
              >
                {/* Background Color Layer */}
                {cover.showBackgroundColor && (
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundColor: cover.backgroundColor
                    }}
                  />
                )}

                {/* Background Image - For all styles */}
                {cover.backgroundImage && (
                  <img
                    src={cover.backgroundImage}
                    alt=""
                    className="absolute inset-0 w-full h-full"
                    style={{
                      objectFit: 'cover',
                      objectPosition: 'center'
                    }}
                  />
                )}

                {/* Background Text - Large text behind hero image */}
                {cover.showBackgroundText && (cover.selectedStyle === 1 || cover.selectedStyle === 2) && (
                  <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
                    <p
                      className="font-medium leading-none not-italic text-center whitespace-nowrap"
                      style={{
                        fontFamily: `'Humane 2.0', sans-serif`,
                        fontSize: '860px',
                        color: cover.backgroundTextColor,
                        WebkitTextStroke: cover.backgroundTextStyle === 'stroke' ? `2px ${cover.backgroundTextColor}` : 'none',
                        WebkitTextFillColor: cover.backgroundTextStyle === 'stroke' ? 'transparent' : cover.backgroundTextColor,
                        letterSpacing: '-0.02em',
                        opacity: 1
                      }}
                    >
                      {cover.backgroundText}
                    </p>
                  </div>
                )}

                {/* Hero Image - Large centered image */}
                {cover.showHeroImage && cover.heroImage && (cover.selectedStyle === 1 || cover.selectedStyle === 2 || cover.selectedStyle === 3) && (
                  <div className="absolute inset-0 flex items-center justify-center p-4">
                    <img
                      src={cover.heroImage}
                      alt={cover.title}
                      className="w-full h-full"
                      style={{
                        objectFit: cover.imageFit,
                        objectPosition: 'center'
                      }}
                    />
                  </div>
                )}

                {/* Two Logos for Announcement (Style 4) */}
                {cover.selectedStyle === 4 && (
                  <div className="absolute inset-0 flex items-center justify-center gap-8 p-8">
                    {cover.heroImage && (
                      <div className="flex-1 flex items-center justify-center">
                        <img
                          src={cover.heroImage}
                          alt="Logo 1"
                          className="max-w-full max-h-full"
                          style={{
                            objectFit: 'contain',
                            objectPosition: 'center',
                            maxWidth: '140px',
                            maxHeight: '140px'
                          }}
                        />
                      </div>
                    )}
                    {cover.heroImage2 && (
                      <div className="flex-1 flex items-center justify-center">
                        <img
                          src={cover.heroImage2}
                          alt="Logo 2"
                          className="max-w-full max-h-full"
                          style={{
                            objectFit: 'contain',
                            objectPosition: 'center',
                            maxWidth: '140px',
                            maxHeight: '140px'
                          }}
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Bottom Overlay - Text and Icons */}
                <div 
                  className="absolute bottom-0 left-0 right-0 p-6"
                  style={{
                    paddingBottom: 'calc(80px + env(safe-area-inset-bottom, 0px))' // Space for nav bar (60px) + safe area
                  }}
                >
                  {/* Gradient overlay for readability */}
                  <div 
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)'
                    }}
                  />

                  {/* Content */}
                  <div className="relative z-10 space-y-1">
                    {/* Category */}
                    <div className="block">
                      <p
                        className="font-['Inter:Medium',sans-serif] font-medium uppercase tracking-[1.3px] px-3 py-1.5 rounded inline-block"
                        style={{
                          fontSize: '11px',
                          color: styles.textAccent,
                          backgroundColor: 'rgba(26, 26, 26, 0.6)'
                        }}
                      >
                        {cover.category}
                      </p>
                    </div>

                    {/* Title */}
                    <div className="block">
                      <h2
                        className="font-['Inter:Regular',sans-serif] font-normal uppercase leading-tight px-3 py-1.5 inline-block"
                        style={{
                          fontSize: '25px',
                          color: styles.textPrimary,
                          backgroundColor: 'rgba(26, 26, 26, 0.65)'
                        }}
                      >
                        {cover.title}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>

              {/* Center Indicator */}
              {isCenter && (
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1.5">
                    {covers.map((_, i) => (
                      <div
                        key={i}
                        className="transition-all duration-300"
                        style={{
                          width: i === currentIndex ? '24px' : '6px',
                          height: '6px',
                          borderRadius: '3px',
                          backgroundColor: i === currentIndex ? styles.textAccent : 'rgba(241, 240, 235, 0.3)'
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Tap to Read Hint */}
      <div 
        className="absolute left-1/2 -translate-x-1/2 pointer-events-none animate-pulse"
        style={{
          bottom: '120px',
          opacity: currentIndex === 0 ? 1 : 0,
          transition: 'opacity 0.5s ease-out'
        }}
      >
        <p
          className="font-['Inter:Medium',sans-serif] font-medium tracking-wider uppercase px-6 py-3 rounded-full"
          style={{
            fontSize: '12px',
            color: styles.textAccent,
            backgroundColor: 'rgba(26, 26, 26, 0.8)',
            border: `1px solid ${styles.textAccent}`,
            letterSpacing: '1.5px'
          }}
        >
          TAP TO READ
        </p>
      </div>

      {/* Hide scrollbar */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
