'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

function AccordionItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07 }}
      style={{
        border: `1.5px solid ${open ? 'rgba(16,185,129,0.3)' : '#E2E8F0'}`,
        borderRadius: 16,
        overflow: 'hidden',
        background: open ? '#F0FDF4' : 'white',
        transition: 'all 0.25s ease',
        boxShadow: open ? '0 4px 20px rgba(16,185,129,0.08)' : '0 1px 4px rgba(0,0,0,0.03)',
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%', textAlign: 'left',
          padding: '22px 24px',
          background: 'transparent', border: 'none',
          cursor: 'pointer', fontFamily: 'inherit',
          display: 'flex', alignItems: 'center', gap: 16,
        }}
      >
        {/* Number */}
        <div style={{
          width: 32, height: 32, borderRadius: 10, flexShrink: 0,
          background: open ? '#04432C' : '#F1F5F9',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 12, fontWeight: 700,
          color: open ? 'white' : '#64748B',
          transition: 'all 0.2s ease',
        }}>
          {String(index + 1).padStart(2, '0')}
        </div>
        <span style={{
          flex: 1, fontSize: 15, fontWeight: 600,
          color: open ? '#04432C' : '#0F172A',
          lineHeight: 1.4, transition: 'color 0.2s ease',
        }}>
          {question}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
            background: open ? '#04432C' : '#F1F5F9',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <ChevronDown size={16} color={open ? 'white' : '#64748B'} strokeWidth={2.5} />
        </motion.div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{
              padding: '0 24px 22px 72px',
              fontSize: 14, lineHeight: 1.75,
              color: '#475569',
            }}>
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQSection() {
  const { t } = useLanguage();

  return (
    <section id="faq" className="section-py" style={{ background: 'white' }}>
      <div className="container">
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: 56 }}
          >
            <span className="section-label" style={{ display: 'block', marginBottom: 16 }}>
              {t.faq.sectionLabel}
            </span>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
              <div style={{
                width: 56, height: 56, borderRadius: 16,
                background: 'linear-gradient(135deg, #04432C 0%, #10B981 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 8px 24px rgba(4,67,44,0.25)',
              }}>
                <HelpCircle size={26} color="white" strokeWidth={2} />
              </div>
            </div>
            <h2 style={{
              fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
              fontWeight: 900, letterSpacing: '-0.03em', color: '#0F172A',
            }}>
              {t.faq.heading}
            </h2>
          </motion.div>

          {/* FAQ Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {t.faq.items.map((item, i) => (
              <AccordionItem
                key={i}
                question={item.q}
                answer={item.a}
                index={i}
              />
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              marginTop: 48, textAlign: 'center',
              padding: '32px', background: '#F0FDF4',
              borderRadius: 20, border: '1px solid rgba(16,185,129,0.15)',
            }}
          >
            <p style={{ fontSize: 15, color: '#374151', marginBottom: 20 }}>
              Savolingiz javob topmadimu? Biz bilan bog'laning!
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href="https://t.me/kamafarm_bot"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ textDecoration: 'none', fontSize: 14 }}
              >
                Telegram orqali yozing
              </a>
              <a
                href="tel:+998906031428"
                className="btn btn-outline"
                style={{ textDecoration: 'none', fontSize: 14 }}
              >
                Qo'ng'iroq qiling
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
