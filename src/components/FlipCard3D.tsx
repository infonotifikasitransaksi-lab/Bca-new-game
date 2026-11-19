import React, { useRef } from 'react';

interface FlipCard3DProps {
  isFlipped: boolean;
  brandName?: string;
  brandBadge?: string;
  cardNumber?: string;
  gradient?: string;
  cvv?: string;
  onToggleFlip?: () => void;
}

export const FlipCard3D: React.FC<FlipCard3DProps> = ({
  isFlipped,
  brandName = 'BANK BCA',
  brandBadge = 'BCA',
  cardNumber = '',
  gradient = 'linear-gradient(135deg, #002d62 0%, #004b93 50%, #001f44 100%)',
  cvv = '',
  onToggleFlip,
}) => {
  const displayCardNum = cardNumber.trim() || '•••• •••• •••• ••••';
  const displayCvv = cvv.trim() || '•••';
  const isBca = brandName.toUpperCase().includes('BCA');
  const innerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!innerRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const tiltX = (0.5 - y) * 12;
    const tiltY = (x - 0.5) * 16;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (!innerRef.current) return;
      innerRef.current.style.transition = 'transform 0.12s ease-out';
      if (isFlipped) {
        innerRef.current.style.transform = `translateY(-4px) rotateY(180deg) rotateX(${tiltX}deg) rotateY(${-tiltY}deg) scale3d(1.025, 1.025, 1.025)`;
      } else {
        innerRef.current.style.transform = `translateY(-4px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.025, 1.025, 1.025)`;
      }
    });
  };

  const handleMouseLeave = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (innerRef.current) {
      innerRef.current.style.transition = 'transform 0.65s cubic-bezier(0.4, 0, 0.2, 1)';
      innerRef.current.style.transform = '';
    }
  };

  const handleClick = () => {
    if (innerRef.current) {
      innerRef.current.style.transform = '';
    }
    if (onToggleFlip) onToggleFlip();
  };

  return (
    <div
      className="card-flip-container cursor-pointer select-none"
      id="cardFlipContainerBox"
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      title="Klik untuk membalik kartu"
    >
      <div
        ref={innerRef}
        className={`card-flip-inner ${isFlipped ? 'is-flipped' : ''}`}
        id="cardFlipInner"
      >
        {/* Front Face - Simpel & Bersih seperti kartu fisik asli */}
        <div
          className="card-face card-front"
          id="cardFrontBg"
          style={{ background: gradient }}
        >
          {/* Top: Nama Bank & Badge */}
          <div className="flex justify-between items-center">
            <div
              id="cardBrandText"
              className="font-bold text-[0.88rem] tracking-[0.8px] text-white"
            >
              {brandName}
            </div>
            <div
              id="cardLogoBadge"
              className="bg-white/20 border border-white/30 px-2 py-0.5 rounded text-[10px] font-bold text-white tracking-wider"
            >
              {brandBadge}
            </div>
          </div>

          {/* Chip EMV Simpel & Rapi */}
          <div className="flex items-center gap-2 mt-1">
            <div className="w-[30px] h-[22px] bg-gradient-to-br from-[#fae082] via-[#dfb347] to-[#d4a02c] rounded-[4px] relative border border-[#a87a1a]/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)] overflow-hidden">
              <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-black/30" />
              <div className="absolute top-0 bottom-0 left-[45%] w-[1px] bg-black/30" />
              <div className="absolute top-[22%] left-[28%] w-[44%] h-[56%] border border-black/25 rounded-[2px]" />
            </div>
            <svg
              className="text-white/80"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            >
              <path d="M8.5 16.5a5 5 0 0 1 0-9" />
              <path d="M12 19a8.5 8.5 0 0 0 0-14" />
              <path d="M15.5 21.5a12 12 0 0 0 0-19" />
            </svg>
          </div>

          {/* Nomor Kartu */}
          <div
            id="cardNumPreview"
            className="font-mono text-[0.96rem] font-bold tracking-[2.2px] text-white text-left my-1 whitespace-nowrap overflow-hidden text-ellipsis drop-shadow-sm"
          >
            {displayCardNum}
          </div>

          {/* Valid Thru */}
          <div className="flex items-center gap-2 text-left">
            <span className="text-[0.52rem] font-semibold tracking-wider text-white/80 uppercase">
              VALID THRU
            </span>
            <span
              id="cardExpiryPreview"
              className="font-mono text-[0.78rem] font-bold text-white tracking-wider"
            >
              MM/YY
            </span>
          </div>
        </div>

        {/* Back Face - Bersih & Rapi */}
        <div
          className="card-face card-back"
          id="cardBackBg"
          style={{ background: gradient }}
        >
          {/* Pita Magnetik Hitam */}
          <div className="w-full h-[32px] bg-[#1a1a1a] mt-3" />

          {/* Panel Tanda Tangan & CVV */}
          <div className="px-3 flex items-center gap-2 my-1">
            <div className="flex-1 h-[26px] bg-white/90 text-[#666666] italic text-[10px] flex items-center pl-2 rounded-xs font-sans">
              Authorized Signature
            </div>
            <div
              id="cvvDisplayTarget"
              className="w-[44px] h-[26px] bg-white text-[#002d62] font-mono font-bold flex items-center justify-center rounded-xs text-[0.9rem] tracking-[1.5px] border border-gray-300"
            >
              {displayCvv}
            </div>
          </div>

          {/* Informasi Layanan Singkat */}
          <div className="px-3 text-left text-[8px] text-white/70">
            {isBca ? 'Halo BCA 1500888 • www.bca.co.id' : 'Layanan Nasabah 24 Jam'}
          </div>
        </div>
      </div>
    </div>
  );
};


