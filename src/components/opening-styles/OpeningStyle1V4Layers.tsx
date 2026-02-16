'use client';

import { RefObject, useEffect, useState } from 'react';
import { Heart, Send } from 'lucide-react';
import { usePageScrollProgress } from '../../hooks/usePageScrollProgress';
import { useEFX } from '../EFXContext';
import { useIsMobileOrTablet } from '../../hooks/useMediaQuery';
import { FlipBoardText } from '../FlipBoardText';
import { ProductCarousel } from '../ProductCarousel';
import { getProductSets } from '../../services/api';

interface OpeningStyle1V4LayersProps {
  pageIndex: number;
  totalPages: number;
  scrollContainerRef: RefObject<HTMLDivElement>;
  title?: string;
  author?: string;
  headline?: string;
  description?: string;
  coverImage?: string | null;
  imageFit?: 'cover' | 'contain' | 'fill';
  textPrimary?: string;
  textAccent?: string;
  fontFamily?: string;
  // New props for Featured Products
  hasFeaturedProducts?: boolean;
  productSetId?: string;
  // Additional props used in ContentDashboardV4 but missing in interface
  topLabel?: string;
  iconCount1?: string;
  iconCount2?: string;
  isTitleAnimating?: boolean;
}

// Background Layer (completely static, no animation)
export function OpeningStyle1BackgroundLayer() {
  return (
    <div 
      className="absolute inset-0 opening-style-1-background-layer" 
      style={{ 
        backgroundColor: '#1a1a1a',
        pointerEvents: 'none'
      }} 
    />
  );
}

