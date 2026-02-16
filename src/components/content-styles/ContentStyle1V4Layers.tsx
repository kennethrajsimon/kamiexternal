'use client';

import { useEffect, useState, RefObject } from 'react';
import { usePageScrollProgress } from '../../hooks/usePageScrollProgress';
import { EFXWrapper } from '../EFXWrapper';
import { useEFX } from '../EFXContext';
import { useIsMobileOrTablet } from '../../hooks/useMediaQuery';
const imgMaleDesigner = '/assets/__placeholder__.png';
const imgFemaleDesigner = '/assets/__placeholder__.png';
const imgMaleDesigner1 = '/assets/__placeholder__.png';

interface ParagraphHeader {
  id: string;
  text: string;
}

interface BodyCopy {
  id: string;
  afterHeaderId?: string;
  text: string;
}

interface ContentStyle1V4LayersProps {
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
  fontFamily?: string;
  topLabelFontSize?: string;
  topLabelFontWeight?: string;
  textPrimary?: string;
}

interface ContentStyle1BackgroundLayerProps {}

// Background Layer (completely static, no animation)
export function ContentStyle1BackgroundLayer() {
  return (
    <div 
      className="absolute inset-0 content-style-1-background-layer" 
      style={{ 
        backgroundColor: '#1a1a1a',
        pointerEvents: 'none'
      }} 
    />
  );
}

// Image Layer (animated via transforms based on scroll)
export function ContentStyle1ImageLayer({
  pageIndex,
  totalPages,
  scrollContainerRef,
  image1,
  image2,
  image1Fit = 'cover',
  image2Fit = 'cover'
}: ContentStyle1V4LayersProps) {
  const scrollProgress = usePageScrollProgress(scrollContainerRef, pageIndex, totalPages);
  const efx = useEFX(); // Get EFX settings from context
  const isMobileOrTablet = useIsMobileOrTablet();
  
  const img1Src = image1 || imgMaleDesigner;
  const img2Src = image2 || imgFemaleDesigner;
  
  const hasImage1 = !!image1;
  const hasImage2 = !!image2;
  const onlyImage1 = hasImage1 && !hasImage2;
  const onlyImage2 = !hasImage1 && hasImage2;
  const showBothImages = hasImage1 && hasImage2;
  
  // === IMAGE 1 ANIMATION (Male Designer - left side) ===
  const img1EnterStart = 0.05;
  const img1EnterEnd = 0.35;
  const img1ExitStart = 0.70;
  const img1ExitEnd = 0.90;
  
  let img1Opacity = 0;
  let img1Y = 0;
  let img1Scale = 1;

  if (scrollProgress < img1EnterEnd) {
    // Fully visible or entering - KEEP VISIBLE to prevent blank page
    img1Opacity = 1;
    img1Y = 0;
    img1Scale = 1;
  } else if (scrollProgress >= img1EnterEnd && scrollProgress < img1ExitStart) {
    img1Opacity = 1;
    img1Y = 0;
    img1Scale = 1;
  } else if (scrollProgress >= img1ExitStart && scrollProgress < img1ExitEnd) {
    const progress = (scrollProgress - img1ExitStart) / (img1ExitEnd - img1ExitStart);
    const eased = Math.pow(progress, 3);
    img1Opacity = 1 - eased;
    img1Y = -eased * (isMobileOrTablet ? 60 : 120);
    img1Scale = 1 - (eased * 0.15);
  } else {
    img1Opacity = 0;
    img1Y = isMobileOrTablet ? -60 : -120;
    img1Scale = 0.85;
  }

  // === IMAGE 2 ANIMATION (Female Designer - right side) ===
  const img2EnterStart = 0.05;
  const img2EnterEnd = 0.40;
  const img2ExitStart = 0.75;
  const img2ExitEnd = 0.95;
  
  let img2Opacity = 0;
  let img2Y = 0;
  let img2Scale = 1;

  if (scrollProgress < img2EnterEnd) {
    // Fully visible or entering - KEEP VISIBLE to prevent blank page
    img2Opacity = 1;
    img2Y = 0;
    img2Scale = 1;
  } else if (scrollProgress >= img2EnterEnd && scrollProgress < img2ExitStart) {
    img2Opacity = 1;
    img2Y = 0;
    img2Scale = 1;
  } else if (scrollProgress >= img2ExitStart && scrollProgress < img2ExitEnd) {
    const progress = (scrollProgress - img2ExitStart) / (img2ExitEnd - img2ExitStart);
    const eased = Math.pow(progress, 3);
    img2Opacity = 1 - eased;
    img2Y = -eased * (isMobileOrTablet ? 60 : 120);
    img2Scale = 1 - (eased * 0.15);
  } else {
    img2Opacity = 0;
    img2Y = isMobileOrTablet ? -60 : -120;
    img2Scale = 0.85;
  }

  return (
    <>
      {/* Desktop ONLY - Images in Image Layer with parallax */}
      {!isMobileOrTablet && (
        <>
          {/* Image 1 - Male Designer */}
          {(hasImage1 || !hasImage2) && (
            <EFXWrapper
              glitchEnabled={efx.glitchEnabled}
              blurEnabled={efx.blurEnabled}
              chromaticEnabled={efx.chromaticEnabled}
              shakeEnabled={efx.shakeEnabled}
              distortEnabled={efx.distortEnabled}
            >
              <div 
                className="absolute"
                style={{
                  left: '772px',
                  top: onlyImage1 ? '80px' : '139px',
                  width: onlyImage1 ? '660px' : '322.5px',
                  height: onlyImage1 ? '691px' : '428.147px',
                  opacity: img1Opacity,
                  transform: `translateY(${img1Y}px) scale(${img1Scale})`,
                  transition: 'opacity 0.95s cubic-bezier(0.16, 1, 0.3, 1), transform 0.95s cubic-bezier(0.16, 1, 0.3, 1)',
                  pointerEvents: 'none'
                }}
              >
                <img 
                  alt="" 
                  className="absolute inset-0 max-w-none size-full" 
                  style={{ objectFit: image1Fit }}
                  src={img1Src} 
                />
              </div>
            </EFXWrapper>
          )}

          {/* Image 2 - Female Designer */}
          {(hasImage2 || !hasImage1) && (
            <EFXWrapper
              glitchEnabled={efx.glitchEnabled}
              blurEnabled={efx.blurEnabled}
              chromaticEnabled={efx.chromaticEnabled}
              shakeEnabled={efx.shakeEnabled}
              distortEnabled={efx.distortEnabled}
            >
              <div 
                className="absolute"
                style={{
                  left: onlyImage2 ? '772px' : '1109.5px',
                  top: onlyImage2 ? '80px' : '283px',
                  width: onlyImage2 ? '660px' : '322.5px',
                  height: onlyImage2 ? '691px' : '428.147px',
                  opacity: img2Opacity,
                  transform: `translateY(${img2Y}px) scale(${img2Scale})`,
                  transition: 'opacity 1.05s cubic-bezier(0.16, 1, 0.3, 1), transform 1.05s cubic-bezier(0.16, 1, 0.3, 1)',
                  pointerEvents: 'none'
                }}
              >
                <img 
                  alt="" 
                  className="absolute inset-0 max-w-none size-full" 
                  style={{ objectFit: image2Fit }}
                  src={img2Src} 
                />
              </div>
            </EFXWrapper>
          )}
        </>
      )}
    </>
  );
}

