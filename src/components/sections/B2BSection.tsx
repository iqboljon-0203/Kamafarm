'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Truck, Megaphone, Star, Send, Loader2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { IMaskInput } from 'react-imask';
import toast from 'react-hot-toast';

const benefitIcons = [Package, Truck, Megaphone, Star];

export default function B2BSection() {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: '', company: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'b2b_form' }),
      });
      if (res.ok) {
        toast.success(t.b2b.form.successMsg, { duration: 4000 });
        setForm({ name: '', company: '', phone: '' });
      } else {
        toast.error(t.b2b.form.errorMsg);
      }
    } catch {
      toast.error(t.b2b.form.errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="b2b" className="section-py" style={{ background: '#F8FAFC' }}>
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <span className="section-label" style={{ display: 'block', marginBottom: 16 }}>
            {t.b2b.sectionLabel}
          </span>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
            fontWeight: 900, letterSpacing: '-0.03em', color: '#0F172A', marginBottom: 16,
          }}>
            {t.b2b.heading}
          </h2>
          <p style={{ fontSize: 15, color: '#64748B', maxWidth: 480, margin: '0 auto' }}>
            {t.b2b.subtitle}
          </p>
        </motion.div>

        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 48, alignItems: 'start',
        }} className="b2b-grid">
          {/* Left: Benefits */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {t.b2b.benefits.map((benefit, i) => {
                const Icon = benefitIcons[i];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    style={{
                      display: 'flex', gap: 16,
                      padding: 24, background: 'white',
                      borderRadius: 16, border: '1px solid #E2E8F0',
                      boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                      transition: 'all 0.2s ease',
                    }}
                    whileHover={{ boxShadow: '0 8px 24px rgba(0,0,0,0.08)', y: -2 } as Parameters<typeof motion.div>[0]['whileHover']}
                  >
                    <div style={{
                      width: 48, height: 48, borderRadius: 14, flexShrink: 0,
                      background: 'linear-gradient(135deg, #04432C 0%, #10B981 100%)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Icon size={22} color="white" strokeWidth={2} />
                    </div>
                    <div>
                      <h3 style={{
                        fontSize: 15, fontWeight: 700, color: '#0F172A',
                        letterSpacing: '-0.01em', marginBottom: 6,
                      }}>
                        {benefit.title}
                      </h3>
                      <p style={{ fontSize: 13, lineHeight: 1.6, color: '#64748B' }}>
                        {benefit.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div style={{
              background: 'white', borderRadius: 24,
              border: '1px solid #E2E8F0',
              padding: '40px',
              boxShadow: '0 8px 40px rgba(0,0,0,0.06)',
              position: 'sticky', top: 100,
            }}>
              <div style={{ marginBottom: 32 }}>
                <h3 style={{
                  fontSize: 20, fontWeight: 800, color: '#0F172A',
                  letterSpacing: '-0.02em', marginBottom: 8,
                }}>
                  {t.b2b.form.heading}
                </h3>
                <div style={{ width: 40, height: 3, background: '#10B981', borderRadius: 2 }} />
              </div>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 8, letterSpacing: '0.02em' }}>
                    Ism *
                  </label>
                  <input
                    className="input"
                    type="text"
                    placeholder={t.b2b.form.namePlaceholder}
                    value={form.name}
                    onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 8, letterSpacing: '0.02em' }}>
                    Kompaniya
                  </label>
                  <input
                    className="input"
                    type="text"
                    placeholder={t.b2b.form.companyPlaceholder}
                    value={form.company}
                    onChange={(e) => setForm((prev) => ({ ...prev, company: e.target.value }))}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 8, letterSpacing: '0.02em' }}>
                    Telefon *
                  </label>
                  <IMaskInput
                    mask="+{998} (00) 000-00-00"
                    className="input"
                    placeholder="+998 (__) ___-__-__"
                    value={form.phone}
                    unmask={true}
                    onAccept={(value) => setForm((prev) => ({ ...prev, phone: value }))}
                    required
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary"
                  style={{ marginTop: 8, padding: '14px 24px', fontSize: 14, justifyContent: 'center' }}
                  whileHover={!loading ? { scale: 1.02 } : {}}
                  whileTap={!loading ? { scale: 0.98 } : {}}
                >
                  {loading ? (
                    <>
                      <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
                      Yuborilmoqda...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      {t.b2b.form.submitBtn}
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @media (max-width: 768px) {
          .b2b-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
