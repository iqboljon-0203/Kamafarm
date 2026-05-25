'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Menu, X, Sun, Moon } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { Language } from '@/lib/i18n';

const navLinks = [
  { key: 'about', href: '#about' },
  { key: 'mission', href: '#mission' },
  { key: 'products', href: '#products' },
  { key: 'b2b', href: '#b2b' },
  { key: 'faq', href: '#faq' },
  { key: 'contacts', href: '#footer' },
] as const;

export default function Header() {
  const { lang, setLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800 shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
            {/* Logo */}
            <motion.a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: 'white',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(4,67,44,0.15)',
                overflow: 'hidden',
                position: 'relative'
              }}>
                <Image src="/logo.png" alt="Kamafarm Logo" fill sizes="36px" style={{ objectFit: 'contain', padding: 2 }} />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 15, color: '#04432C', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                  Kamafarm
                </div>
                <div style={{ fontWeight: 500, fontSize: 10, color: '#10B981', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  Healthcare
                </div>
              </div>
            </motion.a>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center" style={{ gap: 4 }}>
              {navLinks.map((link) => (
                <button
                  key={link.key}
                  onClick={() => handleNavClick(link.href)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: 8,
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: 13,
                    fontWeight: 500,
                    color: scrolled ? 'var(--dark)' : '#1E293B',
                    transition: 'all 0.15s ease',
                    fontFamily: 'inherit',
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLButtonElement).style.color = '#10B981';
                    (e.target as HTMLButtonElement).style.background = 'rgba(16,185,129,0.06)';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLButtonElement).style.color = scrolled ? 'var(--dark)' : '#1E293B';
                    (e.target as HTMLButtonElement).style.background = 'transparent';
                  }}
                >
                  {t.nav[link.key as keyof typeof t.nav]}
                </button>
              ))}
            </nav>

            {/* Right: Lang + CTA */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {/* Language Switcher */}
              <div style={{
                display: 'flex', background: 'var(--light-2)', borderRadius: 8, padding: 3, gap: 2
              }}>
                {(['uz', 'ru'] as Language[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    style={{
                      padding: '5px 12px',
                      borderRadius: 6,
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: 12,
                      fontWeight: 700,
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      fontFamily: 'inherit',
                      transition: 'all 0.15s ease',
                      background: lang === l ? '#04432C' : 'transparent',
                      color: lang === l ? 'white' : '#64748B',
                    }}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* Phone CTA */}
              <motion.a
                href={`tel:${t.nav.phone.replace(/\s/g, '')}`}
                className="hidden lg:flex items-center"
                style={{
                  gap: 8,
                  padding: '9px 16px', borderRadius: 10,
                  background: '#04432C', color: 'white',
                  textDecoration: 'none', fontSize: 13, fontWeight: 600,
                  boxShadow: '0 4px 14px rgba(4,67,44,0.25)',
                }}
                whileHover={{ scale: 1.02, boxShadow: '0 6px 20px rgba(4,67,44,0.35)' }}
                whileTap={{ scale: 0.98 }}
              >
                <Phone size={14} strokeWidth={2.5} />
                {t.nav.phone}
              </motion.a>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="flex lg:hidden items-center justify-center"
                style={{
                  width: 40, height: 40, border: '1.5px solid #E2E8F0',
                  borderRadius: 10, background: 'white', cursor: 'pointer',
                }}
              >
                {mobileOpen ? <X size={18} color="#04432C" /> : <Menu size={18} color="#04432C" />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            style={{
              position: 'fixed', inset: 0, zIndex: 998,
              background: '#04432C', display: 'flex', flexDirection: 'column',
              padding: '100px 32px 40px',
            }}
          >
            {/* Close btn */}
            <button
              onClick={() => setMobileOpen(false)}
              style={{
                position: 'absolute', top: 20, right: 20,
                width: 44, height: 44, border: 'none',
                background: 'rgba(255,255,255,0.1)', borderRadius: 12,
                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              }}
            >
              <X size={20} color="white" />
            </button>

            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 48 }}>
              <div style={{
                width: 40, height: 40, borderRadius: '50%',
                background: 'white',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative', overflow: 'hidden'
              }}>
                <Image src="/logo.png" alt="Kamafarm Logo" fill style={{ objectFit: 'contain', padding: 2 }} />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 18, color: 'white' }}>Kamafarm</div>
                <div style={{ fontSize: 11, color: '#34D399', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Healthcare</div>
              </div>
            </div>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.key}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => handleNavClick(link.href)}
                  style={{
                    padding: '16px 20px', borderRadius: 12, background: 'transparent',
                    border: 'none', cursor: 'pointer', textAlign: 'left',
                    fontSize: 18, fontWeight: 600, color: 'rgba(255,255,255,0.85)',
                    fontFamily: 'inherit', transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLButtonElement).style.background = 'rgba(255,255,255,0.08)';
                    (e.target as HTMLButtonElement).style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLButtonElement).style.background = 'transparent';
                    (e.target as HTMLButtonElement).style.color = 'rgba(255,255,255,0.85)';
                  }}
                >
                  {t.nav[link.key as keyof typeof t.nav]}
                </motion.button>
              ))}
            </nav>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', background: 'rgba(255,255,255,0.1)', borderRadius: 10, padding: 4, gap: 4 }}>
                {(['uz', 'ru'] as Language[]).map((l) => (
                  <button key={l} onClick={() => setLang(l)} style={{
                    flex: 1, padding: '10px 0', borderRadius: 8, border: 'none', cursor: 'pointer',
                    fontSize: 13, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase',
                    fontFamily: 'inherit', transition: 'all 0.15s ease',
                    background: lang === l ? 'white' : 'transparent',
                    color: lang === l ? '#04432C' : 'rgba(255,255,255,0.7)',
                  }}>{l.toUpperCase()}</button>
                ))}
              </div>
              <a href="tel:+998906031428" style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                padding: '14px 24px', borderRadius: 12,
                background: 'rgba(255,255,255,0.15)', color: 'white',
                textDecoration: 'none', fontSize: 16, fontWeight: 600,
                border: '1px solid rgba(255,255,255,0.2)',
              }}>
                <Phone size={18} />
                {t.nav.phone}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
