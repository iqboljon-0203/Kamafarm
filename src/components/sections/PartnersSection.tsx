'use client';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export default function PartnersSection() {
  const { t } = useLanguage();
  const partnersList = t.partners.list || [];

  return (
    <section style={{ 
      padding: '45px 0', 
      background: 'white',
      borderBottom: '1px solid #F1F5F9',
      overflow: 'hidden'
    }}>
      <div className="container" style={{ marginBottom: 28, textAlign: 'center' }}>
        <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#94A3B8' }}>
          {t.partners.heading}
        </p>
      </div>

      {/* Infinite Marquee Container */}
      {partnersList.length > 0 && (
        <div style={{
          position: 'relative',
          display: 'flex',
          overflow: 'hidden',
          width: '100%',
          background: 'white',
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          alignItems: 'center'
        }}>
          <motion.div
            animate={{ x: [0, -1200] }}
            transition={{
              repeat: Infinity,
              ease: 'linear',
              duration: 25
            }}
            style={{
              display: 'flex',
              gap: 60,
              paddingLeft: 60,
              whiteSpace: 'nowrap',
              alignItems: 'center'
            }}
          >
            {[...partnersList, ...partnersList].map((partner, i) => {
              return (
                <div key={i} style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'transparent',
                  minWidth: 140,
                  gap: 12,
                  position: 'relative',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  const img = e.currentTarget.querySelector('img');
                  const span = e.currentTarget.querySelector('span');
                  if (img) {
                    img.style.transform = 'scale(1.05)';
                  }
                  if (span) {
                    span.style.color = '#04432C';
                  }
                }}
                onMouseLeave={(e) => {
                  const img = e.currentTarget.querySelector('img');
                  const span = e.currentTarget.querySelector('span');
                  if (img) {
                    img.style.transform = 'scale(1)';
                  }
                  if (span) {
                    span.style.color = '#64748B';
                  }
                }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={partner.logo || '/logos/grand-pharm.svg'}
                    alt={partner.name}
                    style={{
                      height: 48,
                      maxWidth: 160,
                      width: 'auto',
                      objectFit: 'contain',
                      transition: 'all 0.3s ease'
                    }}
                  />
                  <span style={{ 
                    fontSize: 13, 
                    fontWeight: 600, 
                    color: '#64748B', 
                    whiteSpace: 'nowrap',
                    transition: 'color 0.3s ease'
                  }}>
                    {partner.name}
                  </span>
                </div>
              );
            })}
          </motion.div>
        </div>
      )}
    </section>
  );
}
