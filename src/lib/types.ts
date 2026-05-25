// lib/types.ts
export interface Product {
  id: string;
  name_uz: string;
  name_ru: string;
  description_uz: string;
  description_ru: string;
  composition_uz: string;
  composition_ru: string;
  usage_uz: string;
  usage_ru: string;
  category: string;
  image: string;
  badge?: string;
  telegramlink?: string;
}

export interface Lead {
  id?: string;
  name: string;
  phone: string;
  company?: string;
  source?: string;
  status?: 'new' | 'contacted';
  created_at?: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  image: string;
}

export interface Partner {
  id: string;
  name: string;
  logo?: string;
}

export interface FAQItem {
  q: string;
  a: string;
}

export interface SiteSetting {
  key: string;
  value: string;
}

export type FilterCategory = 'Barchasi' | 'Miya faoliyati' | 'Kamqonlik' | 'Bolalar uchun' | 'Kattalar uchun';
