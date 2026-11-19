import React, { useState, useEffect } from 'react';
import { BcaLogo } from './BcaLogo';

interface NavbarProps {
  onHelpClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onHelpClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md py-2 border-b border-[#d0dbe5]'
          : 'bg-transparent py-3 border-b border-white/15'
      }`}
    >
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-5 md:px-6 xl:px-8 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 text-xl font-extrabold" id="brand-link">
          <BcaLogo
            height={30}
            textColor={isScrolled ? '#0060af' : '#ffffff'}
            emblemColor={isScrolled ? '#0060af' : '#ffffff'}
          />
        </a>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8" id="navLinks">
          <li>
            <button
              onClick={onHelpClick}
              className="px-5 py-2 bg-[#ffd100] text-[#1a2b4c] rounded-full font-bold text-xs shadow-sm hover:brightness-95 transition-all cursor-pointer"
              id="helpCenterBtn"
            >
              Pusat Bantuan
            </button>
          </li>
        </ul>

        {/* Mobile Toggle Button */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1 bg-transparent border-0 cursor-pointer"
          id="mobileToggle"
          aria-label="Toggle menu"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span
            className={`w-6 h-0.5 rounded transition-all duration-300 ${
              isScrolled ? 'bg-[#1a2b4c]' : 'bg-white'
            }`}
          />
          <span
            className={`w-6 h-0.5 rounded transition-all duration-300 ${
              isScrolled ? 'bg-[#1a2b4c]' : 'bg-white'
            }`}
          />
          <span
            className={`w-6 h-0.5 rounded transition-all duration-300 ${
              isScrolled ? 'bg-[#1a2b4c]' : 'bg-white'
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <div
          className="md:hidden bg-white px-6 py-5 shadow-lg border-t border-[#d0dbe5] flex flex-col gap-4"
          id="mobileMenu"
        >
          <button
            onClick={() => {
              setMobileOpen(false);
              onHelpClick?.();
            }}
            className="w-full text-center py-2.5 bg-[#ffd100] text-[#1a2b4c] rounded-full font-bold text-sm shadow-sm"
          >
            Pusat Bantuan
          </button>
        </div>
      )}
    </nav>
  );
};
