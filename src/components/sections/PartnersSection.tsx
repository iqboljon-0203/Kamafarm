'use client';
import { motion } from 'framer-motion';
import { HeartPulse, Stethoscope, ShieldPlus, Activity, PlusCircle, Crosshair, Hexagon, Zap } from 'lucide-react';

const partners = [
  { name: 'Grand Pharm', icon: PlusCircle, color: '#04432C' },
  { name: 'Oson Apteka', icon: HeartPulse, color: '#EF4444' },
  { name: 'MedLine', icon: Stethoscope, color: '#3B82F6' },
  { name: 'PharmExpo', icon: ShieldPlus, color: '#8B5CF6' },
  { name: 'Asia Pharm', icon: Hexagon, color: '#F59E0B' },
  { name: 'Dorixona+', icon: Activity, color: '#10B981' },
  { name: 'Soglom Hayot', icon: Crosshair, color: '#EC4899' },
  { name: 'Toshkent Pharma', icon: Zap, color: '#14B8A6' },
];

export default function PartnersSection() {
  return (
    <section style={{ 
      padding: '40px 0', 
      background: 'white',
      borderBottom: '1px solid #F1F5F9',
      overflow: 'hidden'
    }}>
      <div className="container" style={{ marginBottom: 24, textAlign: 'center' }}>
        <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#94A3B8' }}>
          Bizga ishonch bildirgan hamkor tashkilotlar
        </p>
      </div>

      {/* Infinite Marquee Container */}
      <div style={{
        position: 'relative',
        display: 'flex',
        overflow: 'hidden',
        width: '100%',
        background: 'white',
        maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
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
            gap: 40,
            paddingLeft: 40,
            whiteSpace: 'nowrap'
          }}
        >
          {[...partners, ...partners].map((partner, i) => {
            const Icon = partner.icon;
            return (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '12px 24px',
                background: 'transparent',
                fontSize: 20,
                fontWeight: 800,
                letterSpacing: '-0.02em',
                color: '#1E293B',
                minWidth: 'fit-content'
              }}>
                <Icon size={28} color={partner.color} strokeWidth={2.5} />
                <span style={{ color: partner.color }}>{partner.name.split(' ')[0]}</span>
                {partner.name.split(' ')[1] && (
                  <span style={{ color: '#475569' }}>{partner.name.split(' ')[1]}</span>
                )}
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
