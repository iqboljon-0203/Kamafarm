'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Save, CheckCircle2, Globe, Plus, Trash2, ArrowUp, ArrowDown,
  Layout, ListChecks, HelpCircle, X
} from 'lucide-react';
import { translations } from '@/lib/i18n';

export default function B2BPage() {
  const [activeTab, setActiveTab] = useState<'general' | 'benefits'>('general');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // General state
  const [sectionLabelUz, setSectionLabelUz] = useState('');
  const [sectionLabelRu, setSectionLabelRu] = useState('');
  const [headingUz, setHeadingUz] = useState('');
  const [headingRu, setHeadingRu] = useState('');
  const [subtitleUz, setSubtitleUz] = useState('');
  const [subtitleRu, setSubtitleRu] = useState('');

  const [benefitsUz, setBenefitsUz] = useState<{ title: string; description: string }[]>([]);
  const [benefitsRu, setBenefitsRu] = useState<{ title: string; description: string }[]>([]);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBenefitUz, setNewBenefitUz] = useState({ title: '', description: '' });
  const [newBenefitRu, setNewBenefitRu] = useState({ title: '', description: '' });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/settings');
      const data = await res.json();
      const settings = data.settings || {};

      setSectionLabelUz(settings.b2b_sectionLabel_uz || translations.uz.b2b.sectionLabel);
      setSectionLabelRu(settings.b2b_sectionLabel_ru || translations.ru.b2b.sectionLabel);
      setHeadingUz(settings.b2b_heading_uz || translations.uz.b2b.heading);
      setHeadingRu(settings.b2b_heading_ru || translations.ru.b2b.heading);
      setSubtitleUz(settings.b2b_subtitle_uz || translations.uz.b2b.subtitle);
      setSubtitleRu(settings.b2b_subtitle_ru || translations.ru.b2b.subtitle);

      setBenefitsUz(
        settings.b2b_benefits_uz
          ? JSON.parse(settings.b2b_benefits_uz)
          : translations.uz.b2b.benefits
      );
      setBenefitsRu(
        settings.b2b_benefits_ru
          ? JSON.parse(settings.b2b_benefits_ru)
          : translations.ru.b2b.benefits
      );
    } catch (e) {
      console.error('[B2B Admin] Failed to fetch settings:', e);
      setSectionLabelUz(translations.uz.b2b.sectionLabel);
      setSectionLabelRu(translations.ru.b2b.sectionLabel);
      setHeadingUz(translations.uz.b2b.heading);
      setHeadingRu(translations.ru.b2b.heading);
      setSubtitleUz(translations.uz.b2b.subtitle);
      setSubtitleRu(translations.ru.b2b.subtitle);
      setBenefitsUz(translations.uz.b2b.benefits);
      setBenefitsRu(translations.ru.b2b.benefits);
    } finally {
      setLoading(false);
    }
  };

  const getToken = () => localStorage.getItem('kamafarm_admin_token') || 'kamafarm-admin-2026';

  const handleOpenModal = () => {
    setNewBenefitUz({ title: '', description: '' });
    setNewBenefitRu({ title: '', description: '' });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const submitNewBenefit = () => {
    if (!newBenefitUz.title.trim()) {
      alert('Sarlavhani kiriting!');
      return;
    }
    setBenefitsUz([newBenefitUz, ...benefitsUz]);
    setBenefitsRu([newBenefitRu, ...benefitsRu]);
    setIsModalOpen(false);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const removeBenefit = (index: number) => {
    setBenefitsUz(benefitsUz.filter((_, i) => i !== index));
    setBenefitsRu(benefitsRu.filter((_, i) => i !== index));
  };

  const moveBenefit = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === benefitsUz.length - 1) return;

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    const newUz = [...benefitsUz];
    const tempUz = newUz[index];
    newUz[index] = newUz[targetIndex];
    newUz[targetIndex] = tempUz;
    setBenefitsUz(newUz);

    const newRu = [...benefitsRu];
    const tempRu = newRu[index];
    newRu[index] = newRu[targetIndex];
    newRu[targetIndex] = tempRu;
    setBenefitsRu(newRu);
  };

  const updateBenefitUz = (index: number, key: 'title' | 'description', value: string) => {
    setBenefitsUz(benefitsUz.map((b, i) => (i === index ? { ...b, [key]: value } : b)));
  };

  const updateBenefitRu = (index: number, key: 'title' | 'description', value: string) => {
    setBenefitsRu(benefitsRu.map((b, i) => (i === index ? { ...b, [key]: value } : b)));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload: Record<string, string> = {
        b2b_sectionLabel_uz: sectionLabelUz,
        b2b_sectionLabel_ru: sectionLabelRu,
        b2b_heading_uz: headingUz,
        b2b_heading_ru: headingRu,
        b2b_subtitle_uz: subtitleUz,
        b2b_subtitle_ru: subtitleRu,
        b2b_benefits_uz: JSON.stringify(benefitsUz),
        b2b_benefits_ru: JSON.stringify(benefitsRu),
      };

      await Promise.all(
        Object.keys(payload).map((key) =>
          fetch('/api/settings', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${getToken()}`,
            },
            body: JSON.stringify({ key, value: payload[key] }),
          })
        )
      );

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (e) {
      console.error('[B2B Save] Error saving Settings:', e);
      alert('Tizim sozlamalarini saqlashda xatolik yuz berdi.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', flexDirection: 'column', gap: 16 }}>
        <span style={{
          width: 36, height: 36, border: '3px solid rgba(4,67,44,0.1)',
          borderTop: '3px solid #04432C', borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
          display: 'inline-block',
        }} />
        <span style={{ fontSize: 14, color: '#64748B', fontWeight: 600 }}>B2B sozlamalari yuklanmoqda...</span>
      </div>
    );
  }

  return (
    <div style={{ padding: 32, maxWidth: 1000, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 900, color: '#0F172A', letterSpacing: '-0.02em', marginBottom: 6 }}>
            B2B Hamkorlik
          </h1>
          <p style={{ fontSize: 14, color: '#64748B' }}>
            Biznes hamkorlik bo'limidagi matnlar va afzalliklar kartalarini boshqaring
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className={`btn ${saved ? '' : 'btn-primary'}`}
          style={{
            minWidth: 160,
            background: saved ? '#10B981' : undefined,
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            boxShadow: '0 4px 12px rgba(4,67,44,0.15)',
          }}
        >
          {saving ? (
            <>
              <span style={{
                width: 14, height: 14, border: '2px solid rgba(255,255,255,0.4)',
                borderTop: '2px solid white', borderRadius: '50%',
                animation: 'spin 0.8s linear infinite',
                display: 'inline-block',
              }} />
              Saqlanmoqda...
            </>
          ) : saved ? (
            <><CheckCircle2 size={16} /> Saqlandi!</>
          ) : (
            <><Save size={16} /> Saqlash</>
          )}
        </button>
      </div>

      {/* Tab Selector */}
      <div className="tabs-container">
        <button
          onClick={() => setActiveTab('general')}
          style={{
            background: 'none', border: 'none', padding: '12px 20px', fontSize: 14, fontWeight: 700,
            color: activeTab === 'general' ? '#04432C' : '#64748B',
            borderBottom: activeTab === 'general' ? '3px solid #04432C' : '3px solid transparent',
            cursor: 'pointer', transition: 'all 0.2s',
            display: 'flex', alignItems: 'center', gap: 8
          }}
        >
          <Layout size={16} />
          Asosiy matnlar
        </button>
        <button
          onClick={() => setActiveTab('benefits')}
          style={{
            background: 'none', border: 'none', padding: '12px 20px', fontSize: 14, fontWeight: 700,
            color: activeTab === 'benefits' ? '#04432C' : '#64748B',
            borderBottom: activeTab === 'benefits' ? '3px solid #04432C' : '3px solid transparent',
            cursor: 'pointer', transition: 'all 0.2s',
            display: 'flex', alignItems: 'center', gap: 8
          }}
        >
          <ListChecks size={16} />
          Afzalliklar kartalari
        </button>
      </div>

      {/* Editor Content Area */}
      <div>
        <AnimatePresence mode="wait">
          {activeTab === 'general' && (
            <motion.div
              key="general"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
            >
              <div className="grid-2-cols">
                {/* UZ Texts */}
                <div style={{ background: 'white', borderRadius: 20, border: '1px solid #E2E8F0', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.02)' }}>
                  <div style={{ padding: '16px 24px', background: '#F0FDF4', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Globe size={16} color="#10B981" />
                    <span style={{ fontSize: 13, fontWeight: 800, color: '#04432C', textTransform: 'uppercase', letterSpacing: '0.04em' }}>O'zbek tili (UZ)</span>
                  </div>
                  <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <div>
                      <label className="field-label">Kichik sarlavha (Section Label)</label>
                      <input className="input" type="text" value={sectionLabelUz} onChange={(e) => setSectionLabelUz(e.target.value)} placeholder="B2B HAMKORLIK" />
                    </div>
                    <div>
                      <label className="field-label">Sarlavha (Heading)</label>
                      <input className="input" type="text" value={headingUz} onChange={(e) => setHeadingUz(e.target.value)} placeholder="Biznes hamkorlik" />
                    </div>
                    <div>
                      <label className="field-label">Ostsarlavha (Subtitle)</label>
                      <textarea className="input" rows={3} style={{ resize: 'vertical', fontFamily: 'inherit', padding: 12, lineHeight: 1.6 }} value={subtitleUz} onChange={(e) => setSubtitleUz(e.target.value)} placeholder="Ulgurji narxlar va maxsus..." />
                    </div>
                  </div>
                </div>

                {/* RU Texts */}
                <div style={{ background: 'white', borderRadius: 20, border: '1px solid #E2E8F0', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.02)' }}>
                  <div style={{ padding: '16px 24px', background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Globe size={16} color="#64748B" />
                    <span style={{ fontSize: 13, fontWeight: 800, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Русский язык (RU)</span>
                  </div>
                  <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <div>
                      <label className="field-label">Метка раздела (Section Label)</label>
                      <input className="input" type="text" value={sectionLabelRu} onChange={(e) => setSectionLabelRu(e.target.value)} placeholder="B2B ПАРТНЕРСТВО" />
                    </div>
                    <div>
                      <label className="field-label">Заголовок (Heading)</label>
                      <input className="input" type="text" value={headingRu} onChange={(e) => setHeadingRu(e.target.value)} placeholder="Бизнес партнерство" />
                    </div>
                    <div>
                      <label className="field-label">Подзаголовок (Subtitle)</label>
                      <textarea className="input" rows={3} style={{ resize: 'vertical', fontFamily: 'inherit', padding: 12, lineHeight: 1.6 }} value={subtitleRu} onChange={(e) => setSubtitleRu(e.target.value)} placeholder="Сотрудничайте по специальным условиям..." />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'benefits' && (
            <motion.div
              key="benefits"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
            >
              <div style={{ background: 'white', borderRadius: 20, border: '1px solid #E2E8F0', overflow: 'hidden' }}>
                <div style={{ padding: '16px 24px', background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 13, fontWeight: 800, color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Afzalliklar ro'yxati</span>
                  <button type="button" onClick={handleOpenModal} className="btn btn-primary" style={{ padding: '6px 12px', fontSize: 12, gap: 4 }}>
                    <Plus size={14} /> Yangi qo'shish
                  </button>
                </div>
                <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 24 }}>
                  {benefitsUz.map((benefitUz, i) => (
                    <div key={i} style={{ background: '#F8FAFC', padding: 20, borderRadius: 16, border: '1px solid #E2E8F0', position: 'relative' }}>
                      <div style={{ position: 'absolute', top: 16, right: 16, display: 'flex', gap: 8 }}>
                        <button disabled={i === 0} onClick={() => moveBenefit(i, 'up')} style={{ padding: 6, background: 'white', border: '1px solid #CBD5E1', borderRadius: 6, cursor: i === 0 ? 'not-allowed' : 'pointer', opacity: i === 0 ? 0.3 : 1 }}>
                          <ArrowUp size={14} />
                        </button>
                        <button disabled={i === benefitsUz.length - 1} onClick={() => moveBenefit(i, 'down')} style={{ padding: 6, background: 'white', border: '1px solid #CBD5E1', borderRadius: 6, cursor: i === benefitsUz.length - 1 ? 'not-allowed' : 'pointer', opacity: i === benefitsUz.length - 1 ? 0.3 : 1 }}>
                          <ArrowDown size={14} />
                        </button>
                        <button onClick={() => removeBenefit(i)} style={{ padding: 6, background: '#FEE2E2', border: '1px solid #FCA5A5', borderRadius: 6, cursor: 'pointer', color: '#EF4444' }}>
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                        <span style={{ fontSize: 11, fontWeight: 900, background: '#04432C', color: 'white', width: 22, height: 22, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {i + 1}
                        </span>
                        <span style={{ fontSize: 12, fontWeight: 800, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                          Afzallik kartasi
                        </span>
                      </div>

                      <div className="grid-2-cols-sm" style={{ marginBottom: 16 }}>
                        <div>
                          <label className="field-label">Sarlavha (UZ)</label>
                          <input className="input" style={{ background: 'white' }} type="text" value={benefitUz.title} onChange={(e) => updateBenefitUz(i, 'title', e.target.value)} placeholder="Ulgurji narxlar" />
                        </div>
                        <div>
                          <label className="field-label">Заголовок (RU)</label>
                          <input className="input" style={{ background: 'white' }} type="text" value={benefitsRu[i]?.title || ''} onChange={(e) => updateBenefitRu(i, 'title', e.target.value)} placeholder="Оптовые цены" />
                        </div>
                      </div>

                      <div className="grid-2-cols-sm">
                        <div>
                          <label className="field-label">Tavsif (UZ)</label>
                          <textarea className="input" rows={2} style={{ background: 'white', resize: 'vertical', padding: 10 }} value={benefitUz.description} onChange={(e) => updateBenefitUz(i, 'description', e.target.value)} placeholder="Tavsif..." />
                        </div>
                        <div>
                          <label className="field-label">Описание (RU)</label>
                          <textarea className="input" rows={2} style={{ background: 'white', resize: 'vertical', padding: 10 }} value={benefitsRu[i]?.description || ''} onChange={(e) => updateBenefitRu(i, 'description', e.target.value)} placeholder="Описание..." />
                        </div>
                      </div>
                    </div>
                  ))}
                  {benefitsUz.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '32px 0', color: '#94A3B8', fontSize: 13 }}>Hech qanday afzallik qo'shilmagan</div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Global Save Button at bottom */}
        <div style={{ marginTop: 24 }}>
          <button
            onClick={handleSave}
            disabled={saving}
            className={`btn ${saved ? '' : 'btn-primary'}`}
            style={{
              width: '100%', justifyContent: 'center',
              padding: '14px', fontSize: 14,
              background: saved ? '#10B981' : undefined,
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
              boxShadow: '0 4px 12px rgba(4,67,44,0.1)'
            }}
          >
            {saving ? (
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
          </button>
        </div>

        {/* Info Box */}
        <div style={{
          marginTop: 24, padding: '16px 20px',
          background: 'rgba(4,67,44,0.04)',
          border: '1px solid rgba(4,67,44,0.1)',
          borderRadius: 12, fontSize: 13, color: '#475569', lineHeight: 1.6,
        }}>
          💡 <strong>Eslatma:</strong> O'zgarishlar saqlanganidan so'ng, asosiy sahifada aks etishi uchun sahifani yangilang (F5).
        </div>
      </div>

      {/* Add Benefit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 24
          }}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              style={{
                position: 'absolute', inset: 0,
                background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(4px)'
              }}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              style={{
                background: 'white', borderRadius: 24, width: '100%', maxWidth: 540,
                position: 'relative', zIndex: 1, overflow: 'hidden',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                maxHeight: '90vh', overflowY: 'auto'
              }}
            >
              <div style={{
                padding: '20px 24px', borderBottom: '1px solid #E2E8F0',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                position: 'sticky', top: 0, background: 'white', zIndex: 2
              }}>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: '#0F172A', margin: 0 }}>Yangi afzallik qo'shish</h3>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  style={{
                    width: 32, height: 32, borderRadius: '50%', border: 'none',
                    background: '#F1F5F9', color: '#64748B', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <X size={18} />
                </button>
              </div>

              <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div className="grid-2-cols-sm">
                  <div>
                    <label className="field-label">Sarlavha (UZ) <span style={{ color: '#EF4444' }}>*</span></label>
                    <input className="input" type="text" value={newBenefitUz.title} onChange={(e) => setNewBenefitUz(prev => ({ ...prev, title: e.target.value }))} placeholder="Masalan: Ulgurji narxlar" autoFocus />
                  </div>
                  <div>
                    <label className="field-label">Заголовок (RU)</label>
                    <input className="input" type="text" value={newBenefitRu.title} onChange={(e) => setNewBenefitRu(prev => ({ ...prev, title: e.target.value }))} placeholder="Например: Оптовые цены" />
                  </div>
                </div>

                <div className="grid-2-cols-sm">
                  <div>
                    <label className="field-label">Tavsif (UZ)</label>
                    <textarea className="input" rows={3} style={{ resize: 'vertical', padding: 12, lineHeight: 1.6 }} value={newBenefitUz.description} onChange={(e) => setNewBenefitUz(prev => ({ ...prev, description: e.target.value }))} placeholder="Afzallik tavsifi..." />
                  </div>
                  <div>
                    <label className="field-label">Описание (RU)</label>
                    <textarea className="input" rows={3} style={{ resize: 'vertical', padding: 12, lineHeight: 1.6 }} value={newBenefitRu.description} onChange={(e) => setNewBenefitRu(prev => ({ ...prev, description: e.target.value }))} placeholder="Описание преимущества..." />
                  </div>
                </div>
              </div>

              <div style={{ padding: '16px 24px', background: '#F8FAFC', borderTop: '1px solid #E2E8F0', display: 'flex', justifyContent: 'flex-end', gap: 12, position: 'sticky', bottom: 0, zIndex: 2 }}>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  style={{
                    padding: '10px 20px', borderRadius: 10, background: 'white', border: '1px solid #E2E8F0',
                    color: '#64748B', fontSize: 14, fontWeight: 600, cursor: 'pointer'
                  }}
                >
                  Bekor qilish
                </button>
                <button
                  type="button"
                  onClick={submitNewBenefit}
                  disabled={!newBenefitUz.title.trim()}
                  style={{
                    padding: '10px 24px', borderRadius: 10, background: !newBenefitUz.title.trim() ? '#94A3B8' : '#04432C', border: 'none',
                    color: 'white', fontSize: 14, fontWeight: 600, cursor: !newBenefitUz.title.trim() ? 'not-allowed' : 'pointer',
                    display: 'flex', alignItems: 'center', gap: 8
                  }}
                >
                  <Plus size={16} /> Qo'shish
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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
      `}</style>
    </div>
  );
}
