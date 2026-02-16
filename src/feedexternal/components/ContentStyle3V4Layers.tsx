'use client';

import { useEffect, useState, RefObject } from 'react';
import { usePageScrollProgress } from '../hooks/usePageScrollProgress';
import { EFXWrapper } from './EFXWrapper';
import { useEFX } from './EFXContext';
import { useIsMobileOrTablet } from '../hooks/useMediaQuery';
import { FlipBoardText } from './FlipBoardText';
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

interface ContentStyle3V4LayersProps {
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

interface ContentStyle3BackgroundLayerProps {}

// Background Layer (completely static, no animation)
export function ContentStyle3BackgroundLayer() {
  return (
    <div 
      className="absolute inset-0 content-style-3-background-layer" 
      style={{ 
        backgroundColor: '#1a1a1a',
        pointerEvents: 'none'
      }} 
    />
  );
}

// Image Layer (animated via transforms based on scroll)
export function ContentStyle3ImageLayer({
  pageIndex,
  totalPages,
  scrollContainerRef,
  image1,
  image2,
  image1Fit = 'cover',
  image2Fit = 'cover'
}: ContentStyle3V4LayersProps) {
  const scrollProgress = usePageScrollProgress(scrollContainerRef, pageIndex, totalPages);
  const efx = useEFX(); // Get EFX settings from context
  const isMobileOrTablet = useIsMobileOrTablet();
  
  const normalize = (s?: string | null) => (s && typeof s === 'string' ? s.replace(/^\/src\/assets\//, '/assets/') : s || null);
  const img1Src = normalize(image1);
  const img2Src = normalize(image2);
  
  // Render any image that exists
  const hasImage1 = !!img1Src;
  const hasImage2 = !!img2Src;
  const showBothImages = hasImage1 && hasImage2;
  
  // === IMAGE 1 ANIMATION (Male Designer - left side) ===
  const img1EnterStart = 0.05;
  const img1EnterEnd = 0.35;
  const img1ExitStart = 0.70;
  const img1ExitEnd = 0.90;
  
  let img1Opacity = 0;
  let img1Y = 0;
  let img1Scale = 1;
  let img1Blur = 0;
  let img1Rotate = 0;

  // Unified animation for both desktop and mobile
  if (scrollProgress < img1ExitStart) {
    // Fully visible
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
  const img2ExitStart = 0.75;
  const img2ExitEnd = 0.95;
  
  let img2Opacity = 0;
  let img2Y = 0;
  let img2Scale = 1;
  let img2Blur = 0;
  let img2Rotate = 0;

  // Unified animation for both desktop and mobile
  if (scrollProgress < img2ExitStart) {
    // Fully visible
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
      {/* Images in Image Layer with parallax */}
      {/* Image 1 - Male Designer (left) */}
      {hasImage1 && (
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
              left: isMobileOrTablet ? '50%' : '772px',
              top: isMobileOrTablet ? '16px' : (showBothImages ? '261px' : '80px'),
              width: isMobileOrTablet ? 'min(660px, 92vw)' : (showBothImages ? '322.5px' : '660px'),
              height: showBothImages ? '428.147px' : '691px',
              opacity: img1Opacity,
              transform: `${isMobileOrTablet ? 'translateX(-50%) ' : ''}translateY(${img1Y}px) scale(${img1Scale}) rotate(${img1Rotate}deg)`,
              filter: `blur(${img1Blur}px)`,
              transition: 'opacity 0.95s cubic-bezier(0.16, 1, 0.3, 1), transform 0.95s cubic-bezier(0.16, 1, 0.3, 1), filter 0.95s cubic-bezier(0.16, 1, 0.3, 1)',
              pointerEvents: 'none'
            }}
          >
            <img 
              alt="" 
              className="absolute inset-0 max-w-none size-full rounded-[3px]" 
              style={{ objectFit: image1Fit }}
              src={img1Src} 
            />
          </div>
        </EFXWrapper>
      )}

      {/* Image 2 - Female Designer (right) */}
      {hasImage2 && (
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
              left: isMobileOrTablet ? '50%' : (showBothImages ? '1109.5px' : 'calc(50% + 16px)'),
              top: isMobileOrTablet ? '16px' : (showBothImages ? '283px' : '80px'),
              width: isMobileOrTablet ? 'min(660px, 92vw)' : (showBothImages ? '322.5px' : '660px'),
              height: showBothImages ? '428.147px' : '691px',
              opacity: img2Opacity,
              transform: `${isMobileOrTablet ? 'translateX(-50%) ' : ''}translateY(${img2Y}px) scale(${img2Scale}) rotate(${img2Rotate}deg)`,
              transition: 'opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1)',
              pointerEvents: 'none',
              overflow: 'hidden',
              borderRadius: '3px'
            }}
          >
            <img 
              alt="" 
              className="absolute inset-0 max-w-none size-full rounded-[3px]" 
              style={{ objectFit: image2Fit }}
              src={img2Src} 
            />
          </div>
        </EFXWrapper>
      )}
    </>
  );
}

