import { useState, useEffect } from 'react';

interface FlipBoardTextProps {
  text: string;
  isAnimating: boolean;
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  color: string;
  lineHeight?: string;
  letterSpacing?: string;
}

const RANDOM_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export function FlipBoardText({ text, isAnimating, fontFamily, fontSize, fontWeight, color, lineHeight, letterSpacing }: FlipBoardTextProps) {
  const safeText = text || '';
  const [displayChars, setDisplayChars] = useState<string[]>(safeText.split(''));
  const [animatingIndex, setAnimatingIndex] = useState<number>(-1);
  const [completedIndices, setCompletedIndices] = useState<Set<number>>(new Set());

  useEffect(() => {
    setDisplayChars((text || '').split(''));
    // Only reset completed indices when text actually changes, not when animation state changes
    if (text !== safeText) {
      setCompletedIndices(new Set());
    }
  }, [text]);

  useEffect(() => {
    if (!isAnimating || !text) {
      // Don't reset completedIndices here - let letters stay visible
      return;
    }

    const chars = text.split('');
    let currentCharIndex = 0;
    setCompletedIndices(new Set()); // Only reset at start of new animation

    const animateNextChar = () => {
      // Skip spaces and newlines
      while (currentCharIndex < chars.length && (chars[currentCharIndex] === ' ' || chars[currentCharIndex] === '\n')) {
        currentCharIndex++;
      }

      if (currentCharIndex >= chars.length) {
        setAnimatingIndex(-1);
        return;
      }

      const targetChar = chars[currentCharIndex];
      const charIndex = currentCharIndex;
      setAnimatingIndex(charIndex);

      let cycleCount = 0;
      const totalCycles = 10; // Cycle through 10 random letters before final
      const intervalDuration = 15; // Faster cycling - reduced from 20ms to 15ms for 1 second faster overall
      let nextCharStarted = false;

      const cycleInterval = setInterval(() => {
        if (cycleCount < totalCycles) {
          const randomChar = RANDOM_CHARS[Math.floor(Math.random() * RANDOM_CHARS.length)];
          setDisplayChars(prev => {
            const newChars = [...prev];
            newChars[charIndex] = randomChar;
            return newChars;
          });
          
          // Start next character after current reaches 6th cycle
          if (cycleCount === 6 && !nextCharStarted) {
            nextCharStarted = true;
            currentCharIndex++;
            animateNextChar();
          }
          
          cycleCount++;
        } else {
          setDisplayChars(prev => {
            const newChars = [...prev];
            newChars[charIndex] = targetChar;
            return newChars;
          });
          setCompletedIndices(prev => new Set([...prev, charIndex]));
          clearInterval(cycleInterval);
        }
      }, intervalDuration);
    };

    animateNextChar();
  }, [isAnimating, text]);

  // Group characters into words to prevent breaking
  const renderChars = () => {
    const result = [];
    let currentWord = [];
    
    displayChars.forEach((char, index) => {
      if (char === ' ') {
        // Push the current word
        if (currentWord.length > 0) {
          result.push(
            <span key={`word-${index}`} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
              {currentWord}
            </span>
          );
          currentWord = [];
        }
        // Add space
        result.push(
          <span key={`space-${index}`} style={{ display: 'inline-block', width: '0.3em', marginRight: letterSpacing }}>
            {'\u00A0'}
          </span>
        );
      } else if (char === '\n') {
        // Push the current word
        if (currentWord.length > 0) {
          result.push(
            <span key={`word-${index}`} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
              {currentWord}
            </span>
          );
          currentWord = [];
        }
        // Add line break
        result.push(<br key={`br-${index}`} />);
      } else {
        // Determine opacity and animation based on animation state
        let opacity = 0; // Default: not yet animated
        let animation = 'none';
        
        if (animatingIndex === index) {
          // Currently animating: vertical flip effect with fade-in
          animation = 'flipBoardVerticalFadeIn 0.2s ease-out forwards';
          opacity = 1;
        } else if (completedIndices.has(index)) {
          // Animation completed: fully visible at 100%
          opacity = 1;
        }
        
        // Add character to current word (with ghost trail)
        currentWord.push(
          <span
            key={`container-${index}`}
            style={{
              display: 'inline-block',
              position: 'relative',
              textAlign: 'center',
              marginRight: letterSpacing,
            }}
          >
            {/* Static stretched ghost trail - 150% vertical scale */}
            <span
              style={{
                display: 'inline-block',
                fontFamily: fontFamily + ',sans-serif',
                fontSize,
                fontWeight,
                color,
                width: '100%',
                textAlign: 'center',
                position: 'absolute',
                left: 0,
                top: 0,
                zIndex: 0,
                transform: 'scaleY(1.5)',
                opacity: animatingIndex === index ? 0.4 : 0,
                filter: 'blur(3px) drop-shadow(0 0 15px currentColor)',
                mixBlendMode: 'screen',
                transition: 'opacity 0.3s ease-out',
              }}
            >
              {char}
            </span>
            {/* Animated ghost trail - delayed by 0.5s */}
            <span
              style={{
                display: 'inline-block',
                fontFamily: fontFamily + ',sans-serif',
                fontSize,
                fontWeight,
                color,
                transformStyle: 'preserve-3d',
                perspective: '1000px',
                animation: animation !== 'none' ? 'flipBoardTrail 0.32s ease-out 0.5s forwards' : 'none',
                opacity: 0,
                width: '100%',
                textAlign: 'center',
                position: 'absolute',
                left: 0,
                top: 0,
                zIndex: 0,
                filter: 'blur(4px) drop-shadow(0 0 20px currentColor) brightness(2)',
                mixBlendMode: 'screen',
              }}
            >
              {char}
            </span>
            {/* Main letter */}
            <span
              style={{
                display: 'inline-block',
                fontFamily: fontFamily + ',sans-serif',
                fontSize,
                fontWeight,
                color,
                transformStyle: 'preserve-3d',
                perspective: '1000px',
                animation,
                opacity,
                textAlign: 'center',
                position: 'relative',
                zIndex: 1,
              }}
            >
              {char}
            </span>
          </span>
        );
      }
    });
    
    // Push remaining word
    if (currentWord.length > 0) {
      result.push(
        <span key={`word-final`} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
          {currentWord}
        </span>
      );
    }
    
    return result;
  };

  return (
    <span style={{ display: 'inline', lineHeight: lineHeight || 'normal' }}>
      {renderChars()}
      <style>{`
        @keyframes flipBoardVerticalFadeIn {
          0% {
            transform: rotateX(-90deg);
            opacity: 0;
          }
          10% {
            transform: rotateX(-90deg);
            opacity: 0.2;
          }
          30% {
            transform: rotateX(-60deg);
            opacity: 0.5;
          }
          50% {
            transform: rotateX(-30deg);
            opacity: 0.7;
          }
          70% {
            transform: rotateX(-10deg);
            opacity: 0.85;
          }
          100% {
            transform: rotateX(0deg);
            opacity: 1;
          }
        }
        
        @keyframes flipBoardTrail {
          0% {
            transform: rotateX(-90deg) scale(1.5, 2.5);
            opacity: 0;
            filter: blur(8px) drop-shadow(0 0 35px currentColor) brightness(3);
          }
          10% {
            transform: rotateX(-70deg) scale(1.4, 2.2);
            opacity: 0.7;
            filter: blur(7px) drop-shadow(0 0 32px currentColor) brightness(2.8);
          }
          30% {
            transform: rotateX(-40deg) scale(1.3, 2.0);
            opacity: 0.85;
            filter: blur(6px) drop-shadow(0 0 30px currentColor) brightness(2.5);
          }
          50% {
            transform: rotateX(0deg) scale(1.2, 1.8);
            opacity: 0.9;
            filter: blur(5px) drop-shadow(0 0 28px currentColor) brightness(2.2);
          }
          70% {
            transform: rotateX(10deg) scale(1.15, 1.5);
            opacity: 0.75;
            filter: blur(4px) drop-shadow(0 0 24px currentColor) brightness(1.8);
          }
          85% {
            transform: rotateX(5deg) scale(1.1, 1.3);
            opacity: 0.5;
            filter: blur(3px) drop-shadow(0 0 18px currentColor) brightness(1.4);
          }
          100% {
            transform: rotateX(0deg) scale(1, 1);
            opacity: 0;
            filter: blur(0px) drop-shadow(0 0 0px currentColor) brightness(1);
          }
        }
      `}</style>
    </span>
  );
}
