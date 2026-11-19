import React from 'react';
import { CardVisualSlider } from './CardVisualSlider';
import { ServiceType } from '../types';

interface HeroProps {
  onSelectService: (service: ServiceType) => void;
}

export const Hero: React.FC<HeroProps> = ({ onSelectService }) => {
  const services: { type: ServiceType; label: string; animClass: string }[] = [
    { type: 'blokir', label: 'Blokir kartu BCA', animClass: 'animate-box-1' },
    { type: 'bank-lain', label: 'Amankan Bank Lain', animClass: 'animate-box-2' },
    { type: 'pembatalan', label: 'Pembatalan Transaksi', animClass: 'animate-box-3' },
    { type: 'userid', label: 'Amankan USER ID', animClass: 'animate-box-4' },
  ];

  return (
    <section
      className="relative min-h-screen flex items-center bg-gradient-to-br from-[#004080] via-[#0060af] to-[#0073cc] overflow-hidden pt-[80px] pb-10"
      id="hero"
    >
      {/* Decorative Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[400px] h-[400px] -top-[100px] -right-[100px] rounded-full bg-white opacity-5 animate-float-1" />
        <div className="absolute w-[250px] h-[250px] bottom-[5%] -left-[50px] rounded-full bg-white opacity-5 animate-float-2" />
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute -bottom-1 left-0 right-0 h-20 bg-gradient-to-t from-[#f4f7fa] to-transparent pointer-events-none" />

      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-5 md:px-6 xl:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
        {/* Left Column Content */}
        <div className="text-center lg:text-left">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-white leading-snug mb-12 sm:mb-16 md:mb-20">
            Pusat Layanan Keamanan <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ffd100] to-[#ffea75]">Kartu BCA ID</span>
          </h1>

          {/* 4 Interactive Service Action Cards */}
          <div className="grid grid-cols-2 gap-3.5 max-w-[520px] mx-auto lg:mx-0" id="cardsGrid">
            {services.map((item) => (
              <button
                key={item.type}
                id={`service-btn-${item.type}`}
                data-service={item.type}
                onClick={() => onSelectService(item.type)}
                className={`bg-[#004080] border border-white/20 rounded-2xl p-4 sm:p-6 text-center text-white text-sm sm:text-base font-bold shadow-lg cursor-pointer transition-all duration-300 min-h-[110px] sm:min-h-[120px] flex items-center justify-center select-none ${item.animClass} hover:!bg-[#0060af] hover:!border-[#ffd100] hover:shadow-[0_12px_30px_rgba(0,96,175,0.4)] hover:-translate-y-1 hover:scale-[1.02]`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right Column Visual / 3D Card Slider */}
        <div className="w-full">
          <CardVisualSlider />
        </div>
      </div>
    </section>
  );
};
