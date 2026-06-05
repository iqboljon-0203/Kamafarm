'use client';
// context/LanguageContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, translations } from '@/lib/i18n';

interface LanguageContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  t: typeof translations.uz;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('uz');
  const [dynamicSettings, setDynamicSettings] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data.settings) {
          setDynamicSettings(data.settings);
        }
      })
      .catch((err) => console.error('[LanguageContext] Failed to load settings:', err));
  }, []);

  const baseT = translations[lang];

  // Merge dynamic settings into static translations
  const t = {
    ...baseT,
    nav: {
      ...baseT.nav,
      phone: dynamicSettings['phone1'] || baseT.nav.phone,
    },
    hero: {
      ...baseT.hero,
      heading1: dynamicSettings[`hero_heading1_${lang}`] || baseT.hero.heading1,
      heading2: dynamicSettings[`hero_heading2_${lang}`] || baseT.hero.heading2,
      heading3: dynamicSettings[`hero_heading3_${lang}`] || baseT.hero.heading3,
      subtitle: dynamicSettings[`hero_subtitle_${lang}`] || baseT.hero.subtitle,
      cta1: dynamicSettings[`hero_cta1_${lang}`] || baseT.hero.cta1,
      cta2: dynamicSettings[`hero_cta2_${lang}`] || baseT.hero.cta2,
      badgeProducts: dynamicSettings[`hero_badge_products_${lang}`] || baseT.hero.badgeProducts,
      badgeGmp: dynamicSettings[`hero_badge_gmp_${lang}`] || baseT.hero.badgeGmp,
      socialProof: dynamicSettings[`hero_social_proof_${lang}`] || baseT.hero.socialProof,
      scrollDown: dynamicSettings[`hero_scroll_down_${lang}`] || baseT.hero.scrollDown,
    },
    partners: {
      ...baseT.partners,
      heading: dynamicSettings[`partners_heading_${lang}`] || baseT.partners.heading,
      list: (() => {
        if (dynamicSettings['partners_list']) {
          try {
            return JSON.parse(dynamicSettings['partners_list']);
          } catch (e) {
            console.error('[LanguageContext] Failed to parse partners_list JSON:', e);
          }
        }
        return baseT.partners.list;
      })(),
    },
    about: {
      ...baseT.about,
      heading: dynamicSettings[`about_heading_${lang}`] || baseT.about.heading,
      description: dynamicSettings[`about_description_${lang}`] || baseT.about.description,
      features: (() => {
        if (dynamicSettings[`about_features_${lang}`]) {
          try {
            return JSON.parse(dynamicSettings[`about_features_${lang}`]);
          } catch (e) {
            console.error('[LanguageContext] Failed to parse about_features JSON:', e);
          }
        }
        return baseT.about.features;
      })(),
      stats: (() => {
        if (dynamicSettings[`about_stats_${lang}`]) {
          try {
            return JSON.parse(dynamicSettings[`about_stats_${lang}`]);
          } catch (e) {
            console.error('[LanguageContext] Failed to parse about_stats JSON:', e);
          }
        }
        return baseT.about.stats;
      })(),
      values: (() => {
        if (dynamicSettings[`about_values_${lang}`]) {
          try {
            return JSON.parse(dynamicSettings[`about_values_${lang}`]);
          } catch (e) {
            console.error('[LanguageContext] Failed to parse about_values JSON:', e);
          }
        }
        return baseT.about.values;
      })(),
    },
    footer: {
      ...baseT.footer,
      about: dynamicSettings[`footer_about_${lang}`] || baseT.footer.about,
      workingHours: dynamicSettings[`footer_working_hours_${lang}`] || baseT.footer.workingHours,
      address: dynamicSettings['address'] || baseT.footer.address,
      phones: [
        dynamicSettings['phone1'] || baseT.footer.phones[0],
        dynamicSettings['phone2'] || baseT.footer.phones[1],
      ],
      socialLinks: [
        { label: 'Instagram', href: dynamicSettings['instagram'] || 'https://instagram.com/kamafarm.healthcare' },
        { label: 'Telegram', href: dynamicSettings['telegram_bot'] || 'https://t.me/kamafarm_bot' },
        { label: 'Kanal', href: dynamicSettings['telegram_channel'] || 'https://t.me/kamafarm_channel' },
        { label: 'Facebook', href: dynamicSettings['facebook'] || 'https://facebook.com/kamafarm' },
      ],
    },
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}

