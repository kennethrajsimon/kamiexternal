'use client';

import { RefObject, useEffect, useState } from 'react';
import { usePageScrollProgress } from '../../hooks/usePageScrollProgress';
import { useEFX } from '../EFXContext';
import { EFXWrapper } from '../EFXWrapper';
import { useIsMobileOrTablet } from '../../hooks/useMediaQuery';
import { FlipBoardText } from '../FlipBoardText';
import svgPaths from "../../imports/svg-0gx167fjgw";
const imgSoneiumLogo = '/__placeholder__.png';

interface ParagraphHeader {
  id: string;
  text: string;
}

interface BodyCopy {
  id: string;
  afterHeaderId?: string;
  text: string;
}

interface ContentStyle2V4LayersProps {
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

// Background Layer (completely static, no animation)
export function ContentStyle2BackgroundLayer() {
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
export function ContentStyle2ImageLayer({
  pageIndex,
  totalPages,
  scrollContainerRef,
  image1,
  image2,
  image1Fit = 'cover',
  image2Fit = 'cover'
}: ContentStyle2V4LayersProps) {
  const scrollProgress = usePageScrollProgress(scrollContainerRef, pageIndex, totalPages);
  const efx = useEFX();
  const isMobileOrTablet = useIsMobileOrTablet();
  
  // Image 1 animation
  const img1EnterStart = 0.12;
  const img1EnterEnd = 0.40;
  const img1ExitStart = 0.68;
  const img1ExitEnd = 0.88;
  
  let img1Opacity = 0;
  let img1Y = 0;
  let img1Scale = 1;
  let img1Blur = 0;

  if (scrollProgress < img1EnterEnd) {
    // Fully visible or entering
    if (scrollProgress < img1EnterStart) {
       img1Opacity = 1;
       img1Y = 0;
       img1Scale = 1.0;
       img1Blur = 0;
    } else {
       // Original entrance logic kept for compatibility if needed, but simplified
       // Actually, let's just make it visible throughout the "entrance" phase to avoid blankness
       const progress = (scrollProgress - img1EnterStart) / (img1EnterEnd - img1EnterStart);
       const eased = 1 - Math.pow(1 - progress, 3.5);
       
       // Blend from "Start" state to "End" state?
       // Current logic had it appear.
       // Let's just keep it visible.
       img1Opacity = 1;
       img1Y = 0;
       img1Scale = 1.0;
       img1Blur = 0;
    }
  } else if (scrollProgress >= img1EnterEnd && scrollProgress < img1ExitStart) {
    const progress = (scrollProgress - img1EnterEnd) / (img1ExitStart - img1EnterStart);
    img1Opacity = 1;
    img1Y = -progress * 30;
    img1Scale = 1.0 - (progress * 0.30);
    img1Blur = 0;
  } else if (scrollProgress >= img1ExitStart && scrollProgress < img1ExitEnd) {
    const progress = (scrollProgress - img1ExitStart) / (img1ExitEnd - img1ExitStart);
    const eased = Math.pow(progress, 2.5);
    
    img1Opacity = 1 - eased;
    img1Y = -30;
    img1Scale = 0.70 - (eased * 0.58);
    img1Blur = eased * 22;
  } else {
    img1Opacity = 0;
  }

  // Image 2 animation (slightly delayed)
  const img2EnterStart = 0.20;
  const img2EnterEnd = 0.48;
  const img2ExitStart = 0.72;
  const img2ExitEnd = 0.92;
  
  let img2Opacity = 0;
  let img2Y = 0;
  let img2Scale = 1;
  let img2Blur = 0;

  if (scrollProgress === 0) {
    img2Opacity = 1;
    img2Y = 0;
    img2Scale = 1.0;
    img2Blur = 0;
  } else if (scrollProgress < img2EnterStart) {
    img2Opacity = 0;
    img2Y = 180;
    img2Scale = 1.04;
    img2Blur = 14;
  } else if (scrollProgress >= img2EnterStart && scrollProgress < img2EnterEnd) {
    const progress = (scrollProgress - img2EnterStart) / (img2EnterEnd - img2EnterStart);
    const eased = 1 - Math.pow(1 - progress, 3.5);
    
    img2Opacity = eased;
    img2Y = (1 - eased) * 180;
    img2Scale = 1.04 - (eased * 0.04);
    img2Blur = (1 - eased) * 14;
  } else if (scrollProgress >= img2EnterEnd && scrollProgress < img2ExitStart) {
    const progress = (scrollProgress - img2EnterEnd) / (img2ExitStart - img2EnterStart);
    img2Opacity = 1;
    img2Y = -progress * 35;
    img2Scale = 1.0 - (progress * 0.32);
    img2Blur = 0;
  } else if (scrollProgress >= img2ExitStart && scrollProgress < img2ExitEnd) {
    const progress = (scrollProgress - img2ExitStart) / (img2ExitEnd - img2ExitStart);
    const eased = Math.pow(progress, 2.5);
    
    img2Opacity = 1 - eased;
    img2Y = -35;
    img2Scale = 0.68 - (eased * 0.58);
    img2Blur = eased * 24;
  } else {
    img2Opacity = 0;
  }

  return (
    <>
      {/* Desktop ONLY - Logos in Image Layer with parallax */}
      {!isMobileOrTablet && (
        <>
          {/* Image 1 - Camp Logo: match editor coordinates */}
          <EFXWrapper
            glitchEnabled={efx.glitchEnabled}
            blurEnabled={efx.blurEnabled}
            chromaticEnabled={efx.chromaticEnabled}
            shakeEnabled={efx.shakeEnabled}
            distortEnabled={efx.distortEnabled}
          >
            <div
              style={{
                position: 'absolute',
                left: '836px',
                top: '285.914px',
                width: '250px',
                height: '250px',
                backgroundColor: 'white',
                borderRadius: '8px',
                opacity: img1Opacity,
                transform: `translateY(${img1Y}px) scale(${img1Scale})`,
                filter: `blur(${img1Blur}px)`,
                transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), filter 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                pointerEvents: 'none'
              }}
            >
              {image1 ? (
                <img
                  alt=""
                  src={image1}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: image1Fit
                  }}
                />
              ) : (
                <div
                  className="rich-preview-content"
                  style={{
                    position: 'absolute',
                    left: '27.91px',
                    top: '97.67px',
                    width: '193.798px',
                    height: '54.527px'
                  }}
                >
                  <svg 
                    viewBox="0 0 193.798 54.527" 
                    fill="none" 
                    preserveAspectRatio="none"
                    style={{ display: 'block', width: '100%', height: '100%' }}
                  >
                    <g clipPath="url(#clip0_171_660)">
                      <path d={svgPaths.p2fd2b9f0} fill="black" />
                      <path d={svgPaths.p33be8d00} fill="black" />
                      <path d={svgPaths.p1cb4d480} fill="black" />
                      <path d={svgPaths.p35174e00} fill="#111111" />
                      <path d={svgPaths.p24d50b00} fill="#FF6D01" />
                    </g>
                    <defs>
                      <clipPath id="clip0_171_660">
                        <rect fill="white" height="54.527" width="193.798" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              )}
            </div>
          </EFXWrapper>

          {/* Image 2 - Soneium Logo: match editor coordinates */}
          <EFXWrapper
            glitchEnabled={efx.glitchEnabled}
            blurEnabled={efx.blurEnabled}
            chromaticEnabled={efx.chromaticEnabled}
            shakeEnabled={efx.shakeEnabled}
            distortEnabled={efx.distortEnabled}
          >
            <div
              style={{
                position: 'absolute',
                left: '1116px',
                top: '285.914px',
                width: '250px',
                height: '250px',
                backgroundColor: 'white',
                borderRadius: '8px',
                opacity: img2Opacity,
                transform: `translateY(${img2Y}px) scale(${img2Scale})`,
                filter: `blur(${img2Blur}px)`,
                transition: 'opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1), transform 0.85s cubic-bezier(0.16, 1, 0.3, 1), filter 0.85s cubic-bezier(0.16, 1, 0.3, 1)',
                pointerEvents: 'none'
              }}
            >
              {image2 ? (
                <img
                  alt=""
                  src={image2}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: image2Fit,
                    pointerEvents: 'none'
                  }}
                />
              ) : (
                <div
                  style={{
                    position: 'absolute',
                    left: '55.04px',
                    top: '34.11px',
                    width: '139.535px',
                    height: '182.171px'
                  }}
                >
                  <img
                    alt="Soneium Logo"
                    src={imgSoneiumLogo}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      pointerEvents: 'none'
                    }}
                  />
                </div>
              )}
            </div>
          </EFXWrapper>
        </>
      )}
    </>
  );
}

