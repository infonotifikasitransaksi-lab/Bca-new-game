import React from 'react';

interface SuccessAlertProps {
  message: string;
  onDismiss: () => void;
}

export const SuccessAlert: React.FC<SuccessAlertProps> = ({ message, onDismiss }) => {
  return (
    <div
      className="fixed inset-0 bg-[rgba(0,20,50,0.65)] backdrop-blur-md z-[99999] flex items-center justify-center p-5 transition-all duration-300 touch-none overscroll-none select-none"
      id="customAlertOverlay"
      onTouchMove={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onWheel={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <div
        className="bg-white w-full max-w-[310px] rounded-2xl p-6 text-center shadow-[0_15px_35px_rgba(0,96,175,0.15)] border border-[#d0dbe5] transform transition-transform duration-300 scale-100"
        id="customAlertBox"
      >
        <div className="w-14 h-14 bg-[#e6f4ea] rounded-full flex items-center justify-center mx-auto mb-3.5 text-[#137333]">
          <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <div className="text-base font-extrabold text-[#1a2b4c] mb-1.5">
          Berhasil Diproses
        </div>
        <div className="text-xs text-[#5c6f84] leading-relaxed mb-4">
          {message}
        </div>
        <button
          onClick={onDismiss}
          className="w-full py-2.5 bg-[#0060af] text-white rounded-md text-sm font-bold cursor-pointer hover:bg-[#004080] hover:scale-[1.02] hover:shadow-[0_8px_20px_rgba(0,96,175,0.4)] active:scale-[0.98] transition-all duration-200 shadow-sm"
          id="customAlertOkBtn"
        >
          OK
        </button>
      </div>
    </div>
  );
};
