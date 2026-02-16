'use client';

import { useState, useRef } from 'react';

const products = [
  {
    id: 1,
    name: 'Guitar',
    creator: 'Gibson Guitars',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop'
  },
  {
    id: 2,
    name: 'Drums',
    creator: 'Pearl Drums',
    image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop'
  },
  {
    id: 3,
    name: 'Microphone',
    creator: 'Shure Audio',
    image: 'https://images.unsplash.com/photo-1572584642822-6f8de0243c93?w=400&h=400&fit=crop'
  },
  {
    id: 4,
    name: 'Keyboard',
    creator: 'Roland Music',
    image: 'https://images.unsplash.com/photo-1496293455970-f8581aae0e3b?w=400&h=400&fit=crop'
  },
  {
    id: 5,
    name: 'Headphones',
    creator: 'Audio-Technica',
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=400&fit=crop'
  },
  {
    id: 6,
    name: 'Amplifier',
    creator: 'Fender',
    image: 'https://images.unsplash.com/photo-1545127398-14699f92334b?w=400&h=400&fit=crop'
  },
  {
    id: 7,
    name: 'Turntable',
    creator: 'Technics',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&h=400&fit=crop'
  },
  {
    id: 8,
    name: 'Speaker',
    creator: 'JBL Audio',
    image: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=400&h=400&fit=crop'
  }
];

interface ProductCarouselProps {
  products?: any[];
  onEdit?: () => void;
}

export function ProductCarousel({ products: propProducts, onEdit }: ProductCarouselProps) {
  const displayProducts = propProducts || products;
  const [isMouseDown, setIsMouseDown] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const wasDraggedRef = useRef(false);
  const openCollection = (product: any) => {
    const collectionId = product?.collectionId ?? product?.collectionid ?? product?.collection_id;
    if (!collectionId) return;
    const url = `https://app.kamiunlimited.com/collection/${collectionId}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    const container = scrollRef.current;
    if (!container) return;
    isDraggingRef.current = true;
    setIsMouseDown(true);
    wasDraggedRef.current = false;
    startXRef.current = event.pageX - container.offsetLeft;
    scrollLeftRef.current = container.scrollLeft;
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const container = scrollRef.current;
    if (!container) return;
    event.preventDefault();
    const x = event.pageX - container.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    if (Math.abs(walk) > 5) {
      wasDraggedRef.current = true;
    }
    container.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUp = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsMouseDown(false);
  };

  const handleMouseLeave = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsMouseDown(false);
  };

  return (
    <div className="w-full bg-[#1A1A1A] text-white flex flex-col items-center overflow-hidden font-sans select-none relative">
      {/* Restoring high-quality smooth overlap with responsive scaling */}
      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          --card-w: 280px;
          --overlap: 60px;
          --z-depth: 120px;
        }

        @media (max-width: 640px) {
          :root {
            --card-w: 200px;
            --overlap: 40px;
            --z-depth: 80px;
          }
        }

        @property --is-focused {
          syntax: '<number>';
          inherits: true;
          initial-value: 0;
        }

        .scroll-container {
          scroll-snap-type: x mandatory;
          scrollbar-width: none;
          perspective: 2000px;
          perspective-origin: center;
          -webkit-overflow-scrolling: touch;
          padding-inline: calc(50vw - (var(--card-w) / 2));
        }
        
        .scroll-container::-webkit-scrollbar {
          display: none;
        }

        .card-wrapper {
          flex: 0 0 var(--card-w);
          scroll-snap-align: center;
          scroll-snap-stop: always;
          view-timeline: --item-visible inline;
        }

        .product-card {
          animation: flow linear both, center-detect linear both;
          animation-timeline: --item-visible;
          animation-range: cover 20% cover 80%;
          transform-style: preserve-3d;
          will-change: transform, filter, opacity;
          transition: box-shadow 0.2s ease;
        }
        
        @keyframes flow {
          0% { 
            transform: scale(0.8) rotateY(-45deg) translateX(var(--overlap)); 
            opacity: 0.4;
            filter: brightness(0.4) blur(1px);
            z-index: 1;
          }
          40% { border-color: #F1F0EB; }
          45%, 55% { 
            transform: scale(1.15) rotateY(0deg) translateZ(var(--z-depth)) translateX(0); 
            opacity: 1;
            filter: brightness(1) blur(0px);
            z-index: 100;
            border-color: #F1F0EB;
          }
          60% { border-color: #F1F0EB; }
          100% { 
            transform: scale(0.8) rotateY(45deg) translateX(calc(var(--overlap) * -1)); 
            opacity: 0.4;
            filter: brightness(0.4) blur(1px);
            z-index: 1;
          }
        }

        @keyframes center-detect {
          0%, 44%, 56%, 100% { --is-focused: 0; }
          45%, 55% { --is-focused: 1; }
        }

        .is-pressed .product-card {
          border-color: color-mix(in srgb, #11FF49 calc(var(--is-focused) * 100%), #F1F0EB) !important;
          box-shadow: 0 0 calc(var(--is-focused) * 35px) rgba(17, 255, 73, 0.5), 0 20px 60px rgba(0,0,0,0.9);
          transition: none !important;
        }

        .product-label {
          animation: label-flow linear both;
          animation-timeline: --item-visible;
          animation-range: contain 40% contain 60%;
        }

        @keyframes label-flow {
          0% { opacity: 0; transform: translateY(10px); }
          50% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(10px); }
        }

        .reflection {
          mask-image: linear-gradient(to bottom, rgba(0,0,0,0.6), transparent);
          -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,0.6), transparent);
        }
      `}} />

      {/* Main Scroll Area - restored gap-2 for tightest overlap */}
      <div
        ref={scrollRef}
        className={`scroll-container flex items-center w-full h-[350px] sm:h-[650px] overflow-x-auto gap-2 ${isMouseDown ? 'is-pressed' : ''}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        {displayProducts.map((product) => (
          <div key={product.id} className="card-wrapper flex items-center justify-center relative">
            <div 
              className="product-card relative w-full aspect-square rounded-[3px] flex items-center justify-center shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden cursor-pointer"
              onClick={() => {
                if (wasDraggedRef.current) {
                  wasDraggedRef.current = false;
                  return;
                }
                openCollection(product);
              }}
            >
              {/* Product Image */}
              <img 
                src={product.image} 
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Product Info - Bottom Left */}
              <div className="absolute left-[18px] right-[18px] z-10 pointer-events-none" style={{ bottom: '15px' }}>
                {/* Product Name */}
                <p 
                  className="font-['Inter:Regular',sans-serif] font-normal leading-normal not-italic text-[#f1f0eb]"
                  style={{ 
                    fontSize: '20px',
                    textTransform: 'uppercase',
                    marginBottom: '0px'
                  }}
                >
                  {product.name}
                </p>
                
                {/* Creator Name */}
                <p 
                  className="font-['Inter:Regular',sans-serif] font-normal leading-normal not-italic text-[#f1f0eb]"
                  style={{ 
                    fontSize: '15px'
                  }}
                >
                  {product.creator}
                </p>
              </div>

              {/* Product Reflection */}
              <div 
                className="reflection absolute top-[105%] left-0 right-0 h-[40%] opacity-20 pointer-events-none scale-y-[-1]"
              >
                <img 
                  src={product.image} 
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Ambient background glow */}
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-150 ${isMouseDown ? 'opacity-100' : 'opacity-0'}`} 
           style={{ background: 'radial-gradient(circle at center, rgba(17,255,73,0.08) 0%, transparent 70%)' }} />
    </div>
  );
}
