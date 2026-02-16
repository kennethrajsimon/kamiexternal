import { useEffect, useState } from 'react';
import svgPaths from "../imports/svg-pzcc96zt1v";
import { FlipBoardText } from './FlipBoardText';
import { EFXWrapper } from './EFXWrapper';
const PlaceholderBox = () => (
  <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] relative shrink-0">
    <div className="col-1 h-[250px] ml-0 mt-0 relative row-1 w-[250px] overflow-hidden rounded-[8px]" style={{ backgroundColor: '#2a2a2a', border: '1px solid #3a3a3a' }}>
      <div className="absolute inset-0 flex items-center justify-center text-[#9e9e9d]" style={{ fontSize: '12px' }}>
        IMAGE
      </div>
    </div>
  </div>
);
import { AnimatedTextLayer } from './AnimatedTextLayer';
import { AnimatedImageLayer } from './AnimatedImageLayer';

interface ParagraphHeader {
  id: string;
  text: string;
}

interface BodyCopy {
  id: string;
  afterHeaderId?: string;
  text: string;
}

interface ContentStyle2V4Props {
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

function Frame1({ paragraphHeaders, bodyCopies, topLabel }: { 
  paragraphHeaders?: ParagraphHeader[];
  bodyCopies?: BodyCopy[];
  topLabel?: string;
}) {
  const firstBodyCopy = bodyCopies?.[0]?.text || '';
  const sanitizeInlineStyles = (html: string) => html.replace(/style="[^"]*"/gi, '');
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
  
  // Remove topLabel from first body copy if it starts with it (to prevent duplication)
  let cleanedFirstBodyCopy = sanitizeInlineStyles(firstBodyCopy);
  if (topLabel && firstBodyCopy) {
    // Check if the first body copy starts with the topLabel (with or without HTML tags)
    const topLabelText = topLabel.trim().toUpperCase();
    const bodyText = firstBodyCopy.replace(/<[^>]*>/g, '').trim().toUpperCase();
    if (bodyText.startsWith(topLabelText)) {
      // Remove the topLabel text from the beginning
      const regex = new RegExp(`^(<[^>]*>)*${topLabel.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(<[^>]*>)*`, 'i');
      cleanedFirstBodyCopy = sanitizeInlineStyles(firstBodyCopy.replace(regex, '').trim());
    }
  }
  
  const shouldRenderFirstBodyCopy = !!cleanedFirstBodyCopy && !bodyCopies?.[0]?.afterHeaderId;
  
  return (
    <div className="absolute left-[80px] top-[138px] w-[661px] h-[635px]" style={{ zIndex: 20 }}>
      <div className="font-['Inter',sans-serif] font-normal leading-[normal] text-[#f1f0eb] w-[661px] whitespace-pre-wrap rich-preview-content">
        {shouldRenderFirstBodyCopy && (
          <>
            <div 
              className="leading-[normal] mb-0 text-[18px]"
              style={{ lineHeight: '25px' }}
              dangerouslySetInnerHTML={{ __html: ensureLinkTargets(cleanedFirstBodyCopy) }}
            />
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
                    <h3 className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] mb-[4px] text-[#11ff49] text-[22px]">{header.text}</h3>
                  )}
                  {showBody && (
                    <>
                      <div 
                        className="mb-0 text-[18px]"
                        style={{ lineHeight: '25px' }}
                        dangerouslySetInnerHTML={{ __html: ensureLinkTargets(sanitizedBodyText) }}
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
  );
}

function Group1({ image, imageFit, efx }: { 
  image?: string | null; 
  imageFit?: 'cover' | 'contain';
  efx?: {
    glitch?: boolean;
    blur?: boolean;
    chromatic?: boolean;
    shake?: boolean;
    distort?: boolean;
  };
}) {
  const hasCustomImage = !!image;
  const efxValues = efx || {};
  
  if (hasCustomImage) {
    return (
      <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] relative shrink-0">
        <div className="col-1 h-[250px] ml-0 mt-0 relative row-1 w-[250px] overflow-hidden rounded-[8px]" style={{ zIndex: 5, pointerEvents: 'none' }}>
          <EFXWrapper
            glitchEnabled={!!efxValues.glitch}
            blurEnabled={!!efxValues.blur}
            chromaticEnabled={!!efxValues.chromatic}
            shakeEnabled={!!efxValues.shake}
            distortEnabled={!!efxValues.distort}
          >
            <div className="relative w-full h-full">
              <img 
                alt="" 
                className="absolute inset-0 max-w-none pointer-events-none size-full rounded-[3px]" 
                style={{ objectFit: imageFit || 'cover' }}
                src={image} 
              />
            </div>
          </EFXWrapper>
        </div>
      </div>
    );
  }
  
  return (
    <div className="relative w-[250px] h-[250px]">
      <PlaceholderBox />
    </div>
  );
}

function Group2({ image, imageFit, efx }: { 
  image?: string | null; 
  imageFit?: 'cover' | 'contain';
  efx?: {
    glitch?: boolean;
    blur?: boolean;
    chromatic?: boolean;
    shake?: boolean;
    distort?: boolean;
  };
}) {
  const hasCustomImage = !!image;
  const efxValues = efx || {};
  
  if (hasCustomImage) {
    return (
      <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] relative shrink-0">
        <div className="col-1 h-[250px] ml-0 mt-0 relative row-1 w-[250px] overflow-hidden rounded-[8px]" style={{ zIndex: 5, pointerEvents: 'none' }}>
          <EFXWrapper
            glitchEnabled={!!efxValues.glitch}
            blurEnabled={!!efxValues.blur}
            chromaticEnabled={!!efxValues.chromatic}
            shakeEnabled={!!efxValues.shake}
            distortEnabled={!!efxValues.distort}
          >
            <div className="relative w-full h-full">
              <img 
                alt="" 
                className="absolute inset-0 max-w-none pointer-events-none size-full rounded-[3px]" 
                style={{ objectFit: imageFit || 'cover' }}
                src={image} 
              />
            </div>
          </EFXWrapper>
        </div>
      </div>
    );
  }
  
  return (
    <div className="relative w-[250px] h-[250px]">
      <PlaceholderBox />
    </div>
  );
}

function Component2ndPageContainer({ image1, image2, image1Fit, image2Fit, efx }: {
  image1?: string | null;
  image2?: string | null;
  image1Fit?: 'cover' | 'contain';
  image2Fit?: 'cover' | 'contain';
  efx?: {
    glitch?: boolean;
    blur?: boolean;
    chromatic?: boolean;
    shake?: boolean;
    distort?: boolean;
  };
}) {
  return (
    <>
      {/* Image 1 - Independent parallax layer */}
      <AnimatedImageLayer layer={1}>
        <div className="absolute left-[836px] top-[285.914px] w-[250px] h-[250px]">
          <Group1 image={image1} imageFit={image1Fit} efx={efx} />
        </div>
      </AnimatedImageLayer>
      
      {/* Image 2 - Independent parallax layer */}
      <AnimatedImageLayer layer={2}>
        <div className="absolute left-[1116px] top-[285.914px] w-[250px] h-[250px]">
          <Group2 image={image2} imageFit={image2Fit} efx={efx} />
        </div>
      </AnimatedImageLayer>
    </>
  );
}

export default function ContentStyle2V4({
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
}: ContentStyle2V4Props) {
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

  return (
    <>
      {/* LOCKED BACKGROUND - Completely static, no animation */}
      <div className="bg-[#1a1a1a] absolute inset-0" data-name="Content – Style 2 Background - V4" />
      
      {/* Top Label - Only shown on PAGE 2 (conditionally passed from parent) */}
      {topLabel && (
        <div className="absolute left-[80px] top-[80px]" style={{ maxWidth: '600px', overflow: 'hidden' }}>
          <div 
            className="leading-[normal] not-italic relative"
            style={{
              fontFamily: fontFamily + ',sans-serif' || 'Inter,sans-serif',
              fontWeight: topLabelFontWeight || '700',
              fontSize: topLabelFontSize || '11px',
              color: textPrimary || '#f1f0eb',
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
              fontFamily={fontFamily || 'Inter'}
              fontSize={topLabelFontSize || '11px'}
              fontWeight={topLabelFontWeight || '700'}
              color={textPrimary || '#f1f0eb'}
              lineHeight="normal"
            />
          </div>
        </div>
      )}
      
      {/* Text layer with fade animation */}
      <AnimatedTextLayer>
        <Frame1 paragraphHeaders={paragraphHeaders} bodyCopies={bodyCopies} topLabel={topLabel} />
      </AnimatedTextLayer>
      
      {/* Image layers with parallax animation */}
      <Component2ndPageContainer image1={image1} image2={image2} image1Fit={image1Fit} image2Fit={image2Fit} efx={efx} />
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
