import React from 'react';
import { BcaEmblem } from '../BcaLogo';

interface SplashScreenProps {
  visible: boolean;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ visible }) => {
  if (!visible) return null;

  return (
    <div
      className="absolute inset-0 bg-gradient-to-br from-[#004080] via-[#00529e] to-[#0060af] z-50 flex flex-col items-center justify-center text-center p-6 transition-opacity duration-300"
      id="appSplashScreen"
    >
      <div className="animate-pulse-logo flex flex-col items-center mb-4">
        {/* Logo Kelopak Bunga BCA Vektor Murni */}
        <BcaEmblem size={76} color="#ffffff" />
        <span
          className="text-white font-black italic tracking-tighter text-2xl mt-2"
          style={{ letterSpacing: '-0.04em' }}
        >
          BCA
        </span>
      </div>
      <div className="text-white/90 text-xs tracking-wide font-medium">
        Memuat Layanan Keamanan...
      </div>
    </div>
  );
};

