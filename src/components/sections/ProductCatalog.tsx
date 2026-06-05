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
  const [activeTab, setActiveTab] = useState<'info' | 'leaflet'>('info');
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
          background: 'var(--card-bg)', borderRadius: 24,
          maxWidth: 640, width: '100%', maxHeight: '90vh',
          overflow: 'hidden', position: 'relative',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid var(--border)',
          display: 'flex', flexDirection: 'column',
        }}
      >
        {/* Image header */}
        <div style={{ position: 'relative', height: 200, flexShrink: 0, overflow: 'hidden' }}>
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
            zIndex: 10,
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

        {/* Scrollable Content Container */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px 32px', display: 'flex', flexDirection: 'column' }}>
          {/* Tab Switcher */}
          {product.leaflet_uz && (
            <div style={{
              display: 'flex',
              borderBottom: '1.5px solid var(--border)',
              marginBottom: 20,
              gap: 20,
            }}>
              <button
                onClick={() => setActiveTab('info')}
                style={{
                  padding: '10px 4px',
                  border: 'none',
                  background: 'transparent',
                  fontSize: 14,
                  fontWeight: 700,
                  color: activeTab === 'info' ? '#10B981' : 'var(--text-muted)',
                  borderBottom: activeTab === 'info' ? '2.5px solid #10B981' : '2.5px solid transparent',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  transition: 'all 0.15s ease',
                  outline: 'none',
                }}
              >
                {lang === 'uz' ? 'Umumiy ma\'lumot' : 'Общая информация'}
              </button>
              <button
                onClick={() => setActiveTab('leaflet')}
                style={{
                  padding: '10px 4px',
                  border: 'none',
                  background: 'transparent',
                  fontSize: 14,
                  fontWeight: 700,
                  color: activeTab === 'leaflet' ? '#10B981' : 'var(--text-muted)',
                  borderBottom: activeTab === 'leaflet' ? '2.5px solid #10B981' : '2.5px solid transparent',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  transition: 'all 0.15s ease',
                  outline: 'none',
                }}
              >
                {lang === 'uz' ? 'Foydalanish bo\'yicha yo\'riqnoma' : 'Инструкция по применению'}
              </button>
            </div>
          )}

          {activeTab === 'info' ? (
            <div>
              {/* Description */}
              <p style={{ fontSize: 14, lineHeight: 1.75, color: 'var(--text-muted)', marginBottom: 24 }}>
                {description}
              </p>

              {/* Composition */}
              <div style={{ marginBottom: 24 }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12,
                }}>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: 'var(--accent-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Beaker size={14} color="var(--primary)" />
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    {t.products.compositionLabel}
                  </span>
                </div>
                <div style={{
                  background: 'var(--light-2)', border: '1px solid var(--border)',
                  borderRadius: 12, padding: '14px 16px',
                  fontSize: 13, lineHeight: 1.7, color: 'var(--dark)',
                }}>
                  {composition}
                </div>
              </div>

              {/* Usage */}
              <div style={{ marginBottom: 28 }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12,
                }}>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: 'var(--accent-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ChevronRight size={14} color="var(--accent)" />
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    {t.products.usageLabel}
                  </span>
                </div>
                <div style={{
                  background: 'var(--accent-glow)', border: '1px solid rgba(16,185,129,0.25)',
                  borderRadius: 12, padding: '14px 16px',
                  fontSize: 13, lineHeight: 1.7, color: 'var(--dark)',
                }}>
                  {usage}
                </div>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 28 }}>
              {(lang === 'uz' ? product.leaflet_uz : product.leaflet_ru)?.map((sec, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'var(--light)',
                    borderRadius: 16,
                    padding: 16,
                    border: '1px solid var(--border)',
                  }}
                >
                  <h4 style={{
                    fontSize: 14,
                    fontWeight: 800,
                    color: '#04432C',
                    marginBottom: 10,
                    letterSpacing: '-0.01em',
                  }}>
                    {sec.title}
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {sec.content.map((p, pIdx) => (
                      <p
                        key={pIdx}
                        style={{
                          fontSize: 13,
                          lineHeight: 1.6,
                          color: 'var(--dark-2)',
                        }}
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* CTA */}
          <a
            href={product.telegramlink || 'https://t.me/kamafarm_bot'}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '14px 24px', borderRadius: 12,
              background: '#04432C', color: 'white',
              textDecoration: 'none', fontSize: 14, fontWeight: 700,
              boxShadow: '0 8px 24px rgba(4,67,44,0.3)',
              transition: 'all 0.2s ease',
              marginTop: 'auto',
              justifyContent: 'center',
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
      <div className="product-card-image-container" style={{ position: 'relative', height: 220, overflow: 'hidden', background: 'var(--light-2)' }}>
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
          background: 'var(--card-bg)',
          color: 'var(--primary)',
          padding: '4px 10px', borderRadius: 100,
          fontSize: 10, fontWeight: 700,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          border: '1px solid var(--border)',
        }}>
          {(() => {
            const keys = ['Barchasi', 'Miya faoliyati', 'Kamqonlik', 'Bolalar uchun', 'Kattalar uchun'];
            const idx = keys.indexOf(product.category);
            return idx !== -1 ? t.products.filters[idx] : product.category;
          })()}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '20px 20px 0', flex: 1 }}>
        <h3 style={{
          fontSize: 16, fontWeight: 800, color: 'var(--dark)',
          letterSpacing: '-0.02em', marginBottom: 8, lineHeight: 1.3,
        }}>
          {name}
        </h3>
        <p style={{
          fontSize: 13, lineHeight: 1.6, color: 'var(--text-muted)',
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
      <section id="products" className="section-py" style={{ background: 'var(--light)' }}>
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
              color: 'var(--dark)', marginBottom: 16,
            }}>
              {t.products.heading}
            </h2>
            <p style={{ fontSize: 15, color: 'var(--text-muted)', maxWidth: 520, margin: '0 auto' }}>
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
                  borderRadius: 16, border: '1.5px solid var(--border)',
                  fontSize: 15, outline: 'none',
                  background: 'var(--input-bg)',
                  color: 'var(--dark)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
                  fontFamily: 'inherit',
                  transition: 'all 0.2s ease',
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
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
