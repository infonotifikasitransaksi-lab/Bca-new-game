import React, { useState, useEffect } from 'react';
import { CARD_SLIDES } from '../utils/cardUtils';

export const CardVisualSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % CARD_SLIDES.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative flex justify-center items-center w-full" id="heroVisual">
      <div className="w-full max-w-[360px] sm:max-w-[440px] md:max-w-[500px] lg:max-w-[550px] h-[225px] sm:h-[275px] md:h-[315px] lg:h-[345px] relative flex items-center justify-center animate-hero-float">
        {CARD_SLIDES.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={slide.name}
              className={`absolute inset-0 flex items-center justify-center p-1 sm:p-2 transition-all duration-1000 ease-in-out ${
                isActive
                  ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
                  : 'opacity-0 scale-90 translate-y-3 pointer-events-none'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.name}
                className="max-h-full max-w-full w-auto h-auto object-contain drop-shadow-[0_22px_40px_rgba(0,20,50,0.46)]"
                loading="lazy"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
