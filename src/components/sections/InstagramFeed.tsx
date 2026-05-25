'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Camera, ExternalLink, Heart, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

// Mock Instagram posts using our generated images
const mockPosts = [
  {
    id: 1,
    image: '/fiziobrain.png',
    likes: 234,
    comments: 18,
    caption: 'Fiziobrain DHA — bolalar miyasi uchun eng yaxshi tanlov! 🧠💚',
    href: 'https://instagram.com/kamafarm.healthcare',
  },
  {
    id: 2,
    image: '/ferroglob.png',
    likes: 189,
    comments: 12,
    caption: 'Ferro-Glob — temirni to\'ldirish uchun natural formula 💪',
    href: 'https://instagram.com/kamafarm.healthcare',
  },
  {
    id: 3,
    image: '/vitaminkids.png',
    likes: 312,
    comments: 27,
    caption: 'VitaKids Gummies — mazali va foydali! ⭐',
    href: 'https://instagram.com/kamafarm.healthcare',
  },
  {
    id: 4,
    image: '/hero-product.png',
    likes: 445,
    comments: 34,
    caption: 'Kamafarm Healthcare — tabiat va ilm-fan uyg\'unligida 🌿',
    href: 'https://instagram.com/kamafarm.healthcare',
  },
];

export default function InstagramFeed() {
  const { t } = useLanguage();

  return (
    <section className="section-py" style={{ background: '#F8FAFC' }}>
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
          {/* Instagram handle */}
          <a
            href="https://instagram.com/kamafarm.healthcare"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '8px 18px',
              background: 'linear-gradient(135deg, #833AB4 0%, #FD1D1D 50%, #FCAF45 100%)',
              borderRadius: 100, color: 'white',
              textDecoration: 'none', fontSize: 13, fontWeight: 700,
              boxShadow: '0 4px 16px rgba(131,58,180,0.3)',
            }}
          >
            <Camera size={16} />
            {t.instagram.handle}
            <ExternalLink size={12} />
          </a>
        </motion.div>

        {/* Instagram Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 16,
        }}
        className="instagram-grid"
        >
          {mockPosts.map((post, i) => (
            <motion.a
              key={post.id}
              href={post.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{
                position: 'relative',
                aspectRatio: '1',
                borderRadius: 16,
                overflow: 'hidden',
                display: 'block',
                textDecoration: 'none',
                cursor: 'pointer',
              }}
              whileHover={{ scale: 1.02 }}
            >
              <Image
                src={post.image}
                alt={post.caption}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                style={{ objectFit: 'cover', transition: 'transform 0.4s ease' }}
              />

              {/* Hover overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.75) 100%)',
                  display: 'flex', flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: 16,
                  transition: 'opacity 0.3s ease',
                }}
              >
                {/* Instagram icon top right */}
                <div style={{ alignSelf: 'flex-end' }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: '50%',
                    background: 'rgba(255,255,255,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backdropFilter: 'blur(4px)',
                  }}>
                    <Camera size={16} color="white" />
                  </div>
                </div>

                {/* Bottom: likes, comments, view */}
                <div>
                  <div style={{ display: 'flex', gap: 12, marginBottom: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'white', fontSize: 12, fontWeight: 600 }}>
                      <Heart size={13} fill="white" />
                      {post.likes}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'white', fontSize: 12, fontWeight: 600 }}>
                      <MessageCircle size={13} fill="white" />
                      {post.comments}
                    </div>
                  </div>
                  <div style={{
                    fontSize: 11, color: 'rgba(255,255,255,0.8)',
                    display: '-webkit-box',
                    WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                    lineHeight: 1.4,
                  }}>
                    {post.caption}
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
          style={{ textAlign: 'center', marginTop: 40 }}
        >
          <a
            href="https://instagram.com/kamafarm.healthcare"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
            style={{ textDecoration: 'none', fontSize: 14 }}
          >
            <Camera size={16} />
            Barcha postlarni ko'rish
          </a>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .instagram-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
