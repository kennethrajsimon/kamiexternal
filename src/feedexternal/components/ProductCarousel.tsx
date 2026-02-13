'use client';

import { useState, useEffect } from 'react';

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

export function ProductCarousel({ products: _products, onEdit }: ProductCarouselProps) {
  const [isMouseDown, setIsMouseDown] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleDown = () => setIsMouseDown(true);
    const handleUp = () => setIsMouseDown(false);
    
    window.addEventListener('mousedown', handleDown);
    window.addEventListener('mouseup', handleUp);
    window.addEventListener('touchstart', handleDown);
    window.addEventListener('touchend', handleUp);

    return () => {
      window.removeEventListener('mousedown', handleDown);
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('touchstart', handleDown);
      window.removeEventListener('touchend', handleUp);
    };
  }, []);

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

        .carousel-container {
          perspective: 1000px;
          transform-style: preserve-3d;
          width: 100%;
          display: flex;
          justify-content: center;
          padding: 40px 0;
          overflow-x: auto;
          overflow-y: hidden;
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
        }

        .carousel-track {
          display: flex;
          align-items: center;
          padding: 0 50vw; /* Center the first/last items */
        }

        .product-card {
          width: var(--card-w);
          height: calc(var(--card-w) * 1.4);
          background: #2a2a2a;
          border-radius: 12px;
          border: 1px solid #3a3a3a;
          flex-shrink: 0;
          margin-right: calc(var(--overlap) * -1); /* Negative margin for overlap */
          transition: transform 0.3s ease, margin 0.3s ease, z-index 0s;
          position: relative;
          cursor: pointer;
          overflow: hidden;
          box-shadow: -10px 0 20px rgba(0,0,0,0.5); /* Shadow on the left edge */
        }

        .product-card:hover {
          transform: translateY(-20px) rotateY(-5deg);
          margin-right: 20px; /* Expand gap on hover */
          z-index: 100 !important;
          box-shadow: 0 20px 40px rgba(0,0,0,0.6);
        }

        .product-card img {
          width: 100%;
          height: 70%;
          object-fit: cover;
          border-bottom: 1px solid #3a3a3a;
        }

        .product-info {
          padding: 12px;
        }

        .product-name {
          font-weight: 700;
          font-size: 16px;
          color: #f1f0eb;
        }

        .product-creator {
          font-size: 12px;
          color: #9e9e9d;
          margin-top: 4px;
        }
      ` }} />

      <div className="carousel-container">
        <div className="carousel-track">
          {products.map((product, index) => (
            <div 
              key={product.id} 
              className="product-card"
              style={{ zIndex: index }}
            >
              <img src={product.image} alt={product.name} />
              <div className="product-info">
                <div className="product-name">{product.name}</div>
                <div className="product-creator">{product.creator}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
