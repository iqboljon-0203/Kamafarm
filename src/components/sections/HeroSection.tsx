'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, MessageCircle, ChevronDown, Star, Shield, Award } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] as any },
  }),
};

const trustBadges = [
  { icon: Shield, label: 'GMP Certified' },
  { icon: Star, label: 'ISO 9001' },
  { icon: Award, label: 'Halol' },
];

export default function HeroSection() {
  const { t } = useLanguage();

  const scrollToProducts = () => {
    document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToB2B = () => {
    document.querySelector('#b2b')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #F8FAFC 0%, #ECFDF5 50%, #F0FDF4 100%)',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: 72,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Background decorations */}
      <div style={{
        position: 'absolute', top: '10%', right: '-5%',
        width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '5%', left: '-5%',
        width: 400, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(4,67,44,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      {/* Dot pattern */}
      <div className="dot-pattern" style={{
        position: 'absolute', inset: 0, opacity: 0.4, pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 64,
          alignItems: 'center',
          minHeight: 'calc(100vh - 72px)',
          padding: '60px 0',
        }}
        className="hero-grid"
        >
          {/* Left: Text Content */}
          <div>
            {/* Trust badges */}
            <motion.div
              custom={0} variants={fadeUp} initial="hidden" animate="visible"
              style={{ display: 'flex', gap: 8, marginBottom: 32, flexWrap: 'wrap' }}
            >
              {trustBadges.map(({ icon: Icon, label }) => (
                <div key={label} style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '6px 12px', background: 'white',
                  border: '1px solid #E2E8F0', borderRadius: 100,
                  fontSize: 11, fontWeight: 600, color: '#04432C',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                }}>
                  <Icon size={12} color="#10B981" strokeWidth={2.5} />
                  {label}
                </div>
              ))}
            </motion.div>

            {/* H1 */}
            <motion.h1
              custom={1} variants={fadeUp} initial="hidden" animate="visible"
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: 900,
                lineHeight: 1.05,
                letterSpacing: '-0.04em',
                color: '#0F172A',
                marginBottom: 24,
              }}
            >
              {t.hero.heading1}
              <br />
              <span style={{
                background: 'linear-gradient(135deg, #04432C 0%, #10B981 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                {t.hero.heading2}
              </span>
              <br />
              {t.hero.heading3}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              custom={2} variants={fadeUp} initial="hidden" animate="visible"
              style={{
                fontSize: 16, lineHeight: 1.7, color: '#475569',
                maxWidth: 480, marginBottom: 40,
              }}
            >
              {t.hero.subtitle}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              custom={3} variants={fadeUp} initial="hidden" animate="visible"
              style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}
            >
              <motion.button
                onClick={scrollToProducts}
                className="btn btn-accent"
                style={{ fontSize: 15, padding: '14px 28px' }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {t.hero.cta1}
                <ArrowRight size={16} strokeWidth={2.5} />
              </motion.button>

              <motion.button
                onClick={scrollToB2B}
                className="btn btn-outline"
                style={{ fontSize: 15, padding: '14px 28px' }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <MessageCircle size={16} strokeWidth={2.5} />
                {t.hero.cta2}
              </motion.button>
            </motion.div>

            {/* Social proof */}
            <motion.div
              custom={4} variants={fadeUp} initial="hidden" animate="visible"
              style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 48 }}
            >
              {/* Avatars */}
              <div style={{ display: 'flex' }}>
                {['#10B981', '#04432C', '#34D399', '#065a3b'].map((color, i) => (
                  <div key={i} style={{
                    width: 36, height: 36, borderRadius: '50%',
                    background: color, border: '2.5px solid white',
                    marginLeft: i > 0 ? -10 : 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, fontWeight: 700, color: 'white',
                  }}>
                    {['A', 'B', 'C', 'D'][i]}
                  </div>
                ))}
              </div>
              <div>
                <div style={{ display: 'flex', gap: 2, marginBottom: 2 }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} color="#F59E0B" fill="#F59E0B" />
                  ))}
                </div>
                <div style={{ fontSize: 12, color: '#64748B', fontWeight: 500 }}>
                  <span style={{ fontWeight: 700, color: '#0F172A' }}>1,200+</span> mijoz ishonadi
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Product Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
            style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}
          >
            {/* Image container */}
            <div
              className="float-animate"
              style={{
                position: 'relative',
                width: '100%', maxWidth: 500,
                aspectRatio: '4/3',
                borderRadius: 28,
                overflow: 'hidden',
                boxShadow: '0 40px 100px rgba(4,67,44,0.2), 0 20px 40px rgba(0,0,0,0.08)',
              }}
            >
              <Image
                src="/hero-product.png"
                alt="Kamafarm Healthcare Premium Products"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
                priority
              />
              {/* Gradient overlay */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(135deg, rgba(4,67,44,0.1) 0%, transparent 60%)',
              }} />
            </div>

            {/* Floating stat card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              style={{
                position: 'absolute', left: -20, bottom: '20%',
                background: 'white', borderRadius: 16,
                padding: '14px 18px',
                boxShadow: '0 16px 40px rgba(0,0,0,0.12)',
                border: '1px solid rgba(255,255,255,0.8)',
              }}
            >
              <div style={{ fontSize: 24, fontWeight: 900, color: '#04432C', letterSpacing: '-0.03em' }}>50+</div>
              <div style={{ fontSize: 11, color: '#64748B', fontWeight: 500, marginTop: 2 }}>Premium mahsulotlar</div>
            </motion.div>

            {/* Floating stat card 2 */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.5 }}
              style={{
                position: 'absolute', right: -10, top: '15%',
                background: '#04432C', borderRadius: 16,
                padding: '14px 18px',
                boxShadow: '0 16px 40px rgba(4,67,44,0.3)',
              }}
            >
              <div style={{ fontSize: 24, fontWeight: 900, color: '#34D399', letterSpacing: '-0.03em' }}>GMP</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', fontWeight: 500, marginTop: 2 }}>Sertifikatlangan</div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            paddingBottom: 32, gap: 8, cursor: 'pointer',
          }}
          onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <span style={{ fontSize: 11, color: '#94A3B8', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Pastga suring
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown size={20} color="#94A3B8" />
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
            padding: 40px 0 20px !important;
          }
        }
      `}</style>
    </section>
  );
}
