import React, { useState, useEffect } from 'react';
import { EFXWrapper } from './EFXWrapper';
import { useIsMobileOrTablet } from '../hooks/useMediaQuery';
import { Heart, Send } from 'lucide-react';
import { FlipBoardText } from './FlipBoardText';
import { ProductCarousel } from './ProductCarousel';
import { getProductSets } from '../services/api';

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
  hasFeaturedProducts?: boolean;
  productSetId?: string;
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
  efx,
  hasFeaturedProducts,
  productSetId
}: OpeningStyle1Props) {
  const [hoveredIcon, setHoveredIcon] = useState<'heart' | 'plane' | null>(null);
  const [activeIcon, setActiveIcon] = useState<'heart' | 'plane' | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const isMobileOrTablet = useIsMobileOrTablet();

  // Handle scroll for mobile animations
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    setScrollY(target.scrollTop);
  };

  useEffect(() => {
    if (hasFeaturedProducts && productSetId) {
      getProductSets().then(sets => {
        const set = sets.find((s: any) => s.id === productSetId);
        if (set) {
          setProducts(set.products || []);
        }
      }).catch(err => console.error('Failed to load product set', err));
    } else {
      setProducts([]);
    }
  }, [hasFeaturedProducts, productSetId]);

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

          {/* Bottom Content */}
          <div 
            className={`content-stretch flex flex-col gap-[40px] items-start ${!coverImage ? 'w-[80%] justify-start' : 'absolute h-[370px] max-h-[370px] justify-end left-[80px] top-[401px] w-[600px] max-w-[600px]'}`}
          >
            {/* Author */}
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
            
            {/* Headline and Description */}
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
            marginBottom: 0,
            whiteSpace: 'pre-wrap'
          }}
        >
          {description}
        </p>
              </div>

              {/* Spacer for Gap */}
              <div style={{ height: '50px', width: '100%', flexShrink: 0 }}></div>

              {/* Social Icons */}
              <div 
                className="flex items-center gap-[28px]"
                style={{ color: textPrimary, pointerEvents: 'auto' }}
              >
                <div
                  className="flex flex-col items-center gap-[6px]"
                  onMouseEnter={() => setHoveredIcon('heart')}
                  onMouseLeave={() => {
                    setHoveredIcon(null);
                    setActiveIcon(null);
                  }}
                  onMouseDown={() => setActiveIcon('heart')}
                  onMouseUp={() => setActiveIcon(null)}
                >
                  <Heart
                    size={24}
                    fill={activeIcon === 'heart' ? textPrimary : 'none'}
                    strokeWidth={1.5}
                    className="transition-transform duration-200"
                    style={{ transform: hoveredIcon === 'heart' ? 'scale(1.1)' : 'scale(1)' }}
                  />
                  <span style={{ fontSize: '12px', fontWeight: '400' }}>{iconCount1}</span>
                </div>
                <div
                  className="flex flex-col items-center gap-[6px]"
                  onMouseEnter={() => setHoveredIcon('plane')}
                  onMouseLeave={() => {
                    setHoveredIcon(null);
                    setActiveIcon(null);
                  }}
                  onMouseDown={() => setActiveIcon('plane')}
                  onMouseUp={() => setActiveIcon(null)}
                >
                  <Send
                    size={24}
                    strokeWidth={1.5}
                    className="transition-transform duration-200"
                    style={{ transform: hoveredIcon === 'plane' ? 'scale(1.1)' : 'scale(1)' }}
                  />
                  <span style={{ fontSize: '12px', fontWeight: '400' }}>{iconCount2}</span>
                </div>
              </div>
            </div>
            
          </div>
        </div>

        {/* Image layer with parallax animation */}
        <div>
          <div 
            className="absolute content-stretch flex items-start justify-end left-[calc(50%+16px)] top-[80px] w-[660px]"
          >
            <div className="h-[691px] relative shrink-0 w-[664px]">
              <div className="absolute inset-0" style={{ overflow: 'hidden', borderRadius: '3px' }}>
                {coverImage && (
                  <EFXWrapper
                    glitchEnabled={!!efx?.glitch}
                    blurEnabled={!!efx?.blur}
                    chromaticEnabled={!!efx?.chromatic}
                    shakeEnabled={!!efx?.shake}
                    distortEnabled={!!efx?.distort}
                  >
                    <div className="relative w-full h-full">
                      <img 
                        alt="Cover" 
                        className="absolute h-[104.84%] left-[11.44%] max-w-none top-[0.09%] w-[88.49%]" 
                        src={coverImage}
                        style={{ objectFit: imageFit }}
                      />
                    </div>
                  </EFXWrapper>
                )}
              </div>
            </div>
          </div>
        </div>

          {/* Product Carousel - Desktop */}
          {hasFeaturedProducts && products.length > 0 && (
             <div className="absolute w-full bottom-[40px] px-[80px]" style={{ pointerEvents: 'auto', zIndex: 50 }}>
               <ProductCarousel products={products} />
             </div>
          )}
      </div>
    );
  }

  // Mobile/Tablet rendering - with scroll animations
  // Calculate scroll-based animation values
  const scrollProgress = Math.min(scrollY / 300, 1); // Normalize to 0-1 over 300px scroll (reduced for earlier trigger)
  
  // Headline animation (earlier in scroll)
  const headlineEnterStart = 0;
  const headlineEnterEnd = 0.25;
  const headlineExitStart = 0.5;
  const headlineExitEnd = 0.85;
  
  let headlineOpacity = 1;
  let headlineY = 0;
  let headlineScale = 1;
  let headlineBlur = 0;
  
  if (scrollProgress < headlineEnterStart) {
    headlineOpacity = 1;
    headlineY = 0;
    headlineScale = 1;
    headlineBlur = 0;
  } else if (scrollProgress >= headlineEnterStart && scrollProgress < headlineEnterEnd) {
    const progress = (scrollProgress - headlineEnterStart) / (headlineEnterEnd - headlineEnterStart);
    headlineOpacity = 1;
    headlineY = -progress * 40;
    headlineScale = 1 - (progress * 0.03);
    headlineBlur = 0;
  } else if (scrollProgress >= headlineEnterEnd && scrollProgress < headlineExitStart) {
    const progress = (scrollProgress - headlineEnterEnd) / (headlineExitStart - headlineEnterEnd);
    headlineOpacity = 1 - (progress * 0.4);
    headlineY = -40 + (-progress * 50);
    headlineScale = 0.97 - (progress * 0.07);
    headlineBlur = progress * 3;
  } else if (scrollProgress >= headlineExitStart) {
    const progress = Math.min((scrollProgress - headlineExitStart) / (headlineExitEnd - headlineExitStart), 1);
    const eased = Math.pow(progress, 2.5);
    headlineOpacity = 0.6 - (eased * 0.6);
    headlineY = -90 + (-eased * 60);
    headlineScale = 0.90 - (eased * 0.15);
    headlineBlur = 3 + (eased * 5);
  }
  
  // Description animation (slightly delayed)
  const descEnterStart = 0.05;
  const descEnterEnd = 0.3;
  const descExitStart = 0.55;
  const descExitEnd = 0.9;
  
  let descOpacity = 1;
  let descY = 0;
  let descScale = 1;
  let descBlur = 0;
  
  if (scrollProgress < descEnterStart) {
    descOpacity = 1;
    descY = 0;
    descScale = 1;
    descBlur = 0;
  } else if (scrollProgress >= descEnterStart && scrollProgress < descEnterEnd) {
    const progress = (scrollProgress - descEnterStart) / (descEnterEnd - descEnterStart);
    descOpacity = 1;
    descY = -progress * 45;
    descScale = 1 - (progress * 0.04);
    descBlur = 0;
  } else if (scrollProgress >= descEnterEnd && scrollProgress < descExitStart) {
    const progress = (scrollProgress - descEnterEnd) / (descExitStart - descEnterStart);
    descOpacity = 1 - (progress * 0.35);
    descY = -45 + (-progress * 55);
    descScale = 0.96 - (progress * 0.08);
    descBlur = progress * 3.5;
  } else if (scrollProgress >= descExitStart) {
    const progress = Math.min((scrollProgress - descExitStart) / (descExitEnd - descExitStart), 1);
    const eased = Math.pow(progress, 2.5);
    descOpacity = 0.65 - (eased * 0.65);
    descY = -100 + (-eased * 70);
    descScale = 0.88 - (eased * 0.18);
    descBlur = 3.5 + (eased * 6);
  }

  return (
    <div 
      className="w-full h-full relative overflow-y-auto" 
      style={{ backgroundColor: '#1a1a1a' }}
      onScroll={handleScroll}
    >
      {/* DEBUG: Scroll indicator - Remove after testing */}
      <div 
        style={{
          position: 'fixed',
          top: '10px',
          right: '10px',
          background: 'rgba(17, 255, 73, 0.8)',
          color: '#1a1a1a',
          padding: '5px 10px',
          borderRadius: '4px',
          fontSize: '10px',
          fontWeight: 'bold',
          zIndex: 9999,
          pointerEvents: 'none'
        }}
      >
        Scroll: {Math.round(scrollY)}px | Progress: {Math.round(scrollProgress * 100)}%
      </div>
      
      {/* Content Container - Responsive width */}
      <div
        style={{
          width: '100%',
          maxWidth: '600px',
          margin: '0 auto',
          paddingLeft: '20px',
          paddingRight: '20px',
          paddingTop: '60px',
          paddingBottom: '800px', // Increased to ensure scrollable area
          minHeight: 'calc(100% + 600px)' // Ensure content is taller than container
        }}
      >
        {/* Title */}
        <div 
          className="w-full mb-[32px]"
          style={{
            fontFamily: `'${fontFamily}',sans-serif`,
            fontWeight: '300',
            fontSize: '32px',
            lineHeight: '38px',
            color: textPrimary
          }}
        >
          <FlipBoardText
            text={title.replace(/\\n/g, '\n')}
            isAnimating={isAnimating}
            fontFamily={fontFamily}
            fontSize="32px"
            fontWeight="300"
            color={textPrimary}
            lineHeight="38px"
          />
        </div>

        {/* Image */}
        {coverImage && (
          <div 
            className="w-full mb-[19px] overflow-hidden"
            style={{
              height: '370px',
              backgroundColor: '#000000'
            }}
          >
            <EFXWrapper
              glitchEnabled={!!efx?.glitch}
              blurEnabled={!!efx?.blur}
              chromaticEnabled={!!efx?.chromatic}
              shakeEnabled={!!efx?.shake}
              distortEnabled={!!efx?.distort}
            >
              <img 
                alt="" 
                className="w-full h-full object-cover rounded-[3px]"
                src={coverImage} 
                style={{
                  objectFit: imageFit
                }}
              />
            </EFXWrapper>
          </div>
        )}

        {/* Author */}
        {author && (
          <div 
            className="w-full mb-[24px]"
            style={{
              fontFamily: `'${fontFamily}',sans-serif`,
              fontWeight: '400',
              fontSize: '12px',
              lineHeight: '18px',
              color: textPrimary
            }}
          >
            {author}
          </div>
        )}

        {/* Headline with black background AND SCROLL ANIMATIONS */}
        {headline && (
          <div 
            className="w-full mb-[16px]"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.35)',
              padding: '10px 14px',
              fontFamily: `'${fontFamily}',sans-serif`,
              fontWeight: '500',
              fontSize: '16px',
              lineHeight: '22px',
              color: textAccent,
              opacity: headlineOpacity,
              transform: `translateY(${headlineY}px) scale(${headlineScale})`,
              filter: `blur(${headlineBlur}px)`,
              transition: 'opacity 0.1s linear, transform 0.1s linear, filter 0.1s linear'
            }}
          >
            {headline}
          </div>
        )}

        {/* Description with black background AND SCROLL ANIMATIONS */}
        {description && (
          <div 
            className="w-full mb-0"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.35)',
              padding: '12px 16px',
              fontFamily: `'${fontFamily}',sans-serif`,
              fontWeight: '300',
              fontSize: '14px',
              lineHeight: '21px',
              color: textPrimary,
              opacity: descOpacity,
              transform: `translateY(${descY}px) scale(${descScale})`,
              filter: `blur(${descBlur}px)`,
              transition: 'opacity 0.1s linear, transform 0.1s linear, filter 0.1s linear',
              whiteSpace: 'pre-wrap'
            }}
          >
            {description}
          </div>
        )}

        {/* Icon Counts */}
        <div style={{ height: '50px', width: '100%', flexShrink: 0 }}></div>
        <div 
          className="w-full flex items-center gap-[28px]"
          style={{ paddingLeft: '16px' }}
        >
          <div
            className="flex flex-col items-center gap-[6px]"
            onMouseEnter={() => setHoveredIcon('heart')}
            onMouseLeave={() => {
              setHoveredIcon(null);
              setActiveIcon(null);
            }}
            onMouseDown={() => setActiveIcon('heart')}
            onMouseUp={() => setActiveIcon(null)}
          >
            <Heart
              size={20}
              strokeWidth={1.6}
              color={hoveredIcon === 'heart' || activeIcon === 'heart' ? textAccent : textPrimary}
              fill={activeIcon === 'heart' ? textAccent : 'none'}
            />
            <div style={{ fontSize: '14px', color: textPrimary }}>
              {iconCount1}
            </div>
          </div>
          <div
            className="flex flex-col items-center gap-[6px]"
            onMouseEnter={() => setHoveredIcon('plane')}
            onMouseLeave={() => {
              setHoveredIcon(null);
              setActiveIcon(null);
            }}
            onMouseDown={() => setActiveIcon('plane')}
            onMouseUp={() => setActiveIcon(null)}
          >
            <Send
              size={20}
              strokeWidth={1.6}
              color={hoveredIcon === 'plane' || activeIcon === 'plane' ? textAccent : textPrimary}
              fill={activeIcon === 'plane' ? textAccent : 'none'}
            />
            <div style={{ fontSize: '14px', color: textPrimary }}>
              {iconCount2}
            </div>
          </div>
        </div>

        {/* Product Carousel */}
        {hasFeaturedProducts && products.length > 0 && (
          <div className="w-full mt-[60px] mb-[40px]">
             <ProductCarousel products={products} />
          </div>
        )}
      </div>
    </div>
  );
}
