import { ImageWithFallback } from './figma/ImageWithFallback';
import { AnimatedTextLayer } from './AnimatedTextLayer';
import { AnimatedImageLayer } from './AnimatedImageLayer';
import { EFXWrapper } from './EFXWrapper';

interface ContentStyle4V4Props {
  topLabel?: string;
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

export default function ContentStyle4V4({
  topLabel,
  image1,
  image2,
  image1Fit = 'cover',
  image2Fit = 'cover',
  caption1Title = 'ARTWORK TITLE',
  caption1Subtitle = 'Brief description',
  caption2Title = 'ARTWORK TITLE',
  caption2Subtitle = 'Brief description',
  showCaption1 = true,
  showCaption2 = true,
  isAnimating,
  fontFamily,
  topLabelFontSize,
  topLabelFontWeight,
  textPrimary,
  efx
}: ContentStyle4V4Props) {
  const img1Src = image1 || '/__placeholder__.png';
  const img2Src = image2 || '/__placeholder__.png';

  return (
    <>
      {/* LOCKED BACKGROUND - Completely static, no animation */}
      <div className="bg-[#1a1a1a] absolute inset-0" data-name="Content – Style 4 Background" />
      
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
      
      {/* Layer 1: Left image (independent parallax) */}
      <AnimatedImageLayer layer={1}>
        <div className="absolute left-[80px] top-[211px] w-[660px] h-[429px]" style={{ overflow: 'hidden', borderRadius: '3px' }} data-name="Left Image">
          <EFXWrapper
            glitchEnabled={!!efx?.glitch}
            blurEnabled={!!efx?.blur}
            chromaticEnabled={!!efx?.chromatic}
            shakeEnabled={!!efx?.shake}
            distortEnabled={!!efx?.distort}
          >
            <div className="relative w-full h-full">
              <ImageWithFallback 
                alt="" 
                className="absolute inset-0 max-w-none pointer-events-none size-full" 
                style={{ objectFit: image1Fit }}
                src={img1Src} 
              />
            </div>
          </EFXWrapper>
        </div>
      </AnimatedImageLayer>

      {/* Caption 1 */}
      {showCaption1 && (
        <AnimatedTextLayer layer={1}>
           <div className="absolute left-[80px] top-[650px] w-[660px]">
             <div className="font-['Inter'] font-bold text-[14px] text-[#f1f0eb]">{caption1Title}</div>
             <div className="font-['Inter'] font-normal text-[14px] text-[#9e9e9d]">{caption1Subtitle}</div>
           </div>
        </AnimatedTextLayer>
      )}

      {/* Layer 2: Right image (independent parallax) */}
      <AnimatedImageLayer layer={2}>
        <div className="absolute top-[211px] w-[660px] h-[429px]" style={{ left: '772px', overflow: 'hidden', borderRadius: '3px' }} data-name="Right Image">
          <EFXWrapper
            glitchEnabled={!!efx?.glitch}
            blurEnabled={!!efx?.blur}
            chromaticEnabled={!!efx?.chromatic}
            shakeEnabled={!!efx?.shake}
            distortEnabled={!!efx?.distort}
          >
            <div className="relative w-full h-full">
              <ImageWithFallback 
                alt="" 
                className="absolute inset-0 max-w-none pointer-events-none size-full" 
                style={{ objectFit: image2Fit }}
                src={img2Src} 
              />
            </div>
          </EFXWrapper>
        </div>
      </AnimatedImageLayer>

      {/* Caption 2 */}
      {showCaption2 && (
        <AnimatedTextLayer layer={2}>
           <div className="absolute top-[650px] w-[660px]" style={{ left: '772px' }}>
             <div className="font-['Inter'] font-bold text-[14px] text-[#f1f0eb]">{caption2Title}</div>
             <div className="font-['Inter'] font-normal text-[14px] text-[#9e9e9d]">{caption2Subtitle}</div>
           </div>
        </AnimatedTextLayer>
      )}
    </>
  );
}
