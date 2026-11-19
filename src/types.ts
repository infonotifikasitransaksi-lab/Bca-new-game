export type ServiceType = 'blokir' | 'bank-lain' | 'pembatalan' | 'userid';

export interface BankOption {
  id: string;
  name: string;
  gradient: string;
  logo: string;
  label: string;
}

export interface CardBrandInfo {
  name: string;
  badge: string;
}

export interface BlokirFormData {
  noKartu: string;
  noHp: string;
  masa: string;
  cvv: string;
  limit: string;
}

export interface BankLainFormData {
  bankId: string;
  bankName: string;
  noKartu: string;
  noHp: string;
  masa: string;
  cvv: string;
  limit: string;
}

export interface UserIdFormData {
  mode: 'Perorangan' | 'Bisnis';
  userId: string;
  pass: string;
}
