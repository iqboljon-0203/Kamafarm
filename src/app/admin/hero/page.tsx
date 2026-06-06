'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, CheckCircle2, Globe, Layout } from 'lucide-react';

export default function HeroSettingsPage() {
  const [values, setValues] = useState<Record<string, string>>({
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
    hero_social_proof_number: '',
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
  });

  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

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
      }
    } catch (e) {
      console.error('Error fetching settings:', e);
    }
  };

  const getToken = () => localStorage.getItem('kamafarm_admin_token') || 'kamafarm-admin-2026';

  const updateValue = (key: string, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await Promise.all(Object.keys(values).map((key) => 
        fetch('/api/settings', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getToken()}` },
          body: JSON.stringify({ key, value: values[key] })
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
          Asosiy Banner (Hero)
        </h1>
        <p style={{ fontSize: 14, color: '#64748B' }}>
          Saytning eng yuqori qismidagi matnlar va chaqiruvlarni boshqaring
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div style={{
          background: 'white', borderRadius: 20, border: '1px solid #E2E8F0',
          boxShadow: '0 1px 4px rgba(0,0,0,0.04)', overflow: 'hidden', marginBottom: 24, maxWidth: 640
        }}>
          <div style={{
            padding: '16px 24px', background: '#F8FAFC', borderBottom: '1px solid #E2E8F0',
            display: 'flex', alignItems: 'center', gap: 8
          }}>
            <span style={{ fontSize: 13, fontWeight: 800, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Umumiy Sozlamalar (Ikkala til uchun)
            </span>
          </div>
          <div style={{ padding: 24 }}>
            <label className="field-label">Mijozlar soni ko'rsatkichi ("1,200+")</label>
            <input 
              className="input" 
              type="text" 
              value={values.hero_social_proof_number} 
              onChange={(e) => updateValue('hero_social_proof_number', e.target.value)} 
              placeholder="Masalan: 1,200+" 
            />
          </div>
        </div>

        <div className="hero-settings-grid grid-2-cols" style={{ marginBottom: 32 }}>
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

        {/* Save Button */}
        <div style={{ position: 'sticky', bottom: 24, zIndex: 10, display: 'flex', justifyContent: 'flex-end', marginTop: 32 }}>
          <button 
            onClick={handleSave} 
            disabled={loading} 
            className="btn" 
            style={{ 
              background: saved ? '#10B981' : '#04432C', 
              color: 'white', padding: '16px 32px', fontSize: 16, borderRadius: 12, boxShadow: '0 4px 12px rgba(4, 67, 44, 0.2)' 
            }}
          >
            {saved ? (
              <><CheckCircle2 size={20} /> Saqlandi!</>
            ) : loading ? (
              'Saqlanmoqda...'
            ) : (
              <><Save size={20} /> O'zgarishlarni saqlash</>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
