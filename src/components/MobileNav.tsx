'use client';

import { Settings, Download, Upload, Eye, Home } from 'lucide-react';

interface MobileNavProps {
  onPropertiesClick: () => void;
  onDownload: () => void;
  onUpload: () => void;
  onPreview: () => void;
  onHome: () => void;
  isReadingMode: boolean;
  styles: {
    textPrimary: string;
    textAccent: string;
  };
}

export function MobileNav({
  onPropertiesClick,
  onDownload,
  onUpload,
  onPreview,
  onHome,
  isReadingMode,
  styles
}: MobileNavProps) {
  if (isReadingMode) return null; // Hide nav in reading mode

  return (
    <div
      className="fixed bottom-0 left-0 right-0 border-t"
      style={{
        backgroundColor: '#1a1a1a',
        borderColor: '#2a2a2a',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)', // iOS safe area
        zIndex: 9999,
        pointerEvents: 'auto'
      }}
    >
      <div className="flex items-center justify-around px-4 py-3">
        {/* Preview */}
        <button
          onClick={onPreview}
          className="flex flex-col items-center gap-1 transition-colors px-3 py-2 rounded-lg"
          style={{
            color: '#9e9e9d'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = styles.textAccent;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#9e9e9d';
          }}
        >
          <Eye size={20} strokeWidth={1.5} />
          <span
            className="font-['Inter:Medium',sans-serif] font-medium"
            style={{
              fontSize: '10px',
              letterSpacing: '0.3px'
            }}
          >
            Preview
          </span>
        </button>

        {/* Properties (highlighted) */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Edit button clicked!');
            onPropertiesClick();
          }}
          className="flex flex-col items-center gap-1 transition-all px-4 py-2 rounded-lg"
          style={{
            color: styles.textAccent,
            backgroundColor: 'rgba(17, 255, 73, 0.1)',
            border: `1px solid ${styles.textAccent}`,
            pointerEvents: 'auto',
            cursor: 'pointer',
            position: 'relative'
          }}
        >
          <Settings size={22} strokeWidth={2} />
          <span
            className="font-['Inter:SemiBold',sans-serif] font-semibold"
            style={{
              fontSize: '10px',
              letterSpacing: '0.3px',
              pointerEvents: 'none'
            }}
          >
            Edit
          </span>
        </button>

        {/* Upload */}
        <button
          onClick={onUpload}
          className="flex flex-col items-center gap-1 transition-colors px-3 py-2 rounded-lg"
          style={{
            color: '#9e9e9d'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = styles.textAccent;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#9e9e9d'
          }}
        >
          <Upload size={20} strokeWidth={1.5} />
          <span
            className="font-['Inter:Medium',sans-serif] font-medium"
            style={{
              fontSize: '10px',
              letterSpacing: '0.3px'
            }}
          >
            Import
          </span>
        </button>

        {/* Download */}
        <button
          onClick={onDownload}
          className="flex flex-col items-center gap-1 transition-colors px-3 py-2 rounded-lg"
          style={{
            color: '#9e9e9d'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = styles.textAccent;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#9e9e9d'
          }}
        >
          <Download size={20} strokeWidth={1.5} />
          <span
            className="font-['Inter:Medium',sans-serif] font-medium"
            style={{
              fontSize: '10px',
              letterSpacing: '0.3px'
            }}
          >
            Export
          </span>
        </button>
      </div>
    </div>
  );
}