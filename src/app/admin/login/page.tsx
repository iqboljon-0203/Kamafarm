'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Leaf, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });

    if (authError || !data.session) {
      setError("Email yoki parol noto'g'ri. Iltimos, tekshirib qaytadan kiritib ko'ring.");
    } else {
      localStorage.setItem('kamafarm_admin_token', data.session.access_token);
      document.cookie = `admin_token=${data.session.access_token}; path=/; max-age=86400; secure; samesite=strict`;
      router.push('/admin');
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #04432C 0%, #065a3b 50%, #0F172A 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 20,
    }}>
      {/* Background pattern */}
      <div style={{
        position: 'fixed', inset: 0, opacity: 0.05,
        backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)`,
        backgroundSize: '24px 24px',
        pointerEvents: 'none',
      }} />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as any }}
        style={{
          background: 'white', borderRadius: 24,
          padding: 48, width: '100%', maxWidth: 420,
          boxShadow: '0 40px 100px rgba(0,0,0,0.3)',
          position: 'relative',
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{
            width: 64, height: 64, borderRadius: '50%',
            background: 'white', margin: '0 auto 20px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(4,67,44,0.2)',
            position: 'relative', overflow: 'hidden'
          }}>
            <Image src="/logo.png" alt="Kamafarm Logo" fill style={{ objectFit: 'contain', padding: 4 }} />
          </div>
          <h1 style={{ fontSize: 20, fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em', marginBottom: 6 }}>
            Kamafarm Admin
          </h1>
          <p style={{ fontSize: 13, color: '#64748B', fontWeight: 500 }}>
            Boshqaruv paneliga kirish
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 8 }}>
              Email
            </label>
            <input
              className="input"
              type="email"
              placeholder="admin@kamafarm.uz"
              value={form.email}
              onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 8 }}>
              Parol
            </label>
            <div style={{ position: 'relative' }}>
              <input
                className="input"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
                style={{ paddingRight: 48 }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8',
                }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <div style={{
              padding: '10px 14px', background: '#FEF2F2',
              border: '1px solid #FECACA', borderRadius: 10,
              fontSize: 13, color: '#DC2626',
            }}>
              {error}
            </div>
          )}

          <motion.button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{ marginTop: 8, padding: '14px', fontSize: 14, justifyContent: 'center' }}
            whileHover={!loading ? { scale: 1.02 } : {}}
            whileTap={!loading ? { scale: 0.98 } : {}}
          >
            {loading ? (
              <><Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> Kirilmoqda...</>
            ) : (
              <><Lock size={16} /> Kirish</>
            )}
          </motion.button>
        </form>

      </motion.div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
