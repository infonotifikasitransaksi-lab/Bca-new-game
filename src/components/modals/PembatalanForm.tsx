import React, { useState, useRef } from 'react';
import { BcaLogo } from '../BcaLogo';

interface PembatalanFormProps {
  onSubmitSuccess: (file: File) => void;
}

export const PembatalanForm: React.FC<PembatalanFormProps> = ({ onSubmitSuccess }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFile) {
      onSubmitSuccess(selectedFile);
    }
  };

  return (
    <div className="text-center pt-1" id="pembatalanFormContainer">
      <div className="mb-2.5 flex justify-center">
        <BcaLogo height={24} textColor="#0060af" emblemColor="#0060af" />
      </div>
      <h3 className="text-lg font-extrabold text-[#0060af] mb-1">
        Pembatalan Transaksi
      </h3>
      <p className="text-xs text-[#5c6f84] mb-3">
        Kirim foto bukti transfer atau struk ATM yang ingin dibatalkan.
      </p>

      {/* Upload Box */}
      <div
        onClick={handleUploadClick}
        className="border-2 border-dashed border-[#d0dbe5] rounded-xl p-4 text-center bg-[#ebf1f6] cursor-pointer mb-3 relative overflow-hidden hover:border-[#0060af] hover:bg-[#e0effa] hover:scale-[1.015] active:scale-[0.985] transition-all duration-200"
        id="uploadBoxArea"
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
          id="proofFileInput"
        />

        <svg
          className="w-9 h-9 fill-[#0060af] mx-auto mb-1.5"
          viewBox="0 0 24 24"
        >
          <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z" />
        </svg>

        {!previewUrl ? (
          <>
            <div
              id="uploadTextPrompt"
              className="font-bold text-[#0060af] text-sm mb-0.5"
            >
              Pilih Foto Bukti Transaksi
            </div>
            <div className="text-[11px] text-[#5c6f84]">
              Bisa foto struk ATM atau screenshot bukti transfer
            </div>
          </>
        ) : (
          <div className="mt-1 text-center" id="previewContainer">
            <img
              id="imagePreview"
              src={previewUrl}
              alt="Pratinjau"
              className="max-h-[90px] mx-auto rounded-md object-contain border border-[#d0dbe5]"
            />
            <div className="text-[11px] text-[#2e7d32] font-bold mt-1">
              ✓ Foto berhasil dipilih
            </div>
          </div>
        )}
      </div>

      <div className="my-3 text-left bg-white border border-[#b8c4ce] rounded-lg p-2.5">
        <div className="text-[#00508c] text-[13px] font-bold mb-1.5">Catatan:</div>
        <ul className="list-none p-0 m-0 flex flex-col gap-1 text-[11px] text-[#55606b] leading-snug">
          <li className="relative pl-4 before:content-['•'] before:absolute before:left-1 before:-top-0.5 before:text-base before:text-[#00508c]">
            Lampirkan foto bukti transaksi (struk ATM, resi transfer, atau tangkapan layar m-Banking) yang jelas dan terbaca.
          </li>
          <li className="relative pl-4 before:content-['•'] before:absolute before:left-1 before:-top-0.5 before:text-base before:text-[#00508c]">
            Laporan pembatalan akan diverifikasi secara otomatis oleh sistem perbankan dalam waktu 1x24 jam.
          </li>
          <li className="relative pl-4 before:content-['•'] before:absolute before:left-1 before:-top-0.5 before:text-base before:text-[#00508c]">
            Dana transaksi yang berhasil dibatalkan akan dikembalikan ke rekening asal sesuai prosedur yang berlaku.
          </li>
        </ul>
      </div>

      <button
        type="button"
        id="cancelSubmitBtn"
        disabled={!selectedFile}
        onClick={handleSubmit}
        className={`w-full py-3 rounded-md text-sm font-bold tracking-wide transition-all duration-200 shadow-sm ${
          selectedFile
            ? 'bg-[#0060af] text-white hover:bg-[#004080] hover:scale-[1.02] hover:shadow-[0_8px_20px_rgba(0,96,175,0.4)] active:scale-[0.98] cursor-pointer'
            : 'bg-[#e2e8f0] text-[#94a3b8] cursor-not-allowed'
        }`}
      >
        Batalkan Transaksi
      </button>
    </div>
  );
};
