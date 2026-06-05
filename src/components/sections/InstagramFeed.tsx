'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Camera, ExternalLink, Heart, MessageCircle, Users, Grid3X3, UserPlus } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const instagramPosts = [
  {
    id: 1,
    image: '/instagram-1.png',
    likes: 287,
    comments: 24,
    caption: 'Premium sifatli vitaminlar va biologik faol qo\'shimchalar 🌿💊 #Kamafarm #Healthcare',
    href: 'https://instagram.com/kamafarm.healthcare',
  },
  {
    id: 2,
    image: '/instagram-2.png',
    likes: 342,
    comments: 31,
    caption: 'Farzandingiz salomatligi — bizning ustuvor vazifamiz! 👶💚 #BolalikVitaminlari',
    href: 'https://instagram.com/kamafarm.healthcare',
  },
  {
    id: 3,
    image: '/instagram-3.png',
    likes: 198,
    comments: 15,
    caption: 'Ferro-Glob — temir tanqisligiga qarshi tabiiy yechim 💪🍎 #FerroGlob #Temir',
    href: 'https://instagram.com/kamafarm.healthcare',
  },
  {
    id: 4,
    image: '/instagram-4.png',
    likes: 456,
    comments: 38,
    caption: 'GMP sertifikatlangan laboratoriyamizda sifat nazorati 🔬✅ #SifatKafolati',
    href: 'https://instagram.com/kamafarm.healthcare',
  },
  {
    id: 5,
    image: '/instagram-5.png',
    likes: 312,
    comments: 27,
    caption: 'Fiziobrain DHA — bolalar miyasi rivojlanishi uchun omega-3 🧠💛 #Fiziobrain',
    href: 'https://instagram.com/kamafarm.healthcare',
  },
  {
    id: 6,
    image: '/instagram-6.png',
    likes: 523,
    comments: 42,
    caption: 'VitaKids Gummies — mazali va foydali vitaminlar bolalar uchun! 🍬⭐ #VitaKids',
    href: 'https://instagram.com/kamafarm.healthcare',
  },
];

const profileStats = {
  posts: 29,
  followers: '1,243',
  following: 181,
};

