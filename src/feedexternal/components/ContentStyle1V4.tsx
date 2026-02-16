import { ImageWithFallback } from './figma/ImageWithFallback';
import { AnimatedTextLayer } from './AnimatedTextLayer';
import { AnimatedImageLayer } from './AnimatedImageLayer';
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

interface ContentStyle1V4Props {
  topLabel?: string;
  introParagraph?: string;
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

function Frame1({ introParagraph, paragraphHeaders, bodyCopies, topLabel }: {
  introParagraph?: string;
  paragraphHeaders?: ParagraphHeader[];
  bodyCopies?: BodyCopy[];
  topLabel?: string;
}) {
  const defaultIntro = `In the traditional creative world, your Intellectual Property (IP) is a ghost. It lives in the metadata of a Photoshop file, the "sent" folder of an email thread, or the timestamp of a voice memo.`;
  let intro = introParagraph || defaultIntro;
  
  // Remove topLabel from intro paragraph if it starts with it (to prevent duplication)
  if (topLabel && intro) {
    const topLabelText = topLabel.trim().toUpperCase();
    const introText = intro.replace(/<[^>]*>/g, '').trim().toUpperCase();
    if (introText.startsWith(topLabelText)) {
      const regex = new RegExp(`^(<[^>]*>)*${topLabel.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(<[^>]*>)*`, 'i');
      intro = intro.replace(regex, '').trim();
    }
  }
  
  return (
    <div className="absolute left-[80px] top-[138px] w-[661px] h-[635px]">
      <div className="flex flex-col gap-[35px] text-[#f1f0eb] not-italic whitespace-pre-wrap rich-preview-content">
        <div 
          className="font-['Inter:Extra_Light',sans-serif] font-extralight leading-[normal] text-[24px]"
          dangerouslySetInnerHTML={{ __html: intro }}
        />
        <div className="font-['Inter:Regular',sans-serif] font-normal leading-[0] text-[0px] w-[661px]">
          {paragraphHeaders?.map((header) => {
            const bodyCopy = bodyCopies?.find(b => b.afterHeaderId === header.id);
            return (
              <div key={header.id}>
                {header.text && (
                  <>
                    <p className="leading-[normal] mb-0 text-[18px]" style={{ lineHeight: '25px' }}>&nbsp;</p>
                    <h3 className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] mb-[4px] text-[#11ff49] text-[22px]">{header.text}</h3>
                    {bodyCopy?.text && (
                      <>
                        <div 
                          className="leading-[normal] mb-0 text-[18px]"
                          style={{ lineHeight: '25px' }}
                          dangerouslySetInnerHTML={{ __html: bodyCopy.text }}
                        />
                        <p className="leading-[normal] mb-0 text-[18px]" style={{ height: '18px' }}>&nbsp;</p>
                      </>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
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
  const img1Src = image1 || '/__placeholder__.png';
  const img2Src = image2 || '/__placeholder__.png';
  const efxValues = efx || {};
  
  const hasImage1 = !!image1;
  const hasImage2 = !!image2;
  const onlyImage1 = hasImage1 && !hasImage2;
  const onlyImage2 = !hasImage1 && hasImage2;
  
  return (
    <>
      {/* Image 1 - Independent parallax layer */}
      {(hasImage1 || !hasImage2) && (
        <AnimatedImageLayer layer={1}>
          <div 
            className="absolute" 
            style={{
              left: onlyImage1 ? '772px' : '772px',
              top: onlyImage1 ? '138px' : '139px',
              width: onlyImage1 ? '660px' : '322.5px',
              height: onlyImage1 ? '691px' : '428.147px',
              overflow: 'hidden',
              borderRadius: '3px'
            }}
            data-name="Male Designer 1"
          >
            <EFXWrapper
              glitchEnabled={!!efxValues.glitch}
              blurEnabled={!!efxValues.blur}
              chromaticEnabled={!!efxValues.chromatic}
              shakeEnabled={!!efxValues.shake}
              distortEnabled={!!efxValues.distort}
            >
              <div className="relative w-full h-full">
                <ImageWithFallback 
                  alt="" 
                  className="absolute inset-0 max-w-none pointer-events-none size-full rounded-[3px]" 
                  style={{ objectFit: image1Fit || 'cover' }}
                  src={img1Src} 
                />
              </div>
            </EFXWrapper>
          </div>
        </AnimatedImageLayer>
      )}
      
      {/* Image 2 - Independent parallax layer with different timing */}
      {(hasImage2 || !hasImage1) && (
        <AnimatedImageLayer layer={2}>
          <div 
            className="absolute" 
            style={{
              left: onlyImage2 ? '772px' : '1109.5px',
              top: onlyImage2 ? '138px' : '283px',
              width: onlyImage2 ? '660px' : '322.5px',
              height: onlyImage2 ? '691px' : '428.147px'
            }}
            data-name="Female Designer 1"
          >
            <EFXWrapper
              glitchEnabled={!!efxValues.glitch}
              blurEnabled={!!efxValues.blur}
              chromaticEnabled={!!efxValues.chromatic}
              shakeEnabled={!!efxValues.shake}
              distortEnabled={!!efxValues.distort}
            >
              <div className="relative w-full h-full">
                <ImageWithFallback 
                  alt="" 
                  className="absolute inset-0 max-w-none pointer-events-none size-full rounded-[3px]" 
                  style={{ objectFit: image2Fit || 'cover' }}
                  src={img2Src} 
                />
              </div>
            </EFXWrapper>
          </div>
        </AnimatedImageLayer>
      )}
    </>
  );
}

export default function ContentStyle1V4({
  topLabel,
  introParagraph,
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
}: ContentStyle1V4Props) {
  // Remove topLabel from intro paragraph if it starts with it (to prevent duplication)
  let cleanedIntroParagraph = introParagraph || '';
  if (topLabel && cleanedIntroParagraph) {
    const topLabelText = topLabel.trim().toUpperCase();
    const introText = cleanedIntroParagraph.replace(/<[^>]*>/g, '').trim().toUpperCase();
    if (introText.startsWith(topLabelText)) {
      const regex = new RegExp(`^(<[^>]*>)*${topLabel.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(<[^>]*>)*`, 'i');
      cleanedIntroParagraph = cleanedIntroParagraph.replace(regex, '').trim();
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
        if (!relParts.some(part => part.toLowerCase() === 'noopener')) relParts.push('noopener');
        if (!relParts.some(part => part.toLowerCase() === 'noreferrer')) relParts.push('noreferrer');
        const relValue = relParts.join(' ');
        next = next.replace(relMatch[0], `rel="${relValue}"`);
      } else {
        next = `${next} rel="noopener noreferrer"`;
      }
      return `<a${next}>`;
    });
  const standaloneBodyCopies = bodyCopies?.filter((bodyCopy) => {
    if (!bodyCopy.afterHeaderId) return true;
    if (!paragraphHeaders || paragraphHeaders.length === 0) return true;
    return !paragraphHeaders.some(header => header.id === bodyCopy.afterHeaderId);
  }) || [];
  
  return (
    <>
      {/* LOCKED BACKGROUND - Completely static, no animation */}
      <div className="bg-[#1a1a1a] absolute inset-0" data-name="Content – Style 1 Background" />
      
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
            {topLabel}
          </div>
        </div>
      )}
      
      {/* Layer 1: Intro paragraph (slowest drift) */}
      <AnimatedTextLayer layer={1}>
        <div className="absolute left-[80px] top-[138px] w-[661px]">
          <div className="flex flex-col gap-[35px] text-[#f1f0eb] not-italic whitespace-pre-wrap">
            <div 
              className="font-['Inter:Extra_Light',sans-serif] font-extralight leading-[normal] text-[24px]"
              dangerouslySetInnerHTML={{ __html: cleanedIntroParagraph }}
            />
          </div>
        </div>
      </AnimatedTextLayer>
      
      {/* Layer 2: Body copy text (medium drift) */}
      <AnimatedTextLayer layer={2}>
        <div className="absolute left-[80px] top-[138px] w-[661px]">
          <div className="flex flex-col gap-[35px] text-[#f1f0eb] not-italic whitespace-pre-wrap">
            {/* Empty space for intro paragraph positioning */}
            <div className="font-['Inter:Extra_Light',sans-serif] font-extralight leading-[normal] text-[24px]" style={{ opacity: 0, pointerEvents: 'none' }}>
              {introParagraph || ''}
            </div>
            
            <div className="font-['Inter:Regular',sans-serif] font-normal w-[661px]">
              {/* Only render body copies that DON'T have an afterHeaderId (orphaned body copies) */}
              {standaloneBodyCopies.map((bodyCopy) => {
                return (
                  <div key={bodyCopy.id}>
                    {bodyCopy.text && (
                      <>
                        <div 
                          className="leading-[normal] mb-0 text-[18px]"
                          style={{ lineHeight: '25px' }}
                          dangerouslySetInnerHTML={{ __html: ensureLinkTargets(bodyCopy.text) }}
                        />
                        <p className="leading-[normal] mb-0 text-[18px]">&nbsp;</p>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </AnimatedTextLayer>
      
      {/* Layer 3: Paragraph headers and their body copy (fastest drift) */}
      <AnimatedTextLayer layer={3}>
        <div className="absolute left-[80px] top-[138px] w-[661px]">
          <div className="flex flex-col gap-[35px] text-[#f1f0eb] not-italic whitespace-pre-wrap">
            {/* Empty space for intro and initial body copy positioning */}
            <div style={{ opacity: 0, pointerEvents: 'none' }}>
              <div className="font-['Inter:Extra_Light',sans-serif] font-extralight leading-[normal] text-[24px]">
                {introParagraph || ''}
              </div>
            </div>
            
            <div className="font-['Inter:Regular',sans-serif] font-normal w-[661px]">
              {/* Spacers for orphaned body copies in layer 2 */}
              {standaloneBodyCopies.map((bodyCopy) => {
                return (
                  <div key={bodyCopy.id}>
                    {bodyCopy.text && (
                      <>
                        <div className="leading-[normal] mb-0 text-[18px] rich-preview-content" style={{ lineHeight: '25px', opacity: 0, pointerEvents: 'none' }} dangerouslySetInnerHTML={{ __html: ensureLinkTargets(bodyCopy.text) }} />
                        <p className="leading-[normal] mb-0 text-[18px]" style={{ opacity: 0, pointerEvents: 'none' }}>&nbsp;</p>
                      </>
                    )}
                  </div>
                );
              })}
              
              {/* Actual visible paragraph headers with their attached body copies */}
              {paragraphHeaders?.map((header, index) => {
                const bodyCopy = bodyCopies?.find(b => b.afterHeaderId === header.id);
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
                              className="leading-[normal] mb-0 text-[18px] rich-preview-content"
                              style={{ lineHeight: '25px' }}
                              dangerouslySetInnerHTML={{ __html: ensureLinkTargets(bodyCopy.text) }}
                            />
                            <p className="leading-[normal] mb-0 text-[18px]" style={{ height: '18px' }}>&nbsp;</p>
                          </>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </AnimatedTextLayer>
      
      {/* Image layers with independent parallax animation */}
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
