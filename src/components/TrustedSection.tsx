import React from 'react';

export const TrustedSection: React.FC = () => {
  const brands = ['BCA Mobile', 'KlikBCA', 'myBCA', 'BCA Sakuku', 'Flazz BCA'];

  return (
    <section className="py-10 bg-[#ebf1f6]" id="trustedSection">
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-5 md:px-6 xl:px-8">
        <p className="text-center text-xs text-[#5c6f84] uppercase tracking-[2px] font-semibold mb-6">
          Didukung oleh sistem keamanan dan enkripsi perbankan terpercaya
        </p>
        <div className="flex items-center justify-center gap-9 flex-wrap opacity-60">
          {brands.map((brand) => (
            <span
              key={brand}
              className="text-base sm:text-lg font-bold text-[#0060af] tracking-wider"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
