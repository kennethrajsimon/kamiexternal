import { ReactNode } from 'react';

interface AnimatedImageLayerProps {
  layer?: number;
  children: ReactNode;
}

export function AnimatedImageLayer({ children }: AnimatedImageLayerProps) {
  return <>{children}</>;
}
