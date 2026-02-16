import { ReactNode } from 'react';
import { motion } from 'motion/react';

interface AnimatedImageLayerProps {
  layer?: number;
  children: ReactNode;
}

export function AnimatedImageLayer({ children }: AnimatedImageLayerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}
