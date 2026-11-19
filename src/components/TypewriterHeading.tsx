import React, { useState, useEffect } from 'react';

interface TypewriterHeadingProps {
  className?: string;
}

export const TypewriterHeading: React.FC<TypewriterHeadingProps> = ({ className = '' }) => {
  const part1 = 'Pusat Layanan Keamanan';
  const part2 = 'Kartu BCA ID';
  const fullText = `${part1} ${part2}`;

  const [displayedLength, setDisplayedLength] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isPaused) {
      // Pause at full text or empty text
      timer = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(!isDeleting);
      }, isDeleting ? 800 : 4500); // Wait 4.5s after finishing typing, 800ms before typing again
      return () => clearTimeout(timer);
    }

    if (!isDeleting) {
      // Typing mode
      if (displayedLength < fullText.length) {
        timer = setTimeout(() => {
          setDisplayedLength((prev) => prev + 1);
        }, 65 + Math.random() * 35); // realistic human typing rhythm 65-100ms
      } else {
        setIsPaused(true);
      }
    } else {
      // Deleting mode
      if (displayedLength > 0) {
        timer = setTimeout(() => {
          setDisplayedLength((prev) => prev - 1);
        }, 35);
      } else {
        setIsPaused(true);
      }
    }

    return () => clearTimeout(timer);
  }, [displayedLength, isDeleting, isPaused, fullText.length]);

  const currentText = fullText.slice(0, displayedLength);
  const part1Length = part1.length;
  
  // Split the current typed text into part1 and part2
  let textPart1 = '';
  let textPart2 = '';

  if (displayedLength <= part1Length) {
    textPart1 = currentText;
  } else if (displayedLength <= part1Length + 1) {
    textPart1 = part1 + ' ';
  } else {
    textPart1 = part1 + ' ';
    textPart2 = fullText.slice(part1Length + 1, displayedLength);
  }

  return (
    <h1
      className={`text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight min-h-[2.4em] sm:min-h-[2.2em] flex flex-wrap items-center justify-center lg:justify-start ${className}`}
      id="hero-typing-title"
    >
      <span>{textPart1}</span>
      {textPart2 && (
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffd100] to-[#ffea75] ml-2">
          {textPart2}
        </span>
      )}
    </h1>
  );
};
