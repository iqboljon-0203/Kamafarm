'use client';
import { motion } from 'framer-motion';
import { MapPin, Store } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const partners = [
  { id: 1, name: 'Grand Pharm', city: 'Toshkent' },
  { id: 2, name: 'Oson Apteka', city: "O'zbekiston" },
  { id: 3, name: 'MedLine', city: 'Samarqand' },
  { id: 4, name: 'PharmExpo', city: 'Namangan' },
  { id: 5, name: 'Baraka Apteka', city: 'Buxoro' },
  { id: 6, name: 'Vita Plus', city: 'Andijon' },
  { id: 7, name: 'HealthZone', city: 'Farg\'ona' },
  { id: 8, name: 'NatureMed', city: 'Qarshi' },
];

export default function DistributionSection() {
  const { t } = useLanguage();

  return (
    <section id="distribution" className="section-py" style={{ background: '#F8FAFC' }}>
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <span className="section-label" style={{ display: 'block', marginBottom: 16 }}>
            {t.distribution.sectionLabel}
          </span>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
            fontWeight: 900, letterSpacing: '-0.03em',
            color: '#0F172A', marginBottom: 16,
          }}>
            {t.distribution.heading}
          </h2>
          <p style={{ fontSize: 15, color: '#64748B', maxWidth: 480, margin: '0 auto' }}>
            {t.distribution.subtitle}
          </p>
        </motion.div>

        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 48, alignItems: 'start',
        }} className="distribution-grid">
          {/* Left: Partner logos */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 style={{
              fontSize: 15, fontWeight: 700, color: '#0F172A',
              marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <Store size={18} color="#10B981" />
              {t.distribution.partners}
            </h3>
            <div className="partner-grid" style={{
              display: 'grid',
              gap: 16,
            }}>
              {partners.map((partner, i) => (
                <motion.div
                  key={partner.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.02, y: -4, boxShadow: '0 12px 24px rgba(4,67,44,0.08)' }}
                  style={{ 
                    display: 'flex', alignItems: 'center', gap: 16,
                    padding: '16px', background: 'white',
                    borderRadius: 16, border: '1px solid #E2E8F0',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
                    cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  <div style={{
                    width: 44, height: 44, borderRadius: 12,
                    background: 'linear-gradient(135deg, rgba(16,185,129,0.1), rgba(4,67,44,0.05))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Store size={20} color="#04432C" strokeWidth={2} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 14, color: '#0F172A', marginBottom: 2 }}>
                      {partner.name}
                    </div>
                    <div style={{ fontSize: 12, color: '#64748B', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <MapPin size={12} color="#10B981" />
                      {partner.city}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Google Maps */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div style={{
              borderRadius: 24, overflow: 'hidden',
              border: '1px solid #E2E8F0',
              boxShadow: '0 20px 40px rgba(4,67,44,0.08)',
              background: 'white'
            }}>
              {/* Map header */}
              <div style={{
                padding: '20px 24px',
                background: 'linear-gradient(135deg, #04432C 0%, #065a3b 100%)',
                display: 'flex', alignItems: 'center', gap: 16,
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: 'rgba(255,255,255,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <MapPin size={22} color="#34D399" />
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 800, color: 'white', marginBottom: 2 }}>
                    Bosh ofis — {t.distribution.mapTitle}
                  </div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>
                    г. Самарканд, ул. Зарафшон, мсг Казиарик
                  </div>
                </div>
              </div>
              {/* Google Maps embed */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48239.58009823485!2d66.9182!3d39.6542!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f4d19e0b6b6b6b7%3A0x0!2sSamarkand!5e0!3m2!1sen!2suz!4v1685000000000!5m2!1sen!2suz"
                width="100%"
                height="320"
                style={{ border: 0, display: 'block' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Kamafarm Healthcare Location"
                className="map-iframe"
              />
              {/* Map footer */}
              <div className="map-footer" style={{
                padding: '14px 20px', background: 'white',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <div className="map-phones" style={{ display: 'flex', gap: 16 }}>
                  <div style={{ fontSize: 12, color: '#64748B' }}>
                    📞 <strong>+998 (90) 603-14-28</strong>
                  </div>
                  <div style={{ fontSize: 12, color: '#64748B' }}>
                    📞 <strong>+998 (93) 720-55-56</strong>
                  </div>
                </div>
                <a
                  href="https://maps.google.com/?q=Samarkand,Zarafshon"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: 12, fontWeight: 600, color: '#10B981',
                    textDecoration: 'none',
                  }}
                >
                  Yo'nalish →
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .partner-grid { grid-template-columns: repeat(2, 1fr); }
        @media (max-width: 768px) {
          .distribution-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .partner-grid { grid-template-columns: 1fr !important; }
          .map-footer { flex-direction: column; align-items: flex-start !important; gap: 12px; }
          .map-phones { flex-direction: column; gap: 8px !important; }
        }
      `}</style>
    </section>
  );
}
