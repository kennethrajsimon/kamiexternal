'use client';

import { ArrowLeft } from 'lucide-react';
import { GlitchEffect } from './GlitchEffect';

interface GlitchDemoProps {
  onBack: () => void;
}

export default function GlitchDemo({ onBack }: GlitchDemoProps) {
  const handleBackToDraftLibrary = () => {
    onBack();
  };

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: '#1a1a1a',
        fontFamily: "'Inter', sans-serif"
      }}
    >
      {/* Header */}
      <div
        className="border-b"
        style={{
          backgroundColor: '#0d0d0d',
          borderColor: '#2a2a2a'
        }}
      >
        <div className="px-[60px] py-[30px]">
          <div className="flex items-center justify-between mb-[16px]">
            <button
              onClick={handleBackToDraftLibrary}
              className="flex items-center gap-[12px] px-[20px] py-[12px] rounded-[8px] transition-all hover:opacity-80"
              style={{
                backgroundColor: '#2a2a2a',
                border: '1px solid #3a3a3a',
                color: '#f1f0eb',
                fontSize: '14px',
                fontWeight: '600'
              }}
            >
              <ArrowLeft size={16} />
              Back to Library
            </button>
          </div>

          <div>
            <h1
              className="text-[36px] font-bold mb-[8px]"
              style={{ color: '#ff00ff', letterSpacing: '-0.02em' }}
            >
              GLITCH EFX Demo
            </h1>
            <p
              className="text-[15px]"
              style={{ color: '#9e9e9d' }}
            >
              Images will glitch every 5 seconds with chromatic aberration and displacement effects
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-[60px] py-[60px]">
        <div className="grid grid-cols-3 gap-[40px]">
          {/* Demo Image 1 */}
          <div>
            <GlitchEffect enabled={true}>
              <div className="w-full aspect-[16/9] rounded-[12px] overflow-hidden border-2"
                style={{ borderColor: '#2a2a2a' }}
              >
                <img
                  src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=450&fit=crop"
                  alt="Music Studio"
                  className="w-full h-full object-cover"
                />
              </div>
            </GlitchEffect>
            <p
              className="mt-[16px] text-[14px] font-semibold"
              style={{ color: '#f1f0eb' }}
            >
              Music Production
            </p>
          </div>

          {/* Demo Image 2 */}
          <div>
            <GlitchEffect enabled={true}>
              <div className="w-full aspect-[16/9] rounded-[12px] overflow-hidden border-2"
                style={{ borderColor: '#2a2a2a' }}
              >
                <img
                  src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&h=450&fit=crop"
                  alt="Recording Session"
                  className="w-full h-full object-cover"
                />
              </div>
            </GlitchEffect>
            <p
              className="mt-[16px] text-[14px] font-semibold"
              style={{ color: '#f1f0eb' }}
            >
              Recording Session
            </p>
          </div>

          {/* Demo Image 3 */}
          <div>
            <GlitchEffect enabled={true}>
              <div className="w-full aspect-[16/9] rounded-[12px] overflow-hidden border-2"
                style={{ borderColor: '#2a2a2a' }}
              >
                <img
                  src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=450&fit=crop"
                  alt="Live Performance"
                  className="w-full h-full object-cover"
                />
              </div>
            </GlitchEffect>
            <p
              className="mt-[16px] text-[14px] font-semibold"
              style={{ color: '#f1f0eb' }}
            >
              Live Performance
            </p>
          </div>

          {/* Demo Image 4 */}
          <div>
            <GlitchEffect enabled={true}>
              <div className="w-full aspect-[16/9] rounded-[12px] overflow-hidden border-2"
                style={{ borderColor: '#2a2a2a' }}
              >
                <img
                  src="https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&h=450&fit=crop"
                  alt="Vinyl Records"
                  className="w-full h-full object-cover"
                />
              </div>
            </GlitchEffect>
            <p
              className="mt-[16px] text-[14px] font-semibold"
              style={{ color: '#f1f0eb' }}
            >
              Music Distribution
            </p>
          </div>

          {/* Demo Image 5 */}
          <div>
            <GlitchEffect enabled={true}>
              <div className="w-full aspect-[16/9] rounded-[12px] overflow-hidden border-2"
                style={{ borderColor: '#2a2a2a' }}
              >
                <img
                  src="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&h=450&fit=crop"
                  alt="Concert Stage"
                  className="w-full h-full object-cover"
                />
              </div>
            </GlitchEffect>
            <p
              className="mt-[16px] text-[14px] font-semibold"
              style={{ color: '#f1f0eb' }}
            >
              Concert Stage
            </p>
          </div>

          {/* Demo Image 6 */}
          <div>
            <GlitchEffect enabled={true}>
              <div className="w-full aspect-[16/9] rounded-[12px] overflow-hidden border-2"
                style={{ borderColor: '#2a2a2a' }}
              >
                <img
                  src="https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=800&h=450&fit=crop"
                  alt="Mixing Console"
                  className="w-full h-full object-cover"
                />
              </div>
            </GlitchEffect>
            <p
              className="mt-[16px] text-[14px] font-semibold"
              style={{ color: '#f1f0eb' }}
            >
              Mixing Console
            </p>
          </div>
        </div>

        {/* Info Box */}
        <div
          className="mt-[60px] p-[32px] rounded-[12px] border-2"
          style={{
            backgroundColor: '#0d0d0d',
            borderColor: '#ff00ff'
          }}
        >
          <h2
            className="text-[20px] font-bold mb-[16px]"
            style={{ color: '#ff00ff' }}
          >
            How GLITCH EFX Works
          </h2>
          <ul
            className="space-y-[8px]"
            style={{ color: '#9e9e9d', fontSize: '14px', lineHeight: '1.6' }}
          >
            <li>• Each image glitches <strong style={{ color: '#f1f0eb' }}>independently</strong> with random timing</li>
            <li>• Random intervals: <strong style={{ color: '#f1f0eb' }}>5-8 seconds</strong> between glitches</li>
            <li>• Effect duration: <strong style={{ color: '#f1f0eb' }}>150-250ms</strong> (varies)</li>
            <li>• Features chromatic aberration (red/cyan color shift)</li>
            <li>• Random clip-path distortions create scan-line effects</li>
            <li>• Isolated to image containers only - won't affect text or reading experience</li>
            <li>• Applies to all images in article pages when enabled</li>
          </ul>
        </div>
      </div>
    </div>
  );
}