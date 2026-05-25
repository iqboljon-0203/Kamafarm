'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Users, Package, TrendingUp, ArrowRight, Activity } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState([
    { icon: Users, label: 'Jami arizalar', value: '0', change: 'Hisoblanmoqda...', color: '#04432C' },
    { icon: Package, label: "Mahsulotlar soni", value: '0', change: 'Katalogda', color: '#10B981' },
    { icon: TrendingUp, label: 'Yangi arizalar', value: '0', change: 'Ko\'rilmagan', color: '#F59E0B' },
    { icon: Activity, label: 'Sayt tashrifi', value: '0', change: 'Oxirgi 30 kun', color: '#8B5CF6' },
  ]);

  useEffect(() => {
    fetchData();
  }, []);

  const getToken = () => localStorage.getItem('kamafarm_admin_token') || 'kamafarm-admin-2026';

  const fetchData = async () => {
    try {
      // Fetch products
      const pRes = await fetch('/api/products');
      const pData = await pRes.json();
      const productCount = pData.products?.length || 0;

      // Fetch leads
      const lRes = await fetch('/api/leads', {
        headers: { 'Authorization': `Bearer ${getToken()}` }
      });
      const lData = await lRes.json();
      const leads = lData.leads || [];
      const leadCount = leads.length;
      const newLeadCount = leads.filter((l: any) => l.status === 'new').length;

      setStats([
        { icon: Users, label: 'Jami arizalar', value: String(leadCount), change: 'Barcha vaqt', color: '#04432C' },
        { icon: Package, label: "Mahsulotlar soni", value: String(productCount), change: 'Katalogda', color: '#10B981' },
        { icon: TrendingUp, label: 'Yangi arizalar', value: String(newLeadCount), change: 'Ko\'rilmagan', color: '#F59E0B' },
        { icon: Activity, label: 'Sayt tashrifi', value: '1.2K', change: 'Demo', color: '#8B5CF6' },
      ]);
    } catch (error) {
      console.error('Failed to fetch stats', error);
    }
  };

  return (
    <div style={{ padding: 32 }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 24, fontWeight: 900, color: '#0F172A', letterSpacing: '-0.02em', marginBottom: 6 }}>
          Dashboard
        </h1>
        <p style={{ fontSize: 14, color: '#64748B' }}>
          Kamafarm Healthcare boshqaruv paneli
        </p>
      </div>

      {/* Stats grid */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 20, marginBottom: 40,
      }}
      className="admin-stats-grid"
      >
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              style={{
                background: 'white', borderRadius: 16,
                padding: '24px', border: '1px solid #E2E8F0',
                boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
              }}
            >
              <div style={{
                width: 40, height: 40, borderRadius: 12,
                background: `${stat.color}15`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 16,
              }}>
                <Icon size={20} color={stat.color} strokeWidth={2} />
              </div>
              <div style={{ fontSize: 28, fontWeight: 900, color: '#0F172A', letterSpacing: '-0.03em', marginBottom: 4 }}>
                {stat.value}
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 4 }}>
                {stat.label}
              </div>
              <div style={{ fontSize: 12, color: '#94A3B8' }}>{stat.change}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Quick actions */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: 20,
      }}
      className="admin-actions-grid"
      >
        {[
          { href: '/admin/leads', icon: Users, title: "Arizalarni ko'rish", desc: 'B2B forma orqali kelgan so\'rovlar', color: '#04432C' },
          { href: '/admin/products', icon: Package, title: 'Mahsulotlarni boshqarish', desc: 'Katalog CRUD operatsiyalari', color: '#10B981' },
        ].map((action, i) => {
          const Icon = action.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
            >
              <Link
                href={action.href}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: 28, background: 'white', borderRadius: 16,
                  border: '1px solid #E2E8F0', textDecoration: 'none',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)';
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = action.color;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 1px 4px rgba(0,0,0,0.04)';
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = '#E2E8F0';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 14,
                    background: `${action.color}12`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon size={22} color={action.color} strokeWidth={2} />
                  </div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: '#0F172A', marginBottom: 4 }}>{action.title}</div>
                    <div style={{ fontSize: 12, color: '#94A3B8' }}>{action.desc}</div>
                  </div>
                </div>
                <ArrowRight size={18} color="#CBD5E1" />
              </Link>
            </motion.div>
          );
        })}
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .admin-stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .admin-actions-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
