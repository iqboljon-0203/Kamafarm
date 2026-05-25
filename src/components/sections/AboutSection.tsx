'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Shield, Leaf, Handshake, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const valueIcons = [Shield, Leaf, Handshake];

function AnimatedCounter({ value, suffix = '' }: { value: string; suffix?: string }) {
  return (
    <motion.div
      className="stat-number"
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, type: 'spring', bounce: 0.4 }}
    >
      {value}
    </motion.div>
  );
}

export default function AboutSection() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="section-py" style={{ background: 'white' }}>
      <div className="container">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <span className="section-label">{t.about.sectionLabel}</span>
        </motion.div>

        {/* Main grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 80,
          alignItems: 'center',
          marginBottom: 80,
        }}
        className="about-grid"
        >
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 style={{
              fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
              fontWeight: 900,
              letterSpacing: '-0.03em',
              color: '#0F172A',
              lineHeight: 1.15,
              marginBottom: 24,
            }}>
              {t.about.heading}
            </h2>
            <p style={{
              fontSize: 15,
              lineHeight: 1.8,
              color: '#475569',
              marginBottom: 32,
            }}>
              {t.about.description}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {['GMP sertifikatlangan', 'O\'zbek-Hindiston hamkorligi', 'Farmatsevt mutaxassislar jamoasi'].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <CheckCircle2 size={18} color="#10B981" strokeWidth={2.5} />
                  <span style={{ fontSize: 14, color: '#374151', fontWeight: 500 }}>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 20 }}>
            {t.about.stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                style={{
                  padding: '28px 32px',
                  background: i === 0 ? '#04432C' : i === 1 ? '#F0FDF4' : '#F8FAFC',
                  borderRadius: 20,
                  border: `1px solid ${i === 0 ? '#065a3b' : '#E2E8F0'}`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 24,
                }}
              >
                <div style={{
                  fontSize: '2.5rem',
                  fontWeight: 900,
                  letterSpacing: '-0.04em',
                  color: i === 0 ? '#34D399' : '#04432C',
                  lineHeight: 1,
                  minWidth: 100,
                }}>
                  {stat.value}
                </div>
                <div style={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: i === 0 ? 'rgba(255,255,255,0.9)' : '#374151',
                }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Values Cards */}
        <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, #E2E8F0, transparent)', marginBottom: 64 }} />
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 24,
        }}
        className="values-grid"
        >
          {t.about.values.map((value, i) => {
            const Icon = valueIcons[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                style={{ 
                  position: 'relative',
                  padding: '36px 32px',
                  background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
                  borderRadius: 24,
                  border: '1px solid rgba(16, 185, 129, 0.15)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.02)',
                  overflow: 'hidden',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(16, 185, 129, 0.12)';
                  e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.4)';
                  const iconBg = e.currentTarget.querySelector('.icon-bg') as HTMLElement;
                  if (iconBg) iconBg.style.transform = 'scale(1.15) rotate(5deg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.02)';
                  e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.15)';
                  const iconBg = e.currentTarget.querySelector('.icon-bg') as HTMLElement;
                  if (iconBg) iconBg.style.transform = 'scale(1) rotate(0deg)';
                }}
              >
                {/* Decorative background blur */}
                <div style={{
                  position: 'absolute', top: -40, right: -40,
                  width: 120, height: 120, borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)',
                  pointerEvents: 'none'
                }} />

                <div 
                  className="icon-bg"
                  style={{
                  width: 56, height: 56,
                  borderRadius: 16,
                  background: 'linear-gradient(135deg, #04432C 0%, #10B981 100%)',
                  boxShadow: '0 8px 20px rgba(16, 185, 129, 0.25)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 24,
                  transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                }}>
                  <Icon size={26} color="white" strokeWidth={2} />
                </div>
                <h3 style={{
                  fontSize: 18, fontWeight: 800, color: '#0F172A',
                  marginBottom: 12, letterSpacing: '-0.02em',
                }}>
                  {value.title}
                </h3>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: '#475569', fontWeight: 500 }}>
                  {value.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .values-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
