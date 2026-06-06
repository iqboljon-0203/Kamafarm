'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Save, CheckCircle2, Globe, Plus, Trash2, ArrowUp, ArrowDown,
  Layout, Store, MapPin, Image as ImageIcon, X
} from 'lucide-react';
import { translations } from '@/lib/i18n';

export default function DistributionPage() {
  const [activeTab, setActiveTab] = useState<'general' | 'partners'>('general');
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
  const [partnersUz, setPartnersUz] = useState('');
  const [partnersRu, setPartnersRu] = useState('');
  const [mapTitleUz, setMapTitleUz] = useState('');
  const [mapTitleRu, setMapTitleRu] = useState('');
  const [headOfficeUz, setHeadOfficeUz] = useState('');
  const [headOfficeRu, setHeadOfficeRu] = useState('');

  // Partners state
  const [partnersListUz, setPartnersListUz] = useState<{ name: string; city: string; logo?: string }[]>([]);
  const [partnersListRu, setPartnersListRu] = useState<{ name: string; city: string; logo?: string }[]>([]);
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPartnerUz, setNewPartnerUz] = useState({ name: '', city: '', logo: '' });
  const [newPartnerRu, setNewPartnerRu] = useState({ name: '', city: '', logo: '' });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/settings');
      const data = await res.json();
      const settings = data.settings || {};

      setSectionLabelUz(settings.distribution_sectionLabel_uz || translations.uz.distribution.sectionLabel);
      setSectionLabelRu(settings.distribution_sectionLabel_ru || translations.ru.distribution.sectionLabel);
      setHeadingUz(settings.distribution_heading_uz || translations.uz.distribution.heading);
      setHeadingRu(settings.distribution_heading_ru || translations.ru.distribution.heading);
      setSubtitleUz(settings.distribution_subtitle_uz || translations.uz.distribution.subtitle);
      setSubtitleRu(settings.distribution_subtitle_ru || translations.ru.distribution.subtitle);
      setPartnersUz(settings.distribution_partners_uz || translations.uz.distribution.partners);
      setPartnersRu(settings.distribution_partners_ru || translations.ru.distribution.partners);
      setMapTitleUz(settings.distribution_mapTitle_uz || translations.uz.distribution.mapTitle);
      setMapTitleRu(settings.distribution_mapTitle_ru || translations.ru.distribution.mapTitle);
      setHeadOfficeUz(settings.distribution_headOffice_uz || translations.uz.distribution.headOffice);
      setHeadOfficeRu(settings.distribution_headOffice_ru || translations.ru.distribution.headOffice);

      setPartnersListUz(
        settings.distribution_partnersList_uz
          ? JSON.parse(settings.distribution_partnersList_uz)
          : translations.uz.distribution.partnersList
      );
      setPartnersListRu(
        settings.distribution_partnersList_ru
          ? JSON.parse(settings.distribution_partnersList_ru)
          : translations.ru.distribution.partnersList
      );
    } catch (e) {
      console.error('[Distribution Admin] Failed to fetch settings:', e);
    } finally {
      setLoading(false);
    }
  };

  const getToken = () => localStorage.getItem('kamafarm_admin_token') || 'kamafarm-admin-2026';

  // Partners List helpers
  const handleOpenModal = () => {
    setNewPartnerUz({ name: '', city: '', logo: '' });
    setNewPartnerRu({ name: '', city: '', logo: '' });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const submitNewPartner = () => {
    if (!newPartnerUz.name.trim()) {
      alert('Kompaniya nomini kiriting!');
      return;
    }
    setPartnersListUz([newPartnerUz, ...partnersListUz]);
    setPartnersListRu([newPartnerRu, ...partnersListRu]);
    setIsModalOpen(false);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const removePartner = (index: number) => {
    setPartnersListUz(partnersListUz.filter((_, i) => i !== index));
    setPartnersListRu(partnersListRu.filter((_, i) => i !== index));
  };

  const movePartner = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === partnersListUz.length - 1) return;

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    const newUz = [...partnersListUz];
    const tempUz = newUz[index];
    newUz[index] = newUz[targetIndex];
    newUz[targetIndex] = tempUz;
    setPartnersListUz(newUz);

    const newRu = [...partnersListRu];
    const tempRu = newRu[index];
    newRu[index] = newRu[targetIndex];
    newRu[targetIndex] = tempRu;
    setPartnersListRu(newRu);
  };

  const updatePartnerUz = (index: number, key: 'name' | 'city' | 'logo', value: string) => {
    setPartnersListUz(partnersListUz.map((p, i) => (i === index ? { ...p, [key]: value } : p)));
  };

  const updatePartnerRu = (index: number, key: 'name' | 'city' | 'logo', value: string) => {
    setPartnersListRu(partnersListRu.map((p, i) => (i === index ? { ...p, [key]: value } : p)));
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
        if (index === -1) {
          setNewPartnerUz(prev => ({ ...prev, logo: data.url }));
          setNewPartnerRu(prev => ({ ...prev, logo: data.url }));
        } else {
          updatePartnerUz(index, 'logo', data.url);
          updatePartnerRu(index, 'logo', data.url);
        }
      } else {
        alert('Rasm yuklashda xatolik: ' + (data.error || 'Noma\'lum xatolik'));
      }
    } catch (e) {
      alert('Fayl yuklashda tarmoq xatoligi yuz berdi');
    } finally {
      setUploadingIndex(null);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload: Record<string, string> = {
        distribution_sectionLabel_uz: sectionLabelUz,
        distribution_sectionLabel_ru: sectionLabelRu,
        distribution_heading_uz: headingUz,
        distribution_heading_ru: headingRu,
        distribution_subtitle_uz: subtitleUz,
        distribution_subtitle_ru: subtitleRu,
        distribution_partners_uz: partnersUz,
        distribution_partners_ru: partnersRu,
        distribution_mapTitle_uz: mapTitleUz,
        distribution_mapTitle_ru: mapTitleRu,
        distribution_headOffice_uz: headOfficeUz,
        distribution_headOffice_ru: headOfficeRu,
        distribution_partnersList_uz: JSON.stringify(partnersListUz),
        distribution_partnersList_ru: JSON.stringify(partnersListRu),
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
      console.error('[Distribution Save] Error saving Settings:', e);
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
        <span style={{ fontSize: 14, color: '#64748B', fontWeight: 600 }}>Distribyutsiya sozlamalari yuklanmoqda...</span>
      </div>
    );
  }

  return (
    <div style={{ padding: 32, maxWidth: 1000, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 900, color: '#0F172A', letterSpacing: '-0.02em', marginBottom: 6 }}>
            Distribyutsiya
          </h1>
          <p style={{ fontSize: 14, color: '#64748B' }}>
            Hamkor dorixonalar tarmog'i va xarita sarlavhalarini boshqaring
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
          onClick={() => setActiveTab('partners')}
          style={{
            background: 'none', border: 'none', padding: '12px 20px', fontSize: 14, fontWeight: 700,
            color: activeTab === 'partners' ? '#04432C' : '#64748B',
            borderBottom: activeTab === 'partners' ? '3px solid #04432C' : '3px solid transparent',
            cursor: 'pointer', transition: 'all 0.2s',
            display: 'flex', alignItems: 'center', gap: 8
          }}
        >
          <Store size={16} />
          Hamkor dorixonalar
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
                    <div>
                      <label className="field-label">Ostsarlavha (Subtitle)</label>
                      <textarea className="input" rows={3} style={{ resize: 'vertical', padding: 12, lineHeight: 1.6 }} value={subtitleUz} onChange={(e) => setSubtitleUz(e.target.value)} />
                    </div>
                    <hr style={{ border: 'none', borderTop: '1px solid #E2E8F0', margin: '8px 0' }} />
                    <div>
                      <label className="field-label">Dorixonalar ro'yxati sarlavhasi (Partners)</label>
                      <input className="input" type="text" value={partnersUz} onChange={(e) => setPartnersUz(e.target.value)} />
                    </div>
                    <div>
                      <label className="field-label">Xarita: Bosh ofis sarlavhasi</label>
                      <input className="input" type="text" value={headOfficeUz} onChange={(e) => setHeadOfficeUz(e.target.value)} />
                    </div>
                    <div>
                      <label className="field-label">Xarita: Manzil nomi</label>
                      <input className="input" type="text" value={mapTitleUz} onChange={(e) => setMapTitleUz(e.target.value)} />
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
                    <div>
                      <label className="field-label">Подзаголовок (Subtitle)</label>
                      <textarea className="input" rows={3} style={{ resize: 'vertical', padding: 12, lineHeight: 1.6 }} value={subtitleRu} onChange={(e) => setSubtitleRu(e.target.value)} />
                    </div>
                    <hr style={{ border: 'none', borderTop: '1px solid #E2E8F0', margin: '8px 0' }} />
                    <div>
                      <label className="field-label">Заголовок аптек (Partners)</label>
                      <input className="input" type="text" value={partnersRu} onChange={(e) => setPartnersRu(e.target.value)} />
                    </div>
                    <div>
                      <label className="field-label">Карта: Заголовок офиса</label>
                      <input className="input" type="text" value={headOfficeRu} onChange={(e) => setHeadOfficeRu(e.target.value)} />
                    </div>
                    <div>
                      <label className="field-label">Карта: Адрес</label>
                      <input className="input" type="text" value={mapTitleRu} onChange={(e) => setMapTitleRu(e.target.value)} />
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
              <div style={{ background: 'white', borderRadius: 20, border: '1px solid #E2E8F0', overflow: 'hidden' }}>
                <div style={{ padding: '16px 24px', background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 13, fontWeight: 800, color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Hamkor dorixonalar ro'yxati</span>
                  <button type="button" onClick={handleOpenModal} className="btn btn-primary" style={{ padding: '6px 12px', fontSize: 12, gap: 4 }}>
                    <Plus size={14} /> Yangi qo'shish
                  </button>
                </div>
                <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {partnersListUz.map((partnerUz, i) => (
                    <div key={i} style={{ background: '#F8FAFC', padding: 20, borderRadius: 16, border: '1px solid #E2E8F0', position: 'relative' }}>
                      <div style={{ position: 'absolute', top: 16, right: 16, display: 'flex', gap: 8 }}>
                        <button disabled={i === 0} onClick={() => movePartner(i, 'up')} style={{ padding: 6, background: 'white', border: '1px solid #CBD5E1', borderRadius: 6, cursor: i === 0 ? 'not-allowed' : 'pointer', opacity: i === 0 ? 0.3 : 1 }}>
                          <ArrowUp size={14} />
                        </button>
                        <button disabled={i === partnersListUz.length - 1} onClick={() => movePartner(i, 'down')} style={{ padding: 6, background: 'white', border: '1px solid #CBD5E1', borderRadius: 6, cursor: i === partnersListUz.length - 1 ? 'not-allowed' : 'pointer', opacity: i === partnersListUz.length - 1 ? 0.3 : 1 }}>
                          <ArrowDown size={14} />
                        </button>
                        <button onClick={() => removePartner(i)} style={{ padding: 6, background: '#FEE2E2', border: '1px solid #FCA5A5', borderRadius: 6, cursor: 'pointer', color: '#EF4444' }}>
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                        <span style={{ fontSize: 11, fontWeight: 900, background: '#10B981', color: 'white', width: 22, height: 22, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {i + 1}
                        </span>
                        <span style={{ fontSize: 12, fontWeight: 800, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                          Dorixona kartasi
                        </span>
                      </div>

                      <div className="grid-2-cols-sm" style={{ marginBottom: 16 }}>
                        <div>
                          <label className="field-label">Nomi (Masalan: Oson Apteka)</label>
                          <input className="input" style={{ background: 'white' }} type="text" value={partnerUz.name} onChange={(e) => updatePartnerUz(i, 'name', e.target.value)} />
                        </div>
                        <div>
                          <label className="field-label">Название (Например: Oson Apteka)</label>
                          <input className="input" style={{ background: 'white' }} type="text" value={partnersListRu[i]?.name || ''} onChange={(e) => updatePartnerRu(i, 'name', e.target.value)} />
                        </div>
                      </div>

                      <div className="grid-2-cols-sm">
                        <div>
                          <label className="field-label">Shahar / Manzil (UZ)</label>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <MapPin size={16} color="#64748B" />
                            <input className="input" style={{ background: 'white', flex: 1 }} type="text" value={partnerUz.city} onChange={(e) => updatePartnerUz(i, 'city', e.target.value)} placeholder="Toshkent" />
                          </div>
                        </div>
                        <div>
                          <label className="field-label">Город / Адрес (RU)</label>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <MapPin size={16} color="#64748B" />
                            <input className="input" style={{ background: 'white', flex: 1 }} type="text" value={partnersListRu[i]?.city || ''} onChange={(e) => updatePartnerRu(i, 'city', e.target.value)} placeholder="Ташкент" />
                          </div>
                        </div>
                      </div>

                      {/* Logo Upload row */}
                      <div style={{ marginTop: 16 }}>
                        <label className="field-label">Hamkor Logosi (Ixtiyoriy)</label>
                        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                          <div style={{
                            width: 44, height: 44, borderRadius: 12, background: 'white',
                            border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            overflow: 'hidden', position: 'relative'
                          }}>
                            {partnerUz.logo ? (
                              <img src={partnerUz.logo} alt="logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                            ) : (
                              <Store size={20} color="#94A3B8" />
                            )}
                            {uploadingIndex === i && (
                              <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <div className="spinner" style={{ width: 16, height: 16, border: '2px solid #10B981', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                              </div>
                            )}
                          </div>
                          <div style={{ position: 'relative', overflow: 'hidden' }}>
                            <button type="button" className="btn" style={{ background: '#F1F5F9', color: '#475569', border: '1px solid #E2E8F0', padding: '8px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                              <ImageIcon size={16} /> Fayl tanlash
                            </button>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleFileUpload(i, e.target.files)}
                              style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {partnersListUz.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '32px 0', color: '#94A3B8', fontSize: 13 }}>Hech qanday dorixona qo'shilmagan</div>
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

      {/* Add Partner Modal */}
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
                <h3 style={{ fontSize: 18, fontWeight: 800, color: '#0F172A', margin: 0 }}>Yangi dorixona qo'shish</h3>
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
                    <label className="field-label">Nomi (UZ) <span style={{ color: '#EF4444' }}>*</span></label>
                    <input className="input" type="text" value={newPartnerUz.name} onChange={(e) => setNewPartnerUz(prev => ({ ...prev, name: e.target.value }))} placeholder="Masalan: Oson Apteka" autoFocus />
                  </div>
                  <div>
                    <label className="field-label">Название (RU)</label>
                    <input className="input" type="text" value={newPartnerRu.name} onChange={(e) => setNewPartnerRu(prev => ({ ...prev, name: e.target.value }))} placeholder="Например: Oson Apteka" />
                  </div>
                </div>

                <div className="grid-2-cols-sm">
                  <div>
                    <label className="field-label">Shahar / Manzil (UZ)</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <MapPin size={16} color="#64748B" />
                      <input className="input" style={{ flex: 1 }} type="text" value={newPartnerUz.city} onChange={(e) => setNewPartnerUz(prev => ({ ...prev, city: e.target.value }))} placeholder="Toshkent" />
                    </div>
                  </div>
                  <div>
                    <label className="field-label">Город / Адрес (RU)</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <MapPin size={16} color="#64748B" />
                      <input className="input" style={{ flex: 1 }} type="text" value={newPartnerRu.city} onChange={(e) => setNewPartnerRu(prev => ({ ...prev, city: e.target.value }))} placeholder="Ташкент" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="field-label">Hamkor Logosi</label>
                  <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                    <div style={{
                      width: 60, height: 60, borderRadius: 12, background: '#F8FAFC',
                      border: '2px dashed #CBD5E1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                      overflow: 'hidden', position: 'relative', flexShrink: 0
                    }}>
                      {newPartnerUz.logo ? (
                        <img src={newPartnerUz.logo} alt="logo" style={{ maxWidth: '80%', maxHeight: '80%', objectFit: 'contain' }} />
                      ) : (
                        <Store color="#94A3B8" size={24} />
                      )}
                      {uploadingIndex === -1 && (
                        <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <div className="spinner" style={{ width: 20, height: 20, border: '2px solid #10B981', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                        </div>
                      )}
                    </div>
                    
                    <div style={{ flex: 1 }}>
                      <div style={{ position: 'relative', overflow: 'hidden', display: 'inline-block', marginBottom: 8 }}>
                        <button type="button" className="btn" style={{ background: '#ECFDF5', color: '#10B981', border: 'none', padding: '8px 16px', borderRadius: 8, fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
                          <ImageIcon size={16} /> Kompyuterdan rasm yuklash
                        </button>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(-1, e.target.files)}
                          style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }}
                        />
                      </div>
                      <p style={{ fontSize: 11, color: '#64748B', margin: 0 }}>
                        PNG yoki SVG format. Ixtiyoriy.
                      </p>
                    </div>
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
                  onClick={submitNewPartner}
                  disabled={!newPartnerUz.name.trim() || uploadingIndex === -1}
                  style={{
                    padding: '10px 24px', borderRadius: 10, background: (!newPartnerUz.name.trim() || uploadingIndex === -1) ? '#94A3B8' : '#04432C', border: 'none',
                    color: 'white', fontSize: 14, fontWeight: 600, cursor: (!newPartnerUz.name.trim() || uploadingIndex === -1) ? 'not-allowed' : 'pointer',
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
