'use client';
import { motion } from 'framer-motion';
import { Leaf, Camera, Send, MessageCircle, Share2, Phone, MapPin, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

const socialLinks = [
  {
    icon: Camera,
    label: 'Instagram',
    href: 'https://instagram.com/kamafarm.healthcare',
    color: '#E1306C',
  },
  {
    icon: Send,
    label: 'Telegram',
    href: 'https://t.me/kamafarm_bot',
    color: '#0088cc',
  },
  {
    icon: MessageCircle,
    label: 'Kanal',
    href: 'https://t.me/kamafarm_channel',
    color: '#229ED9',
  },
  {
    icon: Share2,
    label: 'Facebook',
    href: 'https://facebook.com/kamafarm',
    color: '#1877F2',
  },
];

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer id="footer" style={{ position: 'relative', background: '#04432C', color: 'white', paddingTop: 80 }}>
      {/* Top pattern decoration */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(52,211,153,0.3), transparent)',
      }} />

      <div className="container">
        {/* Main grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1.5fr',
          gap: 48,
          paddingBottom: 64,
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
        className="footer-grid"
        >
          {/* Column 1: Brand */}
          <div>
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{
                width: 44, height: 44, borderRadius: '50%',
                background: 'white',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative', overflow: 'hidden'
              }}>
                <Image src="/logo.png" alt="Kamafarm Logo" fill sizes="44px" style={{ objectFit: 'contain', padding: 2 }} />
              </div>
              <div>
                <div style={{ fontWeight: 900, fontSize: 18, letterSpacing: '-0.02em' }}>Kamafarm</div>
                <div style={{ fontSize: 11, color: '#34D399', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Healthcare</div>
              </div>
            </div>

            <p style={{ fontSize: 13, lineHeight: 1.75, color: 'rgba(255,255,255,0.6)', marginBottom: 28, maxWidth: 280 }}>
              {t.footer.about}
            </p>

            {/* Social links */}
            <div style={{ display: 'flex', gap: 10 }}>
              {socialLinks.map(({ icon: Icon, label, href, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={label}
                  style={{
                    width: 40, height: 40, borderRadius: 12,
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                  }}
                  whileHover={{ scale: 1.1, background: color } as Parameters<typeof motion.a>[0]['whileHover']}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={18} color="white" strokeWidth={1.8} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: 'white', marginBottom: 20, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              {t.footer.quickLinks}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {t.footer.links.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  style={{
                    fontSize: 13, color: 'rgba(255,255,255,0.65)',
                    textDecoration: 'none', fontWeight: 500,
                    display: 'flex', alignItems: 'center', gap: 6,
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = '#34D399';
                    (e.currentTarget as HTMLAnchorElement).style.paddingLeft = '4px';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.65)';
                    (e.currentTarget as HTMLAnchorElement).style.paddingLeft = '0';
                  }}
                  onClick={(e) => {
                    if (link.href.startsWith('#')) {
                      e.preventDefault();
                      document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  <ArrowRight size={12} />
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Column 3: Products nav */}
          <div>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: 'white', marginBottom: 20, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              Mahsulotlar
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['Fiziobrain DHA', 'Ferro-Glob', 'VitaKids Gummies', 'Omega-3 Premium', 'Neuro Complex', 'BabyCare D3'].map((name) => (
                <a
                  key={name}
                  href="#products"
                  style={{
                    fontSize: 13, color: 'rgba(255,255,255,0.65)',
                    textDecoration: 'none', fontWeight: 500,
                    display: 'flex', alignItems: 'center', gap: 6,
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#34D399'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.65)'; }}
                  onClick={(e) => { e.preventDefault(); document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' }); }}
                >
                  <ArrowRight size={12} />
                  {name}
                </a>
              ))}
            </div>
          </div>

          {/* Column 4: Contacts */}
          <div>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: 'white', marginBottom: 20, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              {t.footer.contacts}
            </h3>

            {/* Address */}
            <div style={{
              display: 'flex', gap: 12, marginBottom: 20,
              padding: '16px', background: 'rgba(255,255,255,0.06)',
              borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)',
            }}>
              <MapPin size={18} color="#34D399" strokeWidth={2} style={{ flexShrink: 0, marginTop: 2 }} />
              <div style={{ fontSize: 13, lineHeight: 1.6, color: 'rgba(255,255,255,0.7)' }}>
                {t.footer.address}
              </div>
            </div>

            {/* Phones */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {t.footer.phones.map((phone, i) => (
                <a
                  key={i}
                  href={`tel:${phone.replace(/\s|\(|\)|-/g, '')}`}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '12px 16px',
                    background: i === 0 ? 'rgba(52,211,153,0.1)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${i === 0 ? 'rgba(52,211,153,0.2)' : 'rgba(255,255,255,0.06)'}`,
                    borderRadius: 10, textDecoration: 'none',
                    fontSize: 13, fontWeight: 700, color: i === 0 ? '#34D399' : 'rgba(255,255,255,0.8)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <Phone size={14} strokeWidth={2.5} />
                  {phone}
                </a>
              ))}
            </div>

            {/* Working hours */}
            <div style={{
              marginTop: 20, padding: '12px 16px',
              background: 'rgba(255,255,255,0.04)',
              borderRadius: 10, border: '1px solid rgba(255,255,255,0.06)',
            }}>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
                Ish vaqti
              </div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>
                Du — Sha: 09:00 – 18:00
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '24px 0',
          flexWrap: 'wrap', gap: 12,
        }}>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>
            {t.footer.copyright}
          </div>
          <div style={{ display: 'flex', gap: 20 }}>
            {['Maxfiylik siyosati', 'Foydalanish shartlari'].map((item) => (
              <a
                key={item}
                href="#"
                style={{
                  fontSize: 12, color: 'rgba(255,255,255,0.4)',
                  textDecoration: 'none', fontWeight: 500,
                  transition: 'color 0.15s ease',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#34D399'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.4)'; }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
        }
        @media (max-width: 640px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