// Text Layer (scrolls naturally in the viewport mask)
export function ContentStyle3TextLayer({
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
}: ContentStyle3V4LayersProps) {
  const scrollProgress = usePageScrollProgress(scrollContainerRef, pageIndex, totalPages);
  const isMobileOrTablet = useIsMobileOrTablet();
  const efx = useEFX();
  
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    const animationDuration = 2000;
    const pauseDuration = 6000; // 8 seconds total cycle (2s animation + 6s pause)
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
  
  const normalize = (s?: string | null) => {
    if (!s || typeof s !== 'string') return s || null;
    let out = s.replace(/^\/src\/assets\//, '/assets/');
    out = out.replace(/^https?:\/\/(?:localhost|127\.0\.0\.1):3001\//, '/');
    return out;
  };
  const img1Src = normalize(image1);
  const img2Src = normalize(image2);
  const hasImage1 = !!img1Src;
  const hasImage2 = !!img2Src;
  const showBothImages = hasImage1 && hasImage2;
  
  const firstBodyCopy = bodyCopies?.[0]?.text || '';
  // Only render first body copy if it's not associated with any header
  const shouldRenderFirstBodyCopy = firstBodyCopy && !bodyCopies?.[0]?.afterHeaderId;
  
  // Simple logic: if there's a topLabel, skip the first body copy entirely if it contains the label
  let skipFirstBodyCopy = false;
  let cleanedFirstBodyCopy = firstBodyCopy;
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
        if (!relParts.some(part => part.toLowerCase() === 'noopener')) relParts.push('noopener');
        if (!relParts.some(part => part.toLowerCase() === 'noreferrer')) relParts.push('noreferrer');
        const relValue = relParts.join(' ');
        next = next.replace(relMatch[0], `rel="${relValue}"`);
      } else {
        next = `${next} rel="noopener noreferrer"`;
      }
      return `<a${next}>`;
    });
  
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
  }

  // === PARAGRAPH HEADER 1 + BODY COPY 2-2 ANIMATION (Desktop) ===
  const header1EnterStart = 0.20;
  const header1EnterEnd = 0.45;
  const header1ExitStart = 0.68;
  const header1ExitEnd = 0.88;
  
  let header1Opacity = 0;
  let header1Y = 0;
  let header1Scale = 1;
  let header1Blur = 0;

  if (scrollProgress === 0) {
    header1Opacity = 1;
    header1Y = 0;
    header1Scale = 1;
    header1Blur = 0;
  } else if (scrollProgress < header1EnterStart) {
    header1Opacity = 0;
    header1Y = 100;
    header1Scale = 0.90;
    header1Blur = 10;
  } else if (scrollProgress >= header1EnterStart && scrollProgress < header1EnterEnd) {
    const progress = (scrollProgress - header1EnterStart) / (header1EnterEnd - header1EnterStart);
    const eased = 1 - Math.pow(1 - progress, 3);
    header1Opacity = eased;
    header1Y = (1 - eased) * 100;
    header1Scale = 0.90 + (eased * 0.10);
    header1Blur = (1 - eased) * 10;
  } else if (scrollProgress >= header1EnterEnd && scrollProgress < header1ExitStart) {
    const progress = (scrollProgress - header1EnterEnd) / (header1ExitStart - header1EnterStart);
    header1Opacity = 1;
    header1Y = -progress * 45;
    header1Scale = 1;
    header1Blur = 0;
  } else if (scrollProgress >= header1ExitStart && scrollProgress < header1ExitEnd) {
    const progress = (scrollProgress - header1ExitStart) / (header1ExitEnd - header1ExitStart);
    const eased = Math.pow(progress, 2.5);
    header1Opacity = 1 - eased;
    header1Y = -45 + (-eased * 85);
    header1Scale = 1 - (eased * 0.10);
    header1Blur = eased * 14;
  } else {
    header1Opacity = 0;
    header1Y = -130;
    header1Scale = 0.90;
    header1Blur = 14;
  }

  // === PARAGRAPH HEADER 1 TEXT ANIMATION (Desktop - more dramatic) ===
  const headerTextEnterStart = 0.22;
  const headerTextEnterEnd = 0.48;
  const headerTextExitStart = 0.66;
  const headerTextExitEnd = 0.86;
  
  let headerTextOpacity = 0;
  let headerTextY = 0;
  let headerTextScale = 1;
  let headerTextBlur = 0;

  if (scrollProgress === 0) {
    headerTextOpacity = 1;
    headerTextY = 0;
    headerTextScale = 1;
    headerTextBlur = 0;
  } else if (scrollProgress < headerTextEnterStart) {
    headerTextOpacity = 0;
    headerTextY = 50;
    headerTextScale = 0.88;
    headerTextBlur = 8;
  } else if (scrollProgress >= headerTextEnterStart && scrollProgress < headerTextEnterEnd) {
    const progress = (scrollProgress - headerTextEnterStart) / (headerTextEnterEnd - headerTextEnterStart);
    const eased = 1 - Math.pow(1 - progress, 2.8);
    headerTextOpacity = eased;
    headerTextY = (1 - eased) * 50;
    headerTextScale = 0.88 + (eased * 0.12);
    headerTextBlur = (1 - eased) * 8;
  } else if (scrollProgress >= headerTextEnterEnd && scrollProgress < headerTextExitStart) {
    const progress = (scrollProgress - headerTextEnterEnd) / (headerTextExitStart - headerTextEnterStart);
    headerTextOpacity = 1;
    headerTextY = -progress * 25;
    headerTextScale = 1;
    headerTextBlur = 0;
  } else if (scrollProgress >= headerTextExitStart && scrollProgress < headerTextExitEnd) {
    const progress = (scrollProgress - headerTextExitStart) / (headerTextExitEnd - headerTextExitStart);
    const eased = Math.pow(progress, 2.2);
    headerTextOpacity = 1 - eased;
    headerTextY = -25 + (-eased * 55);
    headerTextScale = 1 - (eased * 0.12);
    headerTextBlur = eased * 11;
  } else {
    headerTextOpacity = 0;
    headerTextY = -80;
    headerTextScale = 0.88;
    headerTextBlur = 11;
  }

  // === BODY COPY 2-2 TEXT ANIMATION (Desktop - slightly delayed) ===
  const bodyTextEnterStart = 0.24;
  const bodyTextEnterEnd = 0.50;
  const bodyTextExitStart = 0.67;
  const bodyTextExitEnd = 0.87;
  
  let bodyTextOpacity = 0;
  let bodyTextY = 0;
  let bodyTextScale = 1;
  let bodyTextBlur = 0;

  if (scrollProgress === 0) {
    bodyTextOpacity = 1;
    bodyTextY = 0;
    bodyTextScale = 1;
    bodyTextBlur = 0;
  } else if (scrollProgress < bodyTextEnterStart) {
    bodyTextOpacity = 0;
    bodyTextY = 60;
    bodyTextScale = 0.85;
    bodyTextBlur = 10;
  } else if (scrollProgress >= bodyTextEnterStart && scrollProgress < bodyTextEnterEnd) {
    const progress = (scrollProgress - bodyTextEnterStart) / (bodyTextEnterEnd - bodyTextEnterStart);
    const eased = 1 - Math.pow(1 - progress, 3);
    bodyTextOpacity = eased;
    bodyTextY = (1 - eased) * 60;
    bodyTextScale = 0.85 + (eased * 0.15);
    bodyTextBlur = (1 - eased) * 10;
  } else if (scrollProgress >= bodyTextEnterEnd && scrollProgress < bodyTextExitStart) {
    const progress = (scrollProgress - bodyTextEnterEnd) / (bodyTextExitStart - bodyTextEnterStart);
    bodyTextOpacity = 1;
    bodyTextY = -progress * 30;
    bodyTextScale = 1;
    bodyTextBlur = 0;
  } else if (scrollProgress >= bodyTextExitStart && scrollProgress < bodyTextExitEnd) {
    const progress = (scrollProgress - bodyTextExitStart) / (bodyTextExitEnd - bodyTextExitStart);
    const eased = Math.pow(progress, 2.4);
    bodyTextOpacity = 1 - eased;
    bodyTextY = -30 + (-eased * 65);
    bodyTextScale = 1 - (eased * 0.15);
    bodyTextBlur = eased * 12;
  } else {
    bodyTextOpacity = 0;
    bodyTextY = -95;
    bodyTextScale = 0.85;
    bodyTextBlur = 12;
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
    img1Blur = eased * 6;
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
    img2Blur = eased * 6;
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
                    backgroundColor: '#1A1A1A',
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
                    backgroundColor: '#1A1A1A',
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
                    dangerouslySetInnerHTML={{ __html: ensureLinkTargets(cleanedFirstBodyCopy) }}
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
              const baseExitStart = 0.70 + (index * 0.05);
              const baseExitEnd = baseExitStart + 0.25;
              
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
                        display: 'inline-block',
                        opacity: itemOpacity,
                        transform: `translateY(${itemY}px) scale(${itemScale})`,
                        filter: `blur(${itemBlur * 0.3}px)`,
                        transition: 'opacity 0.85s cubic-bezier(0.22, 1, 0.36, 1), transform 0.85s cubic-bezier(0.22, 1, 0.36, 1), filter 0.85s cubic-bezier(0.22, 1, 0.36, 1)'
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: '#1A1A1A',
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
                          backgroundColor: '#1A1A1A',
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
                          dangerouslySetInnerHTML={{ __html: ensureLinkTargets(bodyCopy.text) }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Image 2 - Mobile Inline (after first header) with Parallax entrance */}
            {hasImage2 && (
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
                  backgroundColor: '#1A1A1A',
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
                    whiteSpace: 'nowrap'
                  }}
                >
                  <FlipBoardText 
                    text={topLabel.toUpperCase()} 
                    isAnimating={isAnimating}
                    fontFamily={fontFamily + ',sans-serif'}
                    fontSize={topLabelFontSize}
                    fontWeight={topLabelFontWeight}
                    color={textPrimary}
                    letterSpacing="1.65px"
                  />
                </div>
              </div>
            </div>
          )}
          
          <div 
            className="absolute left-[80px] w-[661px]"
            style={{
              top: '168px',
              opacity: text1Opacity,
              transform: `translateY(${text1Y}px)`,
              filter: `blur(${text1Blur}px)`,
              transition: transitionStyle
            }}
          >
            <div className="font-['Inter',sans-serif] font-normal leading-[normal] text-[#f1f0eb] w-[661px] whitespace-pre-wrap rich-preview-content">
              {shouldRenderFirstBodyCopy && !skipFirstBodyCopy && (
                <>
                  <div style={{ display: 'inline-block', backgroundColor: '#1A1A1A', padding: '12px 16px' }}>
                    <div 
                      className="leading-[normal] mb-0 text-[24px] font-['Inter:Extra_Light',sans-serif] font-extralight"
                      dangerouslySetInnerHTML={{ __html: ensureLinkTargets(cleanedFirstBodyCopy) }}
                    />
                  </div>
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
                      <p className="leading-[normal] mb-0 text-[15px]" style={{ lineHeight: '25px' }}>&nbsp;</p>
                      <div style={{ display: 'inline-block', backgroundColor: '#1A1A1A', padding: '10px 14px' }}>
                        <div 
                          className="mb-0 text-[18px] rich-preview-content"
                          style={{
                            lineHeight: '25px',
                            opacity: bodyTextOpacity,
                            transform: `translateY(${bodyTextY}px) scale(${bodyTextScale})`,
                            filter: `blur(${bodyTextBlur}px)`,
                            transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), filter 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
                          }}
                          dangerouslySetInnerHTML={{ __html: ensureLinkTargets(bodyCopy.text) }}
                        />
                      </div>
                      <p className="leading-[normal] mb-0 text-[15px]">&nbsp;</p>
                    </>
                  )}
                </div>
              ))}
              
              {paragraphHeaders?.map((header, index) => {
                const bodyCopy = bodyCopies?.find(b => b.afterHeaderId === header.id);
                const isFirstHeader = index === 0;
                const showHeader = !!header.text;
                const showBody = !!bodyCopy?.text;
                
                // Apply animations to ALL headers, not just the first one
                const itemOpacity = header1Opacity;
                const itemY = header1Y;
                const itemScale = header1Scale;
                const itemBlur = header1Blur;
                const itemTransition = 'opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1), transform 0.85s cubic-bezier(0.16, 1, 0.3, 1), filter 0.85s cubic-bezier(0.16, 1, 0.3, 1)';
                
                return (
                  <div 
                    key={header.id}
                    style={{
                      opacity: itemOpacity,
                      transform: `translateY(${itemY}px) scale(${itemScale})`,
                      filter: `blur(${itemBlur}px)`,
                      transition: itemTransition
                    }}
                  >
                    {(showHeader || showBody) && (
                      <>
                        <p className="leading-[normal] mb-0 text-[15px]" style={{ lineHeight: '25px' }}>&nbsp;</p>
                        {showHeader && (
                          <p className="leading-[normal] mb-0 text-[15px]" style={{ lineHeight: '25px' }}>&nbsp;</p>
                        )}
                        {showHeader && (
                          <div style={{ display: 'inline-block', backgroundColor: '#1A1A1A', padding: '6px 10px' }}>
                            <p 
                              className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] mb-[4px] text-[#11ff49] text-[22px]"
                              style={{
                                opacity: headerTextOpacity,
                                transform: `translateY(${headerTextY}px) scale(${headerTextScale})`,
                                filter: `blur(${headerTextBlur}px)`,
                                transition: 'opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1), transform 0.75s cubic-bezier(0.16, 1, 0.3, 1), filter 0.75s cubic-bezier(0.16, 1, 0.3, 1)'
                              }}
                            >
                              {header.text}
                            </p>
                          </div>
                        )}
                        {showBody && (
                          <>
                            <div style={{ display: 'inline-block', backgroundColor: '#1A1A1A', padding: '10px 14px', marginTop: showHeader ? '4px' : undefined }}>
                          <div 
                            className="mb-0 text-[18px] rich-preview-content"
                                style={{
                                  lineHeight: '25px',
                                  opacity: bodyTextOpacity,
                                  transform: `translateY(${bodyTextY}px) scale(${bodyTextScale})`,
                                  filter: `blur(${bodyTextBlur}px)`,
                                  transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), filter 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
                                }}
                                dangerouslySetInnerHTML={{ __html: ensureLinkTargets(bodyCopy.text) }}
                              />
                            </div>
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
      <style>{`
        .rich-preview-content {
          white-space: pre-wrap;
        }
        .rich-preview-content p {
          margin: 0 0 15px;
        }
        .rich-preview-content p:empty::before {
          content: "\\00a0";
          display: block;
        }
      `}</style>
    </>
  );
}
