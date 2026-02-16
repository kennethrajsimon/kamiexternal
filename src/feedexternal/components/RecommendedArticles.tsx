'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useIsMobileOrTablet } from '../hooks/useMediaQuery';
import CoverThumbnailFeatureArticleColour from '../imports/CoverThumbnailFeatureArticleColour';
import CoverThumbnailFeatureArticleBw from '../imports/CoverThumbnailFeatureArticleBw';
import CoverThumbnailCreatorSpotlight from '../imports/CoverThumbnailCreatorSpotlight';
import CoverThumbnailAnnouncement1 from '../imports/CoverThumbnailAnnouncement1';

interface CoverData {
  id: string;
  title: string;
  category: string;
  backgroundText: string;
  backgroundColor: string;
  backgroundTextColor: string;
  backgroundImage: string | null;
  backgroundImageFit: 'cover' | 'contain';
  imageFit: 'cover' | 'contain';
  imageFit2?: 'cover' | 'contain';
  heroImage: string | null;
  heroImage2: string | null;
  showHeroImage: boolean;
  showBackgroundText: boolean;
  showBackgroundColor: boolean;
  backgroundTextStyle: 'fill' | 'stroke';
  selectedStyle: number;
}

interface Article {
  id: string;
  title: string;
  category: string;
  coverData?: CoverData | null;
  coverImage?: string | null;
}

function CoverComposite({ data }: { data: CoverData }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(0.28);

  useEffect(() => {
    const update = () => {
      const el = containerRef.current;
      if (!el) return;
      const w = el.clientWidth;
      const h = el.clientHeight;
      const scaleX = w / 1512;
      const scaleY = h / 851;
      const s = Math.max(scaleX, scaleY);

      setScale(s);
    };
    update();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', update);
      return () => window.removeEventListener('resize', update);
    }
    const observer = new ResizeObserver(update);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden flex items-center justify-center">
      <div style={{ width: '1512px', height: '851px', transform: `scale(${scale})`, transformOrigin: 'center center', flexShrink: 0 }}>
        {data.selectedStyle === 2 ? (
          <CoverThumbnailFeatureArticleBw
            category={data.category}
            title={data.title}
            coverImage={data.heroImage}
            imageFit={data.imageFit}
            backgroundColor={data.backgroundColor}
            backgroundImage={data.backgroundImage}
            backgroundImageFit={data.backgroundImageFit}
            backgroundText={data.backgroundText}
            backgroundTextColor={data.backgroundTextColor}
            backgroundTextStyle={data.backgroundTextStyle}
            iconCount1={''}
            iconCount2={''}
            showHeroImage={data.showHeroImage}
            showBackgroundText={data.showBackgroundText}
            showBackgroundColor={data.showBackgroundColor}
          />
        ) : data.selectedStyle === 3 ? (
          <CoverThumbnailCreatorSpotlight
            category={data.category}
            title={data.title}
            coverImage={data.heroImage}
            imageFit={data.imageFit}
            backgroundColor={data.backgroundColor}
            backgroundImage={data.backgroundImage}
            backgroundImageFit={data.backgroundImageFit}
            iconCount1={''}
            iconCount2={''}
            showHeroImage={data.showHeroImage}
            showBackgroundColor={data.showBackgroundColor}
          />
        ) : data.selectedStyle === 4 ? (
          <CoverThumbnailAnnouncement1
            category={data.category}
            title={data.title}
            coverImage1={data.heroImage}
            imageFit1={data.imageFit}
            coverImage2={data.heroImage2}
            imageFit2={data.imageFit2 || 'cover'}
            backgroundColor={data.backgroundColor}
            backgroundImage={data.backgroundImage}
            backgroundImageFit={data.backgroundImageFit}
            iconCount1={''}
            iconCount2={''}
            showHeroImage={data.showHeroImage}
            showBackgroundColor={data.showBackgroundColor}
          />
        ) : (
          <CoverThumbnailFeatureArticleColour
            category={data.category}
            title={data.title}
            coverImage={data.heroImage}
            imageFit={data.imageFit}
            backgroundColor={data.backgroundColor}
            backgroundImage={data.backgroundImage}
            backgroundImageFit={data.backgroundImageFit}
            backgroundText={data.backgroundText}
            backgroundTextColor={data.backgroundTextColor}
            backgroundTextStyle={data.backgroundTextStyle}
            iconCount1={''}
            iconCount2={''}
            showHeroImage={data.showHeroImage}
            showBackgroundText={data.showBackgroundText}
            showBackgroundColor={data.showBackgroundColor}
          />
        )}
      </div>
    </div>
  );
}

