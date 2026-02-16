'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useIsMobileOrTablet } from '../hooks/useMediaQuery';

interface Article {
  id: string;
  title: string;
  category: string;
  readTime: string;
  icon: React.ReactNode;
}

const ARTICLES: Article[] = [
  {
    id: '1',
    title: 'The Evolution of Music Distribution',
    category: 'INDUSTRY INSIGHTS',
    readTime: '8 min read',
    icon: (
      <svg viewBox="0 0 400 280" className="w-full h-full">
        <rect width="400" height="280" fill="#1a1a1a"/>
        <circle cx="200" cy="140" r="80" fill="none" stroke="#11ff49" strokeWidth="3"/>
        <circle cx="200" cy="140" r="60" fill="none" stroke="#11ff49" strokeWidth="2" opacity="0.6"/>
        <circle cx="200" cy="140" r="40" fill="none" stroke="#11ff49" strokeWidth="2" opacity="0.4"/>
        <path d="M200 60 L200 220 M120 140 L280 140" stroke="#a79755" strokeWidth="2"/>
        <circle cx="200" cy="140" r="8" fill="#11ff49"/>
      </svg>
    )
  },
  {
    id: '2',
    title: 'Live Performances in the Digital Age',
    category: 'CREATOR SPOTLIGHT',
    readTime: '6 min read',
    icon: (
      <svg viewBox="0 0 400 280" className="w-full h-full">
        <rect width="400" height="280" fill="#1a1a1a"/>
        <rect x="80" y="60" width="240" height="160" rx="8" fill="none" stroke="#11ff49" strokeWidth="3"/>
        <path d="M100 180 L140 120 L180 150 L220 100 L260 140 L300 90" fill="none" stroke="#a79755" strokeWidth="4" strokeLinecap="round"/>
        <circle cx="200" cy="140" r="30" fill="#11ff49" opacity="0.2"/>
        <path d="M190 130 L190 150 L210 140 Z" fill="#11ff49"/>
      </svg>
    )
  },
  {
    id: '3',
    title: 'Inside the Modern Recording Studio',
    category: 'TECHNOLOGY',
    readTime: '10 min read',
    icon: (
      <svg viewBox="0 0 400 280" className="w-full h-full">
        <rect width="400" height="280" fill="#1a1a1a"/>
        <rect x="60" y="80" width="100" height="120" rx="6" fill="#2a2a2a" stroke="#11ff49" strokeWidth="2"/>
        <rect x="180" y="60" width="100" height="140" rx="6" fill="#2a2a2a" stroke="#11ff49" strokeWidth="2"/>
        <rect x="300" y="100" width="40" height="100" rx="4" fill="#2a2a2a" stroke="#a79755" strokeWidth="2"/>
        <rect x="70" y="90" width="80" height="8" fill="#11ff49"/>
        <rect x="70" y="110" width="60" height="8" fill="#11ff49" opacity="0.6"/>
        <rect x="70" y="130" width="70" height="8" fill="#11ff49" opacity="0.4"/>
      </svg>
    )
  }
];

export function RecommendedArticles() {
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
      const scrollAmount = isMobileOrTablet ? 191 : 350; // Mobile: 179px width + 12px gap, Desktop: ~350px
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
      setTimeout(updateScrollState, 180);
    }
  };

  useEffect(() => {
    updateScrollState();
  }, [isMobileOrTablet]);

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
              {ARTICLES.map((article) => (
                <div
                  key={article.id}
                  className="flex-shrink-0 group"
                  style={{ width: '179px' }}
                >
                  {/* Article Image */}
                  <div 
                    className="w-full rounded-[3px] overflow-hidden mb-[16px] relative bg-[#1a1a1a] border transition-all duration-500"
                    style={{
                      height: '179px',
                      borderColor: '#2a2a2a'
                    }}
                  >
                    <div className="w-full h-full transition-transform duration-500 group-active:scale-110">
                      {article.icon}
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
                    <div className="flex items-center gap-[8px] mb-[8px]">
                      <span 
                        className="text-[9px] font-bold tracking-wider uppercase"
                        style={{ color: '#a79755' }}
                      >
                        {article.category}
                      </span>
                      <span 
                        className="text-[9px]"
                        style={{ color: '#9e9e9d' }}
                      >
                        •
                      </span>
                      <span 
                        className="text-[9px]"
                        style={{ color: '#9e9e9d' }}
                      >
                        {article.readTime}
                      </span>
                    </div>
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

          {/* Back to Landing Button */}
          <div className="mt-[40px] flex justify-center">
            <button
              className="px-[32px] py-[12px] rounded-[8px] text-[13px] font-semibold transition-all active:opacity-60"
              style={{ 
                backgroundColor: '#2a2a2a',
                border: '1px solid #3a3a3a',
                color: '#f1f0eb'
              }}
            >
              Browse All
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Desktop layout
  return (
    <div className="w-full py-[60px] md:py-[80px] px-[20px] md:px-[40px]" style={{ backgroundColor: '#0d0d0d' }}>
      {/* Articles Container */}
      <div className="relative max-w-[1400px] mx-auto">
        {/* Horizontal Scroll Container */}
        <div 
          ref={scrollRef}
          className="flex md:grid md:grid-cols-3 gap-[24px] md:gap-[32px] overflow-x-auto md:overflow-x-visible snap-x snap-mandatory scrollbar-hide pb-[20px]"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
          onScroll={updateScrollState}
        >
          {ARTICLES.map((article) => (
            <div
              key={article.id}
              className="flex-shrink-0 w-[280px] md:w-auto group cursor-pointer snap-start"
            >
              {/* Article Image */}
              <div 
                className="w-full h-[280px] rounded-[3px] overflow-hidden mb-[20px] relative bg-[#1a1a1a] border transition-all duration-500"
                style={{
                  borderColor: '#2a2a2a'
                }}
              >
                <div className="w-full h-full transition-transform duration-500 group-hover:scale-110">
                  {article.icon}
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
              <div>
                <div className="flex items-center gap-[12px] mb-[12px]">
                  <span 
                    className="text-[11px] font-bold tracking-wider uppercase"
                    style={{ color: '#a79755' }}
                  >
                    {article.category}
                  </span>
                  <span 
                    className="text-[11px]"
                    style={{ color: '#9e9e9d' }}
                  >
                    •
                  </span>
                  <span 
                    className="text-[11px]"
                    style={{ color: '#9e9e9d' }}
                  >
                    {article.readTime}
                  </span>
                </div>
                <h3 
                  className="text-[22px] font-bold transition-colors group-hover:text-[#11ff49]"
                  style={{ color: '#f1f0eb' }}
                >
                  {article.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows - Hidden on Mobile, Visible on Desktop */}
        {canScrollLeft ? (
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
        ) : null}

        {canScrollRight ? (
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
        ) : null}
      </div>

      {/* Back to Landing Button */}
      <div className="mt-[60px] flex justify-center">
        <button
          className="px-[40px] py-[16px] rounded-[8px] text-[16px] font-semibold transition-all hover:opacity-80"
          style={{ 
            backgroundColor: '#2a2a2a',
            border: '1px solid #3a3a3a',
            color: '#f1f0eb'
          }}
        >
          Browse All Articles
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