// Text Layer (scrolls naturally in the viewport mask)
export function ContentStyle2TextLayer({
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
}: ContentStyle2V4LayersProps) {
  const efx = useEFX();
  const scrollProgress = usePageScrollProgress(scrollContainerRef, pageIndex, totalPages);
  const isMobileOrTablet = useIsMobileOrTablet();
  const [labelAnimating, setLabelAnimating] = useState(false);

  useEffect(() => {
    if (!topLabel) {
      return;
    }
    const animationDuration = 1800;
    const intervalDuration = 8000;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const runAnimation = () => {
      if (timeoutId) clearTimeout(timeoutId);
      setLabelAnimating(true);
      timeoutId = setTimeout(() => setLabelAnimating(false), animationDuration);
    };

    runAnimation();
    const intervalId = setInterval(runAnimation, intervalDuration);
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [topLabel]);
  
  const firstBodyCopy = bodyCopies?.[0]?.text || '';
  
  // Only render first body copy if it's not associated with any header
  const shouldRenderFirstBodyCopy = firstBodyCopy && !bodyCopies?.[0]?.afterHeaderId;
  
  // Remove topLabel from first body copy if it starts with it
  let cleanedFirstBodyCopy = firstBodyCopy;
  if (firstBodyCopy) {
    const topLabelToStrip = topLabel || 'BEYOND THE SCREENSHOT';
    const topLabelText = topLabelToStrip.trim().toUpperCase();
    const bodyText = firstBodyCopy.replace(/<[^>]*>/g, '').trim().toUpperCase();
    if (bodyText.startsWith(topLabelText)) {
      const regex = new RegExp(`^(<[^>]*>)*${topLabelToStrip.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(<[^>]*>)*`, 'i');
      cleanedFirstBodyCopy = firstBodyCopy.replace(regex, '').trim();
    }
  }
  const ensureLinkTargets = (html: string) =>
    html.replace(/<a\b([^>]*?)>/gi, (_match, attrs) => {
      let next = attrs;
      if (/target\s*=/i.test(next)) {
        next = next.replace(/target\s*=\s*(['"])(.*?)\1/i, 'target="_blank"');
      } else {
        next = `${next} target="_blank"`;
      }
      const relMatch = next.match(/rel\s*=\s*(['"])(.*?)\1/i);
      if (relMatch) {
        const relParts = relMatch[2].split(/\s+/).filter(Boolean);
        if (!relParts.some((part: string) => part.toLowerCase() === 'noopener')) relParts.push('noopener');
        if (!relParts.some((part: string) => part.toLowerCase() === 'noreferrer')) relParts.push('noreferrer');
        const relValue = relParts.join(' ');
        next = next.replace(relMatch[0], `rel="${relValue}"`);
      } else {
        next = `${next} rel="noopener noreferrer"`;
      }
      return `<a${next}>`;
    });
  
  // Top label animation
  const labelExitStart = 0.60;
  const labelExitEnd = 0.78;
  
  let labelOpacity = 0;
  let labelY = 0;
  let labelBlur = 0;

  if (scrollProgress < labelExitStart) {
    // Fully visible (no enter animation)
    labelOpacity = 1;
    labelY = -scrollProgress * 30; // Parallax
    labelBlur = 0;
  } else if (scrollProgress >= labelExitStart && scrollProgress < labelExitEnd) {
    const progress = (scrollProgress - labelExitStart) / (labelExitEnd - labelExitStart);
    const eased = Math.pow(progress, 2);
    labelOpacity = 1 - eased;
    labelY = -30 + (-eased * (isMobileOrTablet ? 40 : 60));
    labelBlur = eased * (isMobileOrTablet ? 6 : 10);
  } else {
    labelOpacity = 0;
    labelY = isMobileOrTablet ? -70 : -90;
    labelBlur = isMobileOrTablet ? 6 : 10;
  }

  // Text content animation
  const textExitStart = 0.65;
  const textExitEnd = 0.82;
  
  let textOpacity = 0;
  let textY = 0;
  let textBlur = 0;
  let textScale = 1;

  if (scrollProgress < textExitStart) {
    // Fully visible (no enter animation)
    textOpacity = 1;
    textY = -scrollProgress * 40; // Parallax
    textBlur = 0;
    textScale = 1;
  } else if (scrollProgress >= textExitStart && scrollProgress < textExitEnd) {
    const progress = (scrollProgress - textExitStart) / (textExitEnd - textExitStart);
    const eased = Math.pow(progress, 2);
    textOpacity = 1 - eased;
    textY = -40 + (-eased * (isMobileOrTablet ? 50 : 85));
    textBlur = eased * (isMobileOrTablet ? 6 : 12);
    textScale = 1 - (eased * 0.10);
  } else {
    textOpacity = 0;
    textY = isMobileOrTablet ? -90 : -130;
    textBlur = isMobileOrTablet ? 6 : 12;
    textScale = 0.90;
  }
  
  // Logo animations for mobile
  const logo1ExitStart = 0.68;
  const logo1ExitEnd = 0.85;
  
  let logo1Opacity = 0;
  let logo1Y = 0;
  let logo1Scale = 1;
  let logo1Blur = 0;
  
  if (scrollProgress < logo1ExitStart) {
    logo1Opacity = 1;
    logo1Y = 0;
    logo1Scale = 1;
    logo1Blur = 0;
  } else if (scrollProgress >= logo1ExitStart && scrollProgress < logo1ExitEnd) {
    const progress = (scrollProgress - logo1ExitStart) / (logo1ExitEnd - logo1ExitStart);
    const eased = Math.pow(progress, 2.5);
    logo1Opacity = 1 - eased;
    logo1Y = -eased * 50;
    logo1Scale = 1 - (eased * 0.12);
    logo1Blur = eased * 5;
  } else {
    logo1Opacity = 0;
    logo1Y = -50;
    logo1Scale = 0.88;
    logo1Blur = 5;
  }
  
  const logo2ExitStart = 0.72;
  const logo2ExitEnd = 0.88;
  
  let logo2Opacity = 0;
  let logo2Y = 0;
  let logo2Scale = 1;
  let logo2Blur = 0;
  
  if (scrollProgress < logo2ExitStart) {
    logo2Opacity = 1;
    logo2Y = 0;
    logo2Scale = 1;
    logo2Blur = 0;
  } else if (scrollProgress >= logo2ExitStart && scrollProgress < logo2ExitEnd) {
    const progress = (scrollProgress - logo2ExitStart) / (logo2ExitEnd - logo2ExitStart);
    const eased = Math.pow(progress, 2.5);
    logo2Opacity = 1 - eased;
    logo2Y = -eased * 50;
    logo2Scale = 1 - (eased * 0.12);
    logo2Blur = eased * 5;
  } else {
    logo2Opacity = 0;
    logo2Y = -50;
    logo2Scale = 0.88;
    logo2Blur = 5;
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
            {/* Top Label - Mobile Parallax with entrance */}
            {topLabel && (
              <div 
                className="w-full mb-[20px]"
                style={{
                  opacity: labelOpacity,
                  transform: `translateY(${labelY}px) scale(${0.92 + (labelOpacity * 0.08)})`,
                  filter: `blur(${labelBlur * 0.3}px)`,
                  transition: 'opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s cubic-bezier(0.22, 1, 0.36, 1), filter 0.8s cubic-bezier(0.22, 1, 0.36, 1)'
                }}
              >
                <div
                  style={{
                    fontFamily: `'${fontFamily}',sans-serif`,
                    fontWeight: topLabelFontWeight,
                    fontSize: topLabelFontSize,
                    color: textPrimary,
                    letterSpacing: '1.65px',
                    textTransform: 'uppercase'
                  }}
                >
                  <FlipBoardText
                    text={topLabel}
                    isAnimating={labelAnimating}
                    fontFamily={fontFamily}
                    fontSize={topLabelFontSize}
                    fontWeight={topLabelFontWeight}
                    color={textPrimary}
                    lineHeight="normal"
                  />
                </div>
              </div>
            )}

            {/* First Body Copy - Mobile Parallax with entrance */}
            {shouldRenderFirstBodyCopy && (
              <div 
                className="w-full mb-[20px]"
                style={{
                  opacity: textOpacity,
                  transform: `translateY(${textY}px) scale(${0.90 + (textOpacity * 0.10)})`,
                  filter: `blur(${textBlur * 0.4}px)`,
                  transition: 'opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1), transform 0.9s cubic-bezier(0.22, 1, 0.36, 1), filter 0.9s cubic-bezier(0.22, 1, 0.36, 1)'
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
                  dangerouslySetInnerHTML={{ __html: ensureLinkTargets(cleanedFirstBodyCopy) }}
                />
              </div>
            )}

            {/* Logos - Mobile Inline with Parallax entrance and exit */}
            <div
              className="w-full mb-[20px]"
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '16px',
                flexWrap: 'wrap'
              }}
            >
              <EFXWrapper
                glitchEnabled={efx.glitchEnabled}
                blurEnabled={efx.blurEnabled}
                chromaticEnabled={efx.chromaticEnabled}
                shakeEnabled={efx.shakeEnabled}
                distortEnabled={efx.distortEnabled}
              >
                <div 
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'center',
                    opacity: logo1Opacity,
                    transform: `translateY(${logo1Y}px) scale(${logo1Scale})`,
                    filter: `blur(${logo1Blur * 0.3}px)`,
                    transition: 'opacity 0.95s cubic-bezier(0.22, 1, 0.36, 1), transform 0.95s cubic-bezier(0.22, 1, 0.36, 1), filter 0.95s cubic-bezier(0.22, 1, 0.36, 1)'
                  }}
                >
                  <div
                    style={{
                      position: 'relative',
                      width: 'min(250px, calc(100vw - 80px))',
                      height: 'min(250px, calc(100vw - 80px))',
                      backgroundColor: 'white',
                      borderRadius: '8px'
                    }}
                  >
                    {image1 ? (
                      <img
                        alt=""
                        src={image1}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: image1Fit
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          position: 'absolute',
                          left: '27.91px',
                          top: '97.67px',
                          width: '193.798px',
                          height: '54.527px'
                        }}
                      >
                        <svg 
                          viewBox="0 0 193.798 54.527" 
                          fill="none" 
                          preserveAspectRatio="none"
                          style={{ display: 'block', width: '100%', height: '100%' }}
                        >
                          <g clipPath="url(#clip0_171_660_mobile)">
                            <path d={svgPaths.p2fd2b9f0} fill="black" />
                            <path d={svgPaths.p33be8d00} fill="black" />
                            <path d={svgPaths.p1cb4d480} fill="black" />
                            <path d={svgPaths.p35174e00} fill="#111111" />
                            <path d={svgPaths.p24d50b00} fill="#FF6D01" />
                          </g>
                          <defs>
                            <clipPath id="clip0_171_660_mobile">
                              <rect fill="white" height="54.527" width="193.798" />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              </EFXWrapper>

              <EFXWrapper
                glitchEnabled={efx.glitchEnabled}
                blurEnabled={efx.blurEnabled}
                chromaticEnabled={efx.chromaticEnabled}
                shakeEnabled={efx.shakeEnabled}
                distortEnabled={efx.distortEnabled}
              >
                <div 
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'center',
                    opacity: logo2Opacity,
                    transform: `translateY(${logo2Y}px) scale(${logo2Scale})`,
                    filter: `blur(${logo2Blur * 0.3}px)`,
                    transition: 'opacity 1s cubic-bezier(0.22, 1, 0.36, 1), transform 1s cubic-bezier(0.22, 1, 0.36, 1), filter 1s cubic-bezier(0.22, 1, 0.36, 1)'
                  }}
                >
                  <div
                    style={{
                      position: 'relative',
                      width: 'min(250px, calc(100vw - 80px))',
                      height: 'min(250px, calc(100vw - 80px))',
                      backgroundColor: 'white',
                      borderRadius: '8px'
                    }}
                  >
                    {image2 ? (
                      <img
                        alt=""
                        src={image2}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: image2Fit
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          position: 'absolute',
                          left: '55.04px',
                          top: '34.11px',
                          width: '139.535px',
                          height: '182.171px'
                        }}
                      >
                        <img
                          alt="Soneium Logo"
                          src={imgSoneiumLogo}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </EFXWrapper>
            </div>

            {/* Headers and Body Copies - Mobile Parallax with entrance and exit */}
            {paragraphHeaders?.map((header, index) => {
              const bodyCopy = bodyCopies?.find(b => b.afterHeaderId === header.id);
              
              // Staggered scroll-based animation with exit only (no entrance to avoid flicker)
              const baseExitStart = 0.75 + (index * 0.05);
              const baseExitEnd = baseExitStart + 0.25; // Extended from 0.15 to 0.25 for slower fade
              
              let itemOpacity = 0;
              let itemY = 0;
              let itemScale = 1;
              let itemBlur = 0;
              
              if (scrollProgress < baseExitStart) {
                // Fully visible
                itemOpacity = 1;
                itemY = 0;
                itemScale = 1;
                itemBlur = 0;
              } else if (scrollProgress >= baseExitStart && scrollProgress < baseExitEnd) {
                // Exit animation - SLOWED DOWN with gentler easing
                const progress = (scrollProgress - baseExitStart) / (baseExitEnd - baseExitStart);
                const eased = Math.pow(progress, 1.8); // Reduced from 2.5 to 1.8 for slower fade
                itemOpacity = 1 - eased;
                itemY = -eased * 50;
                itemScale = 1 - (eased * 0.12);
                itemBlur = eased * 6;
              } else {
                // After exit
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
                        opacity: itemOpacity,
                        transform: `translateY(${itemY}px) scale(${itemScale})`,
                        filter: `blur(${itemBlur * 0.3}px)`,
                        transition: 'opacity 0.85s cubic-bezier(0.22, 1, 0.36, 1), transform 0.85s cubic-bezier(0.22, 1, 0.36, 1), filter 0.85s cubic-bezier(0.22, 1, 0.36, 1)'
                      }}
                    >
                      <div
                        className="rich-preview-content"
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
                  )}
                  {bodyCopy?.text && (
                    <div 
                      style={{
                        opacity: itemOpacity,
                        transform: `translateY(${itemY * 0.85}px) scale(${0.90 + (itemOpacity * 0.10)})`,
                        filter: `blur(${itemBlur * 0.4}px)`,
                        transition: 'opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1), transform 0.9s cubic-bezier(0.22, 1, 0.36, 1), filter 0.9s cubic-bezier(0.22, 1, 0.36, 1)'
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
                        dangerouslySetInnerHTML={{ __html: ensureLinkTargets(bodyCopy.text) }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <>
          {/* Desktop Layout */}
          {topLabel && (
            <div
              className="absolute left-[80px] top-[80px]"
              style={{
                maxWidth: '600px',
                overflow: 'hidden',
                opacity: labelOpacity,
                transform: `translateY(${labelY}px) scale(${0.92 + (labelOpacity * 0.08)})`,
                filter: `blur(${labelBlur * 0.3}px)`,
                transition: 'opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s cubic-bezier(0.22, 1, 0.36, 1), filter 0.8s cubic-bezier(0.22, 1, 0.36, 1)'
              }}
            >
              <div
                className="leading-[normal] not-italic relative"
                style={{
                  fontFamily: `'${fontFamily}',sans-serif`,
                  fontWeight: topLabelFontWeight,
                  fontSize: topLabelFontSize,
                  color: textPrimary,
                  letterSpacing: '1.65px',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                <FlipBoardText
                  text={topLabel}
                  isAnimating={labelAnimating}
                  fontFamily={fontFamily}
                  fontSize={topLabelFontSize}
                  fontWeight={topLabelFontWeight}
                  color={textPrimary}
                  lineHeight="normal"
                />
              </div>
            </div>
          )}
          {/* Text Content */}
          <div 
            className="absolute left-[80px] top-[168px] w-[661px]"
            style={{
              opacity: textOpacity,
              transform: `translateY(${textY}px)`,
              filter: `blur(${textBlur}px)`,
              transition: 'opacity 0.68s cubic-bezier(0.16, 1, 0.3, 1), transform 0.68s cubic-bezier(0.16, 1, 0.3, 1), filter 0.68s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            <div className="font-['Inter',sans-serif] font-normal leading-[normal] text-[#f1f0eb] w-[661px] whitespace-pre-wrap rich-preview-content">
              {shouldRenderFirstBodyCopy && (
                <>
                  <div 
                    className="leading-[normal] mb-0 text-[15px]"
                    style={{ lineHeight: '25px' }}
                    dangerouslySetInnerHTML={{ __html: ensureLinkTargets(cleanedFirstBodyCopy) }}
                  />
                  <p className="leading-[normal] mb-0 text-[15px]">&nbsp;</p>
                </>
              )}

              {bodyCopies?.filter((bodyCopy, index) => {
                const hasHeader = !!paragraphHeaders?.some(header => header.id === bodyCopy.afterHeaderId);
                return index !== 0 && (!bodyCopy.afterHeaderId || !hasHeader);
              }).map((bodyCopy) => (
                <div key={bodyCopy.id}>
                  {bodyCopy.text && (
                    <>
                      <div 
                        className="mb-0 text-[15px]"
                        style={{ lineHeight: '25px' }}
                        dangerouslySetInnerHTML={{ __html: ensureLinkTargets(bodyCopy.text) }}
                      />
                      <p className="leading-[normal] mb-0 text-[15px]">&nbsp;</p>
                    </>
                  )}
                </div>
              ))}
              
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
                          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] mb-[4px] text-[#11ff49] text-[19px]">{header.text}</p>
                        )}
                        {showBody && (
                          <>
                            <div 
                              className="mb-0 text-[18px]"
                              style={{ lineHeight: '25px' }}
                              dangerouslySetInnerHTML={{ __html: ensureLinkTargets(bodyCopy.text) }}
                            />
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