export function RecommendedArticles({
  articles,
  onArticleSelect
}: {
  articles: Article[];
  onArticleSelect?: (id: string) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isMobileOrTablet = useIsMobileOrTablet();
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    const maxScrollLeft = el.scrollWidth - el.clientWidth;
    const threshold = 2;
    setCanScrollLeft(el.scrollLeft > threshold);
    setCanScrollRight(el.scrollLeft < maxScrollLeft - threshold);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = isMobileOrTablet ? 245 : 400; // Mobile: 233px width + 12px gap, Desktop: ~400px
      const maxScrollLeft = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
      const delta = direction === 'left' ? -scrollAmount : scrollAmount;
      const nextScrollLeft = Math.min(Math.max(scrollRef.current.scrollLeft + delta, 0), maxScrollLeft);
      scrollRef.current.scrollTo({
        left: nextScrollLeft,
        behavior: 'smooth'
      });
      setTimeout(updateScrollState, 180);
    }
  };

  useEffect(() => {
    updateScrollState();
  }, [isMobileOrTablet, articles.length]);

  // Mobile vertical layout
  if (isMobileOrTablet) {
    return (
      <div 
        className="relative w-full"
        style={{ 
          backgroundColor: '#1a1a1a', // Changed from #0d0d0d to match feed background
          paddingTop: '20px',
          paddingBottom: '20px'
        }}
      >
        {/* Content Container - Responsive width */}
        <div
          style={{
            width: '100%',
            paddingLeft: '19px',
            paddingRight: '19px'
          }}
        >
          <div
            className="text-[14px] font-semibold tracking-wide uppercase mb-[16px]"
            style={{ color: '#f1f0eb' }}
          >
            Recommended For You
          </div>
          {/* Articles Container */}
          <div className="relative">
            <div 
              ref={scrollRef}
              className="flex gap-[12px] overflow-x-auto pb-[20px]" 
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
              onScroll={updateScrollState}
            >
              {articles.map((article) => (
                <div
                  key={article.id}
                  className="flex-shrink-0 group cursor-pointer"
                  style={{ width: '233px' }}
                  onClick={() => onArticleSelect?.(article.id)}
                >
                  {/* Article Image */}
                  <div 
                    className="w-full rounded-[3px] overflow-hidden mb-[16px] relative bg-[#1a1a1a] border transition-all duration-500"
                    style={{
                      aspectRatio: '1512 / 851',
                      borderColor: '#2a2a2a'
                    }}
                  >
                    <div className="w-full h-full transition-transform duration-500 group-active:scale-110">
                      {article.coverData ? (
                        <CoverComposite data={article.coverData} />
                      ) : article.coverImage ? (
                        <img
                          src={article.coverImage}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      ) : null}
                    </div>
                    {/* Overlay on tap */}
                    <div 
                      className="absolute inset-0 opacity-0 group-active:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                      style={{ backgroundColor: 'rgba(17, 255, 73, 0.1)' }}
                    >
                      <span 
                        className="text-[11px] font-semibold px-[16px] py-[8px] rounded-full"
                        style={{ 
                          backgroundColor: '#11ff49',
                          color: '#1a1a1a'
                        }}
                      >
                        Read
                      </span>
                    </div>
                  </div>

                  {/* Article Info */}
                  <div>
                    <span 
                      className="text-[9px] font-bold tracking-wider uppercase"
                      style={{ color: '#a79755' }}
                    >
                      {article.category || 'UNCATEGORIZED'}
                    </span>
                    <h3 
                      className="text-[14px] font-bold transition-colors"
                      style={{ color: '#f1f0eb' }}
                    >
                      {article.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>

            {/* Left Arrow */}
            {canScrollLeft ? (
              <button
                onClick={() => scroll('left')}
                className="absolute left-[-10px] top-[90px] -translate-y-1/2 z-10 w-[32px] h-[32px] rounded-full flex items-center justify-center transition-all active:scale-95"
                style={{ 
                  backgroundColor: '#2a2a2a',
                  border: '1px solid #3a3a3a'
                }}
              >
                <ChevronLeft size={16} color="#f1f0eb" />
              </button>
            ) : null}

            {/* Right Arrow */}
            {canScrollRight ? (
              <button
                onClick={() => scroll('right')}
                className="absolute right-[-10px] top-[90px] -translate-y-1/2 z-10 w-[32px] h-[32px] rounded-full flex items-center justify-center transition-all active:scale-95"
                style={{ 
                  backgroundColor: '#2a2a2a',
                  border: '1px solid #3a3a3a'
                }}
              >
                <ChevronRight size={16} color="#f1f0eb" />
              </button>
            ) : null}
          </div>

        </div>
      </div>
    );
  }

  // Desktop layout
  return (
    <div className="w-full py-[60px] md:py-[80px] px-[20px] md:px-[40px]" style={{ backgroundColor: '#0d0d0d' }}>
      <div
        className="text-[20px] font-semibold tracking-wide uppercase mb-[24px]"
        style={{ color: '#f1f0eb' }}
      >
        Recommended For You
      </div>
      {/* Articles Container */}
      <div className="relative max-w-[1400px] mx-auto">
        {/* Horizontal Scroll Container */}
        <div 
          ref={scrollRef}
          className="flex gap-[24px] md:gap-[32px] overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-[20px]"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {articles.map((article) => (
            <div
              key={article.id}
              className="flex-shrink-0 w-[364px] group cursor-pointer snap-start flex flex-col"
              style={{ width: '364px', minWidth: '364px', maxWidth: '364px', flex: '0 0 364px' }}
              onClick={() => onArticleSelect?.(article.id)}
            >
              {/* Article Image */}
              <div 
                className="w-full rounded-[3px] overflow-hidden mb-[20px] relative bg-[#1a1a1a] border transition-all duration-500"
                style={{
                  height: '205px',
                  borderColor: '#2a2a2a'
                }}
              >
                <div className="w-full h-full transition-transform duration-500 group-hover:scale-110">
                  {article.coverData ? (
                    <CoverComposite data={article.coverData} />
                  ) : article.coverImage ? (
                    <img
                      src={article.coverImage}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  ) : null}
                </div>
                {/* Overlay on hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(17, 255, 73, 0.1)' }}
                >
                  <span 
                    className="text-[14px] font-semibold px-[24px] py-[12px] rounded-full"
                    style={{ 
                      backgroundColor: '#11ff49',
                      color: '#1a1a1a'
                    }}
                  >
                    Read Article
                  </span>
                </div>
              </div>

              {/* Article Info */}
              <div style={{ height: '86px' }}>
                <span 
                  className="text-[11px] font-bold tracking-wider uppercase"
                  style={{ color: '#a79755' }}
                >
                  {article.category || 'UNCATEGORIZED'}
                </span>
                <h3 
                  className="text-[22px] font-bold transition-colors group-hover:text-[#11ff49]"
                  style={{
                    color: '#f1f0eb',
                    lineHeight: '28px',
                    height: '56px',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical'
                  }}
                >
                  {article.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows - Hidden on Mobile, Visible on Desktop */}
        <button
          onClick={() => scroll('left')}
          className="hidden md:flex absolute left-[-15px] top-[140px] -translate-y-1/2 z-10 w-[36px] h-[36px] rounded-full items-center justify-center transition-all hover:scale-110"
          style={{ 
            backgroundColor: '#2a2a2a',
            border: '1px solid #3a3a3a'
          }}
        >
          <ChevronLeft size={18} color="#f1f0eb" />
        </button>

        <button
          onClick={() => scroll('right')}
          className="hidden md:flex absolute right-[-15px] top-[140px] -translate-y-1/2 z-10 w-[36px] h-[36px] rounded-full items-center justify-center transition-all hover:scale-110"
          style={{ 
            backgroundColor: '#2a2a2a',
            border: '1px solid #3a3a3a'
          }}
        >
          <ChevronRight size={18} color="#f1f0eb" />
        </button>
      </div>

      {/* Hide scrollbar */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
