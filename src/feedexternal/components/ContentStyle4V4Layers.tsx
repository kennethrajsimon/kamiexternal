'use client';

import { RefObject } from 'react';
import { usePageScrollProgress } from '../hooks/usePageScrollProgress';
import { EFXWrapper } from './EFXWrapper';
import { useEFX } from './EFXContext';
import { useIsMobileOrTablet } from '../hooks/useMediaQuery';
// Default images removed; rely on provided props only

interface ParagraphHeader {
  id: string;
  text: string;
}

interface BodyCopy {
  id: string;
  afterHeaderId?: string;
  text: string;
}

interface ContentStyle4V4LayersProps {
  pageIndex: number;
  totalPages: number;
  scrollContainerRef: RefObject<HTMLDivElement>;
  topLabel?: string;
  paragraphHeaders?: ParagraphHeader[];
  bodyCopies?: BodyCopy[];
  image1?: string | null;
  image2?: string | null;
  image1Fit?: 'cover' | 'contain';
  image2Fit?: 'cover' | 'contain';
  caption1Title?: string;
  caption1Subtitle?: string;
  caption2Title?: string;
  caption2Subtitle?: string;
  showCaption1?: boolean;
  showCaption2?: boolean;
  fontFamily?: string;
  topLabelFontSize?: string;
  topLabelFontWeight?: string;
  textPrimary?: string;
}

// Background Layer (completely static, no animation)
export function ContentStyle4BackgroundLayer() {
  return (
    <div 
      className="absolute inset-0" 
      style={{ 
        backgroundColor: '#1a1a1a',
        pointerEvents: 'none'
      }} 
    />
  );
}

