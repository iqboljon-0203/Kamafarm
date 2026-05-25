'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Award, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const certificates = [
  {
    id: 'gmp',
    title: 'GMP Certificate',
    issuer: 'Good Manufacturing Practice',
    color: '#04432C',
    textColor: 'white',
    image: '/certificate-gmp.png',
  },
  {
    id: 'iso',
    title: 'ISO 9001:2015',
    issuer: 'Quality Management System',
    color: '#F0FDF4',
    textColor: '#04432C',
    image: '/certificate-gmp.png',
  },
  {
    id: 'halal',
    title: 'Halol Sertifikat',
    issuer: "O'zbekiston Halol markazi",
    color: '#FEF9C3',
    textColor: '#713F12',
    image: '/certificate-gmp.png',
  },
  {
    id: 'moh',
    title: 'MOH Litsenziya',
    issuer: "O'zbekiston SSV",
    color: '#EFF6FF',
    textColor: '#1D4ED8',
    image: '/certificate-gmp.png',
  },
  {
    id: 'fssai',
    title: 'FSSAI Approved',
    issuer: 'India Food Safety',
    color: '#FFF7ED',
    textColor: '#C2410C',
    image: '/certificate-gmp.png',
  },
  {
    id: 'who',
    title: 'WHO-GMP',
    issuer: 'World Health Organization',
    color: '#F5F3FF',
    textColor: '#6D28D9',
    image: '/certificate-gmp.png',
  },
];

// Duplicate for infinite scroll effect
const allCerts = [...certificates, ...certificates];

export default function CertificatesSection() {
  const { t } = useLanguage();

  return (
    <section id="certificates" className="section-py" style={{ background: 'white', overflow: 'hidden' }}>
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <span className="section-label" style={{ display: 'block', marginBottom: 16 }}>
            {t.certificates.sectionLabel}
          </span>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
            fontWeight: 900, letterSpacing: '-0.03em',
            color: '#0F172A', marginBottom: 16,
          }}>
            {t.certificates.heading}
          </h2>
          <p style={{ fontSize: 15, color: '#64748B', maxWidth: 480, margin: '0 auto' }}>
            {t.certificates.subtitle}
          </p>
        </motion.div>

        {/* Infinite Carousel */}
        <div style={{ position: 'relative', marginBottom: 64 }}>
          {/* Fade edges */}
          <div style={{
            position: 'absolute', left: 0, top: 0, bottom: 0, width: 120, zIndex: 2,
            background: 'linear-gradient(90deg, white, transparent)',
            pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', right: 0, top: 0, bottom: 0, width: 120, zIndex: 2,
            background: 'linear-gradient(-90deg, white, transparent)',
            pointerEvents: 'none',
          }} />

          {/* Scrolling track */}
          <div style={{ overflow: 'hidden' }}>
            <div className="scroll-left" style={{ display: 'flex', gap: 20, width: 'max-content' }}>
              {allCerts.map((cert, i) => (
                <div
                  key={`${cert.id}-${i}`}
                  style={{
                    width: 260,
                    background: cert.color,
                    border: `1px solid ${cert.color === 'white' ? '#E2E8F0' : cert.color}`,
                    borderRadius: 16,
                    padding: '24px 20px',
                    display: 'flex', flexDirection: 'column', gap: 12,
                    flexShrink: 0,
                    boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                  }}
                >
                  <div style={{
                    width: 44, height: 44, borderRadius: 12,
                    background: cert.id === 'gmp' ? 'rgba(255,255,255,0.15)' : 'rgba(4,67,44,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Award size={22} color={cert.textColor} strokeWidth={2} />
                  </div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 800, color: cert.textColor, letterSpacing: '-0.02em', marginBottom: 4 }}>
                      {cert.title}
                    </div>
                    <div style={{ fontSize: 12, color: cert.textColor, opacity: 0.65, fontWeight: 500 }}>
                      {cert.issuer}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <CheckCircle2 size={14} color={cert.id === 'gmp' ? '#34D399' : '#10B981'} strokeWidth={2.5} />
                    <span style={{ fontSize: 11, fontWeight: 600, color: cert.textColor, opacity: 0.7 }}>Verified</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom trust row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 24,
          padding: '32px',
          background: 'linear-gradient(135deg, #F0FDF4 0%, #ECFDF5 100%)',
          borderRadius: 20,
          border: '1px solid rgba(16,185,129,0.1)',
        }}
        className="trust-grid"
        >
          {[
            { label: '100%', sublabel: 'Sertifikatlangan' },
            { label: 'GMP+', sublabel: 'Sifat standarti' },
            { label: 'Halol', sublabel: 'Tasdiqlangan' },
            { label: '5 yil', sublabel: 'Tajriba' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{ textAlign: 'center' }}
            >
              <div style={{
                fontSize: '1.8rem', fontWeight: 900,
                color: '#04432C', letterSpacing: '-0.03em', marginBottom: 4,
              }}>
                {item.label}
              </div>
              <div style={{ fontSize: 12, color: '#64748B', fontWeight: 500 }}>{item.sublabel}</div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .trust-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
