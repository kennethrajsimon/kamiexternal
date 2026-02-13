'use client';

import { useState, useEffect } from 'react';

/**
 * Custom hook to detect screen size breakpoints
 * Mobile: < 768px
 * Tablet: 768px - 1024px  
 * Desktop: > 1024px
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const media = window.matchMedia(query);
    
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);

    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  // Return false on server-side and before mount to prevent hydration mismatch
  return mounted ? matches : false;
}

/**
 * Convenience hooks for common breakpoints
 */
export function useIsMobile(): boolean {
  return useMediaQuery('(max-width: 767px)');
}

export function useIsTablet(): boolean {
  return useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
}

export function useIsDesktop(): boolean {
  return useMediaQuery('(min-width: 1024px)');
}

export function useIsMobileOrTablet(): boolean {
  return useMediaQuery('(max-width: 1023px)');
}
