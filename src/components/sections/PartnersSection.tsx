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
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'transparent',
                  minWidth: 140,
                  height: 48,
                  position: 'relative'
                }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={partner.logo || '/logos/grand-pharm.svg'}
                    alt={partner.name}
                    style={{
                      maxHeight: '100%',
                      maxWidth: 160,
                      width: 'auto',
                      height: 'auto',
                      objectFit: 'contain',
                      opacity: 0.7,
                      filter: 'grayscale(100%) brightness(0.9)',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.filter = 'grayscale(0%) brightness(1)';
                      e.currentTarget.style.opacity = '1';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.filter = 'grayscale(100%) brightness(0.9)';
                      e.currentTarget.style.opacity = '0.7';
                    }}
                  />
                </div>
              );
            })}
          </motion.div>
        </div>
      )}
    </section>
  );
}