// Text Layer (scrolls naturally in the viewport mask)
export function ContentStyle1TextLayer({
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
  fontFamily = 'Inter',
  topLabelFontSize = '11px',
  topLabelFontWeight = '700',
  textPrimary = '#f1f0eb'
}: ContentStyle1V4LayersProps) {
  const scrollProgress = usePageScrollProgress(scrollContainerRef, pageIndex, totalPages);
  const isMobileOrTablet = useIsMobileOrTablet();
  const efx = useEFX();
  
  const img1Src = image1 || imgMaleDesigner;
  const img2Src = image2 || imgFemaleDesigner;
  const hasImage1 = !!image1 || img1Src === imgMaleDesigner;
  const hasImage2 = !!image2 || img2Src === imgFemaleDesigner;
  const showBothImages = hasImage1 && hasImage2;
  
  const firstBodyCopy = bodyCopies?.[0]?.text || '';
  // Only render first body copy if it's not associated with any header
  const shouldRenderFirstBodyCopy = firstBodyCopy && !bodyCopies?.[0]?.afterHeaderId;
  
  // Simple logic: if there's a topLabel, skip the first body copy entirely if it contains the label
  let skipFirstBodyCopy = false;
  let cleanedFirstBodyCopy = firstBodyCopy;
  
  if (topLabel && firstBodyCopy) {
    const labelToRemove = topLabel.trim();
    
    // Extract plain text from HTML
    const tempDiv = typeof document !== 'undefined' ? document.createElement('div') : null;
    if (tempDiv) {
      tempDiv.innerHTML = firstBodyCopy;
      const textContent = (tempDiv.textContent || tempDiv.innerText || '').trim();
      
      // If the text contains the top label at the start, skip rendering this body copy entirely
      if (textContent.toUpperCase().startsWith(labelToRemove.toUpperCase())) {
        skipFirstBodyCopy = true;
      }
    } else {
      // Fallback for SSR - check plain text
      const plainText = firstBodyCopy.replace(/<[^>]+>/g, '').trim();
      if (plainText.toUpperCase().startsWith(labelToRemove.toUpperCase())) {
        skipFirstBodyCopy = true;
      }
    }
  }
  
  // === TOP LABEL ANIMATION ===
  const labelExitStart = 0.58;
  const labelExitEnd = 0.76;
  
  let labelOpacity = 0;
  let labelY = 0;
  let labelBlur = 0;

  if (scrollProgress < labelExitStart) {
    // Fully visible
    labelOpacity = 1;
    labelY = -scrollProgress * 18;
    labelBlur = 0;
  } else if (scrollProgress >= labelExitStart && scrollProgress < labelExitEnd) {
    const progress = (scrollProgress - labelExitStart) / (labelExitEnd - labelExitStart);
    const eased = Math.pow(progress, 2.2);
    labelOpacity = 1 - eased;
    labelY = -18 + (-eased * 60);
    labelBlur = eased * 12;
  } else {
    labelOpacity = 0;
    labelY = -78;
    labelBlur = 12;
  }
  
  // === TEXT ANIMATIONS ===
  // Layer 1: Intro paragraph (slowest drift - 0.6x speed)
  const text1ExitStart = 0.58;
  const text1ExitEnd = 0.78;
  
  let text1Opacity = 1;
  let text1Y = 0;
  let text1Blur = 0;

  if (scrollProgress < text1ExitStart) {
    // Fully visible
    text1Opacity = 1;
    text1Y = -scrollProgress * 30;
    text1Blur = 0;
  } else if (scrollProgress >= text1ExitStart && scrollProgress < text1ExitEnd) {
    const progress = (scrollProgress - text1ExitStart) / (text1ExitEnd - text1ExitStart);
    const eased = Math.pow(progress, 2);
    text1Opacity = 1 - eased;
    text1Y = -30 + (-eased * 90);
    text1Blur = eased * 15;
  } else {
    text1Opacity = 0;
    text1Y = -120;
    text1Blur = 15;
  }

  // Layer 2: Body copy (medium drift - 1.0x speed)
  const text2ExitStart = 0.62;
  const text2ExitEnd = 0.82;
  
  let text2Opacity = 1;
  let text2Y = 0;
  let text2Blur = 0;

  if (scrollProgress < text2ExitStart) {
    // Fully visible
    text2Opacity = 1;
    text2Y = -scrollProgress * 50;
    text2Blur = 0;
  } else if (scrollProgress >= text2ExitStart && scrollProgress < text2ExitEnd) {
    const progress = (scrollProgress - text2ExitStart) / (text2ExitEnd - text2ExitStart);
    const eased = Math.pow(progress, 2);
    text2Opacity = 1 - eased;
    text2Y = -50 + (-eased * 100);
    text2Blur = eased * 14;
  } else {
    text2Opacity = 0;
    text2Y = -150;
    text2Blur = 14;
  }

  // Layer 3: Headers (fastest drift - 1.4x speed)
  const text3ExitStart = 0.65;
  const text3ExitEnd = 0.85;
  
  let text3Opacity = 1;
  let text3Y = 0;
  let text3Blur = 0;

  if (scrollProgress < text3ExitStart) {
    // Fully visible
    text3Opacity = 1;
    text3Y = -scrollProgress * 70;
    text3Blur = 0;
  } else if (scrollProgress >= text3ExitStart && scrollProgress < text3ExitEnd) {
    const progress = (scrollProgress - text3ExitStart) / (text3ExitEnd - text3ExitStart);
    const eased = Math.pow(progress, 2);
    text3Opacity = 1 - eased;
    text3Y = -70 + (-eased * 110);
    text3Blur = eased * 12;
  } else {
    text3Opacity = 0;
    text3Y = -180;
    text3Blur = 12;
  }

  const transitionStyle = 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1), filter 0.7s cubic-bezier(0.16, 1, 0.3, 1)';

  // === IMAGE ANIMATIONS (for mobile parallax) ===
  const img1ExitStart = 0.70;
  const img1ExitEnd = 0.90;
  
  let img1Opacity = 0;
  let img1Y = 0;
  let img1Scale = 1;
  let img1Blur = 0;

  if (scrollProgress < img1ExitStart) {
    // Fully visible
    img1Opacity = 1;
    img1Y = 0;
    img1Scale = 1;
    img1Blur = 0;
  } else if (scrollProgress >= img1ExitStart && scrollProgress < img1ExitEnd) {
    const progress = (scrollProgress - img1ExitStart) / (img1ExitEnd - img1ExitStart);
    const eased = Math.pow(progress, 3);
    img1Opacity = 1 - eased;
    img1Y = -eased * (isMobileOrTablet ? 60 : 120);
    img1Scale = 1 - (eased * 0.15);
    img1Blur = eased * 2;
  } else {
    img1Opacity = 0;
    img1Y = isMobileOrTablet ? -60 : -120;
    img1Scale = 0.85;
    img1Blur = 6;
  }

  const img2ExitStart = 0.75;
  const img2ExitEnd = 0.95;
  
  let img2Opacity = 0;
  let img2Y = 0;
  let img2Scale = 1;
  let img2Blur = 0;

  if (scrollProgress < img2ExitStart) {
    // Fully visible
    img2Opacity = 1;
    img2Y = 0;
    img2Scale = 1;
    img2Blur = 0;
  } else if (scrollProgress >= img2ExitStart && scrollProgress < img2ExitEnd) {
    const progress = (scrollProgress - img2ExitStart) / (img2ExitEnd - img2ExitStart);
    const eased = Math.pow(progress, 3);
    img2Opacity = 1 - eased;
    img2Y = -eased * (isMobileOrTablet ? 60 : 120);
    img2Scale = 1 - (eased * 0.15);
    img2Blur = eased * 2;
  } else {
    img2Opacity = 0;
    img2Y = isMobileOrTablet ? -60 : -120;
    img2Scale = 0.85;
    img2Blur = 6;
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
          {/* Content Container - Dynamic width */}
          <div
            style={{
              width: '100%',
              maxWidth: '600px',
              margin: '0 auto'
            }}
          >
            {/* Top Label - Mobile Parallax with entrance */}
            {topLabel && (
              <div 
                className="w-full mb-[20px]"
                style={{
                  display: 'inline-block',
                  opacity: labelOpacity,
                  transform: `translateY(${labelY}px) scale(${0.92 + (labelOpacity * 0.08)})`,
                  filter: `blur(${labelBlur * 0.3}px)`,
                  transition: 'opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s cubic-bezier(0.22, 1, 0.36, 1), filter 0.8s cubic-bezier(0.22, 1, 0.36, 1)'
                }}
              >
                <div
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.35)',
                    padding: '8px 12px',
                    display: 'inline-block'
                  }}
                >
                  <div
                    className="rich-preview-content"
                    style={{
                      fontFamily: `'${fontFamily}',sans-serif`,
                      fontWeight: topLabelFontWeight,
                      fontSize: topLabelFontSize,
                      color: textPrimary,
                      letterSpacing: '1.65px',
                      textTransform: 'uppercase'
                    }}
                  >
                    {topLabel}
                  </div>
                </div>
              </div>
            )}

            {/* First Body Copy (if not associated with header) - Mobile Parallax with entrance */}
            {shouldRenderFirstBodyCopy && !skipFirstBodyCopy && (
              <div 
                className="w-full mb-[20px]"
                style={{
                  display: 'inline-block',
                  opacity: text1Opacity,
                  transform: `translateY(${text1Y}px) scale(${0.90 + (text1Opacity * 0.10)})`,
                  filter: `blur(${text1Blur * 0.4}px)`,
                  transition: 'opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1), transform 0.9s cubic-bezier(0.22, 1, 0.36, 1), filter 0.9s cubic-bezier(0.22, 1, 0.36, 1)'
                }}
              >
                <div
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.35)',
                    padding: '12px 16px',
                    display: 'inline-block'
                  }}
                >
                  <div
                    style={{
                      fontFamily: `'${fontFamily}',sans-serif`,
                      fontWeight: '200',
                      fontSize: '18px',
                      lineHeight: '27px',
                      color: textPrimary
                    }}
                    dangerouslySetInnerHTML={{ __html: cleanedFirstBodyCopy }}
                  />
                </div>
              </div>
            )}

            {/* Image 1 - Mobile Inline with Parallax entrance */}
            {hasImage1 && (
              <EFXWrapper
                glitchEnabled={efx.glitchEnabled}
                blurEnabled={efx.blurEnabled}
                chromaticEnabled={efx.chromaticEnabled}
                shakeEnabled={efx.shakeEnabled}
                distortEnabled={efx.distortEnabled}
              >
                <div 
                  className="w-full mb-[20px]" 
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'center',
                    opacity: img1Opacity,
                    transform: `translateY(${img1Y}px) scale(${img1Scale})`,
                    filter: `blur(${img1Blur * 0.2}px)`,
                    transition: 'opacity 1s cubic-bezier(0.22, 1, 0.36, 1), transform 1s cubic-bezier(0.22, 1, 0.36, 1), filter 1s cubic-bezier(0.22, 1, 0.36, 1)'
                  }}
                >
                  <img 
                    alt="" 
                    className="w-full object-cover rounded-[4px]" 
                    style={{ 
                      objectFit: image1Fit,
                      maxWidth: '500px',
                      aspectRatio: '3/4'
                    }}
                    src={img1Src} 
                  />
                </div>
              </EFXWrapper>
            )}

            {/* Headers and Body Copies - Mobile Parallax with entrance */}
            {paragraphHeaders?.map((header, index) => {
              const bodyCopy = bodyCopies?.find(b => b.afterHeaderId === header.id);
              
              // Staggered scroll-based animation
              const baseStart = 0.15 + (index * 0.08);
              const baseEnd = baseStart + 0.20;
              
              let itemOpacity = 0;
              let itemY = 0;
              let itemScale = 1;
              let itemBlur = 0;
              
              if (scrollProgress < baseStart) {
                itemOpacity = 0;
                itemY = 60;
                itemScale = 0.88;
                itemBlur = 6;
              } else if (scrollProgress >= baseStart && scrollProgress < baseEnd) {
                const progress = (scrollProgress - baseStart) / (baseEnd - baseStart);
                const eased = 1 - Math.pow(1 - progress, 2.5);
                itemOpacity = eased;
                itemY = (1 - eased) * 60;
                itemScale = 0.88 + (eased * 0.12);
                itemBlur = (1 - eased) * 6;
              } else {
                itemOpacity = 1;
                itemY = 0;
                itemScale = 1;
                itemBlur = 0;
              }
              
              return (
                <div key={header.id} className="w-full mb-[20px]">
                  {header.text && (
                    <div 
                      className="mb-[8px]"
                      style={{
                        display: 'inline-block',
                        opacity: itemOpacity,
                        transform: `translateY(${itemY}px) scale(${itemScale})`,
                        filter: `blur(${itemBlur * 0.3}px)`,
                        transition: 'opacity 0.85s cubic-bezier(0.22, 1, 0.36, 1), transform 0.85s cubic-bezier(0.22, 1, 0.36, 1), filter 0.85s cubic-bezier(0.22, 1, 0.36, 1)'
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: 'rgba(0, 0, 0, 0.35)',
                          padding: '6px 10px',
                          display: 'inline-block'
                        }}
                      >
                        <div
                          style={{
                            fontFamily: `'${fontFamily}',sans-serif`,
                            fontWeight: '600',
                            fontSize: '14px',
                            lineHeight: '20px',
                            color: '#11ff49'
                          }}
                        >
                          {header.text}
                        </div>
                      </div>
                    </div>
                  )}
                  {bodyCopy?.text && (
                    <div 
                      style={{ 
                        display: 'inline-block',
                        opacity: itemOpacity,
                        transform: `translateY(${itemY * 0.85}px) scale(${0.90 + (itemOpacity * 0.10)})`,
                        filter: `blur(${itemBlur * 0.4}px)`,
                        transition: 'opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1), transform 0.9s cubic-bezier(0.22, 1, 0.36, 1), filter 0.9s cubic-bezier(0.22, 1, 0.36, 1)'
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: 'rgba(0, 0, 0, 0.35)',
                          padding: '10px 14px',
                          display: 'inline-block'
                        }}
                      >
                        <div
                          style={{
                            fontFamily: `'${fontFamily}',sans-serif`,
                            fontWeight: '300',
                            fontSize: '14px',
                            lineHeight: '21px',
                            color: textPrimary
                          }}
                          dangerouslySetInnerHTML={{ __html: bodyCopy.text }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Image 2 - Mobile Inline (after first header) with Parallax entrance */}
            {showBothImages && (
              <EFXWrapper
                glitchEnabled={efx.glitchEnabled}
                blurEnabled={efx.blurEnabled}
                chromaticEnabled={efx.chromaticEnabled}
                shakeEnabled={efx.shakeEnabled}
                distortEnabled={efx.distortEnabled}
              >
                <div 
                  className="w-full mb-[20px]" 
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'center',
                    opacity: img2Opacity,
                    transform: `translateY(${img2Y}px) scale(${img2Scale})`,
                    filter: `blur(${img2Blur * 0.2}px)`,
                    transition: 'opacity 1.05s cubic-bezier(0.22, 1, 0.36, 1), transform 1.05s cubic-bezier(0.22, 1, 0.36, 1), filter 1.05s cubic-bezier(0.22, 1, 0.36, 1)'
                  }}
                >
                  <img 
                    alt="" 
                    className="w-full object-cover rounded-[4px]" 
                    style={{ 
                      objectFit: image2Fit,
                      maxWidth: '500px',
                      aspectRatio: '3/4'
                    }}
                    src={img2Src} 
                  />
                </div>
              </EFXWrapper>
            )}
          </div>
        </div>
      ) : (
        <>
          {/* Desktop Horizontal Layout */}
          {topLabel && (
            <div 
              className="absolute left-[80px] top-[80px]"
              style={{
                opacity: labelOpacity,
                transform: `translateY(${labelY}px)`,
                filter: `blur(${labelBlur}px)`,
                transition: transitionStyle,
                maxWidth: '600px',
                overflow: 'visible'
              }}
            >
              <div
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.35)',
                  padding: '8px 12px',
                  display: 'inline-block'
                }}
              >
                <div 
                  className="leading-[normal] not-italic relative"
                  style={{
                    fontFamily: fontFamily + ',sans-serif',
                    fontWeight: topLabelFontWeight,
                    fontSize: topLabelFontSize,
                    color: textPrimary,
                    letterSpacing: '1.65px',
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {topLabel}
                </div>
              </div>
            </div>
          )}
          
          <div 
            className="absolute left-[80px] top-[168px] w-[661px]"
            style={{
              opacity: text1Opacity,
              transform: `translateY(${text1Y}px)`,
              filter: `blur(${text1Blur}px)`,
              transition: transitionStyle
            }}
          >
            <div className="font-['Inter:Regular',sans-serif] font-normal leading-[0] text-[#f1f0eb] text-[0px] w-[661px] whitespace-pre-wrap rich-preview-content">
              {shouldRenderFirstBodyCopy && !skipFirstBodyCopy && (
                <>
                  <div style={{ display: 'inline-block', backgroundColor: 'rgba(0, 0, 0, 0.35)', padding: '12px 16px' }}>
                    <div 
                      className="leading-[normal] mb-0 text-[24px] font-['Inter:Extra_Light',sans-serif] font-extralight"
                      dangerouslySetInnerHTML={{ __html: cleanedFirstBodyCopy }}
                    />
                  </div>
                  <p className="leading-[normal] mb-0 text-[15px]">&nbsp;</p>
                </>
              )}
              
              {paragraphHeaders?.map((header) => {
                const bodyCopy = bodyCopies?.find(b => b.afterHeaderId === header.id);
                const showHeader = !!header.text;
                const showBody = !!bodyCopy?.text;
                return (
                  <div key={header.id}>
                    {(showHeader || showBody) && (
                      <>
                        <p className="leading-[normal] mb-0 text-[18px]" style={{ lineHeight: '25px' }}>&nbsp;</p>
                        {showHeader && (
                          <div style={{ display: 'inline-block', backgroundColor: 'rgba(0, 0, 0, 0.35)', padding: '6px 10px' }}>
                            <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] mb-[4px] text-[#11ff49] text-[19px]">{header.text}</p>
                          </div>
                        )}
                        {showBody && (
                          <>
                            <div style={{ display: 'inline-block', backgroundColor: 'rgba(0, 0, 0, 0.35)', padding: '10px 14px', marginTop: showHeader ? '4px' : undefined }}>
                              <div 
                                className="mb-0 text-[18px] rich-preview-content"
                                style={{ lineHeight: '25px' }}
                                dangerouslySetInnerHTML={{ __html: bodyCopy.text }}
                              />
                            </div>
                            <p className="leading-[normal] mb-0 text-[18px]">&nbsp;</p>
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
