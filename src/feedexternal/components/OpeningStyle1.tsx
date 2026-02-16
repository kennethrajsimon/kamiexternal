import React, { useState, useEffect } from 'react';
import { EFXWrapper } from './EFXWrapper';
import { useIsMobileOrTablet } from '../hooks/useMediaQuery';
import { Heart, Send } from 'lucide-react';
import { FlipBoardText } from './FlipBoardText';

interface OpeningStyle1Props {
  title: string;
  topLabel?: string;
  coverImage: string | null;
  imageFit: 'cover' | 'contain' | 'fill';
  author: string;
  headline: string;
  description: string;
  iconCount1: string;
  iconCount2: string;
  onLike?: () => void;
  onShare?: () => void;
  textPrimary?: string;
  textAccent?: string;
  fontFamily?: string;
  efx?: {
    glitch?: boolean;
    blur?: boolean;
    chromatic?: boolean;
    shake?: boolean;
    distort?: boolean;
  };
}

export function OpeningStyle1({
  title,
  topLabel: _topLabel,
  coverImage,
  imageFit = 'cover',
  author,
  headline,
  description,
  iconCount1,
  iconCount2,
  onLike,
  onShare,
  textPrimary = '#f1f0eb',
  textAccent = '#11ff49',
  fontFamily = 'Inter',
  efx
}: OpeningStyle1Props) {
  const [hoveredIcon, setHoveredIcon] = useState<'heart' | 'plane' | null>(null);
  const [activeIcon, setActiveIcon] = useState<'heart' | 'plane' | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const isMobileOrTablet = useIsMobileOrTablet();

  // Handle scroll for mobile animations
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    setScrollY(target.scrollTop);
  };

  // 8-second repeating animation loop
  useEffect(() => {
    // Initial start
    setIsAnimating(true);

    const interval = setInterval(() => {
      // Reset briefly then restart to trigger animation
      setIsAnimating(false);
      setTimeout(() => {
        setIsAnimating(true);
      }, 100);
    }, 8000);

    return () => clearInterval(interval);
  }, []);
  
  

  // Desktop rendering - original 1512px layout
  if (!isMobileOrTablet) {
    return (
      <div className="w-full h-full relative" style={{ backgroundColor: '#1a1a1a' }}>
        
        {/* Text layer with fade animation */}
        <div className={!coverImage ? "flex flex-col px-[80px] pt-[80px]" : ""}>
          {/* Title */}
          <div 
            className={`content-stretch flex items-start py-[10px] ${!coverImage ? 'w-[80%] mb-[80px]' : 'absolute h-[280px] max-h-[280px] left-[80px] top-[80px] w-[600px] max-w-[600px]'}`}
          >
            <div 
              className="flex-[1_0_0] min-h-px min-w-px not-italic relative whitespace-pre-wrap leading-[normal]"
              style={{
                fontFamily: `'${fontFamily}',sans-serif`,
                fontWeight: '300',
                fontSize: '60px',
                color: textPrimary
              }}
            >
              <FlipBoardText
                text={title.replace(/\\n/g, '\n')}
                isAnimating={isAnimating}
                fontFamily={fontFamily}
                fontSize="60px"
                fontWeight="300"
                color={textPrimary}
                lineHeight="normal"
              />
            </div>
          </div>

          <div 
            className={`content-stretch flex flex-col gap-[40px] items-start ${!coverImage ? 'w-[80%] justify-start' : 'absolute h-[370px] max-h-[370px] justify-end left-[80px] top-[401px] w-[600px] max-w-[600px]'}`}
          >
            <p 
              className="h-[18px] leading-[normal] not-italic relative shrink-0 w-full whitespace-pre-wrap"
              style={{
                fontFamily: `'${fontFamily}',sans-serif`,
                fontWeight: '400',
                fontSize: '14px',
                color: textPrimary
              }}
            >
              {author}
            </p>

            <div 
              className="leading-[normal] not-italic relative shrink-0 w-full"
              style={{
                fontFamily: `'${fontFamily}',sans-serif`,
                fontWeight: '400',
                fontSize: '0px',
                color: textPrimary
              }}
            >
              <div className="whitespace-pre-wrap">
                {headline && (
          <p 
            className="mb-[25px]" 
            style={{ 
              fontSize: '23px', 
              fontWeight: '500', 
              color: textAccent, 
              lineHeight: 'normal' 
            }}
          >
            {headline}
          </p>
        )}
        <p 
          className="mb-0" 
          style={{ 
            fontSize: '19px', 
            fontWeight: '300', 
            lineHeight: '25px', 
            color: textPrimary,
            marginBottom: '50px'
          }}
        >
          {description}
        </p>
              </div>
            </div>

            <div className="flex items-center gap-[20px]" style={{ color: textPrimary, pointerEvents: 'auto' }}>
              <div
                className="flex flex-col items-center gap-[6px] cursor-pointer"
                onMouseEnter={() => setHoveredIcon('heart')}
                onMouseLeave={() => {
                  setHoveredIcon(null);
                  setActiveIcon(null);
                }}
                onMouseDown={() => setActiveIcon('heart')}
                onMouseUp={() => setActiveIcon(null)}
                onClick={onLike}
              >
                <Heart
                  size={30}
                  strokeWidth={1.5}
                  color={hoveredIcon === 'heart' || activeIcon === 'heart' ? textAccent : textPrimary}
                  fill={activeIcon === 'heart' ? textAccent : 'none'}
                />
                <div style={{ fontSize: '14px', color: textPrimary }}>
                  {iconCount1}
                </div>
              </div>
              <div
                className="flex flex-col items-center gap-[6px] cursor-pointer"
                style={{ marginLeft: '20px' }}
                onMouseEnter={() => setHoveredIcon('plane')}
                onMouseLeave={() => {
                  setHoveredIcon(null);
                  setActiveIcon(null);
                }}
                onMouseDown={() => setActiveIcon('plane')}
                onMouseUp={() => setActiveIcon(null)}
                onClick={onShare}
              >
                <Send
                  size={30}
                  strokeWidth={1.5}
                  color={hoveredIcon === 'plane' || activeIcon === 'plane' ? textAccent : textPrimary}
                  fill={activeIcon === 'plane' ? textAccent : 'none'}
                />
                <div style={{ fontSize: '14px', color: textPrimary }}>
                  {iconCount2}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Image layer with parallax animation */}
        {coverImage && (
          <div className="absolute left-[calc(50%+16px)] top-[80px] w-[660px] h-[691px] overflow-hidden rounded-[8px]">
            <EFXWrapper
              glitchEnabled={!!efx?.glitch}
              blurEnabled={!!efx?.blur}
              chromaticEnabled={!!efx?.chromatic}
              shakeEnabled={!!efx?.shake}
              distortEnabled={!!efx?.distort}
            >
              {/*
                Fallback placeholder to handle missing images gracefully
              */}
              {(() => {
                const ERROR_IMG_SRC =
                  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==';
                return (
                  <img
                    src={typeof coverImage === 'string' ? coverImage.replace(/^\/src\/assets\//, '/assets/').replace(/^https?:\/\/(?:localhost|127\.0\.0\.1):3001\//, '/') : (coverImage as any)}
                    alt=""
                    className="w-full h-full"
                    style={{ objectFit: imageFit }}
                    onError={(e) => {
                      const target = e.currentTarget as HTMLImageElement;
                      target.src = ERROR_IMG_SRC;
                    }}
                  />
                );
              })()}
            </EFXWrapper>
          </div>
        )}
      </div>
    );
  }

  // Mobile/Tablet rendering (simplified)
  return (
    <div className="w-full h-full flex flex-col p-4 bg-[#1a1a1a] text-white">
       {/* Implementation skipped for brevity, assuming desktop focus for standalone check */}
       <div>Mobile view not fully implemented in standalone component copy</div>
    </div>
  );
}
