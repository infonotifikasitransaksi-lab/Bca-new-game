import React, { useEffect, useState } from 'react';
import { BcaLogo } from '../BcaLogo';

interface CountdownLoaderProps {
  actionTitle: string;
  onComplete: () => void;
}

export const CountdownLoader: React.FC<CountdownLoaderProps> = ({ actionTitle, onComplete }) => {
  const [seconds, setSeconds] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 bg-white/95 backdrop-blur-md z-[99999] flex flex-col items-center justify-center text-center p-6 transition-all duration-300 touch-none overscroll-none select-none"
      id="bcaLoaderOverlay"
      onTouchMove={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onWheel={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <div className="mb-3">
        <BcaLogo height={28} textColor="#0060af" emblemColor="#0060af" />
      </div>
      <div className="w-12 h-12 border-4 border-[#ebf1f6] border-t-[#0060af] rounded-full animate-spin-custom mb-3" />
      <div className="text-2xl font-extrabold text-[#0060af] mb-1" id="countdownSec">
        {seconds}
      </div>
      <div className="text-xs text-[#5c6f84] font-semibold leading-relaxed">
        {actionTitle}
        <br />
        <span className="text-[11px] text-[#0060af]">Mengenkripsi Sesi...</span>
      </div>
    </div>
  );
};

