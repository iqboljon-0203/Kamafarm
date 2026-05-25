'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Leaf, LayoutDashboard, Users, Package, Settings, LogOut,
  Menu, X, ExternalLink,
} from 'lucide-react';
import Image from 'next/image';

const navItems = [
  { href: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/admin/leads', icon: Users, label: 'Arizalar' },
  { href: '/admin/products', icon: Package, label: 'Mahsulotlar' },
  { href: '/admin/settings', icon: Settings, label: 'Sozlamalar' },
];

import { supabase } from '@/lib/supabase';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session && pathname !== '/admin/login') {
        router.replace('/admin/login');
      } else if (data.session) {
        localStorage.setItem('kamafarm_admin_token', data.session.access_token);
      }
    };
    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session && pathname !== '/admin/login') {
        router.replace('/admin/login');
      } else if (session) {
        localStorage.setItem('kamafarm_admin_token', session.access_token);
      }
    });

    return () => subscription.unsubscribe();
  }, [pathname, router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('kamafarm_admin_token');
    document.cookie = 'admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    router.push('/admin/login');
  };

  if (!mounted || pathname === '/admin/login') return <>{children}</>;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F8FAFC' }}>
      {/* Sidebar */}
      <motion.aside
        animate={{ width: sidebarOpen ? 240 : 68 }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
        style={{
          background: '#04432C', color: 'white',
          display: 'flex', flexDirection: 'column',
          flexShrink: 0, overflow: 'hidden',
          position: 'sticky', top: 0, height: '100vh',
        }}
      >
        {/* Sidebar header */}
        <div style={{
          padding: '20px 16px', display: 'flex', alignItems: 'center',
          gap: 12, borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
            background: 'white',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative', overflow: 'hidden'
          }}>
            <Image src="/logo.png" alt="Kamafarm Logo" fill style={{ objectFit: 'contain', padding: 2 }} />
          </div>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div style={{ fontWeight: 800, fontSize: 14, lineHeight: 1.2 }}>Kamafarm</div>
              <div style={{ fontSize: 10, color: '#34D399', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Admin Panel</div>
            </motion.div>
          )}
        </div>

        {/* Toggle button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{
            margin: '12px auto',
            width: 32, height: 32, borderRadius: 10,
            background: 'rgba(255,255,255,0.08)', border: 'none',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          {sidebarOpen ? <X size={14} color="white" /> : <Menu size={14} color="white" />}
        </button>

        {/* Nav items */}
        <nav style={{ flex: 1, padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {navItems.map(({ href, icon: Icon, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '10px 12px', borderRadius: 10,
                  textDecoration: 'none',
                  background: active ? 'rgba(255,255,255,0.12)' : 'transparent',
                  border: `1px solid ${active ? 'rgba(255,255,255,0.15)' : 'transparent'}`,
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  if (!active) (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.06)';
                }}
                onMouseLeave={(e) => {
                  if (!active) (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
                }}
              >
                <Icon size={18} color={active ? '#34D399' : 'rgba(255,255,255,0.65)'} strokeWidth={active ? 2.5 : 2} />
                {sidebarOpen && (
                  <span style={{ fontSize: 13, fontWeight: active ? 700 : 500, color: active ? 'white' : 'rgba(255,255,255,0.65)', whiteSpace: 'nowrap' }}>
                    {label}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom: View site + logout */}
        <div style={{ padding: '12px 10px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', gap: 4 }}>
          <Link
            href="/"
            target="_blank"
            style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '10px 12px', borderRadius: 10, textDecoration: 'none',
              background: 'transparent', transition: 'all 0.15s ease',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.06)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; }}
          >
            <ExternalLink size={18} color="rgba(255,255,255,0.5)" strokeWidth={2} />
            {sidebarOpen && <span style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.5)', whiteSpace: 'nowrap' }}>Saytni ko'rish</span>}
          </Link>
          <button
            onClick={handleLogout}
            style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '10px 12px', borderRadius: 10, background: 'transparent',
              border: 'none', cursor: 'pointer', width: '100%', transition: 'all 0.15s ease',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,100,100,0.08)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
          >
            <LogOut size={18} color="rgba(255,100,100,0.7)" strokeWidth={2} />
            {sidebarOpen && <span style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,100,100,0.7)', whiteSpace: 'nowrap' }}>Chiqish</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main content */}
      <main style={{ flex: 1, overflow: 'auto', minWidth: 0 }}>
        {children}
      </main>
    </div>
  );
}
