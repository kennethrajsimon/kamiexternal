import { ReactNode } from 'react';

interface AnimatedTextLayerProps {
  layer?: number;
  children: ReactNode;
}

export function AnimatedTextLayer({ children }: AnimatedTextLayerProps) {
  return <>{children}</>;
}
