'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Save, CheckCircle2, Settings, Phone, MapPin, Layout, Globe, 
  Trash2, Plus, ArrowUp, ArrowDown, Briefcase, Image as ImageIcon
} from 'lucide-react';

interface PartnerItem {
  name: string;
  logo: string;
}

const DEFAULT_PARTNERS: PartnerItem[] = [
  { name: 'Grand Pharm', logo: '/logos/grand-pharm.svg' },
  { name: 'Oson Apteka', logo: '/logos/oson-apteka.svg' },
  { name: 'MedLine', logo: '/logos/medline.svg' },
  { name: 'PharmExpo', logo: '/logos/pharmexpo.svg' },
  { name: 'Asia Pharm', logo: '/logos/asia-pharm.svg' },
  { name: 'Dorixona+', logo: '/logos/dorixona-plus.svg' },
  { name: 'Soglom Hayot', logo: '/logos/soglom-hayot.svg' },
  { name: 'Toshkent Pharma', logo: '/logos/toshkent-pharma.svg' },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'contacts' | 'hero' | 'partners'>('contacts');
  const [values, setValues] = useState<Record<string, string>>({
    phone1: '',
    phone2: '',
    address: '',
    telegram_bot: '',
    instagram: '',
    // New Footer keys
    telegram_channel: '',
    facebook: '',
    footer_about_uz: '',
    footer_about_ru: '',
    footer_working_hours_uz: '',
    footer_working_hours_ru: '',
    // Hero UZ
    hero_heading1_uz: '',
    hero_heading2_uz: '',
    hero_heading3_uz: '',
    hero_subtitle_uz: '',
    hero_cta1_uz: '',
    hero_cta2_uz: '',
    hero_badge_products_uz: '',
    hero_badge_gmp_uz: '',
    hero_social_proof_uz: '',
    hero_scroll_down_uz: '',
    // Hero RU
    hero_heading1_ru: '',
    hero_heading2_ru: '',
    hero_heading3_ru: '',
    hero_subtitle_ru: '',
    hero_cta1_ru: '',
    hero_cta2_ru: '',
    hero_badge_products_ru: '',
    hero_badge_gmp_ru: '',
    hero_social_proof_ru: '',
    hero_scroll_down_ru: '',
    // Partners Title
    partners_heading_uz: '',
    partners_heading_ru: '',
  });

  const [partnersList, setPartnersList] = useState<PartnerItem[]>([]);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings');
      const data = await res.json();
      if (data.settings) {
        setValues((prev) => {
          const updated = { ...prev };
          Object.keys(prev).forEach((key) => {
            if (data.settings[key] !== undefined) {
              updated[key] = data.settings[key];
            }
          });
          return updated;
        });

        if (data.settings.partners_list) {
          try {
            const parsed = JSON.parse(data.settings.partners_list);
            const migrated = parsed.map((p: any) => ({
              name: p.name || '',
              logo: p.logo || (p.name ? `/logos/${p.name.toLowerCase().replace(/\s|\+/g, '-')}.svg` : '/logos/grand-pharm.svg')
            }));
            setPartnersList(migrated);
          } catch (e) {
            console.error('Failed to parse partners_list JSON:', e);
            setPartnersList(DEFAULT_PARTNERS);
          }
        } else {
          setPartnersList(DEFAULT_PARTNERS);
        }
      }
    } catch (e) {
      console.error('Error fetching settings:', e);
      setPartnersList(DEFAULT_PARTNERS);
    }
  };

  const getToken = () => localStorage.getItem('kamafarm_admin_token') || 'kamafarm-admin-2026';

  const updateValue = (key: string, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleFileUpload = async (index: number, files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    
    setUploadingIndex(index);
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${getToken()}`
        },
        body: formData
      });
      
      const data = await res.json();
      if (data.url) {
        updatePartner(index, { logo: data.url });
      } else {
        alert('Rasm yuklashda xatolik: ' + (data.error || 'Noma\'lum xatolik'));
      }
    } catch (e) {
      console.error('File upload error:', e);
      alert('Fayl yuklashda tarmoq xatoligi yuz berdi');
    } finally {
      setUploadingIndex(null);
    }
  };

  // Partners List actions
  const addPartner = () => {
    setPartnersList((prev) => [
      ...prev,
      { name: 'Yangi Hamkor', logo: '/logos/grand-pharm.svg' }
    ]);
  };

  const deletePartner = (index: number) => {
    setPartnersList((prev) => prev.filter((_, i) => i !== index));
  };

  const updatePartner = (index: number, fields: Partial<PartnerItem>) => {
    setPartnersList((prev) => prev.map((item, i) => i === index ? { ...item, ...fields } : item));
  };

  const movePartner = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === partnersList.length - 1) return;

    setPartnersList((prev) => {
      const copy = [...prev];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      const temp = copy[index];
      copy[index] = copy[targetIndex];
      copy[targetIndex] = temp;
      return copy;
    });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const settingsToSave: Record<string, string> = {
        ...values,
        partners_list: JSON.stringify(partnersList)
      };

      await Promise.all(Object.keys(settingsToSave).map((key) => 
        fetch('/api/settings', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getToken()}` },
          body: JSON.stringify({ key, value: settingsToSave[key] })
        })
      ));
      
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (e) {
      console.error('Error saving settings:', e);
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: 32 }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 24, fontWeight: 900, color: '#0F172A', letterSpacing: '-0.02em', marginBottom: 6 }}>
          Tizim sozlamalari
        </h1>
        <p style={{ fontSize: 14, color: '#64748B' }}>
          Saytdagi aloqa ma'lumotlarini, bannerlar matnlarini va hamkor logolarini boshqaring
        </p>
      </div>

      {/* Tab Selector */}
      <div style={{ 
        display: 'flex', 
        gap: 8, 
        marginBottom: 32, 
        borderBottom: '1px solid #E2E8F0', 
        paddingBottom: 2 
      }}>
        <button
          onClick={() => setActiveTab('contacts')}
          style={{
            background: 'none', border: 'none', padding: '12px 20px', fontSize: 14, fontWeight: 700,
            color: activeTab === 'contacts' ? '#04432C' : '#64748B',
            borderBottom: activeTab === 'contacts' ? '3px solid #04432C' : '3px solid transparent',
            cursor: 'pointer', transition: 'all 0.2s',
            display: 'flex', alignItems: 'center', gap: 8
          }}
        >
          <Phone size={16} />
          Kontaktlar & Havolalar
        </button>
        <button
          onClick={() => setActiveTab('hero')}
          style={{
            background: 'none', border: 'none', padding: '12px 20px', fontSize: 14, fontWeight: 700,
            color: activeTab === 'hero' ? '#04432C' : '#64748B',
            borderBottom: activeTab === 'hero' ? '3px solid #04432C' : '3px solid transparent',
            cursor: 'pointer', transition: 'all 0.2s',
            display: 'flex', alignItems: 'center', gap: 8
          }}
        >
          <Layout size={16} />
          Asosiy banner (Hero)
        </button>
        <button
          onClick={() => setActiveTab('partners')}
          style={{
            background: 'none', border: 'none', padding: '12px 20px', fontSize: 14, fontWeight: 700,
            color: activeTab === 'partners' ? '#04432C' : '#64748B',
            borderBottom: activeTab === 'partners' ? '3px solid #04432C' : '3px solid transparent',
            cursor: 'pointer', transition: 'all 0.2s',
            display: 'flex', alignItems: 'center', gap: 8
          }}
        >
          <Briefcase size={16} />
          Hamkor logolari (Marquee)
        </button>
      </div>

      <div>
        <AnimatePresence mode="wait">
          {activeTab === 'contacts' && (
            <motion.div
              key="contacts"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              style={{ maxWidth: 640 }}
            >
              {/* Contacts card */}
              <div style={{
                background: 'white', borderRadius: 20, border: '1px solid #E2E8F0',
                boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                overflow: 'hidden', marginBottom: 24,
              }}>
                <div style={{
                  padding: '20px 28px', background: '#F8FAFC',
                  borderBottom: '1px solid #E2E8F0',
                  display: 'flex', alignItems: 'center', gap: 10,
                }}>
                  <Settings size={18} color="#04432C" />
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>Kontakt ma'lumotlari</span>
                </div>

                <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 28 }}>
                  {/* Subsection: Aloqa va Ish vaqti */}
                  <div>
                    <h3 style={{ fontSize: 13, fontWeight: 800, color: '#04432C', borderBottom: '1px solid #E2E8F0', paddingBottom: 6, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      Aloqa va Ish vaqti
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                        <div>
                          <label className="field-label">Asosiy telefon</label>
                          <input
                            className="input"
                            type="text"
                            value={values.phone1}
                            onChange={(e) => updateValue('phone1', e.target.value)}
                            placeholder="+998 (90) 603-14-28"
                          />
                        </div>
                        <div>
                          <label className="field-label">Qo'shimcha telefon</label>
                          <input
                            className="input"
                            type="text"
                            value={values.phone2}
                            onChange={(e) => updateValue('phone2', e.target.value)}
                            placeholder="+998 (93) 720-55-56"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="field-label">Manzil</label>
                        <input
                          className="input"
                          type="text"
                          value={values.address}
                          onChange={(e) => updateValue('address', e.target.value)}
                          placeholder="г. Самарканд, ул. Зарафшон, мсг Казиарик"
                        />
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                        <div>
                          <label className="field-label">Ish vaqti (UZ)</label>
                          <input
                            className="input"
                            type="text"
                            value={values.footer_working_hours_uz}
                            onChange={(e) => updateValue('footer_working_hours_uz', e.target.value)}
                            placeholder="Du — Sha: 09:00 – 18:00"
                          />
                        </div>
                        <div>
                          <label className="field-label">Ish vaqti (RU)</label>
                          <input
                            className="input"
                            type="text"
                            value={values.footer_working_hours_ru}
                            onChange={(e) => updateValue('footer_working_hours_ru', e.target.value)}
                            placeholder="Пн — Сб: 09:00 – 18:00"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Subsection: Ijtimoiy tarmoqlar */}
                  <div>
                    <h3 style={{ fontSize: 13, fontWeight: 800, color: '#04432C', borderBottom: '1px solid #E2E8F0', paddingBottom: 6, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      Ijtimoiy tarmoqlar (Havolalar)
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                      <div>
                        <label className="field-label">Telegram Bot havolasi</label>
                        <input
                          className="input"
                          type="text"
                          value={values.telegram_bot}
                          onChange={(e) => updateValue('telegram_bot', e.target.value)}
                          placeholder="https://t.me/kamafarm_bot"
                        />
                      </div>
                      <div>
                        <label className="field-label">Telegram Kanal havolasi</label>
                        <input
                          className="input"
                          type="text"
                          value={values.telegram_channel}
                          onChange={(e) => updateValue('telegram_channel', e.target.value)}
                          placeholder="https://t.me/kamafarm_channel"
                        />
                      </div>
                      <div>
                        <label className="field-label">Instagram havolasi</label>
                        <input
                          className="input"
                          type="text"
                          value={values.instagram}
                          onChange={(e) => updateValue('instagram', e.target.value)}
                          placeholder="https://instagram.com/kamafarm.healthcare"
                        />
                      </div>
                      <div>
                        <label className="field-label">Facebook havolasi</label>
                        <input
                          className="input"
                          type="text"
                          value={values.facebook}
                          onChange={(e) => updateValue('facebook', e.target.value)}
                          placeholder="https://facebook.com/kamafarm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Subsection: Footer Tavsifi */}
                  <div>
                    <h3 style={{ fontSize: 13, fontWeight: 800, color: '#04432C', borderBottom: '1px solid #E2E8F0', paddingBottom: 6, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      Footer Tavsifi (Kompaniya haqida qisqacha)
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                      <div>
                        <label className="field-label">Footer Tavsifi (UZ)</label>
                        <textarea
                          className="input"
                          rows={3}
                          style={{ resize: 'vertical', fontFamily: 'inherit', padding: 12 }}
                          value={values.footer_about_uz}
                          onChange={(e) => updateValue('footer_about_uz', e.target.value)}
                          placeholder="Premium sifatli biologik faol qo'shimchalar..."
                        />
                      </div>
                      <div>
                        <label className="field-label">Footer Tavsifi (RU)</label>
                        <textarea
                          className="input"
                          rows={3}
                          style={{ resize: 'vertical', fontFamily: 'inherit', padding: 12 }}
                          value={values.footer_about_ru}
                          onChange={(e) => updateValue('footer_about_ru', e.target.value)}
                          placeholder="Производитель и дистрибьютор биологически..."
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'hero' && (
            <motion.div
              key="hero"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
            >
              <div className="hero-settings-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
                {/* UZ Matnlar */}
                <div style={{
                  background: 'white', borderRadius: 20, border: '1px solid #E2E8F0',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.04)', overflow: 'hidden'
                }}>
                  <div style={{
                    padding: '16px 24px', background: '#F0FDF4', borderBottom: '1px solid #E2E8F0',
                    display: 'flex', alignItems: 'center', gap: 8
                  }}>
                    <Globe size={16} color="#10B981" />
                    <span style={{ fontSize: 13, fontWeight: 800, color: '#04432C', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      O'zbek tili (UZ)
                    </span>
                  </div>

                  <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 18 }}>
                    <div>
                      <label className="field-label">Sarlavha 1-qator</label>
                      <input className="input" type="text" value={values.hero_heading1_uz} onChange={(e) => updateValue('hero_heading1_uz', e.target.value)} placeholder="Salomatlik —" />
                    </div>
                    <div>
                      <label className="field-label">Sarlavha 2-qator (Yashil rangli)</label>
                      <input className="input" type="text" value={values.hero_heading2_uz} onChange={(e) => updateValue('hero_heading2_uz', e.target.value)} placeholder="tabiat va ilm-fan" />
                    </div>
                    <div>
                      <label className="field-label">Sarlavha 3-qator</label>
                      <input className="input" type="text" value={values.hero_heading3_uz} onChange={(e) => updateValue('hero_heading3_uz', e.target.value)} placeholder="uyg'unligida." />
                    </div>
                    <div>
                      <label className="field-label">Kichik matn (Subtitle)</label>
                      <textarea className="input" rows={3} style={{ resize: 'vertical', fontFamily: 'inherit', padding: 12 }} value={values.hero_subtitle_uz} onChange={(e) => updateValue('hero_subtitle_uz', e.target.value)} placeholder="Kamafarm — premium klassdagi tabiiy vitaminlar va ozuqaviy qo'shimchalar..." />
                    </div>
                    <div>
                      <label className="field-label">Katalog tugmasi</label>
                      <input className="input" type="text" value={values.hero_cta1_uz} onChange={(e) => updateValue('hero_cta1_uz', e.target.value)} placeholder="Katalogni ko'rish" />
                    </div>
                    <div>
                      <label className="field-label">Konsultatsiya tugmasi</label>
                      <input className="input" type="text" value={values.hero_cta2_uz} onChange={(e) => updateValue('hero_cta2_uz', e.target.value)} placeholder="Konsultatsiya olish" />
                    </div>
                    <div>
                      <label className="field-label">"50+" nishoni izohi</label>
                      <input className="input" type="text" value={values.hero_badge_products_uz} onChange={(e) => updateValue('hero_badge_products_uz', e.target.value)} placeholder="Premium mahsulotlar" />
                    </div>
                    <div>
                      <label className="field-label">"GMP" nishoni izohi</label>
                      <input className="input" type="text" value={values.hero_badge_gmp_uz} onChange={(e) => updateValue('hero_badge_gmp_uz', e.target.value)} placeholder="Sertifikatlangan" />
                    </div>
                    <div>
                      <label className="field-label">Mijozlar ishonchi matni</label>
                      <input className="input" type="text" value={values.hero_social_proof_uz} onChange={(e) => updateValue('hero_social_proof_uz', e.target.value)} placeholder="mijoz ishonadi" />
                    </div>
                    <div>
                      <label className="field-label">Pastga surish matni</label>
                      <input className="input" type="text" value={values.hero_scroll_down_uz} onChange={(e) => updateValue('hero_scroll_down_uz', e.target.value)} placeholder="Pastga suring" />
                    </div>
                  </div>
                </div>

                {/* RU Matnlar */}
                <div style={{
                  background: 'white', borderRadius: 20, border: '1px solid #E2E8F0',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.04)', overflow: 'hidden'
                }}>
                  <div style={{
                    padding: '16px 24px', background: '#F8FAFC', borderBottom: '1px solid #E2E8F0',
                    display: 'flex', alignItems: 'center', gap: 8
                  }}>
                    <Globe size={16} color="#64748B" />
                    <span style={{ fontSize: 13, fontWeight: 800, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      Русский язык (RU)
                    </span>
                  </div>

                  <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 18 }}>
                    <div>
                      <label className="field-label">Заголовок Строка 1</label>
                      <input className="input" type="text" value={values.hero_heading1_ru} onChange={(e) => updateValue('hero_heading1_ru', e.target.value)} placeholder="Здоровье —" />
                    </div>
                    <div>
                      <label className="field-label">Заголовок Строка 2 (Зеленый цвет)</label>
                      <input className="input" type="text" value={values.hero_heading2_ru} onChange={(e) => updateValue('hero_heading2_ru', e.target.value)} placeholder="в гармонии природы" />
                    </div>
                    <div>
                      <label className="field-label">Заголовок Строка 3</label>
                      <input className="input" type="text" value={values.hero_heading3_ru} onChange={(e) => updateValue('hero_heading3_ru', e.target.value)} placeholder="и науки." />
                    </div>
                    <div>
                      <label className="field-label">Описание (Subtitle)</label>
                      <textarea className="input" rows={3} style={{ resize: 'vertical', fontFamily: 'inherit', padding: 12 }} value={values.hero_subtitle_ru} onChange={(e) => updateValue('hero_subtitle_ru', e.target.value)} placeholder="Kamafarm — ваш надёжный партнёр по производству натуральных витаминов..." />
                    </div>
                    <div>
                      <label className="field-label">Кнопка Каталога</label>
                      <input className="input" type="text" value={values.hero_cta1_ru} onChange={(e) => updateValue('hero_cta1_ru', e.target.value)} placeholder="Смотреть каталог" />
                    </div>
                    <div>
                      <label className="field-label">Кнопка Консультации</label>
                      <input className="input" type="text" value={values.hero_cta2_ru} onChange={(e) => updateValue('hero_cta2_ru', e.target.value)} placeholder="Получить консультацию" />
                    </div>
                    <div>
                      <label className="field-label">Подпись для значка "50+"</label>
                      <input className="input" type="text" value={values.hero_badge_products_ru} onChange={(e) => updateValue('hero_badge_products_ru', e.target.value)} placeholder="Премиум продукты" />
                    </div>
                    <div>
                      <label className="field-label">Подпись для значка "GMP"</label>
                      <input className="input" type="text" value={values.hero_badge_gmp_ru} onChange={(e) => updateValue('hero_badge_gmp_ru', e.target.value)} placeholder="Сертифицирован" />
                    </div>
                    <div>
                      <label className="field-label">Текст доверия клиентов</label>
                      <input className="input" type="text" value={values.hero_social_proof_ru} onChange={(e) => updateValue('hero_social_proof_ru', e.target.value)} placeholder="клиентов доверяют" />
                    </div>
                    <div>
                      <label className="field-label">Текст прокрутки вниз</label>
                      <input className="input" type="text" value={values.hero_scroll_down_ru} onChange={(e) => updateValue('hero_scroll_down_ru', e.target.value)} placeholder="Листайте вниз" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'partners' && (
            <motion.div
              key="partners"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
            >
              {/* Partner Section Header Title */}
              <div style={{
                background: 'white', borderRadius: 20, border: '1px solid #E2E8F0',
                boxShadow: '0 1px 4px rgba(0,0,0,0.04)', overflow: 'hidden', marginBottom: 24, maxWidth: 640
              }}>
                <div style={{ padding: '16px 24px', background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', fontWeight: 700 }}>
                  Bo'lim sarlavhasi
                </div>
                <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div>
                    <label className="field-label">Sarlavha (UZ)</label>
                    <input 
                      className="input" 
                      type="text" 
                      value={values.partners_heading_uz} 
                      onChange={(e) => updateValue('partners_heading_uz', e.target.value)} 
                      placeholder="Bizga ishonch bildirgan hamkor tashkilotlar" 
                    />
                  </div>
                  <div>
                    <label className="field-label">Sarlavha (RU)</label>
                    <input 
                      className="input" 
                      type="text" 
                      value={values.partners_heading_ru} 
                      onChange={(e) => updateValue('partners_heading_ru', e.target.value)} 
                      placeholder="Нам доверяют партнерские организации" 
                    />
                  </div>
                </div>
              </div>

              {/* Partners logos list editor */}
              <div style={{
                background: 'white', borderRadius: 20, border: '1px solid #E2E8F0',
                boxShadow: '0 1px 4px rgba(0,0,0,0.04)', overflow: 'hidden', marginBottom: 24
              }}>
                <div style={{
                  padding: '16px 24px', background: '#F8FAFC', borderBottom: '1px solid #E2E8F0',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                }}>
                  <span style={{ fontWeight: 700, color: '#0F172A' }}>Hamkor logotiplari ro'yxati</span>
                  <button 
                    onClick={addPartner}
                    className="btn btn-primary"
                    style={{ padding: '6px 12px', fontSize: 12, gap: 4 }}
                  >
                    <Plus size={14} /> Yangi qo'shish
                  </button>
                </div>

                <div style={{ padding: 24 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {partnersList.map((partner, index) => (
                      <div 
                        key={index} 
                        style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: 16, 
                          padding: 16, 
                          background: '#F8FAFC', 
                          border: '1px solid #E2E8F0', 
                          borderRadius: 12,
                          flexWrap: 'wrap'
                        }}
                      >
                        {/* Logo Preview */}
                        <div style={{ 
                          width: 48, 
                          height: 48, 
                          borderRadius: 8, 
                          border: '1px solid #CBD5E1', 
                          overflow: 'hidden', 
                          background: 'white', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center', 
                          flexShrink: 0,
                          position: 'relative'
                        }}>
                          {uploadingIndex === index ? (
                            <span style={{
                              width: 16, height: 16, border: '2px solid rgba(4,67,44,0.2)',
                              borderTop: '2px solid #04432C', borderRadius: '50%',
                              animation: 'spin 0.8s linear infinite',
                              display: 'inline-block',
                            }} />
                          ) : partner.logo ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={partner.logo} alt={partner.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                          ) : (
                            <ImageIcon size={18} color="#94A3B8" />
                          )}
                        </div>

                        {/* Name input */}
                        <div style={{ flex: 2, minWidth: 200 }}>
                          <label style={{ fontSize: 10, fontWeight: 700, color: '#64748B', display: 'block', marginBottom: 4 }}>
                            TASHKILOT NOMI (ALT TEXT)
                          </label>
                          <input 
                            className="input" 
                            type="text" 
                            style={{ background: 'white' }}
                            value={partner.name} 
                            onChange={(e) => updatePartner(index, { name: e.target.value })}
                            placeholder="Grand Pharm"
                          />
                        </div>

                        {/* Logo Image URL Path */}
                        <div style={{ flex: 3, minWidth: 220 }}>
                          <label style={{ fontSize: 10, fontWeight: 700, color: '#64748B', display: 'block', marginBottom: 4 }}>
                            LOGO RASMI (URL / YO'L)
                          </label>
                          <div style={{ display: 'flex', gap: 8 }}>
                            <input 
                              className="input" 
                              type="text" 
                              style={{ background: 'white' }}
                              value={partner.logo} 
                              onChange={(e) => updatePartner(index, { logo: e.target.value })}
                              placeholder="/logos/grand-pharm.svg"
                            />
                            <label 
                              style={{
                                padding: '0 12px', background: '#F1F5F9', border: '1px solid #CBD5E1', borderRadius: 8,
                                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                                color: '#475569', transition: 'all 0.15s'
                              }}
                              onMouseEnter={(e) => { e.currentTarget.style.background = '#E2E8F0'; }}
                              onMouseLeave={(e) => { e.currentTarget.style.background = '#F1F5F9'; }}
                              title="Rasm yuklash"
                            >
                              <ImageIcon size={16} />
                              <input 
                                type="file" 
                                accept="image/*" 
                                style={{ display: 'none' }} 
                                onChange={(e) => handleFileUpload(index, e.target.files)} 
                              />
                            </label>
                          </div>
                        </div>

                        {/* Reorder & Action buttons */}
                        <div style={{ display: 'flex', gap: 6, alignItems: 'center', alignSelf: 'flex-end', height: 38 }}>
                          <button 
                            onClick={() => movePartner(index, 'up')}
                            disabled={index === 0}
                            style={{
                              padding: 8, background: 'white', border: '1px solid #CBD5E1', borderRadius: 8,
                              cursor: index === 0 ? 'not-allowed' : 'pointer', opacity: index === 0 ? 0.4 : 1,
                              display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}
                          >
                            <ArrowUp size={14} />
                          </button>
                          <button 
                            onClick={() => movePartner(index, 'down')}
                            disabled={index === partnersList.length - 1}
                            style={{
                              padding: 8, background: 'white', border: '1px solid #CBD5E1', borderRadius: 8,
                              cursor: index === partnersList.length - 1 ? 'not-allowed' : 'pointer', opacity: index === partnersList.length - 1 ? 0.4 : 1,
                              display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}
                          >
                            <ArrowDown size={14} />
                          </button>
                          <button 
                            onClick={() => deletePartner(index)}
                            style={{
                              padding: 8, background: '#FEE2E2', border: '1px solid #FCA5A5', borderRadius: 8,
                              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                              color: '#EF4444'
                            }}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Save button */}
        <div style={{ maxWidth: activeTab === 'contacts' ? 640 : undefined }}>
          <motion.button
            onClick={handleSave}
            disabled={loading}
            className={`btn ${saved ? '' : 'btn-primary'}`}
            style={{
              width: '100%', justifyContent: 'center',
              padding: '14px', fontSize: 14,
              background: saved ? '#10B981' : undefined,
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8
            }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            {loading ? (
              <>
                <span style={{
                  width: 16, height: 16, border: '2px solid rgba(255,255,255,0.4)',
                  borderTop: '2px solid white', borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite',
                  display: 'inline-block',
                }} />
                Saqlanmoqda...
              </>
            ) : saved ? (
              <><CheckCircle2 size={16} /> Muvaffaqiyatli saqlandi!</>
            ) : (
              <><Save size={16} /> Sozlamalarni saqlash</>
            )}
          </motion.button>
        </div>

        {/* Info box */}
        <div style={{
          marginTop: 24, padding: '16px 20px',
          background: 'rgba(4,67,44,0.04)',
          border: '1px solid rgba(4,67,44,0.1)',
          borderRadius: 12, fontSize: 13, color: '#475569', lineHeight: 1.6,
          maxWidth: activeTab === 'contacts' ? 640 : undefined
        }}>
          💡 <strong>Eslatma:</strong> O'zgarishlar saqlanganidan keyin asosiy sahifada aks etishi uchun sahifani qaytadan yuklang.
        </div>
      </div>

      <style>{`
        .field-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 800;
          color: #475569;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @media (max-width: 900px) {
          .hero-settings-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
