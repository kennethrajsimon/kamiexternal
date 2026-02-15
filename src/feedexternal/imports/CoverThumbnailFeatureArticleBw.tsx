import svgPaths from "./svg-422nfspwoc";
import imgRectangle1540 from "../../assets/34c2e0eace15e343a1c923bac054f892ff3c7f6f.png";
import { MediaDisplay } from "../components/MediaDisplay";
import { useRef, useEffect, useState } from 'react';

interface CoverThumbnailFeatureArticleBwProps {
  category?: string;
  title?: string;
  coverImage?: string | null;
  imageFit?: 'cover' | 'contain';
  backgroundColor?: string;
  backgroundImage?: string | null;
  backgroundImageFit?: 'cover' | 'contain';
  backgroundText?: string;
  backgroundTextColor?: string;
  backgroundTextStyle?: 'fill' | 'stroke';
  iconCount1?: string;
  iconCount2?: string;
  showHeroImage?: boolean;
  showBackgroundText?: boolean;
  showBackgroundColor?: boolean;
}

function Frame({ coverImage, imageFit }: { coverImage?: string | null, imageFit?: 'cover' | 'contain' }) {
  return (
    <div className="-translate-x-1/2 absolute bottom-[0.32px] h-[750.677px] left-[calc(50%-0.5px)] w-[717px]">
      <div className="absolute h-[750.677px] left-[-4.35px] top-0 w-[721.345px]">
        <MediaDisplay
          src={coverImage || (imgRectangle1540 as any)}
          alt=""
          className="absolute inset-0 max-w-none pointer-events-none size-full"
          objectFit={imageFit || 'contain'}
        />
      </div>
    </div>
  );
}

