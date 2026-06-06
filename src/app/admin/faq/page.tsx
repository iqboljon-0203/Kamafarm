'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Save, CheckCircle2, Globe, Plus, Trash2, ArrowUp, ArrowDown,
  Layout, HelpCircle, MessageSquare, X
} from 'lucide-react';
import { translations } from '@/lib/i18n';

export default function FAQPage() {
  const [activeTab, setActiveTab] = useState<'general' | 'items'>('general');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // General state
  const [sectionLabelUz, setSectionLabelUz] = useState('');
  const [sectionLabelRu, setSectionLabelRu] = useState('');
  const [headingUz, setHeadingUz] = useState('');
  const [headingRu, setHeadingRu] = useState('');
  const [ctaTextUz, setCtaTextUz] = useState('');
  const [ctaTextRu, setCtaTextRu] = useState('');
  const [ctaTelegramUz, setCtaTelegramUz] = useState('');
  const [ctaTelegramRu, setCtaTelegramRu] = useState('');
  const [ctaCallUz, setCtaCallUz] = useState('');
  const [ctaCallRu, setCtaCallRu] = useState('');

  const [itemsUz, setItemsUz] = useState<{ q: string; a: string }[]>([]);
  const [itemsRu, setItemsRu] = useState<{ q: string; a: string }[]>([]);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newFaqUz, setNewFaqUz] = useState({ q: '', a: '' });
  const [newFaqRu, setNewFaqRu] = useState({ q: '', a: '' });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/settings');
      const data = await res.json();
      const settings = data.settings || {};

      setSectionLabelUz(settings.faq_sectionLabel_uz || translations.uz.faq.sectionLabel);
      setSectionLabelRu(settings.faq_sectionLabel_ru || translations.ru.faq.sectionLabel);
      setHeadingUz(settings.faq_heading_uz || translations.uz.faq.heading);
      setHeadingRu(settings.faq_heading_ru || translations.ru.faq.heading);
      setCtaTextUz(settings.faq_ctaText_uz || (translations.uz.faq as any).ctaText);
      setCtaTextRu(settings.faq_ctaText_ru || (translations.ru.faq as any).ctaText);
      setCtaTelegramUz(settings.faq_ctaTelegram_uz || (translations.uz.faq as any).ctaTelegram);
      setCtaTelegramRu(settings.faq_ctaTelegram_ru || (translations.ru.faq as any).ctaTelegram);
      setCtaCallUz(settings.faq_ctaCall_uz || (translations.uz.faq as any).ctaCall);
      setCtaCallRu(settings.faq_ctaCall_ru || (translations.ru.faq as any).ctaCall);

      setItemsUz(
        settings.faq_items_uz
          ? JSON.parse(settings.faq_items_uz)
          : translations.uz.faq.items
      );
      setItemsRu(
        settings.faq_items_ru
          ? JSON.parse(settings.faq_items_ru)
          : translations.ru.faq.items
      );
    } catch (e) {
      console.error('[FAQ Admin] Failed to fetch settings:', e);
    } finally {
      setLoading(false);
    }
  };

  const getToken = () => localStorage.getItem('kamafarm_admin_token') || 'kamafarm-admin-2026';

  const handleOpenModal = () => {
    setNewFaqUz({ q: '', a: '' });
    setNewFaqRu({ q: '', a: '' });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const submitNewFaq = () => {
    if (!newFaqUz.q.trim()) {
      alert('Savolni kiriting!');
      return;
    }
    setItemsUz([newFaqUz, ...itemsUz]);
    setItemsRu([newFaqRu, ...itemsRu]);
    setIsModalOpen(false);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const removeItem = (index: number) => {
    setItemsUz(itemsUz.filter((_, i) => i !== index));
    setItemsRu(itemsRu.filter((_, i) => i !== index));
  };

  const moveItem = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === itemsUz.length - 1) return;

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    const newUz = [...itemsUz];
    const tempUz = newUz[index];
    newUz[index] = newUz[targetIndex];
    newUz[targetIndex] = tempUz;
    setItemsUz(newUz);

    const newRu = [...itemsRu];
    const tempRu = newRu[index];
    newRu[index] = newRu[targetIndex];
    newRu[targetIndex] = tempRu;
    setItemsRu(newRu);
  };

  const updateItemUz = (index: number, key: 'q' | 'a', value: string) => {
    setItemsUz(itemsUz.map((p, i) => (i === index ? { ...p, [key]: value } : p)));
  };

  const updateItemRu = (index: number, key: 'q' | 'a', value: string) => {
    setItemsRu(itemsRu.map((p, i) => (i === index ? { ...p, [key]: value } : p)));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload: Record<string, string> = {
        faq_sectionLabel_uz: sectionLabelUz,
        faq_sectionLabel_ru: sectionLabelRu,
        faq_heading_uz: headingUz,
        faq_heading_ru: headingRu,
        faq_ctaText_uz: ctaTextUz,
        faq_ctaText_ru: ctaTextRu,
        faq_ctaTelegram_uz: ctaTelegramUz,
        faq_ctaTelegram_ru: ctaTelegramRu,
        faq_ctaCall_uz: ctaCallUz,
        faq_ctaCall_ru: ctaCallRu,
        faq_items_uz: JSON.stringify(itemsUz),
        faq_items_ru: JSON.stringify(itemsRu),
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
      console.error('[FAQ Save] Error saving Settings:', e);
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
        <span style={{ fontSize: 14, color: '#64748B', fontWeight: 600 }}>FAQ sozlamalari yuklanmoqda...</span>
      </div>
    );
  }

  return (
    <div style={{ padding: 32, maxWidth: 1000, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 900, color: '#0F172A', letterSpacing: '-0.02em', marginBottom: 6 }}>
            Ko'p so'raladigan savollar (FAQ)
          </h1>
          <p style={{ fontSize: 14, color: '#64748B' }}>
            Foydalanuvchilar tez-tez beradigan savollar va ularning javoblarini boshqaring
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
          onClick={() => setActiveTab('items')}
          style={{
            background: 'none', border: 'none', padding: '12px 20px', fontSize: 14, fontWeight: 700,
            color: activeTab === 'items' ? '#04432C' : '#64748B',
            borderBottom: activeTab === 'items' ? '3px solid #04432C' : '3px solid transparent',
            cursor: 'pointer', transition: 'all 0.2s',
            display: 'flex', alignItems: 'center', gap: 8
          }}
        >
          <MessageSquare size={16} />
          Savollar va Javoblar
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
                      <input className="input" type="text" value={sectionLabelUz} onChange={(e) => setSectionLabelUz(e.target.value)} />
                    </div>
                    <div>
                      <label className="field-label">Sarlavha (Heading)</label>
                      <input className="input" type="text" value={headingUz} onChange={(e) => setHeadingUz(e.target.value)} />
                    </div>
                    <hr style={{ border: 'none', borderTop: '1px solid #E2E8F0', margin: '8px 0' }} />
                    <div>
                      <label className="field-label">Qo'ng'iroq bloki: Matn</label>
                      <input className="input" type="text" value={ctaTextUz} onChange={(e) => setCtaTextUz(e.target.value)} />
                    </div>
                    <div>
                      <label className="field-label">Qo'ng'iroq bloki: Telegram tugma</label>
                      <input className="input" type="text" value={ctaTelegramUz} onChange={(e) => setCtaTelegramUz(e.target.value)} />
                    </div>
                    <div>
                      <label className="field-label">Qo'ng'iroq bloki: Telefon tugma</label>
                      <input className="input" type="text" value={ctaCallUz} onChange={(e) => setCtaCallUz(e.target.value)} />
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
                      <input className="input" type="text" value={sectionLabelRu} onChange={(e) => setSectionLabelRu(e.target.value)} />
                    </div>
                    <div>
                      <label className="field-label">Заголовок (Heading)</label>
                      <input className="input" type="text" value={headingRu} onChange={(e) => setHeadingRu(e.target.value)} />
                    </div>
                    <hr style={{ border: 'none', borderTop: '1px solid #E2E8F0', margin: '8px 0' }} />
                    <div>
                      <label className="field-label">Блок связи: Текст</label>
                      <input className="input" type="text" value={ctaTextRu} onChange={(e) => setCtaTextRu(e.target.value)} />
                    </div>
                    <div>
                      <label className="field-label">Блок связи: Кнопка Telegram</label>
                      <input className="input" type="text" value={ctaTelegramRu} onChange={(e) => setCtaTelegramRu(e.target.value)} />
                    </div>
                    <div>
                      <label className="field-label">Блок связи: Кнопка Телефон</label>
                      <input className="input" type="text" value={ctaCallRu} onChange={(e) => setCtaCallRu(e.target.value)} />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'items' && (
            <motion.div
              key="items"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
            >
              <div style={{ background: 'white', borderRadius: 20, border: '1px solid #E2E8F0', overflow: 'hidden' }}>
                <div style={{ padding: '16px 24px', background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 13, fontWeight: 800, color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Savollar ro'yxati</span>
                  <button type="button" onClick={handleOpenModal} className="btn btn-primary" style={{ padding: '6px 12px', fontSize: 12, gap: 4 }}>
                    <Plus size={14} /> Yangi qo'shish
                  </button>
                </div>
                <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 24 }}>
                  {itemsUz.map((itemUz, i) => (
                    <div key={i} style={{ background: '#F8FAFC', padding: 20, borderRadius: 16, border: '1px solid #E2E8F0', position: 'relative' }}>
                      <div style={{ position: 'absolute', top: 16, right: 16, display: 'flex', gap: 8 }}>
                        <button disabled={i === 0} onClick={() => moveItem(i, 'up')} style={{ padding: 6, background: 'white', border: '1px solid #CBD5E1', borderRadius: 6, cursor: i === 0 ? 'not-allowed' : 'pointer', opacity: i === 0 ? 0.3 : 1 }}>
                          <ArrowUp size={14} />
                        </button>
                        <button disabled={i === itemsUz.length - 1} onClick={() => moveItem(i, 'down')} style={{ padding: 6, background: 'white', border: '1px solid #CBD5E1', borderRadius: 6, cursor: i === itemsUz.length - 1 ? 'not-allowed' : 'pointer', opacity: i === itemsUz.length - 1 ? 0.3 : 1 }}>
                          <ArrowDown size={14} />
                        </button>
                        <button onClick={() => removeItem(i)} style={{ padding: 6, background: '#FEE2E2', border: '1px solid #FCA5A5', borderRadius: 6, cursor: 'pointer', color: '#EF4444' }}>
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                        <span style={{ fontSize: 11, fontWeight: 900, background: '#10B981', color: 'white', width: 22, height: 22, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {i + 1}
                        </span>
                        <span style={{ fontSize: 12, fontWeight: 800, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                          Savol va Javob
                        </span>
                      </div>

                      <div className="grid-2-cols-sm" style={{ marginBottom: 16 }}>
                        <div>
                          <label className="field-label">Savol (UZ)</label>
                          <input className="input" style={{ background: 'white' }} type="text" value={itemUz.q} onChange={(e) => updateItemUz(i, 'q', e.target.value)} />
                        </div>
                        <div>
                          <label className="field-label">Вопрос (RU)</label>
                          <input className="input" style={{ background: 'white' }} type="text" value={itemsRu[i]?.q || ''} onChange={(e) => updateItemRu(i, 'q', e.target.value)} />
                        </div>
                      </div>

                      <div className="grid-2-cols-sm">
                        <div>
                          <label className="field-label">Javob (UZ)</label>
                          <textarea className="input" rows={3} style={{ background: 'white', resize: 'vertical', padding: 10 }} value={itemUz.a} onChange={(e) => updateItemUz(i, 'a', e.target.value)} />
                        </div>
                        <div>
                          <label className="field-label">Ответ (RU)</label>
                          <textarea className="input" rows={3} style={{ background: 'white', resize: 'vertical', padding: 10 }} value={itemsRu[i]?.a || ''} onChange={(e) => updateItemRu(i, 'a', e.target.value)} />
                        </div>
                      </div>
                    </div>
                  ))}
                  {itemsUz.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '32px 0', color: '#94A3B8', fontSize: 13 }}>Hech qanday savol qo'shilmagan</div>
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

      {/* Add FAQ Modal */}
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
                <h3 style={{ fontSize: 18, fontWeight: 800, color: '#0F172A', margin: 0 }}>Yangi savol qo'shish</h3>
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
                    <label className="field-label">Savol (UZ) <span style={{ color: '#EF4444' }}>*</span></label>
                    <input className="input" type="text" value={newFaqUz.q} onChange={(e) => setNewFaqUz(prev => ({ ...prev, q: e.target.value }))} placeholder="Savol matni..." autoFocus />
                  </div>
                  <div>
                    <label className="field-label">Вопрос (RU)</label>
                    <input className="input" type="text" value={newFaqRu.q} onChange={(e) => setNewFaqRu(prev => ({ ...prev, q: e.target.value }))} placeholder="Текст вопроса..." />
                  </div>
                </div>

                <div className="grid-2-cols-sm">
                  <div>
                    <label className="field-label">Javob (UZ)</label>
                    <textarea className="input" rows={3} style={{ resize: 'vertical', padding: 12, lineHeight: 1.6 }} value={newFaqUz.a} onChange={(e) => setNewFaqUz(prev => ({ ...prev, a: e.target.value }))} placeholder="Javob matni..." />
                  </div>
                  <div>
                    <label className="field-label">Ответ (RU)</label>
                    <textarea className="input" rows={3} style={{ resize: 'vertical', padding: 12, lineHeight: 1.6 }} value={newFaqRu.a} onChange={(e) => setNewFaqRu(prev => ({ ...prev, a: e.target.value }))} placeholder="Текст ответа..." />
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
                  onClick={submitNewFaq}
                  disabled={!newFaqUz.q.trim()}
                  style={{
                    padding: '10px 24px', borderRadius: 10, background: !newFaqUz.q.trim() ? '#94A3B8' : '#04432C', border: 'none',
                    color: 'white', fontSize: 14, fontWeight: 600, cursor: !newFaqUz.q.trim() ? 'not-allowed' : 'pointer',
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
