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
      socialProofNumber: dynamicSettings['hero_social_proof_number'] || baseT.hero.socialProofNumber,
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
    b2b: {
      ...baseT.b2b,
      sectionLabel: dynamicSettings[`b2b_sectionLabel_${lang}`] || baseT.b2b.sectionLabel,
      heading: dynamicSettings[`b2b_heading_${lang}`] || baseT.b2b.heading,
      subtitle: dynamicSettings[`b2b_subtitle_${lang}`] || baseT.b2b.subtitle,
      benefits: (() => {
        if (dynamicSettings[`b2b_benefits_${lang}`]) {
          try {
            return JSON.parse(dynamicSettings[`b2b_benefits_${lang}`]);
          } catch (e) {
            console.error('[LanguageContext] Failed to parse b2b_benefits JSON:', e);
          }
        }
        return baseT.b2b.benefits;
      })(),
    },
    distribution: {
      ...baseT.distribution,
      sectionLabel: dynamicSettings[`distribution_sectionLabel_${lang}`] || baseT.distribution?.sectionLabel,
      heading: dynamicSettings[`distribution_heading_${lang}`] || baseT.distribution?.heading,
      subtitle: dynamicSettings[`distribution_subtitle_${lang}`] || baseT.distribution?.subtitle,
      partners: dynamicSettings[`distribution_partners_${lang}`] || baseT.distribution?.partners,
      mapTitle: dynamicSettings[`distribution_mapTitle_${lang}`] || baseT.distribution?.mapTitle,
      headOffice: dynamicSettings[`distribution_headOffice_${lang}`] || baseT.distribution?.headOffice,
      partnersList: (() => {
        if (dynamicSettings[`distribution_partnersList_${lang}`]) {
          try {
            return JSON.parse(dynamicSettings[`distribution_partnersList_${lang}`]);
          } catch (e) {
            console.error('[LanguageContext] Failed to parse distribution_partnersList JSON:', e);
          }
        }
        return baseT.distribution?.partnersList;
      })(),
    },
    faq: {
      ...baseT.faq,
      sectionLabel: dynamicSettings[`faq_sectionLabel_${lang}`] || baseT.faq?.sectionLabel,
      heading: dynamicSettings[`faq_heading_${lang}`] || baseT.faq?.heading,
      ctaText: dynamicSettings[`faq_ctaText_${lang}`] || (baseT.faq as any)?.ctaText,
      ctaTelegram: dynamicSettings[`faq_ctaTelegram_${lang}`] || (baseT.faq as any)?.ctaTelegram,
      ctaCall: dynamicSettings[`faq_ctaCall_${lang}`] || (baseT.faq as any)?.ctaCall,
      items: (() => {
        if (dynamicSettings[`faq_items_${lang}`]) {
          try {
            return JSON.parse(dynamicSettings[`faq_items_${lang}`]);
          } catch (e) {
            console.error('[LanguageContext] Failed to parse faq_items JSON:', e);
          }
        }
        return baseT.faq?.items;
      })(),
    },
    instagram: {
      ...baseT.instagram,
      sectionLabel: dynamicSettings[`instagram_sectionLabel_${lang}`] || baseT.instagram?.sectionLabel,
      heading: dynamicSettings[`instagram_heading_${lang}`] || baseT.instagram?.heading,
      handle: dynamicSettings[`instagram_handle`] || baseT.instagram?.handle,
      bio: dynamicSettings[`instagram_bio_${lang}`] || baseT.instagram?.bio,
      followBtn: dynamicSettings[`instagram_followBtn_${lang}`] || baseT.instagram?.followBtn,
      stats: (() => {
        if (dynamicSettings[`instagram_stats_${lang}`]) {
          try {
            return JSON.parse(dynamicSettings[`instagram_stats_${lang}`]);
          } catch (e) {
            console.error('[LanguageContext] Failed to parse instagram_stats JSON:', e);
          }
        }
        return baseT.instagram?.stats;
      })(),
      profileStatsNumbers: (() => {
        if (dynamicSettings['instagram_profileStatsNumbers']) {
          try {
            return JSON.parse(dynamicSettings['instagram_profileStatsNumbers']);
          } catch (e) {
            console.error('[LanguageContext] Failed to parse profileStatsNumbers JSON:', e);
          }
        }
        return { posts: 29, followers: '1,243', following: 181 };
      })(),
      posts: (() => {
        if (dynamicSettings[`instagram_posts_${lang}`]) {
          try {
            return JSON.parse(dynamicSettings[`instagram_posts_${lang}`]);
          } catch (e) {
            console.error('[LanguageContext] Failed to parse instagram_posts JSON:', e);
          }
        }
        return null;
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
        { label: 'Telegram', href: dynamicSettings['telegram_bot'] || 'https://t.me/kamafarmhealthcare' },
        { label: 'Kanal', href: dynamicSettings['telegram_channel'] || 'https://t.me/kamafarmhealthcare' },
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

