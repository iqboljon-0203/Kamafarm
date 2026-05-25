'use client';
import { motion } from 'framer-motion';
import { Target, Globe, Award } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const statIcons = [Award, Globe, Target];

export default function MissionSection() {
  const { t } = useLanguage();

  return (
    <section
      id="mission"
      style={{
        position: 'relative',
        background: '#04432C',
        overflow: 'hidden',
        padding: '96px 0',
      }}
    >
      {/* Background pattern */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `radial-gradient(circle at 20% 50%, rgba(52,211,153,0.08) 0%, transparent 50%),
                          radial-gradient(circle at 80% 20%, rgba(16,185,129,0.06) 0%, transparent 50%)`,
        pointerEvents: 'none',
      }} />

      {/* Grid pattern overlay */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.05,
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{ marginBottom: 24 }}
          >
            <span style={{
              display: 'inline-block',
              padding: '6px 16px',
              background: 'rgba(52,211,153,0.15)',
              border: '1px solid rgba(52,211,153,0.25)',
              borderRadius: 100,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#34D399',
            }}>
              {t.mission.label}
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
              fontWeight: 900,
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              marginBottom: 32,
            }}
          >
             <span style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #34D399 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                {t.mission.heading}
              </span>
          </motion.h2>

          {/* Body text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontSize: 17,
              lineHeight: 1.8,
              color: 'rgba(255,255,255,0.8)',
              marginBottom: 64,
            }}
          >
            {t.mission.text}
          </motion.p>

          {/* Divider */}
          <div style={{
            width: 60, height: 3,
            background: 'linear-gradient(90deg, #10B981, #34D399)',
            borderRadius: 2,
            margin: '0 auto 64px',
          }} />

          {/* Stats row */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 24,
          }}
          className="mission-stats"
          >
            {t.mission.stats.map((stat, i) => {
              const Icon = statIcons[i];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(52,211,153,0.1)' }}
                  style={{
                    padding: '40px 24px',
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', gap: 16,
                    background: 'rgba(255,255,255,0.02)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: 24,
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {/* Glowing blob inside card */}
                  <div style={{
                    position: 'absolute', top: -20, left: '50%', transform: 'translateX(-50%)',
                    width: 120, height: 120, background: 'radial-gradient(circle, rgba(52,211,153,0.15) 0%, transparent 70%)',
                    pointerEvents: 'none'
                  }} />

                  <div style={{
                    width: 56, height: 56, borderRadius: 16,
                    background: 'linear-gradient(135deg, rgba(52,211,153,0.15), rgba(16,185,129,0.05))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: '1px solid rgba(52,211,153,0.2)',
                    marginBottom: 8,
                    boxShadow: '0 8px 16px rgba(52,211,153,0.1)'
                  }}>
                    <Icon size={26} color="#34D399" strokeWidth={2} />
                  </div>
                  <div style={{
                    fontSize: '2.5rem', fontWeight: 900,
                    color: 'white', letterSpacing: '-0.04em', lineHeight: 1,
                  }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', fontWeight: 500, letterSpacing: '0.02em' }}>
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .mission-stats { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
