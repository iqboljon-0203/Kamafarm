'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Save, CheckCircle2, Globe, Plus, Trash2, ArrowUp, ArrowDown,
  Layout, ListChecks, BarChart3, HelpCircle
} from 'lucide-react';
import { translations } from '@/lib/i18n';

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<'general' | 'features' | 'stats_values'>('general');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // General state
  const [headingUz, setHeadingUz] = useState('');
  const [headingRu, setHeadingRu] = useState('');
  const [descUz, setDescUz] = useState('');
  const [descRu, setDescRu] = useState('');

  // Features checklist state
  const [featuresUz, setFeaturesUz] = useState<string[]>([]);
  const [featuresRu, setFeaturesRu] = useState<string[]>([]);

  // Stats state (exactly 3 items)
  const [statsUz, setStatsUz] = useState<{ value: string; label: string }[]>([]);
  const [statsRu, setStatsRu] = useState<{ value: string; label: string }[]>([]);

  // Values cards state (exactly 3 items)
  const [valuesUz, setValuesUz] = useState<{ title: string; description: string }[]>([]);
  const [valuesRu, setValuesRu] = useState<{ title: string; description: string }[]>([]);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/settings');
      const data = await res.json();
      const settings = data.settings || {};

      setHeadingUz(settings.about_heading_uz || translations.uz.about.heading);
      setHeadingRu(settings.about_heading_ru || translations.ru.about.heading);
      setDescUz(settings.about_description_uz || translations.uz.about.description);
      setDescRu(settings.about_description_ru || translations.ru.about.description);

      setFeaturesUz(
        settings.about_features_uz
          ? JSON.parse(settings.about_features_uz)
          : translations.uz.about.features
      );
      setFeaturesRu(
        settings.about_features_ru
          ? JSON.parse(settings.about_features_ru)
          : translations.ru.about.features
      );

      setStatsUz(
        settings.about_stats_uz
          ? JSON.parse(settings.about_stats_uz)
          : translations.uz.about.stats
      );
      setStatsRu(
        settings.about_stats_ru
          ? JSON.parse(settings.about_stats_ru)
          : translations.ru.about.stats
      );

      setValuesUz(
        settings.about_values_uz
          ? JSON.parse(settings.about_values_uz)
          : translations.uz.about.values
      );
      setValuesRu(
        settings.about_values_ru
          ? JSON.parse(settings.about_values_ru)
          : translations.ru.about.values
      );
    } catch (e) {
      console.error('[About Admin] Failed to fetch settings:', e);
      // fallback to static values
      setHeadingUz(translations.uz.about.heading);
      setHeadingRu(translations.ru.about.heading);
      setDescUz(translations.uz.about.description);
      setDescRu(translations.ru.about.description);
      setFeaturesUz(translations.uz.about.features);
      setFeaturesRu(translations.ru.about.features);
      setStatsUz(translations.uz.about.stats);
      setStatsRu(translations.ru.about.stats);
      setValuesUz(translations.uz.about.values);
      setValuesRu(translations.ru.about.values);
    } finally {
      setLoading(false);
    }
  };

  const getToken = () => localStorage.getItem('kamafarm_admin_token') || 'kamafarm-admin-2026';

  // Feature Checklist builders
  const addFeature = (lang: 'uz' | 'ru') => {
    if (lang === 'uz') {
      setFeaturesUz([...featuresUz, 'Yangi xususiyat']);
    } else {
      setFeaturesRu([...featuresRu, 'Новое свойство']);
    }
  };

  const removeFeature = (lang: 'uz' | 'ru', index: number) => {
    if (lang === 'uz') {
      setFeaturesUz(featuresUz.filter((_, i) => i !== index));
    } else {
      setFeaturesRu(featuresRu.filter((_, i) => i !== index));
    }
  };

  const updateFeature = (lang: 'uz' | 'ru', index: number, value: string) => {
    if (lang === 'uz') {
      setFeaturesUz(featuresUz.map((f, i) => (i === index ? value : f)));
    } else {
      setFeaturesRu(featuresRu.map((f, i) => (i === index ? value : f)));
    }
  };

  // Reordering features
  const moveFeature = (lang: 'uz' | 'ru', index: number, direction: 'up' | 'down') => {
    const list = lang === 'uz' ? [...featuresUz] : [...featuresRu];
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === list.length - 1) return;

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const temp = list[index];
    list[index] = list[targetIndex];
    list[targetIndex] = temp;

    if (lang === 'uz') {
      setFeaturesUz(list);
    } else {
      setFeaturesRu(list);
    }
  };

  // Stats helpers
  const updateStatValue = (index: number, val: string) => {
    setStatsUz(statsUz.map((s, i) => (i === index ? { ...s, value: val } : s)));
    setStatsRu(statsRu.map((s, i) => (i === index ? { ...s, value: val } : s)));
  };

  const updateStatLabelUz = (index: number, label: string) => {
    setStatsUz(statsUz.map((s, i) => (i === index ? { ...s, label } : s)));
  };

  const updateStatLabelRu = (index: number, label: string) => {
    setStatsRu(statsRu.map((s, i) => (i === index ? { ...s, label } : s)));
  };

  // Values card helpers
  const updateValueTitleUz = (index: number, title: string) => {
    setValuesUz(valuesUz.map((v, i) => (i === index ? { ...v, title } : v)));
  };

  const updateValueTitleRu = (index: number, title: string) => {
    setValuesRu(valuesRu.map((v, i) => (i === index ? { ...v, title } : v)));
  };

  const updateValueDescUz = (index: number, description: string) => {
    setValuesUz(valuesUz.map((v, i) => (i === index ? { ...v, description } : v)));
  };

  const updateValueDescRu = (index: number, description: string) => {
    setValuesRu(valuesRu.map((v, i) => (i === index ? { ...v, description } : v)));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload: Record<string, string> = {
        about_heading_uz: headingUz,
        about_heading_ru: headingRu,
        about_description_uz: descUz,
        about_description_ru: descRu,
        about_features_uz: JSON.stringify(featuresUz),
        about_features_ru: JSON.stringify(featuresRu),
        about_stats_uz: JSON.stringify(statsUz),
        about_stats_ru: JSON.stringify(statsRu),
        about_values_uz: JSON.stringify(valuesUz),
        about_values_ru: JSON.stringify(valuesRu),
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
      console.error('[About Save] Error saving Settings:', e);
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
        <span style={{ fontSize: 14, color: '#64748B', fontWeight: 600 }}>Tizim sozlamalari yuklanmoqda...</span>
      </div>
    );
  }

  return (
    <div style={{ padding: 32, maxWidth: 1000, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 900, color: '#0F172A', letterSpacing: '-0.02em', marginBottom: 6 }}>
            Kompaniya haqida ("Biz haqimizda" bo'limi)
          </h1>
          <p style={{ fontSize: 14, color: '#64748B' }}>
            Saytdagi "Biz haqimizda" bo'limi matnlari, statistika va qadriyatlar ma'lumotlarini boshqaring
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
      <div style={{
        display: 'flex',
        gap: 8,
        marginBottom: 32,
        borderBottom: '1px solid #E2E8F0',
        paddingBottom: 2
      }}>
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
          onClick={() => setActiveTab('features')}
          style={{
            background: 'none', border: 'none', padding: '12px 20px', fontSize: 14, fontWeight: 700,
            color: activeTab === 'features' ? '#04432C' : '#64748B',
            borderBottom: activeTab === 'features' ? '3px solid #04432C' : '3px solid transparent',
            cursor: 'pointer', transition: 'all 0.2s',
            display: 'flex', alignItems: 'center', gap: 8
          }}
        >
          <ListChecks size={16} />
          Xususiyatlar (Checklist)
        </button>
        <button
          onClick={() => setActiveTab('stats_values')}
          style={{
            background: 'none', border: 'none', padding: '12px 20px', fontSize: 14, fontWeight: 700,
            color: activeTab === 'stats_values' ? '#04432C' : '#64748B',
            borderBottom: activeTab === 'stats_values' ? '3px solid #04432C' : '3px solid transparent',
            cursor: 'pointer', transition: 'all 0.2s',
            display: 'flex', alignItems: 'center', gap: 8
          }}
        >
          <BarChart3 size={16} />
          Statistika & Qadriyatlar
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
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                {/* UZ Texts */}
                <div style={{ background: 'white', borderRadius: 20, border: '1px solid #E2E8F0', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.02)' }}>
                  <div style={{ padding: '16px 24px', background: '#F0FDF4', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Globe size={16} color="#10B981" />
                    <span style={{ fontSize: 13, fontWeight: 800, color: '#04432C', textTransform: 'uppercase', letterSpacing: '0.04em' }}>O'zbek tili (UZ)</span>
                  </div>
                  <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <div>
                      <label className="field-label">Sarlavha (Heading)</label>
                      <input className="input" type="text" value={headingUz} onChange={(e) => setHeadingUz(e.target.value)} placeholder="Kamafarm Healthcare" />
                    </div>
                    <div>
                      <label className="field-label">Tafsilot matni (Description)</label>
                      <textarea className="input" rows={8} style={{ resize: 'vertical', fontFamily: 'inherit', padding: 12, lineHeight: 1.6 }} value={descUz} onChange={(e) => setDescUz(e.target.value)} placeholder="Tafsilot matni..." />
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
                      <label className="field-label">Заголовок (Heading)</label>
                      <input className="input" type="text" value={headingRu} onChange={(e) => setHeadingRu(e.target.value)} placeholder="Kamafarm Healthcare" />
                    </div>
                    <div>
                      <label className="field-label">Текст описания (Description)</label>
                      <textarea className="input" rows={8} style={{ resize: 'vertical', fontFamily: 'inherit', padding: 12, lineHeight: 1.6 }} value={descRu} onChange={(e) => setDescRu(e.target.value)} placeholder="Текст описания..." />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'features' && (
            <motion.div
              key="features"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                {/* Features UZ */}
                <div style={{ background: 'white', borderRadius: 20, border: '1px solid #E2E8F0', overflow: 'hidden' }}>
                  <div style={{ padding: '16px 24px', background: '#F0FDF4', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 13, fontWeight: 800, color: '#04432C', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Xususiyatlar ro'yxati (UZ)</span>
                    <button onClick={() => addFeature('uz')} className="btn btn-primary" style={{ padding: '6px 12px', fontSize: 12, gap: 4 }}>
                      <Plus size={14} /> Yangi qo'shish
                    </button>
                  </div>
                  <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {featuresUz.map((feat, index) => (
                      <div key={index} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        <input className="input" type="text" style={{ background: '#F8FAFC' }} value={feat} onChange={(e) => updateFeature('uz', index, e.target.value)} />
                        <button disabled={index === 0} onClick={() => moveFeature('uz', index, 'up')} style={{ padding: 8, background: 'none', border: '1px solid #CBD5E1', borderRadius: 8, cursor: index === 0 ? 'not-allowed' : 'pointer', opacity: index === 0 ? 0.3 : 1 }}>
                          <ArrowUp size={14} />
                        </button>
                        <button disabled={index === featuresUz.length - 1} onClick={() => moveFeature('uz', index, 'down')} style={{ padding: 8, background: 'none', border: '1px solid #CBD5E1', borderRadius: 8, cursor: index === featuresUz.length - 1 ? 'not-allowed' : 'pointer', opacity: index === featuresUz.length - 1 ? 0.3 : 1 }}>
                          <ArrowDown size={14} />
                        </button>
                        <button onClick={() => removeFeature('uz', index)} style={{ padding: 8, background: '#FEE2E2', border: '1px solid #FCA5A5', borderRadius: 8, cursor: 'pointer', color: '#EF4444' }}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                    {featuresUz.length === 0 && (
                      <div style={{ textAlign: 'center', padding: '32px 0', color: '#94A3B8', fontSize: 13 }}>Hech qanday xususiyat qo'shilmagan</div>
                    )}
                  </div>
                </div>

                {/* Features RU */}
                <div style={{ background: 'white', borderRadius: 20, border: '1px solid #E2E8F0', overflow: 'hidden' }}>
                  <div style={{ padding: '16px 24px', background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 13, fontWeight: 800, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Список свойств (RU)</span>
                    <button onClick={() => addFeature('ru')} className="btn btn-primary" style={{ padding: '6px 12px', fontSize: 12, gap: 4 }}>
                      <Plus size={14} /> Добавить
                    </button>
                  </div>
                  <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {featuresRu.map((feat, index) => (
                      <div key={index} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        <input className="input" type="text" style={{ background: '#F8FAFC' }} value={feat} onChange={(e) => updateFeature('ru', index, e.target.value)} />
                        <button disabled={index === 0} onClick={() => moveFeature('ru', index, 'up')} style={{ padding: 8, background: 'none', border: '1px solid #CBD5E1', borderRadius: 8, cursor: index === 0 ? 'not-allowed' : 'pointer', opacity: index === 0 ? 0.3 : 1 }}>
                          <ArrowUp size={14} />
                        </button>
                        <button disabled={index === featuresRu.length - 1} onClick={() => moveFeature('ru', index, 'down')} style={{ padding: 8, background: 'none', border: '1px solid #CBD5E1', borderRadius: 8, cursor: index === featuresRu.length - 1 ? 'not-allowed' : 'pointer', opacity: index === featuresRu.length - 1 ? 0.3 : 1 }}>
                          <ArrowDown size={14} />
                        </button>
                        <button onClick={() => removeFeature('ru', index)} style={{ padding: 8, background: '#FEE2E2', border: '1px solid #FCA5A5', borderRadius: 8, cursor: 'pointer', color: '#EF4444' }}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                    {featuresRu.length === 0 && (
                      <div style={{ textAlign: 'center', padding: '32px 0', color: '#94A3B8', fontSize: 13 }}>Список пуст</div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'stats_values' && (
            <motion.div
              key="stats_values"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
            >
              {/* Section 1: Stats counters */}
              <div style={{ background: 'white', borderRadius: 20, border: '1px solid #E2E8F0', overflow: 'hidden', marginBottom: 24 }}>
                <div style={{ padding: '16px 24px', background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', fontWeight: 800, fontSize: 13, textTransform: 'uppercase', color: '#0F172A', letterSpacing: '0.04em' }}>
                  Statistika ko'rsatkichlari (Jami 3 ta)
                </div>
                <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
                  {statsUz.map((stat, i) => (
                    <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 2fr', gap: 16, alignItems: 'center', background: '#F8FAFC', padding: 16, borderRadius: 12, border: '1px solid #E2E8F0' }}>
                      <div>
                        <label className="field-label">Qiymat (Value)</label>
                        <input className="input" style={{ background: 'white' }} type="text" value={stat.value} onChange={(e) => updateStatValue(i, e.target.value)} placeholder="1200+" />
                      </div>
                      <div>
                        <label className="field-label">Izoh (UZ)</label>
                        <input className="input" style={{ background: 'white' }} type="text" value={stat.label} onChange={(e) => updateStatLabelUz(i, e.target.value)} placeholder="Mamnun mijozlar" />
                      </div>
                      <div>
                        <label className="field-label">Izoh (RU)</label>
                        <input className="input" style={{ background: 'white' }} type="text" value={statsRu[i]?.label || ''} onChange={(e) => updateStatLabelRu(i, e.target.value)} placeholder="Довольных клиентов" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 2: Values cards */}
              <div style={{ background: 'white', borderRadius: 20, border: '1px solid #E2E8F0', overflow: 'hidden' }}>
                <div style={{ padding: '16px 24px', background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', fontWeight: 800, fontSize: 13, textTransform: 'uppercase', color: '#0F172A', letterSpacing: '0.04em' }}>
                  Qadriyatlar kartalari (Jami 3 ta)
                </div>
                <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 24 }}>
                  {valuesUz.map((valCard, i) => (
                    <div key={i} style={{ background: '#F8FAFC', padding: 20, borderRadius: 16, border: '1px solid #E2E8F0' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                        <span style={{ fontSize: 11, fontWeight: 900, background: '#04432C', color: 'white', width: 22, height: 22, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {i + 1}
                        </span>
                        <span style={{ fontSize: 12, fontWeight: 800, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                          {i === 0 ? 'Karta 1 (Qalqon belgisi)' : i === 1 ? 'Karta 2 (Barg belgisi)' : 'Karta 3 (Qo\'l berib ko\'rishish belgisi)'}
                        </span>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                        <div>
                          <label className="field-label">Sarlavha (UZ)</label>
                          <input className="input" style={{ background: 'white' }} type="text" value={valCard.title} onChange={(e) => updateValueTitleUz(i, e.target.value)} placeholder="Sifat kafolati" />
                        </div>
                        <div>
                          <label className="field-label">Sarlavha (RU)</label>
                          <input className="input" style={{ background: 'white' }} type="text" value={valuesRu[i]?.title || ''} onChange={(e) => updateValueTitleRu(i, e.target.value)} placeholder="Гарантия качества" />
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                        <div>
                          <label className="field-label">Tavsif (UZ)</label>
                          <textarea className="input" rows={2} style={{ background: 'white', resize: 'vertical', fontFamily: 'inherit', padding: 10 }} value={valCard.description} onChange={(e) => updateValueDescUz(i, e.target.value)} placeholder="Tavsif matni..." />
                        </div>
                        <div>
                          <label className="field-label">Tavsif (RU)</label>
                          <textarea className="input" rows={2} style={{ background: 'white', resize: 'vertical', fontFamily: 'inherit', padding: 10 }} value={valuesRu[i]?.description || ''} onChange={(e) => updateValueDescRu(i, e.target.value)} placeholder="Описание..." />
                        </div>
                      </div>
                    </div>
                  ))}
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
          💡 <strong>Eslatma:</strong> "Biz haqimizda" bo'limiga kiritilgan o'zgarishlar saqlanganidan so'ng, asosiy sahifada aks etishi uchun sahifani yangilang (F5).
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
      `}</style>
    </div>
  );
}