// Image Layer (animated via transforms based on scroll)
export function OpeningStyle1ImageLayer({
  pageIndex,
  totalPages,
  scrollContainerRef,
  coverImage,
  imageFit = 'cover'
}: OpeningStyle1V4LayersProps) {
  const scrollProgress = usePageScrollProgress(scrollContainerRef, pageIndex, totalPages);
  const efx = useEFX();
  const isMobileOrTablet = useIsMobileOrTablet();
  
  // Image animation parameters
  const imgEnterStart = 0.05;
  const imgEnterEnd = 0.35;
  const imgExitStart = 0.70;
  const imgExitEnd = 0.90;
  
  let imgOpacity = 0;
  let imgY = 0;
  let imgScale = 1;

  if (scrollProgress === 0) {
    imgOpacity = 1;
    imgY = 0;
    imgScale = 1;
  } else if (scrollProgress < imgEnterStart) {
    imgOpacity = 0;
    imgY = isMobileOrTablet ? 60 : 120;
    imgScale = 0.85;
  } else if (scrollProgress >= imgEnterStart && scrollProgress < imgEnterEnd) {
    const progress = (scrollProgress - imgEnterStart) / (imgEnterEnd - imgEnterStart);
    const eased = 1 - Math.pow(1 - progress, 3);
    imgOpacity = eased;
    imgY = (1 - eased) * (isMobileOrTablet ? 60 : 120);
    imgScale = 0.85 + (eased * 0.15);
  } else if (scrollProgress >= imgEnterEnd && scrollProgress < imgExitStart) {
    imgOpacity = 1;
    imgY = 0;
    imgScale = 1;
  } else if (scrollProgress >= imgExitStart && scrollProgress < imgExitEnd) {
    const progress = (scrollProgress - imgExitStart) / (imgExitEnd - imgExitStart);
    const eased = Math.pow(progress, 2);
    imgOpacity = 1 - eased;
    imgY = -eased * (isMobileOrTablet ? 60 : 120);
    imgScale = 1 - (eased * 0.15);
  } else {
    imgOpacity = 0;
    imgY = isMobileOrTablet ? -60 : -120;
    imgScale = 0.85;
  }
  
  // Desktop layout
  if (!isMobileOrTablet) {
    return (
      <div 
        className="absolute inset-0 opening-style-1-image-layer" 
        style={{ 
          pointerEvents: 'none',
          opacity: imgOpacity,
          transform: `translateY(${imgY}px) scale(${imgScale})`,
          transition: 'opacity 0.3s ease, transform 0.3s ease',
          filter: efx.blur ? 'blur(4px)' : 'none'
        }}
      >
        <div 
          className="absolute content-stretch flex items-start justify-end left-[calc(50%+16px)] top-[80px] w-[660px]"
        >
          <div className="h-[691px] relative shrink-0 w-[664px]">
            <div className="absolute inset-0" style={{ overflow: 'hidden', borderRadius: '3px' }}>
              {coverImage && (
                <img 
                  alt="Cover" 
                  className="absolute h-[104.84%] left-[11.44%] max-w-none top-[0.09%] w-[88.49%]" 
                  src={coverImage}
                  style={{ objectFit: imageFit }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Mobile layout - images are inline in the text layer
  return null;
}

// Text Layer (animated via transforms based on scroll)
export function OpeningStyle1TextLayer({
  pageIndex,
  totalPages,
  scrollContainerRef,
  title = '',
  author = '',
  headline = '',
  description = '',
  coverImage,
  imageFit = 'cover',
  textPrimary = '#f1f0eb',
  textAccent = '#11ff49',
  fontFamily = 'Inter',
  hasFeaturedProducts = false,
  productSetId
}: OpeningStyle1V4LayersProps) {
  const scrollProgress = usePageScrollProgress(scrollContainerRef, pageIndex, totalPages);
  const efx = useEFX();
  const isMobileOrTablet = useIsMobileOrTablet();
  const [isAnimating, setIsAnimating] = useState(false);
  const [hoveredIcon, setHoveredIcon] = useState<'heart' | 'plane' | null>(null);
  const [activeIcon, setActiveIcon] = useState<'heart' | 'plane' | null>(null);
  const heartCount = 112;
  const planeCount = 23;
  
  // Fetch products for carousel
  const [products, setProducts] = useState<any[]>([]);

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
  
  useEffect(() => {
    const animationDuration = 2000;
    const pauseDuration = 5000;
    const totalCycleDuration = animationDuration + pauseDuration;
    setIsAnimating(true);
    const startTimeout = setTimeout(() => setIsAnimating(false), animationDuration);
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), animationDuration);
    }, totalCycleDuration);
    return () => {
      clearInterval(interval);
      clearTimeout(startTimeout);
    };
  }, []);
  
  // Text animation parameters
  const textEnterStart = 0.0;
  const textEnterEnd = 0.30;
  const textExitStart = 0.75;
  const textExitEnd = 0.95;
  
  let textOpacity = 0;
  let textY = 0;
  let textBlur = 0;

  if (scrollProgress === 0) {
    textOpacity = 1;
    textY = 0;
    textBlur = 0;
  } else if (scrollProgress < textEnterStart) {
    textOpacity = 0;
    textY = isMobileOrTablet ? 40 : 80;
    textBlur = 0;
  } else if (scrollProgress >= textEnterStart && scrollProgress < textEnterEnd) {
    const progress = (scrollProgress - textEnterStart) / (textEnterEnd - textEnterStart);
    const eased = 1 - Math.pow(1 - progress, 3);
    textOpacity = eased;
    textY = (1 - eased) * (isMobileOrTablet ? 40 : 80);
    textBlur = (1 - eased) * 2;
  } else if (scrollProgress >= textEnterEnd && scrollProgress < textExitStart) {
    textOpacity = 1;
    textY = 0;
    textBlur = 0;
  } else if (scrollProgress >= textExitStart && scrollProgress < textExitEnd) {
    const progress = (scrollProgress - textExitStart) / (textExitEnd - textExitStart);
    const eased = Math.pow(progress, 2);
    textOpacity = 1 - eased;
    textY = -eased * (isMobileOrTablet ? 40 : 80);
    textBlur = eased * 5;
  } else {
    textOpacity = 0;
    textY = isMobileOrTablet ? -40 : -80;
    textBlur = 5;
  }
  
  // Desktop layout
  if (!isMobileOrTablet) {
    const isNoImage = !coverImage;
    
    return (
      <div 
        className={`${isNoImage ? 'relative w-full' : 'absolute inset-0'} opening-style-1-text-layer`}
        style={{ 
          pointerEvents: 'none',
          opacity: textOpacity,
          transform: `translateY(${textY}px)`,
          filter: efx.blur ? `blur(${textBlur}px)` : 'none',
          transition: 'opacity 0.3s ease, transform 0.3s ease, filter 0.3s ease',
          padding: isNoImage ? '80px' : 0,
          height: isNoImage ? 'auto' : '100%'
        }}
      >
        {/* Title */}
        <div 
          className={`${isNoImage ? 'relative mb-[40px]' : 'absolute left-[80px] top-[80px]'} content-stretch flex flex-col items-start gap-[12px] max-w-[600px] py-[10px] w-[600px]`}
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
              text={title}
              isAnimating={isAnimating}
              fontFamily={fontFamily}
              fontSize="60px"
              fontWeight="300"
              color={textPrimary}
            />
          </div>
        </div>

        {/* Bottom Content */}
        <div 
          className={`${isNoImage ? 'relative' : 'absolute left-[80px] top-[401px] h-[370px] max-h-[370px]'} content-stretch flex flex-col gap-[40px] items-start justify-end max-w-[600px] w-[600px]`}
          style={{
             height: isNoImage ? 'auto' : '370px',
             maxHeight: isNoImage ? 'none' : '370px'
          }}
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
                  color: textPrimary 
                }}
              >
                {description}
              </p>
            </div>
            
            {hasFeaturedProducts && products.length > 0 && (
              <div className="w-full mt-[40px] mb-[40px]" style={{ pointerEvents: 'auto' }}>
                 <ProductCarousel products={products} />
              </div>
            )}
            <div style={{ height: '50px', width: '100%', flexShrink: 0 }}></div>
            
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
                  size={20}
                  strokeWidth={1.6}
                  color={hoveredIcon === 'heart' || activeIcon === 'heart' ? textAccent : textPrimary}
                  fill={activeIcon === 'heart' ? textAccent : 'none'}
                />
                <div style={{ fontSize: '14px', color: textPrimary }}>
                  {heartCount}
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
                  {planeCount}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Mobile layout - includes inline images
  const isMobileNoImage = isMobileOrTablet && !coverImage;

  return (
    <div 
      className={`${isMobileNoImage ? 'relative w-full' : 'absolute inset-0'} opening-style-1-text-layer`} 
      style={{ 
        pointerEvents: 'none',
        opacity: textOpacity,
        transform: `translateY(${textY}px)`,
        filter: efx.blur ? `blur(${textBlur}px)` : 'none',
        transition: 'opacity 0.3s ease, transform 0.3s ease, filter 0.3s ease',
        overflowY: isMobileNoImage ? 'visible' : 'auto',
        padding: '60px 20px'
      }}
    >
      {/* Title */}
      <div 
        className="w-full mb-[32px] flex flex-col gap-[12px]"
        style={{
          fontFamily: `'${fontFamily}',sans-serif`,
          fontWeight: '300',
          fontSize: '32px',
          lineHeight: '38px',
          color: textPrimary
        }}
      >
        <FlipBoardText
          text={title}
          isAnimating={isAnimating}
          fontFamily={fontFamily}
          fontSize="32px"
          fontWeight="300"
          color={textPrimary}
          lineHeight="38px"
        />
      </div>


      {/* Image - Inline for mobile */}
      {coverImage && (
        <div 
          className="w-full mb-[19px] overflow-hidden"
          style={{
            height: '370px',
            backgroundColor: '#000000'
          }}
        >
          <img 
            alt="" 
            className="w-full h-full object-cover rounded-[3px]"
            src={coverImage} 
            style={{
              objectFit: imageFit
            }}
          />
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

      {/* Headline */}
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
            color: textAccent
          }}
        >
          {headline}
        </div>
      )}

      {/* Description */}
      {description && (
        <div 
          className="w-full mb-[32px]"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.35)',
            padding: '12px 16px',
            fontFamily: `'${fontFamily}',sans-serif`,
            fontWeight: '300',
            fontSize: '14px',
            lineHeight: '21px',
            color: textPrimary,
            whiteSpace: 'pre-wrap'
          }}
        >
          {description}
        </div>
      )}

      {/* Mobile Carousel */}
      {hasFeaturedProducts && products.length > 0 && (
        <div className="w-full mt-[60px] mb-[40px]" style={{ pointerEvents: 'auto' }}>
           <ProductCarousel products={products} />
        </div>
      )}

      {/* Social Icons - Consistent with Desktop/Preview */}
      <div style={{ height: '50px', width: '100%', flexShrink: 0 }}></div>
      <div 
        className="flex items-center gap-[24px]"
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
            size={18}
            strokeWidth={1.6}
            color={hoveredIcon === 'heart' || activeIcon === 'heart' ? textAccent : textPrimary}
            fill={activeIcon === 'heart' ? textAccent : 'none'}
          />
          <div style={{ fontSize: '12px', color: textPrimary }}>
            {heartCount}
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
            size={18}
            strokeWidth={1.6}
            color={hoveredIcon === 'plane' || activeIcon === 'plane' ? textAccent : textPrimary}
            fill={activeIcon === 'plane' ? textAccent : 'none'}
          />
          <div style={{ fontSize: '12px', color: textPrimary }}>
            {planeCount}
          </div>
        </div>
      </div>
    </div>
  );
}
