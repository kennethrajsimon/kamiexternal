'use client';

import { X, ChevronDown } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface MobilePropertiesSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

export function MobilePropertiesSheet({ isOpen, onClose, children, title }: MobilePropertiesSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const startYRef = useRef<number>(0);
  const currentYRef = useRef<number>(0);

  // Prevent body scroll when sheet is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleTouchStart = (e: React.TouchEvent) => {
    startYRef.current = e.touches[0].clientY;
    currentYRef.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const currentY = e.touches[0].clientY;
    const diff = currentY - startYRef.current;
    
    // Only allow pulling down (positive diff)
    if (diff > 0 && sheetRef.current) {
      currentYRef.current = diff;
      sheetRef.current.style.transform = `translateY(${diff}px)`;
    }
  };

  const handleTouchEnd = () => {
    // If pulled down more than 150px, close the sheet
    if (currentYRef.current > 150) {
      onClose();
    } else if (sheetRef.current) {
      // Snap back to original position
      sheetRef.current.style.transform = 'translateY(0)';
    }
    currentYRef.current = 0;
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black transition-opacity duration-300 z-[9998]"
        style={{
          opacity: isOpen ? 0.7 : 0,
          backgroundColor: '#000000'
        }}
        onClick={onClose}
      />

      {/* Bottom Sheet */}
      <div
        ref={sheetRef}
        className="fixed bottom-0 left-0 right-0 bg-[#1a1a1a] rounded-t-3xl shadow-2xl z-[9999] transition-transform duration-300"
        style={{
          maxHeight: '85vh',
          transform: isOpen ? 'translateY(0)' : 'translateY(100%)',
          borderTop: '1px solid #2a2a2a'
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Drag Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div
            className="w-12 h-1 rounded-full"
            style={{
              backgroundColor: '#3a3a3a'
            }}
          />
        </div>

        {/* Header */}
        <div 
          className="flex items-center justify-between px-6 py-3 border-b"
          style={{
            borderColor: '#2a2a2a'
          }}
        >
          <h3
            className="font-['Inter:SemiBold',sans-serif] font-semibold"
            style={{
              fontSize: '18px',
              color: '#f1f0eb'
            }}
          >
            {title}
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-lg transition-colors"
            style={{
              backgroundColor: 'transparent'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#2a2a2a';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <X size={20} style={{ color: '#9e9e9d' }} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div
          className="overflow-y-auto px-6 py-4"
          style={{
            maxHeight: 'calc(85vh - 100px)'
          }}
        >
          {children}
        </div>
      </div>
    </>
  );
}
