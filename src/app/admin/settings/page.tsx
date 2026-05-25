'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, CheckCircle2, Settings, Phone, MapPin } from 'lucide-react';

interface SettingField {
  key: string;
  label: string;
  icon: React.ElementType;
  value: string;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<SettingField[]>([
    { key: 'phone1', label: 'Asosiy telefon', icon: Phone, value: '' },
    { key: 'phone2', label: 'Qo\'shimcha telefon', icon: Phone, value: '' },
    { key: 'address', label: 'Manzil', icon: MapPin, value: '' },
    { key: 'telegram_bot', label: 'Telegram Bot havolasi', icon: Settings, value: '' },
    { key: 'instagram', label: 'Instagram havolasi', icon: Settings, value: '' },
  ]);

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
        setSettings((prev) => prev.map((s) => ({
          ...s,
          value: data.settings[s.key] || s.value
        })));
      }
    } catch (e) {
      console.error('Error fetching settings:', e);
    }
  };

  const getToken = () => localStorage.getItem('kamafarm_admin_token') || 'kamafarm-admin-2026';

  const updateSetting = (key: string, value: string) => {
    setSettings((prev) => prev.map((s) => s.key === key ? { ...s, value } : s));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Save each setting sequentially or Promise.all
      await Promise.all(settings.map((s) => 
        fetch('/api/settings', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getToken()}` },
          body: JSON.stringify({ key: s.key, value: s.value })
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
          Saytdagi aloqa ma'lumotlarini dasturcisiz o'zgartiring
        </p>
      </div>

      <div style={{ maxWidth: 640 }}>
        {/* Settings form */}
        <div style={{
          background: 'white', borderRadius: 20, border: '1px solid #E2E8F0',
          boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
          overflow: 'hidden', marginBottom: 24,
        }}>
          {/* Form header */}
          <div style={{
            padding: '20px 28px', background: '#F8FAFC',
            borderBottom: '1px solid #E2E8F0',
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <Settings size={18} color="#04432C" />
            <span style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>Kontakt ma'lumotlari</span>
          </div>

          {/* Fields */}
          <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 20 }}>
            {settings.map((setting, i) => {
              const Icon = setting.icon;
              return (
                <motion.div
                  key={setting.key}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <label style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    fontSize: 12, fontWeight: 700, color: '#374151',
                    marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.04em',
                  }}>
                    <Icon size={14} color="#64748B" />
                    {setting.label}
                  </label>
                  <input
                    className="input"
                    type="text"
                    value={setting.value}
                    onChange={(e) => updateSetting(setting.key, e.target.value)}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Save button */}
        <motion.button
          onClick={handleSave}
          disabled={loading}
          className={`btn ${saved ? '' : 'btn-primary'}`}
          style={{
            width: '100%', justifyContent: 'center',
            padding: '14px', fontSize: 14,
            background: saved ? '#10B981' : undefined,
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

        {/* Info box */}
        <div style={{
          marginTop: 24, padding: '16px 20px',
          background: 'rgba(4,67,44,0.04)',
          border: '1px solid rgba(4,67,44,0.1)',
          borderRadius: 12, fontSize: 13, color: '#475569', lineHeight: 1.6,
        }}>
          💡 <strong>Eslatma:</strong> Manzil va telefon raqamlarini o'zgartirganingizda, ular saytning Header va Footer qismlarida yangilanishi uchun biroz kutishingiz kerak bo'lishi mumkin.
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
