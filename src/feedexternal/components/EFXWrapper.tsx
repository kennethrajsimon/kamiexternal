'use client';

import { GlitchEffect } from './GlitchEffect';
import { BlurEffect } from './BlurEffect';
import { ChromaticEffect } from './ChromaticEffect';
import { ShakeEffect } from './ShakeEffect';
import { DistortEffect } from './DistortEffect';

interface EFXWrapperProps {
  children: React.ReactNode;
  glitchEnabled?: boolean;
  blurEnabled?: boolean;
  chromaticEnabled?: boolean;
  shakeEnabled?: boolean;
  distortEnabled?: boolean;
}

export function EFXWrapper({ 
  children, 
  glitchEnabled = false,
  blurEnabled = false,
  chromaticEnabled = false,
  shakeEnabled = false,
  distortEnabled = false
}: EFXWrapperProps) {
  let content = children;

  // Wrap with enabled effects in order
  if (glitchEnabled) {
    content = <GlitchEffect enabled={true}>{content}</GlitchEffect>;
  }
  
  if (blurEnabled) {
    content = <BlurEffect enabled={true}>{content}</BlurEffect>;
  }
  
  if (chromaticEnabled) {
    content = <ChromaticEffect enabled={true}>{content}</ChromaticEffect>;
  }
  
  if (shakeEnabled) {
    content = <ShakeEffect enabled={true}>{content}</ShakeEffect>;
  }
  
  if (distortEnabled) {
    content = <DistortEffect enabled={true}>{content}</DistortEffect>;
  }

  return <>{content}</>;
}
