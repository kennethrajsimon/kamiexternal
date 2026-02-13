import svgPaths from "./svg-q8xzalnf5b";
import _imgRectangle1540 from "../assets/c5ce4e47ab90e08210a558deb1f6e4cba2392c2a.png";
const imgRectangle1540 = (_imgRectangle1540 as any).src || _imgRectangle1540;
import { MediaDisplay } from "../components/MediaDisplay";
import { useState } from 'react';

interface CoverThumbnailCreatorSpotlightProps {
  category?: string;
  title?: string;
  coverImage?: string | null;
  imageFit?: 'cover' | 'contain';
  backgroundColor?: string;
  backgroundImage?: string | null;
  backgroundImageFit?: 'cover' | 'contain';
  iconCount1?: string;
  iconCount2?: string;
  showHeroImage?: boolean;
  showBackgroundColor?: boolean;
}

export default function CoverThumbnailCreatorSpotlight({ category, title, coverImage, imageFit, backgroundColor, backgroundImage, backgroundImageFit, iconCount1, iconCount2, showHeroImage, showBackgroundColor }: CoverThumbnailCreatorSpotlightProps) {
  const [hoveredIcon, setHoveredIcon] = useState<'heart' | 'plane' | null>(null);
  const [activeIcon, setActiveIcon] = useState<'heart' | 'plane' | null>(null);
  const heartCount = iconCount1 || '112';
  const planeCount = iconCount2 || '23';
  
  return (
    <div className="relative" style={{ width: '1512px', height: '851px', backgroundColor: (showBackgroundColor !== false) ? (backgroundColor || '#1a1a1a') : '#1a1a1a' }} data-name="Cover Thumbnail – Creator Spotlight">
      {backgroundImage && (
        <div className="absolute h-[851px] left-0 top-0 w-[1512px] overflow-hidden z-0">
          <MediaDisplay 
            src={backgroundImage} 
            alt="" 
            className="absolute inset-0 w-full h-full" 
            objectFit={backgroundImageFit || 'cover'} 
          />
        </div>
      )}
      {(showHeroImage !== false) && (
        <div className="absolute h-[851px] left-0 pointer-events-none top-0 w-[1512px]">
          <div className="absolute inset-0 overflow-hidden">
            <MediaDisplay 
              src={coverImage || imgRectangle1540} 
              alt="" 
              className="absolute h-[191.15%] left-[-2.78%] max-w-none top-[-91.15%] w-[106.04%]" 
              objectFit={imageFit || 'cover'} 
            />
          </div>
          <div aria-hidden="true" className="absolute border-[#f1f0eb] border-[1.099px] border-solid inset-0" />
        </div>
      )}
      <div className="absolute left-[80px] top-[655px] z-20 flex flex-col gap-[10px] items-start">
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-[#1a1a1a] opacity-65" style={{ marginLeft: '-9px', marginRight: '-9px', marginTop: '-8px', marginBottom: '-8px' }} />
          <p className="relative font-['Inter',sans-serif] font-light leading-[normal] not-italic text-[#11ff49] text-[13px] tracking-[1.3px] uppercase" dangerouslySetInnerHTML={{ __html: category || 'CATEGORY TYPE' }} />
        </div>
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-[#1a1a1a] opacity-65" style={{ marginLeft: '-9px', marginRight: '-9px', marginTop: '-6px', marginBottom: '-6px' }} />
          <p className="relative font-['Inter',sans-serif] font-light leading-[normal] not-italic text-[#f1f0eb] text-[30px] uppercase" dangerouslySetInnerHTML={{ __html: title || 'ENTER HEADLINE HERE' }} />
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
