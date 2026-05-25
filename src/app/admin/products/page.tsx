'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Plus, Edit2, Trash2, X, Save, Package } from 'lucide-react';
import type { Product } from '@/lib/types';

const categories = ['Miya faoliyati', 'Kamqonlik', 'Bolalar uchun', 'Kattalar uchun'];

const emptyProduct: Omit<Product, 'id'> = {
  name_uz: '', name_ru: '',
  description_uz: '', description_ru: '',
  composition_uz: '', composition_ru: '',
  usage_uz: '', usage_ru: '',
  category: 'Miya faoliyati',
  image: '/fiziobrain.png',
  badge: 'Uzbekistan-Indian Partnership',
  telegramlink: '',
};

function ProductFormModal({ product, onSave, onClose }: {
  product?: Product;
  onSave: (p: Partial<Product>) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<Partial<Product>>(product || emptyProduct);

  const update = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const inputStyle = {
    width: '100%', padding: '10px 12px',
    border: '1.5px solid #E2E8F0', borderRadius: 8,
    fontSize: 13, fontFamily: 'inherit', outline: 'none',
    background: 'white', color: '#0F172A',
  };

  const labelStyle = {
    display: 'block', fontSize: 11, fontWeight: 600,
    color: '#64748B', marginBottom: 6, textTransform: 'uppercase' as const, letterSpacing: '0.04em',
  };

  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        style={{
          background: 'white', borderRadius: 20,
          maxWidth: 680, width: '100%', maxHeight: '90vh', overflow: 'auto',
          boxShadow: '0 40px 100px rgba(0,0,0,0.2)',
        }}
      >
        {/* Header */}
        <div style={{
          padding: '24px 28px', borderBottom: '1px solid #E2E8F0',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          position: 'sticky', top: 0, background: 'white', zIndex: 10,
        }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: '#0F172A' }}>
            {product ? 'Mahsulotni tahrirlash' : 'Yangi mahsulot qo\'shish'}
          </h2>
          <button onClick={onClose} style={{
            width: 32, height: 32, borderRadius: 8, border: '1px solid #E2E8F0',
            background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <X size={16} />
          </button>
        </div>

        {/* Form */}
        <div style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Category */}
          <div>
            <label style={labelStyle}>Kategoriya</label>
            <select
              value={form.category}
              onChange={(e) => update('category', e.target.value)}
              style={{ ...inputStyle, cursor: 'pointer' }}
            >
              {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Names */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={labelStyle}>Nomi (UZ)</label>
              <input style={inputStyle} value={form.name_uz || ''} onChange={(e) => update('name_uz', e.target.value)} placeholder="Uzbekcha nom" />
            </div>
            <div>
              <label style={labelStyle}>Nomi (RU)</label>
              <input style={inputStyle} value={form.name_ru || ''} onChange={(e) => update('name_ru', e.target.value)} placeholder="Ruscha nom" />
            </div>
          </div>

          {/* Descriptions */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={labelStyle}>Tavsif (UZ)</label>
              <textarea style={{ ...inputStyle, height: 100, resize: 'vertical' }} value={form.description_uz || ''} onChange={(e) => update('description_uz', e.target.value)} placeholder="Uzbekcha tavsif" />
            </div>
            <div>
              <label style={labelStyle}>Tavsif (RU)</label>
              <textarea style={{ ...inputStyle, height: 100, resize: 'vertical' }} value={form.description_ru || ''} onChange={(e) => update('description_ru', e.target.value)} placeholder="Ruscha tavsif" />
            </div>
          </div>

          {/* Composition */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={labelStyle}>Tarkibi (UZ)</label>
              <textarea style={{ ...inputStyle, height: 80, resize: 'vertical' }} value={form.composition_uz || ''} onChange={(e) => update('composition_uz', e.target.value)} placeholder="Tarkibi uzbekcha" />
            </div>
            <div>
              <label style={labelStyle}>Tarkibi (RU)</label>
              <textarea style={{ ...inputStyle, height: 80, resize: 'vertical' }} value={form.composition_ru || ''} onChange={(e) => update('composition_ru', e.target.value)} placeholder="Tarkibi ruscha" />
            </div>
          </div>

          {/* Usage */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={labelStyle}>Qo'llash (UZ)</label>
              <textarea style={{ ...inputStyle, height: 80, resize: 'vertical' }} value={form.usage_uz || ''} onChange={(e) => update('usage_uz', e.target.value)} placeholder="Qo'llash usuli uzbekcha" />
            </div>
            <div>
              <label style={labelStyle}>Qo'llash (RU)</label>
              <textarea style={{ ...inputStyle, height: 80, resize: 'vertical' }} value={form.usage_ru || ''} onChange={(e) => update('usage_ru', e.target.value)} placeholder="Применение на русском" />
            </div>
          </div>

          {/* Telegram link */}
          <div>
            <label style={labelStyle}>Telegram havola</label>
            <input style={inputStyle} value={form.telegramlink || ''} onChange={(e) => update('telegramlink', e.target.value)} placeholder="https://t.me/kamafarm_bot?start=product-id" />
          </div>

          {/* Save button */}
          <button
            onClick={() => { onSave(form); onClose(); }}
            className="btn btn-primary"
            style={{ justifyContent: 'center', padding: '14px', fontSize: 14, marginTop: 8 }}
          >
            <Save size={16} />
            Saqlash
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default function ProductsAdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [addNew, setAddNew] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch('/api/products');
    const data = await res.json();
    setProducts(data.products || []);
  };

  const getToken = () => localStorage.getItem('kamafarm_admin_token') || 'kamafarm-admin-2026';

  const handleSave = async (form: Partial<Product>) => {
    if (editProduct) {
      await fetch('/api/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getToken()}` },
        body: JSON.stringify({ ...editProduct, ...form }),
      });
    } else {
      await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${getToken()}` },
        body: JSON.stringify({ id: `prod-${Date.now()}`, ...emptyProduct, ...form }),
      });
    }
    fetchProducts();
    setEditProduct(null);
    setAddNew(false);
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/products?id=${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    fetchProducts();
    setDeleteId(null);
  };

  return (
    <div style={{ padding: 32 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 900, color: '#0F172A', letterSpacing: '-0.02em', marginBottom: 6 }}>
            Mahsulotlar
          </h1>
          <p style={{ fontSize: 14, color: '#64748B' }}>{products.length} ta mahsulot</p>
        </div>
        <button onClick={() => setAddNew(true)} className="btn btn-primary" style={{ gap: 8, fontSize: 13 }}>
          <Plus size={16} />
          Yangi mahsulot
        </button>
      </div>

      {/* Products table */}
      <div style={{
        background: 'white', borderRadius: 20,
        border: '1px solid #E2E8F0',
        boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
        overflow: 'hidden',
      }}>
        {/* Header row */}
        <div style={{
          display: 'grid', gridTemplateColumns: '60px 1fr 120px 1fr 100px',
          padding: '14px 20px', background: '#F8FAFC',
          borderBottom: '1px solid #E2E8F0',
          fontSize: 11, fontWeight: 700, color: '#64748B',
          letterSpacing: '0.06em', textTransform: 'uppercase',
        }}>
          <div>Rasm</div>
          <div>Mahsulot nomi</div>
          <div>Kategoriya</div>
          <div>Tavsif</div>
          <div>Amallar</div>
        </div>

        {products.map((product, i) => (
          <div
            key={product.id}
            style={{
              display: 'grid', gridTemplateColumns: '60px 1fr 120px 1fr 100px',
              padding: '16px 20px', alignItems: 'center',
              borderBottom: i < products.length - 1 ? '1px solid #F1F5F9' : 'none',
              transition: 'background 0.15s ease',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = '#F8FAFC'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = 'transparent'; }}
          >
            {/* Image */}
            <div style={{ width: 48, height: 48, borderRadius: 10, overflow: 'hidden', position: 'relative', background: '#F1F5F9' }}>
              <Image src={product.image} alt={product.name_uz} fill style={{ objectFit: 'cover' }} />
            </div>
            {/* Name */}
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#0F172A', marginBottom: 2 }}>{product.name_uz}</div>
              <div style={{ fontSize: 12, color: '#94A3B8' }}>{product.name_ru}</div>
            </div>
            {/* Category */}
            <div>
              <span style={{
                padding: '4px 10px', borderRadius: 100,
                fontSize: 11, fontWeight: 700,
                background: 'rgba(4,67,44,0.08)', color: '#04432C',
              }}>
                {product.category}
              </span>
            </div>
            {/* Description */}
            <div style={{
              fontSize: 12, color: '#64748B', lineHeight: 1.5,
              display: '-webkit-box',
              WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
              paddingRight: 16,
            }}>
              {product.description_uz}
            </div>
            {/* Actions */}
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={() => setEditProduct(product)}
                style={{
                  width: 34, height: 34, borderRadius: 8,
                  background: 'rgba(4,67,44,0.06)', border: 'none',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(4,67,44,0.12)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(4,67,44,0.06)'; }}
              >
                <Edit2 size={14} color="#04432C" />
              </button>
              <button
                onClick={() => setDeleteId(product.id)}
                style={{
                  width: 34, height: 34, borderRadius: 8,
                  background: 'rgba(220,38,38,0.06)', border: 'none',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(220,38,38,0.12)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(220,38,38,0.06)'; }}
              >
                <Trash2 size={14} color="#DC2626" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Product form modal */}
      <AnimatePresence>
        {(editProduct || addNew) && (
          <ProductFormModal
            product={editProduct || undefined}
            onSave={handleSave}
            onClose={() => { setEditProduct(null); setAddNew(false); }}
          />
        )}
      </AnimatePresence>

      {/* Delete confirm modal */}
      <AnimatePresence>
        {deleteId && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDeleteId(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              style={{
                background: 'white', borderRadius: 20, padding: 32,
                maxWidth: 380, width: '100%', textAlign: 'center',
                boxShadow: '0 40px 100px rgba(0,0,0,0.2)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{
                width: 52, height: 52, borderRadius: 16,
                background: 'rgba(220,38,38,0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 16px',
              }}>
                <Trash2 size={24} color="#DC2626" />
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: '#0F172A', marginBottom: 8 }}>O'chirishni tasdiqlang</h3>
              <p style={{ fontSize: 13, color: '#64748B', marginBottom: 24 }}>
                Bu mahsulot butunlay o'chiriladi. Bu amalni bekor qilib bo'lmaydi.
              </p>
              <div style={{ display: 'flex', gap: 12 }}>
                <button onClick={() => setDeleteId(null)} className="btn btn-outline" style={{ flex: 1, justifyContent: 'center', fontSize: 13 }}>
                  Bekor qilish
                </button>
                <button onClick={() => handleDelete(deleteId)} style={{
                  flex: 1, padding: '12px', borderRadius: 10, border: 'none',
                  background: '#DC2626', color: 'white', fontSize: 13, fontWeight: 700,
                  cursor: 'pointer', fontFamily: 'inherit',
                }}>
                  Ha, o'chirish
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
