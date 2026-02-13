'use client';

import { createContext, useContext, ReactNode } from 'react';

interface EFXContextType {
  glitchEnabled: boolean;
  blurEnabled: boolean;
  chromaticEnabled: boolean;
  shakeEnabled: boolean;
  distortEnabled: boolean;
}

const EFXContext = createContext<EFXContextType>({
  glitchEnabled: false,
  blurEnabled: false,
  chromaticEnabled: false,
  shakeEnabled: false,
  distortEnabled: false
});

export function useEFX() {
  return useContext(EFXContext);
}

interface EFXProviderProps {
  children: ReactNode;
  glitchEnabled?: boolean;
  blurEnabled?: boolean;
  chromaticEnabled?: boolean;
  shakeEnabled?: boolean;
  distortEnabled?: boolean;
}

export function EFXProvider({
  children,
  glitchEnabled = false,
  blurEnabled = false,
  chromaticEnabled = false,
  shakeEnabled = false,
  distortEnabled = false
}: EFXProviderProps) {
  return (
    <EFXContext.Provider
      value={{
        glitchEnabled,
        blurEnabled,
        chromaticEnabled,
        shakeEnabled,
        distortEnabled
      }}
    >
      {children}
    </EFXContext.Provider>
  );
}
