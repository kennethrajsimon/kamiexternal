import { RefObject } from 'react';
import { EFXWrapper } from './EFXWrapper';

interface ParagraphHeader {
  id: string;
  text: string;
}

interface BodyCopy {
  id: string;
  afterHeaderId?: string;
  text: string;
}

interface ContentStyle3V4Props {
  topLabel?: string;
  paragraphHeaders?: ParagraphHeader[];
  bodyCopies?: BodyCopy[];
  image1?: string | null;
  image2?: string | null;
  image1Fit?: 'cover' | 'contain';
  image2Fit?: 'cover' | 'contain';
  isAnimating?: boolean;
  fontFamily?: string;
  topLabelFontSize?: string;
  topLabelFontWeight?: string;
  textPrimary?: string;
  efx?: {
    glitch?: boolean;
    blur?: boolean;
    chromatic?: boolean;
    shake?: boolean;
    distort?: boolean;
  };
}

export default function ContentStyle3V4({ 
  topLabel,
  paragraphHeaders, 
  bodyCopies, 
  image1, 
  image2,
  image1Fit,
  image2Fit,
  isAnimating,
  fontFamily,
  topLabelFontSize,
  topLabelFontWeight,
  textPrimary,
  efx
}: ContentStyle3V4Props) {
  // This is a placeholder component for the properties panel preview
  // The actual V4 rendering is handled by the layer components in ContentStyle3V4Layers.tsx
  // which are used in ReadingModeV4 and ContentDashboardV4
  
  const firstBodyCopy = bodyCopies?.[0]?.text || '';
  
  // Simple logic: if there's a topLabel, skip the first body copy entirely if it contains the label
  let skipFirstBodyCopy = false;
  const sanitizeInlineStyles = (html: string) =>
    html.replace(/style="([^"]*)"/gi, (_match, styles) => {
      const colorMatch = styles.match(/color\s*:\s*([^;]+)\s*;?/i);
      const fontSizeMatch = styles.match(/font-size\s*:\s*([^;]+)\s*;?/i);
      if (!colorMatch && !fontSizeMatch) return '';
      const kept = [
        colorMatch ? `color: ${colorMatch[1].trim()};` : '',
        fontSizeMatch ? `font-size: ${fontSizeMatch[1].trim()};` : ''
      ].filter(Boolean).join(' ');
      return `style="${kept}"`;
    });
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
  let cleanedFirstBodyCopy = sanitizeInlineStyles(firstBodyCopy);
  
  if (topLabel && firstBodyCopy) {
    const labelToRemove = topLabel.trim();
    const plainText = firstBodyCopy.replace(/<[^>]+>/g, '').trim();
    if (plainText.toUpperCase().startsWith(labelToRemove.toUpperCase())) {
      skipFirstBodyCopy = true;
    }
  }
  
  // Only render first body copy if it's not associated with any header
  const shouldRenderFirstBodyCopy = !!cleanedFirstBodyCopy && !bodyCopies?.[0]?.afterHeaderId;
  
  return (
    <>
      {/* LOCKED BACKGROUND - Completely static, no animation */}
      <div className="bg-[#1a1a1a] absolute inset-0" data-name="Content – Style 3 Background" />
      
      {/* Top Label - Only shown on PAGE 2 (conditionally passed from parent) */}
      {topLabel && (
        <div className="absolute left-[80px] top-[80px]" style={{ maxWidth: '600px', overflow: 'visible', zIndex: 30 }}>
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
                fontFamily: fontFamily + ',sans-serif' || 'Inter,sans-serif',
                fontWeight: topLabelFontWeight || '700',
                fontSize: topLabelFontSize || '11px',
                color: textPrimary || '#f1f0eb',
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
      
      {/* Text content */}
      <div
        className="absolute left-[80px] w-[661px]"
        style={{ zIndex: 20, top: '168px' }}
      >
        <div className="font-['Inter',sans-serif] font-normal leading-[normal] text-[#f1f0eb] w-[661px] whitespace-pre-wrap rich-preview-content">
          {shouldRenderFirstBodyCopy && (
            <>
              <div style={{ display: 'inline-block', backgroundColor: '#1A1A1A', padding: '12px 16px' }}>
                <div 
                  className="leading-[normal] mb-0 text-[24px] font-['Inter:Extra_Light',sans-serif] font-extralight"
                  dangerouslySetInnerHTML={{ __html: ensureLinkTargets(cleanedFirstBodyCopy) }}
                />
              </div>
              <p className="leading-[normal] mb-0 text-[18px]">&nbsp;</p>
            </>
          )}
          
          {paragraphHeaders?.map((header) => {
            const bodyCopy = bodyCopies?.find(b => b.afterHeaderId === header.id);
            const sanitizedBodyText = sanitizeInlineStyles(bodyCopy?.text || '');
            const showHeader = !!header.text;
            const showBody = !!bodyCopy?.text;
            return (
              <div key={header.id}>
                {(showHeader || showBody) && (
                  <>
                    <p className="leading-[normal] mb-0 text-[18px]" style={{ lineHeight: '25px' }}>&nbsp;</p>
                    {showHeader && (
                      <p className="leading-[normal] mb-0 text-[18px]" style={{ lineHeight: '25px' }}>&nbsp;</p>
                    )}
                    {showHeader && (
                      <div style={{ display: 'inline-block', backgroundColor: '#1A1A1A', padding: '6px 10px' }}>
                        <h3 className="text-[22px] leading-[32px] font-semibold text-[#11ff49] mb-[4px] font-['Inter']">{header.text}</h3>
                      </div>
                    )}
                    {showBody && (
                      <>
                        <div style={{ display: 'inline-block', backgroundColor: '#1A1A1A', padding: '10px 14px', marginTop: showHeader ? '4px' : undefined }}>
                          <div 
                            className="mb-0 text-[18px]"
                            style={{ lineHeight: '25px' }}
                          dangerouslySetInnerHTML={{ __html: ensureLinkTargets(sanitizedBodyText) }}
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
      
      {/* Images - Static positioning for preview */}
      {image1 && (
        <div className="absolute left-[80px] top-[261px] w-[322.5px] h-[428.147px]" style={{ zIndex: 5 }}>
          <EFXWrapper
            glitchEnabled={!!efx?.glitch}
            blurEnabled={!!efx?.blur}
            chromaticEnabled={!!efx?.chromatic}
            shakeEnabled={!!efx?.shake}
            distortEnabled={!!efx?.distort}
          >
            <div className="relative w-full h-full">
              <img 
                alt="" 
                className="absolute inset-0 max-w-none pointer-events-none size-full rounded-[3px]" 
                style={{ objectFit: image1Fit || 'cover' }}
                src={image1} 
              />
            </div>
          </EFXWrapper>
        </div>
      )}
      
      {image2 && (
        <div className="absolute left-[calc(50%+16px)] top-[80px] w-[660px] h-[691px]" style={{ overflow: 'hidden', borderRadius: '3px', zIndex: 5 }}>
          <EFXWrapper
            glitchEnabled={!!efx?.glitch}
            blurEnabled={!!efx?.blur}
            chromaticEnabled={!!efx?.chromatic}
            shakeEnabled={!!efx?.shake}
            distortEnabled={!!efx?.distort}
          >
            <div className="relative w-full h-full">
              <img 
                alt="" 
                className="absolute inset-0 max-w-none pointer-events-none size-full rounded-[3px]" 
                style={{ objectFit: image2Fit || 'cover' }}
                src={image2} 
              />
            </div>
          </EFXWrapper>
        </div>
      )}
      <style>{`
        .rich-preview-content a {
          color: #11ff49;
          text-decoration: underline;
          cursor: pointer;
        }
        .rich-preview-content a:hover {
          opacity: 0.8;
        }
      `}</style>
    </>
  );
}
