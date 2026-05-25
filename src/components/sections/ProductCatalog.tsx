'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, Send, ChevronRight, Beaker } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { getProducts } from '@/lib/products';
import type { Product } from '@/lib/types';

const FILTER_MAP: Record<string, string[]> = {
  Barchasi: [],
  'Miya faoliyati': ['Miya faoliyati'],
  Kamqonlik: ['Kamqonlik'],
  'Bolalar uchun': ['Bolalar uchun'],
  'Kattalar uchun': ['Kattalar uchun'],
};

import { Search } from 'lucide-react';

function ProductModal({ product, onClose, lang, t }: {
  product: Product;
  onClose: () => void;
  lang: 'uz' | 'ru';
  t: ReturnType<typeof useLanguage>['t'];
}) {
  const name = lang === 'uz' ? product.name_uz : product.name_ru;
  const description = lang === 'uz' ? product.description_uz : product.description_ru;
  const composition = lang === 'uz' ? product.composition_uz : product.composition_ru;
  const usage = lang === 'uz' ? product.usage_uz : product.usage_ru;

  return (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: 'spring', bounce: 0.3, duration: 0.5 }}
        style={{
          background: 'white', borderRadius: 24,
          maxWidth: 640, width: '100%', maxHeight: '90vh',
          overflow: 'auto', position: 'relative',
          boxShadow: '0 40px 100px rgba(0,0,0,0.2)',
        }}
      >
        {/* Image header */}
        <div style={{ position: 'relative', height: 240, borderRadius: '24px 24px 0 0', overflow: 'hidden' }}>
          <Image src={product.image} alt={name} fill sizes="(max-width: 640px) 100vw, 640px" style={{ objectFit: 'cover' }} />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.5) 100%)',
          }} />
          {/* Badge */}
          {product.badge && (
            <div style={{
              position: 'absolute', top: 16, left: 16,
              background: '#04432C', color: 'white',
              padding: '6px 14px', borderRadius: 100,
              fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
            }}>
              {product.badge}
            </div>
          )}
          {/* Close button */}
          <button onClick={onClose} style={{
            position: 'absolute', top: 16, right: 16,
            width: 36, height: 36, borderRadius: '50%',
            background: 'rgba(255,255,255,0.2)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: 'white',
          }}>
            <X size={16} />
          </button>
          {/* Product name on image */}
          <div style={{ position: 'absolute', bottom: 20, left: 24, right: 24 }}>
            <div style={{ fontSize: 22, fontWeight: 900, color: 'white', letterSpacing: '-0.02em', textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
              {name}
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '28px 28px 32px' }}>
          {/* Description */}
          <p style={{ fontSize: 14, lineHeight: 1.75, color: '#475569', marginBottom: 24 }}>
            {description}
          </p>

          {/* Composition */}
          <div style={{ marginBottom: 24 }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12,
            }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(4,67,44,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Beaker size={14} color="#04432C" />
              </div>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#04432C', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {t.products.compositionLabel}
              </span>
            </div>
            <div style={{
              background: '#F8FAFC', border: '1px solid #E2E8F0',
              borderRadius: 12, padding: '14px 16px',
              fontSize: 13, lineHeight: 1.7, color: '#374151',
            }}>
              {composition}
            </div>
          </div>

          {/* Usage */}
          <div style={{ marginBottom: 28 }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12,
            }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ChevronRight size={14} color="#10B981" />
              </div>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#10B981', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {t.products.usageLabel}
              </span>
            </div>
            <div style={{
              background: '#F0FDF4', border: '1px solid rgba(16,185,129,0.15)',
              borderRadius: 12, padding: '14px 16px',
              fontSize: 13, lineHeight: 1.7, color: '#374151',
            }}>
              {usage}
            </div>
          </div>

          {/* CTA */}
          <a
            href={product.telegramlink || 'https://t.me/kamafarm_bot'}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              padding: '14px 24px', borderRadius: 12,
              background: '#04432C', color: 'white',
              textDecoration: 'none', fontSize: 14, fontWeight: 700,
              boxShadow: '0 8px 24px rgba(4,67,44,0.3)',
              transition: 'all 0.2s ease',
            }}
          >
            <Send size={16} />
            {t.products.orderBtn}
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProductCard({ product, onOpen, lang, t }: {
  product: Product;
  onOpen: () => void;
  lang: 'uz' | 'ru';
  t: ReturnType<typeof useLanguage>['t'];
}) {
  const name = lang === 'uz' ? product.name_uz : product.name_ru;
  const description = lang === 'uz' ? product.description_uz : product.description_ru;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="card"
      style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
    >
      {/* Product Image */}
      <div style={{ position: 'relative', height: 220, overflow: 'hidden', background: '#F8FAFC' }}>
        <Image src={product.image} alt={name} fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: 'cover' }} />
        {/* Badge */}
        {product.badge && (
          <div style={{
            position: 'absolute', top: 12, left: 12,
            background: 'rgba(4,67,44,0.9)',
            backdropFilter: 'blur(10px)',
            color: 'white',
            padding: '4px 10px', borderRadius: 100,
            fontSize: 9, fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase',
          }}>
            🇺🇿🤝🇮🇳 {product.badge}
          </div>
        )}
        {/* Category tag */}
        <div style={{
          position: 'absolute', bottom: 12, right: 12,
          background: 'white',
          color: '#04432C',
          padding: '4px 10px', borderRadius: 100,
          fontSize: 10, fontWeight: 700,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}>
          {product.category}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '20px 20px 0', flex: 1 }}>
        <h3 style={{
          fontSize: 16, fontWeight: 800, color: '#0F172A',
          letterSpacing: '-0.02em', marginBottom: 8, lineHeight: 1.3,
        }}>
          {name}
        </h3>
        <p style={{
          fontSize: 13, lineHeight: 1.6, color: '#64748B',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {description}
        </p>
      </div>

      {/* Action buttons */}
      <div style={{ padding: '16px 20px 20px', display: 'flex', gap: 10 }}>
        <motion.button
          onClick={onOpen}
          className="btn btn-primary"
          style={{ flex: 1, fontSize: 13, padding: '10px 16px' }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {t.products.detailsBtn}
          <ChevronRight size={14} />
        </motion.button>
        <motion.a
          href={product.telegramlink || 'https://t.me/kamafarm_bot'}
          target="_blank"
          rel="noopener noreferrer"
          className="btn"
          style={{
            flex: 1, fontSize: 13, padding: '10px 16px',
            background: '#0088cc',
            color: 'white',
            boxShadow: '0 4px 12px rgba(0,136,204,0.25)',
            textDecoration: 'none',
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Send size={13} />
          Telegram
        </motion.a>
      </div>
    </motion.div>
  );
}

export default function ProductCatalog() {
  const { lang, t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('Barchasi');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  const filteredProducts = products.filter((p) => {
    const isRu = lang === 'ru';
    const name = isRu && p.name_ru ? p.name_ru : p.name_uz;
    const matchesFilter = activeFilter === 'Barchasi' || p.category === activeFilter;
    const matchesSearch = name ? name.toLowerCase().includes(searchQuery.toLowerCase()) : false;
    return matchesFilter && matchesSearch;
  });

  const filterLabels = t.products.filters;
  const filterKeys = ['Barchasi', 'Miya faoliyati', 'Kamqonlik', 'Bolalar uchun', 'Kattalar uchun'];

  return (
    <>
      <section id="products" className="section-py" style={{ background: '#F8FAFC' }}>
        <div className="container">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: 48 }}
          >
            <span className="section-label" style={{ display: 'block', marginBottom: 16 }}>
              {t.products.sectionLabel}
            </span>
            <h2 style={{
              fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
              fontWeight: 900, letterSpacing: '-0.03em',
              color: '#0F172A', marginBottom: 16,
            }}>
              {t.products.heading}
            </h2>
            <p style={{ fontSize: 15, color: '#64748B', maxWidth: 520, margin: '0 auto' }}>
              {t.products.subtitle}
            </p>
          </motion.div>

          {/* Filter Tabs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 48, maxWidth: 600, margin: '0 auto 48px' }}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{
                display: 'flex', gap: 8, justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              {filterKeys.map((key, i) => (
                <motion.button
                  key={key}
                  className={`filter-tab ${activeFilter === key ? 'active' : ''}`}
                  onClick={() => setActiveFilter(key)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {filterLabels[i]}
                </motion.button>
              ))}
            </motion.div>

            {/* Search Input */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ position: 'relative', width: '100%' }}
            >
              <Search style={{ position: 'absolute', left: 16, top: 14, color: '#94A3B8' }} size={20} />
              <input
                type="text"
                placeholder={t.products.searchPlaceholder || "Mahsulot qidirish..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%', padding: '14px 16px 14px 48px',
                  borderRadius: 16, border: '1px solid #E2E8F0',
                  fontSize: 15, outline: 'none',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
                  fontFamily: 'inherit',
                }}
                onFocus={(e) => e.target.style.borderColor = '#10B981'}
                onBlur={(e) => e.target.style.borderColor = '#E2E8F0'}
              />
            </motion.div>
          </div>

          {/* Product Grid */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#64748B' }}>Yuklanmoqda...</div>
          ) : (
            <motion.div layout style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 24,
            }}
            className="products-grid"
            >
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onOpen={() => setSelectedProduct(product)}
                    lang={lang}
                    t={t}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {/* Product Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            lang={lang}
            t={t}
          />
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 1024px) {
          .products-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .products-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