// Image Layer (animated via transforms based on scroll)
export function ContentStyle4ImageLayer({
  pageIndex,
  totalPages,
  scrollContainerRef,
  image1,
  image2,
  image1Fit = 'cover',
  image2Fit = 'cover',
  caption1Title,
  caption1Subtitle,
  caption2Title,
  caption2Subtitle,
  showCaption1,
  showCaption2
}: ContentStyle4V4LayersProps) {
  const scrollProgress = usePageScrollProgress(scrollContainerRef, pageIndex, totalPages);
  const efx = useEFX();
  const isMobileOrTablet = useIsMobileOrTablet();
  
  const normalize = (s?: string | null) => {
    if (!s || typeof s !== 'string') return s || null;
    let out = s.replace(/^\/src\/assets\//, '/assets/');
    out = out.replace(/^https?:\/\/(?:localhost|127\.0\.0\.1):3001\//, '/');
    return out;
  };
  const img1Src = normalize(image1);
  const img2Src = normalize(image2);
  
  // Image 1 animation - simple slide up/down with fade
  const img1EnterStart = 0.05;
  const img1EnterEnd = 0.35;
  const img1ExitStart = 0.70;
  const img1ExitEnd = 0.90;
  
  let img1Opacity = 0;
  let img1Y = 0;
  let img1Scale = 1;
  let img1Blur = 0;
  
  if (scrollProgress < img1EnterStart) {
    if (scrollProgress === 0) {
      img1Opacity = 1;
      img1Y = 0;
      img1Scale = 1;
      img1Blur = 0;
    } else {
      img1Opacity = 0;
      img1Y = 50;
      img1Scale = 0.90;
      img1Blur = 5;
    }
  } else if (scrollProgress >= img1EnterStart && scrollProgress < img1EnterEnd) {
    const progress = (scrollProgress - img1EnterStart) / (img1EnterEnd - img1EnterStart);
    const eased = 1 - Math.pow(1 - progress, 2.5);
    img1Opacity = eased;
    img1Y = (1 - eased) * 50;
    img1Scale = 0.90 + (eased * 0.10);
    img1Blur = (1 - eased) * 5;
  } else if (scrollProgress >= img1EnterEnd && scrollProgress < img1ExitStart) {
    img1Opacity = 1;
    img1Y = 0;
    img1Scale = 1;
    img1Blur = 0;
  } else if (scrollProgress >= img1ExitStart && scrollProgress < img1ExitEnd) {
    const progress = (scrollProgress - img1ExitStart) / (img1ExitEnd - img1ExitStart);
    const eased = Math.pow(progress, 1.8);
    img1Opacity = 1 - eased;
    img1Y = -eased * 50;
    img1Scale = 1 - (eased * 0.10);
    img1Blur = eased * 5;
  } else {
    img1Opacity = 0;
    img1Y = -50;
    img1Scale = 0.90;
    img1Blur = 5;
  }
  
  // Image 2 animation - simple slide up/down with fade
  const img2EnterStart = 0.05;
  const img2EnterEnd = 0.35;
  const img2ExitStart = 0.70;
  const img2ExitEnd = 0.90;
  
  let img2Opacity = 0;
  let img2Y = 0;
  let img2Scale = 1;
  let img2Blur = 0;
  
  if (scrollProgress < img2EnterStart) {
    if (scrollProgress === 0) {
      img2Opacity = 1;
      img2Y = 0;
      img2Scale = 1;
      img2Blur = 0;
    } else {
      img2Opacity = 0;
      img2Y = 50;
      img2Scale = 0.90;
      img2Blur = 5;
    }
  } else if (scrollProgress >= img2EnterStart && scrollProgress < img2EnterEnd) {
    const progress = (scrollProgress - img2EnterStart) / (img2EnterEnd - img2EnterStart);
    const eased = 1 - Math.pow(1 - progress, 2.5);
    img2Opacity = eased;
    img2Y = (1 - eased) * 50;
    img2Scale = 0.90 + (eased * 0.10);
    img2Blur = (1 - eased) * 5;
  } else if (scrollProgress >= img2EnterEnd && scrollProgress < img2ExitStart) {
    img2Opacity = 1;
    img2Y = 0;
    img2Scale = 1;
    img2Blur = 0;
  } else if (scrollProgress >= img2ExitStart && scrollProgress < img2ExitEnd) {
    const progress = (scrollProgress - img2ExitStart) / (img2ExitEnd - img2ExitStart);
    const eased = Math.pow(progress, 1.8);
    img2Opacity = 1 - eased;
    img2Y = -eased * 50;
    img2Scale = 1 - (eased * 0.10);
    img2Blur = eased * 5;
  } else {
    img2Opacity = 0;
    img2Y = -50;
    img2Scale = 0.90;
    img2Blur = 5;
  }
  
  // Text animation for desktop
  const textEnterStart = 0.10;
  const textEnterEnd = 0.35;
  const textExitStart = 0.70;
  const textExitEnd = 0.90;
  
  let textOpacity = 0;
  let textY = 0;

  if (scrollProgress < textEnterStart) {
    if (scrollProgress === 0) {
      textOpacity = 1;
      textY = 0;
    } else {
      textOpacity = 0;
      textY = 80;
    }
  } else if (scrollProgress >= textEnterStart && scrollProgress < textEnterEnd) {
    const progress = (scrollProgress - textEnterStart) / (textEnterEnd - textEnterStart);
    const eased = 1 - Math.pow(1 - progress, 2.5);
    textOpacity = eased;
    textY = (1 - eased) * 80;
  } else if (scrollProgress >= textEnterEnd && scrollProgress < textExitStart) {
    textOpacity = 1;
    textY = 0;
  } else if (scrollProgress >= textExitStart && scrollProgress < textExitEnd) {
    const progress = (scrollProgress - textExitStart) / (textExitEnd - textExitStart);
    const eased = Math.pow(progress, 2);
    textOpacity = 1 - eased;
    textY = -eased * 80;
  } else {
    textOpacity = 0;
  }

  return (
    <>
      {/* Images in Image Layer with parallax */}
      {/* Left Image + Caption Unit */}
      <div 
        className="absolute left-[80px] top-[211px]"
        style={{
          left: isMobileOrTablet ? '50%' : undefined,
          top: isMobileOrTablet ? '16px' : undefined,
          opacity: img1Opacity,
          transform: `${isMobileOrTablet ? 'translateX(-50%) ' : ''}translateY(${img1Y}px) scale(${img1Scale})`,
          transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: 'none'
        }}
      >
        {/* Image 1 */}
        {img1Src && (
        <EFXWrapper
          glitchEnabled={efx.glitchEnabled}
          blurEnabled={efx.blurEnabled}
          chromaticEnabled={efx.chromaticEnabled}
          shakeEnabled={efx.shakeEnabled}
          distortEnabled={efx.distortEnabled}
        >
          <div className="w-[660px] h-[429px]" style={{ overflow: 'hidden', borderRadius: '3px', width: isMobileOrTablet ? 'min(660px, 92vw)' : undefined }}>
            <img 
              alt="" 
              className="w-full h-full rounded-[3px]" 
              style={{ objectFit: image1Fit }}
              src={img1Src} 
            />
          </div>
        </EFXWrapper>
        )}
        
        {/* Caption 1 - linked to image */}
        {showCaption1 && (
          <div className="absolute left-0 top-[444px] w-[660px]" style={{ width: isMobileOrTablet ? 'min(660px, 92vw)' : undefined }}>
            <p className="font-['Inter:Light',sans-serif] font-['Inter:Regular',sans-serif] font-light font-normal leading-[0] not-italic text-[#f1f0eb] text-[0px] w-full whitespace-pre-wrap">
              {caption1Title && (
                <span className="leading-[18px] text-[15px]">{caption1Title}</span>
              )}
              {caption1Subtitle && (
                <>
                  <span className="leading-[18px] text-[12px]">
                    <br aria-hidden="true" />
                  </span>
                  <span className="leading-[18px] text-[13px]">– {caption1Subtitle}</span>
                </>
              )}
            </p>
          </div>
        )}
      </div>
      
      {/* Right Image + Caption Unit */}
      <div 
        className="absolute left-[770px] top-[211px]"
        style={{
          left: isMobileOrTablet ? '50%' : undefined,
          top: isMobileOrTablet ? '16px' : undefined,
          opacity: img2Opacity,
          transform: `${isMobileOrTablet ? 'translateX(-50%) ' : ''}translateY(${img2Y}px) scale(${img2Scale})`,
          transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: 'none'
        }}
      >
        {/* Image 2 */}
        {img2Src && (
        <EFXWrapper
          glitchEnabled={efx.glitchEnabled}
          blurEnabled={efx.blurEnabled}
          chromaticEnabled={efx.chromaticEnabled}
          shakeEnabled={efx.shakeEnabled}
          distortEnabled={efx.distortEnabled}
        >
          <div className="w-[662px] h-[429px]" style={{ width: isMobileOrTablet ? 'min(662px, 92vw)' : undefined }}>
            <img 
              alt="" 
              className="w-full h-full" 
              style={{ objectFit: image2Fit }}
              src={img2Src} 
            />
          </div>
        </EFXWrapper>
        )}
        
        {/* Caption 2 - linked to image */}
        {showCaption2 && (
          <div className="absolute left-0 top-[444px] w-[662px]" style={{ width: isMobileOrTablet ? 'min(662px, 92vw)' : undefined }}>
            <p className="font-['Inter:Light',sans-serif] font-['Inter:Regular',sans-serif] font-light font-normal leading-[0] not-italic text-[#f1f0eb] text-[0px] w-full whitespace-pre-wrap">
              {caption2Title && (
                <span className="leading-[18px] text-[15px]">{caption2Title}</span>
              )}
              {caption2Subtitle && (
                <>
                  <span className="leading-[18px] text-[12px]">
                    <br aria-hidden="true" />
                  </span>
                  <span className="leading-[18px] text-[13px]">– {caption2Subtitle}</span>
                </>
              )}
            </p>
          </div>
        )}
      </div>
    </>
  );
}

// Text Layer (scrolls naturally in the viewport mask)
export function ContentStyle4TextLayer({
  pageIndex,
  totalPages,
  scrollContainerRef,
  topLabel,
  paragraphHeaders,
  bodyCopies,
  image1,
  image2,
  image1Fit = 'cover',
  image2Fit = 'cover',
  caption1Title,
  caption1Subtitle,
  caption2Title,
  caption2Subtitle,
  showCaption1,
  showCaption2,
  fontFamily = 'Inter',
  topLabelFontSize = '11px',
  topLabelFontWeight = '700',
  textPrimary = '#f1f0eb'
}: ContentStyle4V4LayersProps) {
  const efx = useEFX();
  const scrollProgress = usePageScrollProgress(scrollContainerRef, pageIndex, totalPages);
  const isMobileOrTablet = useIsMobileOrTablet();
  
  const img1Src = image1 || imgSingkarpor;
  const img2Src = image2 || imgFemaleDesigner1;
  
  const firstBodyCopy = bodyCopies?.[0]?.text || '';
  const shouldRenderFirstBodyCopy = firstBodyCopy && !bodyCopies?.[0]?.afterHeaderId;
  
  // Remove topLabel from first body copy if it starts with it
  let cleanedFirstBodyCopy = firstBodyCopy;
  if (firstBodyCopy) {
    const topLabelToStrip = topLabel || 'BEYOND THE SCREENSHOT';
    const topLabelText = topLabelToStrip.trim().toUpperCase();
    const bodyText = firstBodyCopy.replace(/<[^>]*>/g, '').trim().toUpperCase();
    if (bodyText.startsWith(topLabelText)) {
      const regex = new RegExp(`^(<[^>]*>)*${topLabelToStrip.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')}(<[^>]*>)*`, 'i');
      cleanedFirstBodyCopy = firstBodyCopy.replace(regex, '').trim();
    }
  }
  
  // Mobile animations - Top Label
  const labelExitStart = 0.50;
  const labelExitEnd = 0.75;
  
  let labelOpacity = 0;
  let labelY = 0;
  let labelScale = 1;
  let labelBlur = 0;
  
  if (scrollProgress < labelExitStart) {
    labelOpacity = 1;
    labelY = 0;
    labelScale = 1;
    labelBlur = 0;
  } else if (scrollProgress >= labelExitStart && scrollProgress < labelExitEnd) {
    const progress = (scrollProgress - labelExitStart) / (labelExitEnd - labelExitStart);
    const eased = Math.pow(progress, 1.8);
    labelOpacity = 1 - eased;
    labelY = -eased * 50;
    labelScale = 1 - (eased * 0.10);
    labelBlur = eased * 5;
  } else {
    labelOpacity = 0;
    labelY = -50;
    labelScale = 0.90;
    labelBlur = 5;
  }
  
  // Mobile animations - First Body Copy
  const firstBodyExitStart = 0.55;
  const firstBodyExitEnd = 0.78;
  
  let firstBodyOpacity = 0;
  let firstBodyY = 0;
  let firstBodyScale = 1;
  let firstBodyBlur = 0;
  
  if (scrollProgress < firstBodyExitStart) {
    firstBodyOpacity = 1;
    firstBodyY = 0;
    firstBodyScale = 1;
    firstBodyBlur = 0;
  } else if (scrollProgress >= firstBodyExitStart && scrollProgress < firstBodyExitEnd) {
    const progress = (scrollProgress - firstBodyExitStart) / (firstBodyExitEnd - firstBodyExitStart);
    const eased = Math.pow(progress, 1.8);
    firstBodyOpacity = 1 - eased;
    firstBodyY = -eased * 60;
    firstBodyScale = 1 - (eased * 0.12);
    firstBodyBlur = eased * 6;
  } else {
    firstBodyOpacity = 0;
    firstBodyY = -60;
    firstBodyScale = 0.88;
    firstBodyBlur = 6;
  }
  
  // Mobile animations - Image 1
  const img1ExitStartMobile = 0.58;
  const img1ExitEndMobile = 0.80;
  
  let img1OpacityMobile = 0;
  let img1YMobile = 0;
  let img1ScaleMobile = 1;
  let img1BlurMobile = 0;
  
  if (scrollProgress < img1ExitStartMobile) {
    img1OpacityMobile = 1;
    img1YMobile = 0;
    img1ScaleMobile = 1;
    img1BlurMobile = 0;
  } else if (scrollProgress >= img1ExitStartMobile && scrollProgress < img1ExitEndMobile) {
    const progress = (scrollProgress - img1ExitStartMobile) / (img1ExitEndMobile - img1ExitStartMobile);
    const eased = Math.pow(progress, 1.8);
    img1OpacityMobile = 1 - eased;
    img1YMobile = -eased * 50;
    img1ScaleMobile = 1 - (eased * 0.10);
    img1BlurMobile = eased * 5;
  } else {
    img1OpacityMobile = 0;
    img1YMobile = -50;
    img1ScaleMobile = 0.90;
    img1BlurMobile = 5;
  }
  
  // Mobile animations - Image 2
  const img2ExitStartMobile = 0.62;
  const img2ExitEndMobile = 0.83;
  
  let img2OpacityMobile = 0;
  let img2YMobile = 0;
  let img2ScaleMobile = 1;
  let img2BlurMobile = 0;
  
  if (scrollProgress < img2ExitStartMobile) {
    img2OpacityMobile = 1;
    img2YMobile = 0;
    img2ScaleMobile = 1;
    img2BlurMobile = 0;
  } else if (scrollProgress >= img2ExitStartMobile && scrollProgress < img2ExitEndMobile) {
    const progress = (scrollProgress - img2ExitStartMobile) / (img2ExitEndMobile - img2ExitStartMobile);
    const eased = Math.pow(progress, 1.8);
    img2OpacityMobile = 1 - eased;
    img2YMobile = -eased * 50;
    img2ScaleMobile = 1 - (eased * 0.10);
    img2BlurMobile = eased * 5;
  } else {
    img2OpacityMobile = 0;
    img2YMobile = -50;
    img2ScaleMobile = 0.90;
    img2BlurMobile = 5;
  }
  
  // Text animation for desktop
  const textEnterStart = 0.10;
  const textEnterEnd = 0.35;
  const textExitStart = 0.70;
  const textExitEnd = 0.90;
  
  let textOpacity = 0;
  let textY = 0;

  if (scrollProgress < textEnterStart) {
    textOpacity = 0;
    textY = 80;
  } else if (scrollProgress >= textEnterStart && scrollProgress < textEnterEnd) {
    const progress = (scrollProgress - textEnterStart) / (textEnterEnd - textEnterStart);
    const eased = 1 - Math.pow(1 - progress, 2.5);
    textOpacity = eased;
    textY = (1 - eased) * 80;
  } else if (scrollProgress >= textEnterEnd && scrollProgress < textExitStart) {
    textOpacity = 1;
    textY = 0;
  } else if (scrollProgress >= textExitStart && scrollProgress < textExitEnd) {
    const progress = (scrollProgress - textExitStart) / (textExitEnd - textExitStart);
    const eased = Math.pow(progress, 2);
    textOpacity = 1 - eased;
    textY = -eased * 80;
  } else {
    textOpacity = 0;
  }

  return (
    <>
      {/* Mobile Vertical Layout */}
      {isMobileOrTablet ? (
        <div 
          className="relative w-full min-h-screen"
          style={{ 
            backgroundColor: '#1a1a1a',
            paddingLeft: '20px',
            paddingRight: '20px',
            paddingTop: '20px',
            paddingBottom: '20px'
          }}
        >
          {/* Content Container */}
          <div
            style={{
              width: '100%',
              maxWidth: '600px',
              margin: '0 auto'
            }}
          >
            {/* Top Label */}
            {topLabel && (
              <div 
                className="w-full mb-[20px]"
                style={{
                  fontFamily: `'${fontFamily}',sans-serif`,
                  fontWeight: topLabelFontWeight,
                  fontSize: topLabelFontSize,
                  color: textPrimary,
                  letterSpacing: '1.65px',
                  textTransform: 'uppercase',
                  opacity: labelOpacity,
                  transform: `translateY(${labelY}px) scale(${labelScale})`,
                  transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                  filter: `blur(${labelBlur}px)`
                }}
              >
                {topLabel}
              </div>
            )}

            {/* First Body Copy */}
            {shouldRenderFirstBodyCopy && (
              <div 
                className="w-full mb-[20px]"
                style={{
                  fontFamily: `'${fontFamily}',sans-serif`,
                  fontWeight: '300',
                  fontSize: '14px',
                  lineHeight: '21px',
                  color: textPrimary,
                  opacity: firstBodyOpacity,
                  transform: `translateY(${firstBodyY}px) scale(${firstBodyScale})`,
                  transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                  filter: `blur(${firstBodyBlur}px)`
                }}
                dangerouslySetInnerHTML={{ __html: cleanedFirstBodyCopy }}
              />
            )}

            {/* Image 1 - Mobile Inline */}
            <EFXWrapper
              glitchEnabled={efx.glitchEnabled}
              blurEnabled={efx.blurEnabled}
              chromaticEnabled={efx.chromaticEnabled}
              shakeEnabled={efx.shakeEnabled}
              distortEnabled={efx.distortEnabled}
            >
              <div className="w-full mb-[12px]">
                <img 
                  alt="" 
                  className="w-full rounded-[4px]" 
                  style={{ 
                    objectFit: image1Fit,
                    aspectRatio: '660/429',
                    opacity: img1OpacityMobile,
                    transform: `translateY(${img1YMobile}px) scale(${img1ScaleMobile})`,
                    transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                    filter: `blur(${img1BlurMobile}px)`
                  }}
                  src={img1Src} 
                />
                {/* Caption 1 */}
                {showCaption1 && (caption1Title || caption1Subtitle) && (
                  <div className="mt-[12px] w-full">
                    <p className="font-['Inter'] text-[#f1f0eb] leading-[18px]">
                      {caption1Title && (
                        <span className="text-[14px] font-light">{caption1Title}</span>
                      )}
                      {caption1Subtitle && (
                        <>
                          {caption1Title && <br />}
                          <span className="text-[12px] font-light">– {caption1Subtitle}</span>
                        </>
                      )}
                    </p>
                  </div>
                )}
              </div>
            </EFXWrapper>

            {/* Image 2 - Mobile Inline */}
            <EFXWrapper
              glitchEnabled={efx.glitchEnabled}
              blurEnabled={efx.blurEnabled}
              chromaticEnabled={efx.chromaticEnabled}
              shakeEnabled={efx.shakeEnabled}
              distortEnabled={efx.distortEnabled}
            >
              <div className="w-full mb-[20px]">
                <img 
                  alt="" 
                  className="w-full rounded-[3px]" 
                  style={{ 
                    height: '350px',
                    objectFit: image2Fit,
                    aspectRatio: '662/429',
                    opacity: img2OpacityMobile,
                    transform: `translateY(${img2YMobile}px) scale(${img2ScaleMobile})`,
                    transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                    filter: `blur(${img2BlurMobile}px)`
                  }}
                  src={img2Src} 
                />
                {/* Caption 2 */}
                {showCaption2 && (caption2Title || caption2Subtitle) && (
                  <div className="mt-[12px] w-full">
                    <p className="font-['Inter'] text-[#f1f0eb] leading-[18px]">
                      {caption2Title && (
                        <span className="text-[14px] font-light">{caption2Title}</span>
                      )}
                      {caption2Subtitle && (
                        <>
                          {caption2Title && <br />}
                          <span className="text-[12px] font-light">– {caption2Subtitle}</span>
                        </>
                      )}
                    </p>
                  </div>
                )}
              </div>
            </EFXWrapper>

            {/* Headers and Body Copies */}
            {paragraphHeaders?.map((header, index) => {
              const bodyCopy = bodyCopies?.find(b => b.afterHeaderId === header.id);
              
              // Staggered scroll-based animation with entrance and exit - EARLIER TIMING
              const baseExitStart = 0.65 + (index * 0.04);
              const baseExitEnd = baseExitStart + 0.22; // Extended for slower fade
              
              let itemOpacity = 0;
              let itemY = 0;
              let itemScale = 1;
              let itemBlur = 0;
              
              if (scrollProgress < baseExitStart) {
                itemOpacity = 1;
                itemY = 0;
                itemScale = 1;
                itemBlur = 0;
              } else if (scrollProgress >= baseExitStart && scrollProgress < baseExitEnd) {
                const progress = (scrollProgress - baseExitStart) / (baseExitEnd - baseExitStart);
                const eased = Math.pow(progress, 1.8);
                itemOpacity = 1 - eased;
                itemY = -eased * 50;
                itemScale = 1 - (eased * 0.12);
                itemBlur = eased * 6;
              } else {
                itemOpacity = 0;
                itemY = -50;
                itemScale = 0.88;
                itemBlur = 6;
              }
              
              return (
                <div key={header.id} className="w-full mb-[20px]">
                  {header.text && (
                    <div 
                      className="mb-[8px]"
                      style={{
                        fontFamily: `'${fontFamily}',sans-serif`,
                        fontWeight: '600',
                        fontSize: '14px',
                        lineHeight: '20px',
                        color: '#11ff49',
                        opacity: itemOpacity,
                        transform: `translateY(${itemY}px) scale(${itemScale})`,
                        filter: `blur(${itemBlur * 0.3}px)`,
                        transition: 'opacity 0.85s cubic-bezier(0.22, 1, 0.36, 1), transform 0.85s cubic-bezier(0.22, 1, 0.36, 1), filter 0.85s cubic-bezier(0.22, 1, 0.36, 1)'
                      }}
                    >
                      {header.text}
                    </div>
                  )}
                  {bodyCopy?.text && (
                    <div 
                      style={{
                        fontFamily: `'${fontFamily}',sans-serif`,
                        fontWeight: '300',
                        fontSize: '14px',
                        lineHeight: '21px',
                        color: textPrimary,
                        opacity: itemOpacity,
                        transform: `translateY(${itemY * 0.85}px) scale(${0.90 + (itemOpacity * 0.10)})`,
                        filter: `blur(${itemBlur * 0.4}px)`,
                        transition: 'opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1), transform 0.9s cubic-bezier(0.22, 1, 0.36, 1), filter 0.9s cubic-bezier(0.22, 1, 0.36, 1)'
                      }}
                      dangerouslySetInnerHTML={{ __html: bodyCopy.text }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <>
          {/* Desktop Layout - Text only (images are in Image Layer) */}
          <div 
            className="absolute left-[80px] top-[115px] w-full"
            style={{
              opacity: textOpacity,
              transform: `translateY(${textY}px)`,
              transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            <div className="font-['Inter:Regular',sans-serif] font-normal leading-[0] text-[#f1f0eb] text-[0px] w-[1352px] whitespace-pre-wrap">
              {shouldRenderFirstBodyCopy && (
                <>
                  <div 
                    className="leading-[normal] mb-0 text-[18px]"
                    style={{ lineHeight: '25px' }}
                    dangerouslySetInnerHTML={{ __html: cleanedFirstBodyCopy }}
                  />
                  <p className="leading-[normal] mb-0 text-[15px]">&nbsp;</p>
                </>
              )}
              
              {paragraphHeaders?.map((header) => {
                const bodyCopy = bodyCopies?.find(b => b.afterHeaderId === header.id);
                return (
                  <div key={header.id}>
                    {header.text && (
                      <>
                        <p className="leading-[normal] mb-0 text-[15px]" style={{ lineHeight: '25px' }}>&nbsp;</p>
                        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] mb-[4px] text-[#11ff49] text-[19px]">{header.text}</p>
                        {bodyCopy?.text && (
                          <>
                            <div 
                              className="mb-0 text-[18px]"
                              style={{ lineHeight: '25px' }}
                              dangerouslySetInnerHTML={{ __html: bodyCopy.text }}
                            />
                            <p className="leading-[normal] mb-0 text-[15px]">&nbsp;</p>
                          </>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
}
