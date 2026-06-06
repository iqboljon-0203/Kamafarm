'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, CheckCircle2, Globe, Trash2, Plus, ArrowUp, ArrowDown, Image as ImageIcon, X } from 'lucide-react';

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

export default function PartnersSettingsPage() {
  const [values, setValues] = useState<Record<string, string>>({
    partners_heading_uz: '',
    partners_heading_ru: '',
  });

  const [partnersList, setPartnersList] = useState<PartnerItem[]>([]);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPartner, setNewPartner] = useState<PartnerItem>({ name: '', logo: '' });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings');
      const data = await res.json();
      if (data.settings) {
        setValues({
          partners_heading_uz: data.settings.partners_heading_uz || '',
          partners_heading_ru: data.settings.partners_heading_ru || '',
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
            setPartnersList(DEFAULT_PARTNERS);
          }
        } else {
          setPartnersList(DEFAULT_PARTNERS);
        }
      }
    } catch (e) {
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
        if (index === -1) {
          setNewPartner(prev => ({ ...prev, logo: data.url }));
        } else {
          updatePartner(index, { logo: data.url });
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

  const handleOpenModal = () => {
    setNewPartner({ name: '', logo: '' });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const submitNewPartner = () => {
    if (!newPartner.name.trim()) {
      alert('Kompaniya nomini kiriting!');
      return;
    }
    setPartnersList((prev) => [newPartner, ...prev]);
    setIsModalOpen(false);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const deletePartner = async (index: number) => {
    if (confirm('Rostdan ham ushbu hamkorni o\'chirmoqchimisiz?')) {
      const partnerToDelete = partnersList[index];
      setPartnersList((prev) => prev.filter((_, i) => i !== index));
      
      if (partnerToDelete?.logo && partnerToDelete.logo.includes('supabase.co')) {
        try {
          await fetch(`/api/delete-file?url=${encodeURIComponent(partnerToDelete.logo)}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${getToken()}` }
          });
        } catch (e) {
          console.error('Failed to delete partner logo from storage', e);
        }
      }
    }
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
    <div style={{ padding: 32, position: 'relative' }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 24, fontWeight: 900, color: '#0F172A', letterSpacing: '-0.02em', marginBottom: 6 }}>
          Hamkor logolari
        </h1>
        <p style={{ fontSize: 14, color: '#64748B' }}>
          Saytdagi hamkorlar bo'limi (Marquee) va ro'yxatini tahrirlang
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
                placeholder="Партнерские организации, оказавшие нам доверие" 
              />
            </div>
          </div>
        </div>

        {/* Partners Array Editor */}
        <div style={{
          background: 'white', borderRadius: 20, border: '1px solid #E2E8F0',
          boxShadow: '0 1px 4px rgba(0,0,0,0.04)', overflow: 'hidden', maxWidth: 800
        }}>
          <div style={{
            padding: '20px 24px', background: '#F8FAFC', borderBottom: '1px solid #E2E8F0',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center'
          }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>Hamkorlar Ro'yxati</span>
            <button 
              type="button"
              onClick={handleOpenModal}
              style={{
                display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600,
                color: '#10B981', background: '#ECFDF5', padding: '8px 16px', borderRadius: 8,
                border: 'none', cursor: 'pointer'
              }}
            >
              <Plus size={16} /> Qo'shish
            </button>
          </div>

          <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
            {partnersList.map((partner, index) => (
              <div key={index} style={{
                display: 'flex', gap: 16, alignItems: 'flex-start',
                padding: 16, border: '1px solid #E2E8F0', borderRadius: 12,
                background: '#F8FAFC'
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 4 }}>
                  <button type="button" onClick={() => movePartner(index, 'up')} disabled={index === 0} style={{ border: 'none', background: 'none', cursor: index === 0 ? 'default' : 'pointer', color: index === 0 ? '#CBD5E1' : '#64748B' }}><ArrowUp size={16}/></button>
                  <button type="button" onClick={() => movePartner(index, 'down')} disabled={index === partnersList.length - 1} style={{ border: 'none', background: 'none', cursor: index === partnersList.length - 1 ? 'default' : 'pointer', color: index === partnersList.length - 1 ? '#CBD5E1' : '#64748B' }}><ArrowDown size={16}/></button>
                </div>
                
                <div style={{
                  width: 100, height: 100, borderRadius: 12, background: 'white',
                  border: '2px dashed #CBD5E1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  overflow: 'hidden', position: 'relative', cursor: 'pointer', flexShrink: 0
                }}>
                  {partner.logo ? (
                    <img src={partner.logo} alt="logo" style={{ maxWidth: '80%', maxHeight: '80%', objectFit: 'contain' }} />
                  ) : (
                    <>
                      <ImageIcon color="#94A3B8" size={28} />
                      <span style={{ fontSize: 10, color: '#64748B', marginTop: 4, textAlign: 'center', padding: '0 4px' }}>Rasm yuklash</span>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(index, e.target.files)}
                    title="Kompyuterdan rasm yuklash"
                    style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }}
                  />
                  {uploadingIndex === index && (
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div className="spinner" style={{ width: 20, height: 20, border: '2px solid #10B981', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                    </div>
                  )}
                  {partner.logo && uploadingIndex !== index && (
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', opacity: 0, transition: 'opacity 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 11, fontWeight: 600, pointerEvents: 'none' }}
                         onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                         onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}
                    >
                      O'zgartirish
                    </div>
                  )}
                </div>

                <div style={{ flex: 1, display: 'grid', gap: 12 }}>
                  <div>
                    <label className="field-label" style={{ fontSize: 11 }}>Kompaniya Nomi</label>
                    <input className="input" type="text" value={partner.name} onChange={(e) => updatePartner(index, { name: e.target.value })} />
                  </div>
                  <div>
                    <label className="field-label" style={{ fontSize: 11 }}>Logo URL yoki fayl nomi (ixtiyoriy)</label>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <input className="input" type="text" value={partner.logo} onChange={(e) => updatePartner(index, { logo: e.target.value })} placeholder="/logos/..." style={{ flex: 1 }} />
                      <div style={{ position: 'relative', overflow: 'hidden' }}>
                        <button type="button" className="btn" style={{ background: '#F1F5F9', color: '#475569', border: '1px solid #E2E8F0', padding: '0 16px', height: '100%', borderRadius: 8, fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                          <ImageIcon size={16} /> Fayl tanlash
                        </button>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(index, e.target.files)}
                          style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <button 
                  type="button"
                  onClick={() => deletePartner(index)}
                  style={{ background: '#FEF2F2', border: 'none', color: '#EF4444', padding: 8, borderRadius: 8, cursor: 'pointer', marginTop: 22 }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            
            {partnersList.length === 0 && (
              <div style={{ textAlign: 'center', padding: '40px 0', color: '#94A3B8', fontSize: 14 }}>
                Hozircha hamkorlar ro'yxati bo'sh
              </div>
            )}
          </div>
        </div>

        {/* Save Button */}
        <div style={{ position: 'sticky', bottom: 24, zIndex: 10, display: 'flex', justifyContent: 'flex-end', marginTop: 32, maxWidth: 800 }}>
          <button 
            type="button"
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
                background: 'white', borderRadius: 24, width: '100%', maxWidth: 480,
                position: 'relative', zIndex: 1, overflow: 'hidden',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
              }}
            >
              <div style={{
                padding: '20px 24px', borderBottom: '1px solid #E2E8F0',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between'
              }}>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: '#0F172A', margin: 0 }}>Yangi hamkor qo'shish</h3>
                <button
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
                <div>
                  <label className="field-label">Kompaniya Nomi <span style={{ color: '#EF4444' }}>*</span></label>
                  <input 
                    className="input" 
                    type="text" 
                    value={newPartner.name} 
                    onChange={(e) => setNewPartner(prev => ({ ...prev, name: e.target.value }))} 
                    placeholder="Masalan: Kamafarm" 
                    autoFocus
                  />
                </div>

                <div>
                  <label className="field-label">Hamkor Logosi</label>
                  
                  <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                    <div style={{
                      width: 80, height: 80, borderRadius: 12, background: '#F8FAFC',
                      border: '2px dashed #CBD5E1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                      overflow: 'hidden', position: 'relative', flexShrink: 0
                    }}>
                      {newPartner.logo ? (
                        <img src={newPartner.logo} alt="logo" style={{ maxWidth: '80%', maxHeight: '80%', objectFit: 'contain' }} />
                      ) : (
                        <ImageIcon color="#94A3B8" size={24} />
                      )}
                      {uploadingIndex === -1 && (
                        <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <div className="spinner" style={{ width: 20, height: 20, border: '2px solid #10B981', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                        </div>
                      )}
                    </div>
                    
                    <div style={{ flex: 1 }}>
                      <div style={{ position: 'relative', overflow: 'hidden', display: 'inline-block', marginBottom: 8 }}>
                        <button type="button" className="btn" style={{ background: '#ECFDF5', color: '#10B981', border: 'none', padding: '10px 16px', borderRadius: 8, fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
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
                        PNG yoki SVG format tavsiya etiladi. Transparent fonli.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ padding: '16px 24px', background: '#F8FAFC', borderTop: '1px solid #E2E8F0', display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
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
                  disabled={!newPartner.name.trim() || uploadingIndex === -1}
                  style={{
                    padding: '10px 24px', borderRadius: 10, background: (!newPartner.name.trim() || uploadingIndex === -1) ? '#94A3B8' : '#04432C', border: 'none',
                    color: 'white', fontSize: 14, fontWeight: 600, cursor: (!newPartner.name.trim() || uploadingIndex === -1) ? 'not-allowed' : 'pointer',
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
    </div>
  );
}
