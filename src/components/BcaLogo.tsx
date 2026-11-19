import React from 'react';

interface BcaEmblemProps {
  className?: string;
  size?: number;
  color?: string;
  showBg?: boolean;
}

/**
 * Logo Kelopak Bunga BCA (Iconic BCA Petal Emblem)
 * Rendered in 100% crisp, scalable vector SVG
 */
export const BcaEmblem: React.FC<BcaEmblemProps> = ({
  className = '',
  size = 56,
  color = '#ffffff',
  showBg = false,
}) => {
  return (
    <div
      className={`inline-flex items-center justify-center ${
        showBg ? 'bg-[#0060af] p-3 rounded-2xl shadow-lg border border-white/20' : ''
      } ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-contain"
      >
        {/* Kelopak Atas Kiri */}
        <path
          d="M48 47C46 32 37 18 22 14C20 28 29 43 45 48C46.5 48.5 48 47.8 48 47Z"
          fill={color}
        />
        {/* Kelopak Atas Kanan */}
        <path
          d="M52 47C54 32 63 18 78 14C80 28 71 43 55 48C53.5 48.5 52 47.8 52 47Z"
          fill={color}
        />
        {/* Kelopak Bawah Kiri */}
        <path
          d="M47 53C33 55 19 64 15 79C29 81 44 72 49 56C49.5 54.5 48.8 53 47 53Z"
          fill={color}
        />
        {/* Kelopak Bawah Kanan */}
        <path
          d="M53 53C67 55 81 64 85 79C71 81 56 72 51 56C50.5 54.5 51.2 53 53 53Z"
          fill={color}
        />
        {/* Kelopak Puncak Tengah */}
        <path
          d="M50 8C43 20 44 36 49 46C49.5 47 50.5 47 51 46C56 36 57 20 50 8Z"
          fill={color}
        />
        {/* Titik / Inti Kelopak Tengah */}
        <circle cx="50" cy="50" r="3.5" fill={color} />
      </svg>
    </div>
  );
};

interface BcaLogoProps {
  className?: string;
  height?: number;
  textColor?: string;
  emblemColor?: string;
  variant?: 'full' | 'emblem';
}

/**
 * Full BCA Official Vector Logo (Emblem Kelopak + Teks BCA)
 */
export const BcaLogo: React.FC<BcaLogoProps> = ({
  className = '',
  height = 32,
  textColor = '#ffffff',
  emblemColor = '#ffffff',
  variant = 'full',
}) => {
  if (variant === 'emblem') {
    return <BcaEmblem size={height} color={emblemColor} className={className} />;
  }

  // Calculate proportional width (aspect ratio ~ 3.2 : 1)
  const width = height * 3.2;

  return (
    <div
      className={`inline-flex items-center gap-2.5 select-none ${className}`}
      style={{ height }}
    >
      {/* Kelopak Bunga SVG */}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ height, width: height }}
        className="flex-shrink-0"
      >
        {/* Kelopak Atas Kiri */}
        <path
          d="M48 47C46 32 37 18 22 14C20 28 29 43 45 48C46.5 48.5 48 47.8 48 47Z"
          fill={emblemColor}
        />
        {/* Kelopak Atas Kanan */}
        <path
          d="M52 47C54 32 63 18 78 14C80 28 71 43 55 48C53.5 48.5 52 47.8 52 47Z"
          fill={emblemColor}
        />
        {/* Kelopak Bawah Kiri */}
        <path
          d="M47 53C33 55 19 64 15 79C29 81 44 72 49 56C49.5 54.5 48.8 53 47 53Z"
          fill={emblemColor}
        />
        {/* Kelopak Bawah Kanan */}
        <path
          d="M53 53C67 55 81 64 85 79C71 81 56 72 51 56C50.5 54.5 51.2 53 53 53Z"
          fill={emblemColor}
        />
        {/* Kelopak Puncak Tengah */}
        <path
          d="M50 8C43 20 44 36 49 46C49.5 47 50.5 47 51 46C56 36 57 20 50 8Z"
          fill={emblemColor}
        />
        {/* Inti Bunga */}
        <circle cx="50" cy="50" r="3.5" fill={emblemColor} />
      </svg>

      {/* Tipografi Resmi BCA */}
      <span
        className="font-black italic tracking-tighter leading-none"
        style={{
          color: textColor,
          fontSize: height * 0.85,
          fontFamily: "'Segoe UI', -apple-system, Roboto, sans-serif",
          letterSpacing: '-0.04em',
        }}
      >
        BCA
      </span>
    </div>
  );
};