export default function InstagramFeed() {
  const { t } = useLanguage();

  return (
    <section className="section-py" style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #F0FDF4 50%, #ECFDF5 100%)' }}>
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: 48 }}
        >
          <span className="section-label" style={{ display: 'block', marginBottom: 16 }}>
            {t.instagram.sectionLabel}
          </span>
          <h2 style={{
            fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
            fontWeight: 900, letterSpacing: '-0.03em',
            color: '#0F172A', marginBottom: 16,
          }}>
            {t.instagram.heading}
          </h2>

          {/* Profile Info Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              gap: 24, padding: '36px 48px', borderRadius: 24,
              background: 'white',
              boxShadow: '0 4px 32px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)',
              border: '1px solid rgba(16,185,129,0.1)',
              width: '100%', maxWidth: 800, margin: '0 auto',
            }}
          >
            {/* Top row: handle badge + profile name */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
              <a
                href="https://instagram.com/kamafarm.healthcare"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  padding: '10px 24px',
                  background: 'linear-gradient(135deg, #833AB4 0%, #FD1D1D 50%, #FCAF45 100%)',
                  borderRadius: 100, color: 'white',
                  textDecoration: 'none', fontSize: 15, fontWeight: 700,
                  boxShadow: '0 4px 16px rgba(131,58,180,0.3)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(131,58,180,0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(131,58,180,0.3)';
                }}
              >
                <Camera size={18} />
                {t.instagram.handle}
                <ExternalLink size={14} />
              </a>
              <div style={{
                fontSize: 14, color: '#64748B', fontWeight: 500,
                textAlign: 'center', lineHeight: 1.6, maxWidth: 500,
              }}>
                {t.instagram.bio}
              </div>
            </div>

            {/* Divider */}
            <div style={{ width: '100%', height: 1, background: 'linear-gradient(90deg, transparent, #E2E8F0, #D1FAE5, #E2E8F0, transparent)' }} />

            {/* Stats */}
            <div style={{ display: 'flex', gap: 0, alignItems: 'center', width: '100%', justifyContent: 'center' }}>
              <div style={{ textAlign: 'center', flex: 1, padding: '8px 0' }}>
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  fontSize: 28, fontWeight: 800, color: '#0F172A',
                }}>
                  <Grid3X3 size={20} color="#10B981" />
                  {profileStats.posts}
                </div>
                <div style={{ fontSize: 13, color: '#64748B', fontWeight: 500, marginTop: 4 }}>
                  {t.instagram.stats.posts}
                </div>
              </div>
              <div style={{ width: 1, height: 48, background: '#E2E8F0' }} />
              <div style={{ textAlign: 'center', flex: 1, padding: '8px 0' }}>
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  fontSize: 28, fontWeight: 800, color: '#0F172A',
                }}>
                  <Users size={20} color="#10B981" />
                  {profileStats.followers}
                </div>
                <div style={{ fontSize: 13, color: '#64748B', fontWeight: 500, marginTop: 4 }}>
                  {t.instagram.stats.followers}
                </div>
              </div>
              <div style={{ width: 1, height: 48, background: '#E2E8F0' }} />
              <div style={{ textAlign: 'center', flex: 1, padding: '8px 0' }}>
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  fontSize: 28, fontWeight: 800, color: '#0F172A',
                }}>
                  <UserPlus size={20} color="#10B981" />
                  {profileStats.following}
                </div>
                <div style={{ fontSize: 13, color: '#64748B', fontWeight: 500, marginTop: 4 }}>
                  {t.instagram.stats.following}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Instagram Grid — 3x2 */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 16,
          }}
          className="instagram-grid"
        >
          {instagramPosts.map((post, i) => (
            <motion.a
              key={post.id}
              href={post.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              style={{
                position: 'relative',
                aspectRatio: '1',
                borderRadius: 16,
                overflow: 'hidden',
                display: 'block',
                textDecoration: 'none',
                cursor: 'pointer',
                boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
              }}
              whileHover={{ scale: 1.03 }}
            >
              <Image
                src={post.image}
                alt={post.caption}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 33vw"
                style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
              />

              {/* Hover overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.7) 100%)',
                  display: 'flex', flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: 16,
                  transition: 'opacity 0.3s ease',
                }}
              >
                {/* Instagram icon top right */}
                <div style={{ alignSelf: 'flex-end' }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #833AB4 0%, #FD1D1D 50%, #FCAF45 100%)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(131,58,180,0.4)',
                  }}>
                    <Camera size={16} color="white" />
                  </div>
                </div>

                {/* Bottom: likes, comments, caption */}
                <div>
                  <div style={{ display: 'flex', gap: 14, marginBottom: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'white', fontSize: 13, fontWeight: 600 }}>
                      <Heart size={14} fill="white" />
                      {post.likes}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'white', fontSize: 13, fontWeight: 600 }}>
                      <MessageCircle size={14} fill="white" />
                      {post.comments}
                    </div>
                  </div>
                  <div style={{
                    fontSize: 12, color: 'rgba(255,255,255,0.85)',
                    display: '-webkit-box',
                    WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                    lineHeight: 1.5, fontWeight: 500,
                  }}>
                    {((t.instagram as any).posts?.[i] || post.caption)}
                  </div>
                </div>
              </motion.div>
            </motion.a>
          ))}
        </div>

        {/* Follow CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginTop: 48 }}
        >
          <a
            href="https://instagram.com/kamafarm.healthcare"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '14px 32px',
              background: 'linear-gradient(135deg, #833AB4 0%, #FD1D1D 50%, #FCAF45 100%)',
              borderRadius: 100, color: 'white',
              textDecoration: 'none', fontSize: 15, fontWeight: 700,
              boxShadow: '0 4px 20px rgba(131,58,180,0.3)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 8px 28px rgba(131,58,180,0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(131,58,180,0.3)';
            }}
          >
            <Camera size={18} />
            {t.instagram.followBtn}
            <ExternalLink size={14} />
          </a>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .instagram-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .instagram-grid { gap: 8px !important; }
        }
      `}</style>
    </section>
  );
}
