import { useState, useEffect, RefObject } from 'react';

/**
 * Custom hook to calculate scroll progress for a specific page
 * Returns a value between 0 and 1 representing the scroll progress through the page
 */
export function usePageScrollProgress(
  scrollContainerRef: RefObject<HTMLDivElement>,
  pageIndex: number,
  totalPages: number
): number {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      const scrollTop = scrollContainer.scrollTop;
      const scrollHeight = scrollContainer.scrollHeight;
      const clientHeight = scrollContainer.clientHeight;

      // Calculate the height of one page
      const pageHeight = scrollHeight / totalPages;
      
      // Calculate the scroll position within the current page
      const pageStartPosition = pageIndex * pageHeight;
      const pageEndPosition = (pageIndex + 1) * pageHeight;
      
      // Calculate progress (0 to 1) within this page
      let progress = 0;
      if (scrollTop >= pageStartPosition && scrollTop <= pageEndPosition) {
        progress = (scrollTop - pageStartPosition) / pageHeight;
      } else if (scrollTop > pageEndPosition) {
        progress = 1;
      } else {
        progress = 0;
      }

      // Clamp between 0 and 1
      progress = Math.max(0, Math.min(1, progress));
      
      setScrollProgress(progress);
    };

    // Initial calculation
    handleScroll();

    // Add scroll listener
    scrollContainer.addEventListener('scroll', handleScroll);
    
    // Add resize listener to recalculate on window resize
    window.addEventListener('resize', handleScroll);

    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [scrollContainerRef, pageIndex, totalPages]);

  return scrollProgress;
}
