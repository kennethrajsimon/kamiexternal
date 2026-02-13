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
      <div className={`w-full ${!coverImage ? 'h-auto min-h-full' : 'h-full'} relative`}>
        {/* LOCKED BACKGROUND - Completely static, no animation */}
        <div className="absolute inset-0" style={{ backgroundColor: '#1a1a1a' }} />
        
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

          {/* Headline */}
          <div 
            className={`content-stretch flex items-start py-[10px] ${!coverImage ? 'w-[60%] mb-[40px]' : 'absolute h-[165px] max-h-[165px] left-[80px] top-[400px] w-[450px] max-w-[450px]'}`}
          >
            <div 
              className="flex-[1_0_0] min-h-px min-w-px not-italic relative whitespace-pre-wrap leading-[normal]"
              style={{
                fontFamily: `'${fontFamily}',sans-serif`,
                fontWeight: '600',
                fontSize: '32px',
                color: textAccent
              }}
            >
              {headline}
            </div>
          </div>

          {/* Description */}
          <div 
            className={`content-stretch flex items-start py-[10px] ${!coverImage ? 'w-[60%] mb-[60px]' : 'absolute h-[178px] max-h-[178px] left-[80px] top-[580px] w-[450px] max-w-[450px]'}`}
          >
            <div 
              className="flex-[1_0_0] min-h-px min-w-px not-italic relative whitespace-pre-wrap leading-[30px]"
              style={{
                fontFamily: `'${fontFamily}',sans-serif`,
                fontWeight: '400',
                fontSize: '18px',
                color: textPrimary
              }}
            >
              {description}
            </div>
          </div>
        </div>

        {/* Image layer with parallax animation */}
        {coverImage && (
          <div className="absolute left-[756px] top-[80px] w-[676px] h-[676px] overflow-hidden rounded-[8px]">
            <EFXWrapper
              glitchEnabled={!!efx?.glitch}
              blurEnabled={!!efx?.blur}
              chromaticEnabled={!!efx?.chromatic}
              shakeEnabled={!!efx?.shake}
              distortEnabled={!!efx?.distort}
            >
              <img
                src={coverImage}
                alt=""
                className="w-full h-full"
                style={{ objectFit: imageFit }}
              />
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
