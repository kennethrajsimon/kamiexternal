'use client';

import { useRef } from 'react';
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

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = isMobileOrTablet ? 191 : 350; // Mobile: 179px width + 12px gap, Desktop: ~350px
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

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
              className="flex gap-[12px] overflow-x-auto pb-4 snap-x snap-mandatory hide-scrollbar"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
              {ARTICLES.map((article) => (
                <div 
                  key={article.id}
                  className="flex-shrink-0 snap-center"
                  style={{ width: '179px' }}
                >
                  <div 
                    className="w-full aspect-[4/3] mb-[12px] rounded-[4px] overflow-hidden border border-[#2a2a2a]"
                    style={{ backgroundColor: '#0d0d0d' }}
                  >
                    {article.icon}
                  </div>
                  <div className="flex flex-col gap-[4px]">
                    <div className="flex items-center gap-[8px] text-[10px] font-bold tracking-wider">
                      <span style={{ color: '#a79755' }}>{article.category}</span>
                      <span style={{ color: '#4a4a4a' }}>•</span>
                      <span style={{ color: '#6e6e6d' }}>{article.readTime}</span>
                    </div>
                    <h3 
                      className="text-[14px] font-bold leading-[1.3]"
                      style={{ color: '#f1f0eb' }}
                    >
                      {article.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Desktop horizontal layout
  return (
    <div 
      className="relative w-full"
      style={{ 
        backgroundColor: '#1a1a1a',
        paddingTop: '40px',
        paddingBottom: '40px'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1512px',
          margin: '0 auto',
          paddingLeft: '60px',
          paddingRight: '60px'
        }}
      >
        <div className="flex items-center justify-between mb-[24px]">
          <h2 
            className="text-[20px] font-bold tracking-tight"
            style={{ color: '#f1f0eb' }}
          >
            Recommended Reading
          </h2>
          <div className="flex gap-[8px]">
            <button 
              onClick={() => scroll('left')}
              className="p-2 rounded-full hover:bg-[#2a2a2a] transition-colors"
              style={{ color: '#9e9e9d' }}
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="p-2 rounded-full hover:bg-[#2a2a2a] transition-colors"
              style={{ color: '#9e9e9d' }}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div 
          ref={scrollRef}
          className="flex gap-[24px] overflow-x-hidden scroll-smooth"
        >
          {ARTICLES.map((article) => (
            <div 
              key={article.id}
              className="flex-shrink-0 group cursor-pointer"
              style={{ width: '350px' }}
            >
              <div 
                className="w-full aspect-[16/9] mb-[16px] rounded-[6px] overflow-hidden border border-[#2a2a2a] relative"
                style={{ backgroundColor: '#0d0d0d' }}
              >
                <div className="w-full h-full transition-transform duration-500 group-hover:scale-105">
                  {article.icon}
                </div>
              </div>
              <div className="flex flex-col gap-[6px]">
                <div className="flex items-center gap-[8px] text-[11px] font-bold tracking-wider">
                  <span style={{ color: '#a79755' }}>{article.category}</span>
                  <span style={{ color: '#4a4a4a' }}>•</span>
                  <span style={{ color: '#6e6e6d' }}>{article.readTime}</span>
                </div>
                <h3 
                  className="text-[18px] font-bold leading-[1.3] group-hover:text-[#11ff49] transition-colors"
                  style={{ color: '#f1f0eb' }}
                >
                  {article.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
