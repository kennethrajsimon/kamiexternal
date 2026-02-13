'use client';

import svgPaths from "../imports/svg-8vctfwm2s6";
import { MediaDisplay } from "./MediaDisplay";
import { useState } from 'react';

interface MobileCoverVerticalProps {
  category?: string;
  title?: string;
  author?: string;
  headline?: string;
  description?: string;
  coverImage?: string | null;
  imageFit?: 'cover' | 'contain';
  backgroundColor?: string;
  backgroundImage?: string | null;
  backgroundImageFit?: 'cover' | 'contain';
  iconCount1?: string;
  iconCount2?: string;
  showHeroImage?: boolean;
  showBackgroundColor?: boolean;
  textPrimary?: string;
  textAccent?: string;
}

function Heart({ isHovered, onMouseEnter, onMouseLeave, color }: { isHovered?: boolean, onMouseEnter?: () => void, onMouseLeave?: () => void, color?: string }) {
  return (
    <div 
      className="size-[30px] cursor-pointer transition-transform" 
      style={{ transform: isHovered ? 'scale(1.15)' : 'scale(1)' }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 30">
        <path clipRule="evenodd" d={svgPaths.p2e417780} fillRule="evenodd" stroke={color || "#F1F0EB"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

function Send01({ isHovered, onMouseEnter, onMouseLeave, color }: { isHovered?: boolean, onMouseEnter?: () => void, onMouseLeave?: () => void, color?: string }) {
  return (
    <div 
      className="size-[30px] cursor-pointer transition-transform" 
      style={{ transform: isHovered ? 'scale(1.15)' : 'scale(1)' }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 30">
        <path d={svgPaths.p3e23b940} stroke={color || "#F1F0EB"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

export function MobileCoverVertical({ 
  category, 
  title, 
  author, 
  headline, 
  description,
  coverImage, 
  imageFit, 
  backgroundColor, 
  backgroundImage, 
  backgroundImageFit,
  iconCount1, 
  iconCount2, 
  showHeroImage, 
  showBackgroundColor,
  textPrimary = '#f1f0eb',
  textAccent = '#11ff49'
}: MobileCoverVerticalProps) {
  const [isHeartHovered, setIsHeartHovered] = useState(false);
  const [isShareHovered, setIsShareHovered] = useState(false);
  
  return (
    <div 
      className="relative w-full min-h-screen flex flex-col"
      style={{ backgroundColor: showBackgroundColor !== false ? (backgroundColor || '#1a1a1a') : '#1a1a1a' }}
    >
      {/* Background Image */}
      {backgroundImage && (
        <div className="absolute inset-0 overflow-hidden opacity-30">
          <MediaDisplay 
            src={backgroundImage} 
            alt="" 
            className="absolute inset-0 w-full h-full" 
            objectFit={backgroundImageFit || 'cover'} 
          />
        </div>
      )}

      {/* Content Container - Vertical Stack */}
      <div className="relative z-10 flex flex-col px-6 py-12 gap-8">
        
        {/* Category */}
        {category && (
          <div 
            className="inline-block px-3 py-1.5 rounded-sm self-start"
            style={{ 
              backgroundColor: textAccent,
              fontFamily: 'Inter, sans-serif'
            }}
          >
            <p 
              className="text-[11px] font-bold leading-normal tracking-wider"
              style={{ color: '#1a1a1a' }}
            >
              {category}
            </p>
          </div>
        )}

        {/* Title */}
        {title && (
          <h1 
            className="text-[48px] font-light leading-[1.1] max-w-full"
            style={{ 
              color: textPrimary,
              fontFamily: 'Inter, sans-serif',
              wordBreak: 'break-word'
            }}
          >
            {title}
          </h1>
        )}

        {/* Hero Image */}
        {showHeroImage !== false && coverImage && (
          <div className="w-full aspect-[4/5] overflow-hidden rounded-lg">
            <MediaDisplay 
              src={coverImage} 
              alt="" 
              className="w-full h-full" 
              objectFit={imageFit || 'cover'} 
            />
          </div>
        )}

        {/* Author */}
        {author && (
          <p 
            className="text-[14px] font-normal"
            style={{ 
              color: textPrimary,
              fontFamily: 'Inter, sans-serif'
            }}
          >
            {author}
          </p>
        )}

        {/* Headline */}
        {headline && (
          <p 
            className="text-[20px] font-medium"
            style={{ 
              color: textAccent,
              fontFamily: 'Inter, sans-serif'
            }}
          >
            {headline}
          </p>
        )}

        {/* Description */}
        {description && (
          <p 
            className="text-[16px] font-light leading-[1.6]"
            style={{ 
              color: textPrimary,
              fontFamily: 'Inter, sans-serif'
            }}
          >
            {description}
          </p>
        )}

        {/* Icon Counts removed */}
      </div>
    </div>
  );
}