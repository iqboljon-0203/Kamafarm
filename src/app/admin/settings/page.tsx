'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, CheckCircle2, Settings, Phone } from 'lucide-react';

export default function ContactsSettingsPage() {
  const [values, setValues] = useState<Record<string, string>>({
    phone1: '',
    phone2: '',
    address: '',
    telegram_bot: '',
    instagram: '',
    telegram_channel: '',
    facebook: '',
    footer_about_uz: '',
    footer_about_ru: '',
    footer_working_hours_uz: '',
    footer_working_hours_ru: '',
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
          Kontaktlar & Havolalar
        </h1>
        <p style={{ fontSize: 14, color: '#64748B' }}>
          Saytdagi (ayniqsa Footer qismidagi) aloqa ma'lumotlari, manzillar va ijtimoiy tarmoq havolalarini boshqaring
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
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
                <div className="grid-2-cols-sm">
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
                <div className="grid-2-cols-sm">
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
              <div className="grid-2-cols-sm">
                <div>
                  <label className="field-label">Telegram Bot havolasi</label>
                  <input
                    className="input"
                    type="text"
                    value={values.telegram_bot}
                    onChange={(e) => updateValue('telegram_bot', e.target.value)}
                    placeholder="https://t.me/kamafarmhealthcare"
                  />
                </div>
                <div>
                  <label className="field-label">Telegram Kanal havolasi</label>
                  <input
                    className="input"
                    type="text"
                    value={values.telegram_channel}
                    onChange={(e) => updateValue('telegram_channel', e.target.value)}
                    placeholder="https://t.me/kamafarmhealthcare"
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
