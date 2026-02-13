import svgPaths from "./svg-r3j943l7ua";

import _imgRectangle1540 from "../assets/36a8297e1a2ddc90473646931c66462380d62ee9.png";
const imgRectangle1540 = (_imgRectangle1540 as any).src || _imgRectangle1540;
import { MediaDisplay } from "../components/MediaDisplay";

import { useState } from 'react';
interface CoverThumbnailAnnouncement1Props {
  category?: string;
  title?: string;
  coverImage1?: string | null;
  imageFit1?: 'cover' | 'contain';
  coverImage2?: string | null;
  imageFit2?: 'cover' | 'contain';
  backgroundColor?: string;
  backgroundImage?: string | null;
  backgroundImageFit?: 'cover' | 'contain';
  iconCount1?: string;
  iconCount2?: string;
  showHeroImage?: boolean;
  showBackgroundColor?: boolean;
}

function Heart({ isHovered, onMouseEnter, onMouseLeave }: { isHovered?: boolean, onMouseEnter?: () => void, onMouseLeave?: () => void }) {
  return (
    <div 
      className="absolute left-[85px] size-[30px] top-[761px] cursor-pointer transition-transform z-20" 
      data-name="heart"
      style={{ transform: isHovered ? 'scale(1.15)' : 'scale(1)' }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 30">
        <g id="heart">
          <path clipRule="evenodd" d={svgPaths.p2e417780} fillRule="evenodd" id="Icon" stroke="#F1F0EB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Send({ isHovered, onMouseEnter, onMouseLeave }: { isHovered?: boolean, onMouseEnter?: () => void, onMouseLeave?: () => void }) {
  return (
    <div 
      className="absolute left-[132px] size-[30px] top-[761px] cursor-pointer transition-transform z-20" 
      data-name="send-01"
      style={{ transform: isHovered ? 'scale(1.15)' : 'scale(1)' }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 30">
        <g id="send-01">
          <path d={svgPaths.p3e23b940} id="Icon" stroke="#F1F0EB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

export default function CoverThumbnailAnnouncement1({ category, title, coverImage1, imageFit1, coverImage2, imageFit2, backgroundColor, backgroundImage, backgroundImageFit, iconCount1, iconCount2, showHeroImage, showBackgroundColor }: CoverThumbnailAnnouncement1Props) {
  const [isHeartHovered, setIsHeartHovered] = useState(false);
  const [isShareHovered, setIsShareHovered] = useState(false);
  const hasImage1 = !!coverImage1;
  const hasImage2 = !!coverImage2;
  const hasSingleImage = (hasImage1 && !hasImage2) || (!hasImage1 && hasImage2);
  const singleImageSrc = hasImage1 ? coverImage1 : coverImage2;
  const singleImageFit = hasImage1 ? imageFit1 : imageFit2;
  
  return (
    <div className="bg-[#1a1a1a] relative size-full" data-name="Cover Thumbnail – Announcement 2" style={{ backgroundColor: (showBackgroundColor !== false) ? (backgroundColor || '#1a1a1a') : '#1a1a1a' }}>
      {backgroundImage && (
        <div className="absolute h-full left-0 top-0 w-full overflow-hidden z-0">
          <MediaDisplay 
            src={backgroundImage} 
            alt="" 
            className="absolute inset-0 w-full h-full" 
            objectFit={backgroundImageFit || 'cover'} 
          />
        </div>
      )}
      {/* Icons and icon counts removed */}
      <p className="absolute font-['Inter:Light',sans-serif] font-light leading-[normal] left-[80px] not-italic text-[#11ff49] text-[13px] top-[643px] tracking-[1.3px] uppercase" dangerouslySetInnerHTML={{ __html: category || 'ANNOUNCEMENT:' }} />
      {/* Title with dynamic background */}
      <div className="absolute left-[80px] top-[673px] z-[9]">
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-[#1a1a1a] opacity-65" style={{ marginLeft: '-9px', marginRight: '-9px', marginTop: '-8px', marginBottom: '-8px' }} />
          <p className="relative font-['Inter:Light',sans-serif] font-light leading-[normal] not-italic text-[#f1f0eb] text-[30px]" dangerouslySetInnerHTML={{ __html: title || 'Hello Soneium!' }} />
        </div>
      </div>
      {(showHeroImage !== false) && (
        <>
          {coverImage1 && coverImage2 && (
            <div className="absolute h-[45px] left-[733px] top-[349.5px] w-[45.001px]">
              <div className="absolute inset-[-2.08%_-2.08%_0_-2.08%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 46.8713 45.9356">
                  <g id="Group 48096531">
                    <line id="Line 97" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="1.87174" x1="0.935872" x2="44.6121" y1="44.6121" y2="0.935872" />
                    <line id="Line 98" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="1.87174" transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 45.9354 45.9356)" x1="0.935872" x2="62.7034" y1="-0.935872" y2="-0.935872" />
                  </g>
                </svg>
              </div>
            </div>
          )}
          {hasSingleImage ? (
            <div className="absolute left-1/2 size-[400px] top-[171px] -translate-x-1/2">
              {singleImageSrc ? (
                <MediaDisplay 
                  src={singleImageSrc} 
                  alt="" 
                  className="absolute inset-0 max-w-none pointer-events-none size-full" 
                  objectFit={singleImageFit || 'cover'} 
                />
              ) : null}
            </div>
          ) : (
            <>
              <div className="absolute contents left-[287px] top-[171px]">
                <div className="absolute left-[287px] size-[400px] top-[171px]">
                  {coverImage1 ? (
                    <MediaDisplay 
                      src={coverImage1} 
                      alt="" 
                      className="absolute inset-0 max-w-none pointer-events-none size-full" 
                      objectFit={imageFit1 || 'cover'} 
                    />
                  ) : null}
                </div>
              </div>
              <div className="absolute contents left-[calc(50%+69px)] top-[171px]">
                <div className="absolute left-[calc(50%+69px)] size-[400px] top-[171px]" />
                <div className="absolute contents left-[calc(50%+143px)] top-[347px]">
                  {coverImage2 ? (
                    <div className="absolute left-[calc(50%+69px)] size-[400px] top-[171px]">
                      <MediaDisplay 
                        src={coverImage2} 
                        alt="" 
                        className="absolute inset-0 max-w-none pointer-events-none size-full" 
                        objectFit={imageFit2 || 'cover'} 
                      />
                    </div>
                  ) : (
                    <div className="absolute h-[63.717px] left-[calc(50%+143px)] top-[347px] w-[253px]" data-name="KAMi Logo">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 253 63.7167">
                        <g clipPath="url(#clip0_103_185)" id="KAMi Logo">
                          <path d={svgPaths.p22332200} fill="var(--fill-0, #F1F0EB)" id="Vector" />
                          <path d={svgPaths.p228bc080} fill="var(--fill-0, #F1F0EB)" id="Vector_2" />
                          <path d={svgPaths.p1155e7c0} fill="var(--fill-0, #F1F0EB)" id="Vector_3" />
                          <path d={svgPaths.p1785da80} fill="var(--fill-0, #F1F0EB)" id="Vector_4" />
                          <path d={svgPaths.p171a7300} fill="var(--fill-0, #F1F0EB)" id="Vector_5" />
                          <path d={svgPaths.p17b4ae80} fill="var(--fill-0, #F1F0EB)" id="Vector_6" />
                        </g>
                        <defs>
                          <clipPath id="clip0_103_185">
                            <rect fill="white" height="63.7167" width="253" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