export default function CoverThumbnailFeatureArticleBw({ category, title, coverImage, imageFit, backgroundColor, backgroundImage, backgroundImageFit, backgroundText, backgroundTextColor, backgroundTextStyle, iconCount1, iconCount2, showHeroImage, showBackgroundText, showBackgroundColor }: CoverThumbnailFeatureArticleBwProps) {
  const defaultColor = backgroundTextColor || '#f1f0eb';
  const textStyle = backgroundTextStyle === 'fill'
    ? { color: defaultColor }
    : {
      WebkitTextStroke: `2px ${defaultColor}`,
      WebkitTextFillColor: 'transparent',
      color: 'transparent'
    };

  const textRef = useRef<HTMLParagraphElement>(null);
  const [fontSize, setFontSize] = useState(815);
  const [hoveredIcon, setHoveredIcon] = useState<'heart' | 'plane' | null>(null);
  const [activeIcon, setActiveIcon] = useState<'heart' | 'plane' | null>(null);
  const heartCount = iconCount1 || '112';
  const planeCount = iconCount2 || '23';
  const maxWidth = 1351;

  useEffect(() => {
    const measure = () => {
      if (!textRef.current || !backgroundText) return;
      let currentSize = 7000;
      textRef.current.style.whiteSpace = 'nowrap';
      textRef.current.style.fontSize = `${currentSize}px`;
      while (textRef.current.scrollWidth > maxWidth && currentSize > 500) {
        currentSize -= 100;
        textRef.current.style.fontSize = `${currentSize}px`;
      }
      while (textRef.current.scrollWidth > maxWidth && currentSize > 50) {
        currentSize -= 10;
        textRef.current.style.fontSize = `${currentSize}px`;
      }
      while (textRef.current.scrollWidth > maxWidth && currentSize > 10) {
        currentSize -= 1;
        textRef.current.style.fontSize = `${currentSize}px`;
      }
      while (textRef.current.scrollWidth < maxWidth && currentSize < 7000) {
        const testSize = currentSize + 1;
        textRef.current.style.fontSize = `${testSize}px`;
        if (textRef.current.scrollWidth <= maxWidth) {
          currentSize = testSize;
        } else {
          textRef.current.style.fontSize = `${currentSize}px`;
          break;
        }
      }
      setFontSize(currentSize);
    };
    measure();
    const onResize = () => measure();
    window.addEventListener('resize', onResize);
    const ready = (document as any).fonts?.ready;
    if (ready && typeof ready.then === 'function') {
      ready.then(() => measure());
    }
    const t = setTimeout(measure, 0);
    return () => {
      window.removeEventListener('resize', onResize);
      clearTimeout(t);
    };
  }, [backgroundText]);

  return (
    <div className="relative" style={{ width: '1512px', height: '851px', backgroundColor: (showBackgroundColor !== false) ? (backgroundColor || '#1a1a1a') : '#1a1a1a' }} data-name="Cover Thumbnail – Feature Article BW">
      {backgroundImage && (
        <div className="absolute h-[851px] left-0 top-0 w-[1512px] overflow-hidden">
          <MediaDisplay
            src={backgroundImage}
            alt=""
            className="absolute inset-0 w-full h-full"
            objectFit={backgroundImageFit || 'cover'}
          />
        </div>
      )}
      {(showBackgroundText !== false) && (
        <div
          className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col h-[750px] justify-center left-[763.5px] not-italic text-center top-[calc(50%-0.5px)] w-[1351px]"
          style={{ lineHeight: '0', overflow: 'hidden', fontFamily: `'Humane 2.0', sans-serif` }}
        >
          <p
            ref={textRef}
            className="leading-[normal] whitespace-nowrap"
            style={{ ...textStyle, fontSize: `${fontSize}px` }}
            dangerouslySetInnerHTML={{ __html: backgroundText || 'BUTTERFLY' }}
          />
        </div>
      )}
      {(showHeroImage !== false) && <Frame coverImage={coverImage} imageFit={imageFit} />}
      <div className="absolute left-[80px] top-[650px] z-20 flex flex-col gap-[10px] items-start">
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-[#11ff49] opacity-70" style={{ marginLeft: '-9px', marginRight: '-9px', marginTop: '-8px', marginBottom: '-8px' }} />
          <p className="relative font-['Inter',sans-serif] font-light leading-[normal] not-italic text-[#1a1a1a] text-[13px] tracking-[1.3px] uppercase" dangerouslySetInnerHTML={{ __html: category || 'CATEGORY TYPE' }} />
        </div>
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-[#11ff49] opacity-70" style={{ marginLeft: '-9px', marginRight: '-9px', marginTop: '-6px', marginBottom: '-6px' }} />
          <p className="relative font-['Inter',sans-serif] font-light leading-[normal] not-italic text-[#1a1a1a] text-[30px] uppercase" dangerouslySetInnerHTML={{ __html: title || 'ENTER HEADLINE HERE' }} />
        </div>
        <div
          className="flex items-center gap-[22px]"
          style={{ color: '#f1f0eb' }}
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
            <svg className="block size-[30px]" fill="none" preserveAspectRatio="none" viewBox="0 0 30 30">
              <g id="heart">
                <path
                  clipRule="evenodd"
                  d={svgPaths.p2e417780}
                  fillRule="evenodd"
                  stroke={hoveredIcon === 'heart' || activeIcon === 'heart' ? '#11ff49' : '#f1f0eb'}
                  fill={activeIcon === 'heart' ? '#11ff49' : 'none'}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
              </g>
            </svg>
            <div className="text-[14px] leading-[normal]">{heartCount}</div>
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
            <svg className="block size-[30px]" fill="none" preserveAspectRatio="none" viewBox="0 0 30 30">
              <g id="send-01">
                <path
                  d={svgPaths.p3e23b940}
                  stroke={hoveredIcon === 'plane' || activeIcon === 'plane' ? '#11ff49' : '#f1f0eb'}
                  fill={activeIcon === 'plane' ? '#11ff49' : 'none'}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
              </g>
            </svg>
            <div className="text-[14px] leading-[normal]">{planeCount}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
