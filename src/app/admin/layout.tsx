'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Leaf, LayoutDashboard, Users, Package, Settings, LogOut, Briefcase, Map,
  Menu, X, ExternalLink, HelpCircle, Camera, Monitor, Award,
} from 'lucide-react';
import Image from 'next/image';

const navItems = [
  { href: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/admin/leads', icon: Users, label: 'Arizalar' },
  { href: '/admin/hero', icon: Monitor, label: 'Asosiy Banner' },
  { href: '/admin/partners', icon: Award, label: 'Hamkor logolari' },
  { href: '/admin/about', icon: Leaf, label: 'Biz haqimizda' },
  { href: '/admin/products', icon: Package, label: 'Mahsulotlar' },
  { href: '/admin/b2b', icon: Briefcase, label: 'B2B Hamkorlik' },
  { href: '/admin/distribution', icon: Map, label: 'Distribyutsiya' },
  { href: '/admin/faq', icon: HelpCircle, label: 'FAQ / Savollar' },
  { href: '/admin/instagram', icon: Camera, label: 'Instagram' },
  { href: '/admin/settings', icon: Settings, label: 'Kontaktlar' },
];

import '@/app/admin-responsive.css';
import { supabase } from '@/lib/supabase';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
      
      {/* Mobile Header */}
      {isMobile && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0,
          height: 60, background: '#04432C',
          display: 'flex', alignItems: 'center', padding: '0 16px',
          justifyContent: 'space-between', zIndex: 40,
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
              <Image src="/icon.png" alt="Logo" fill style={{ objectFit: 'contain', padding: 2 }} />
            </div>
            <span style={{ color: 'white', fontWeight: 800, fontSize: 16 }}>Kamafarm Admin</span>
          </div>
          <button
            onClick={() => setSidebarOpen(true)}
            style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <Menu size={24} />
          </button>
        </div>
      )}

      {/* Mobile Overlay */}
      {isMobile && sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 45 }}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        animate={{ 
          width: isMobile ? 280 : (sidebarOpen ? 240 : 68),
          x: isMobile ? (sidebarOpen ? 0 : -280) : 0
        }}
        initial={false}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
        style={{
          background: '#04432C', color: 'white',
          display: 'flex', flexDirection: 'column',
          flexShrink: 0, overflow: 'hidden',
          position: isMobile ? 'fixed' : 'sticky',
          top: 0, left: 0, bottom: 0,
          height: '100vh', zIndex: 50,
          boxShadow: isMobile ? '4px 0 24px rgba(0,0,0,0.2)' : 'none',
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
            <Image src="/icon.png" alt="Kamafarm Logo" fill style={{ objectFit: 'contain', padding: 2 }} />
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
        {!isMobile && (
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
        )}

        {/* Mobile close button inside sidebar */}
        {isMobile && (
          <button
            onClick={() => setSidebarOpen(false)}
            style={{
              position: 'absolute', top: 16, right: 16,
              width: 32, height: 32, borderRadius: 10,
              background: 'rgba(255,255,255,0.08)', border: 'none',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <X size={18} color="white" />
          </button>
        )}

        {/* Nav items */}
        <nav style={{ flex: 1, padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {navItems.map(({ href, icon: Icon, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={() => {
          if (isMobile) setSidebarOpen(false);
        }}
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
                {(sidebarOpen || isMobile) && (
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
            href="https://kamafarm.uz"
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
            {sidebarOpen && <span style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.5)', whiteSpace: 'nowrap' }}>kamafarm.uz</span>}
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
      <main style={{ flex: 1, overflow: 'auto', minWidth: 0, paddingTop: isMobile ? 60 : 0 }}>
        <div style={{ padding: isMobile ? '16px' : '0' }}>
          {children}
        </div>
      </main>
    </div>
  );
}
