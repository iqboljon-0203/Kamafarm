'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, RefreshCw, CheckCircle2, Clock, Search } from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  phone: string;
  company?: string;
  source?: string;
  status: 'new' | 'contacted';
  created_at: string;
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins} daqiqa oldin`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} soat oldin`;
  const days = Math.floor(hours / 24);
  return `${days} kun oldin`;
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchLeads();
  }, []);

  const getToken = () => localStorage.getItem('kamafarm_admin_token') || 'kamafarm-admin-2026';

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/leads', {
        headers: { 'Authorization': `Bearer ${getToken()}` }
      });
      const data = await res.json();
      setLeads(data.leads || []);
    } catch (e) {
      console.error('Failed to fetch leads', e);
    }
    setLoading(false);
  };

  const filtered = leads.filter((l) =>
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.phone.includes(search) ||
    (l.company || '').toLowerCase().includes(search.toLowerCase())
  );

  const toggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'new' ? 'contacted' : 'new';
    
    // Optimistic update
    setLeads((prev) => prev.map((l) =>
      l.id === id ? { ...l, status: newStatus as 'new' | 'contacted' } : l
    ));

    try {
      await fetch('/api/leads', {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify({ id, status: newStatus }),
      });
    } catch (e) {
      console.error('Failed to update lead status', e);
      // Revert on error by re-fetching
      fetchLeads();
    }
  };

  const newCount = leads.filter((l) => l.status === 'new').length;

  return (
    <div style={{ padding: 32 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 900, color: '#0F172A', letterSpacing: '-0.02em', marginBottom: 6 }}>
            Arizalar
          </h1>
          <p style={{ fontSize: 14, color: '#64748B' }}>
            <span style={{ fontWeight: 700, color: '#04432C' }}>{newCount}</span> ta yangi ariza
          </p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <div style={{ position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
            <input
              style={{
                padding: '10px 12px 10px 36px', border: '1.5px solid #E2E8F0',
                borderRadius: 10, fontSize: 13, outline: 'none', background: 'white',
                width: 240, fontFamily: 'inherit',
              }}
              placeholder="Qidirish..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button
            onClick={fetchLeads}
            className="btn btn-outline"
            style={{ gap: 8, fontSize: 13 }}
            disabled={loading}
          >
            <RefreshCw size={14} style={{ animation: loading ? 'spin 1s linear infinite' : 'none' }} />
            {loading ? 'Yuklanmoqda...' : 'Yangilash'}
          </button>
        </div>
      </div>

      {/* Table */}
      <div style={{
        background: 'white', borderRadius: 20,
        border: '1px solid #E2E8F0',
        boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
        overflow: 'hidden',
      }}>
        {/* Table header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 140px 160px 100px 140px 80px',
          padding: '14px 20px',
          background: '#F8FAFC',
          borderBottom: '1px solid #E2E8F0',
          fontSize: 11, fontWeight: 700, color: '#64748B',
          letterSpacing: '0.06em', textTransform: 'uppercase',
        }}>
          <div>Ism</div>
          <div>Telefon</div>
          <div>Kompaniya</div>
          <div>Manba</div>
          <div>Vaqt</div>
          <div>Status</div>
        </div>

        {/* Table rows */}
        {loading && leads.length === 0 ? (
           <div style={{ textAlign: 'center', padding: '60px 20px', color: '#94A3B8', fontSize: 14 }}>
             Yuklanmoqda...
           </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#94A3B8', fontSize: 14 }}>
            <Users size={40} style={{ margin: '0 auto 12px', opacity: 0.3 }} />
            Ariza topilmadi
          </div>
        ) : (
          filtered.map((lead, i) => (
            <motion.div
              key={lead.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 140px 160px 100px 140px 80px',
                padding: '16px 20px',
                alignItems: 'center',
                borderBottom: i < filtered.length - 1 ? '1px solid #F1F5F9' : 'none',
                transition: 'background 0.15s ease',
                cursor: 'default',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = '#F8FAFC'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = 'transparent'; }}
            >
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#0F172A', marginBottom: 2 }}>{lead.name}</div>
                <div style={{ fontSize: 11, color: '#94A3B8' }}>{lead.id.substring(0, 8)}...</div>
              </div>
              <div style={{ fontSize: 13, color: '#374151', fontWeight: 500 }}>{lead.phone}</div>
              <div style={{ fontSize: 13, color: '#374151' }}>{lead.company || '—'}</div>
              <div>
                <span style={{
                  padding: '3px 10px', borderRadius: 100,
                  fontSize: 11, fontWeight: 700,
                  background: lead.source === 'b2b_form' ? 'rgba(4,67,44,0.08)' : 'rgba(16,185,129,0.08)',
                  color: lead.source === 'b2b_form' ? '#04432C' : '#10B981',
                }}>
                  {lead.source === 'b2b_form' ? 'B2B' : 'Sayt'}
                </span>
              </div>
              <div style={{ fontSize: 12, color: '#94A3B8' }}>{timeAgo(lead.created_at)}</div>
              <div>
                <button
                  onClick={() => toggleStatus(lead.id, lead.status)}
                  style={{
                    padding: '5px 12px', borderRadius: 100,
                    fontSize: 11, fontWeight: 700, border: 'none', cursor: 'pointer',
                    background: lead.status === 'new' ? 'rgba(245,158,11,0.1)' : 'rgba(16,185,129,0.1)',
                    color: lead.status === 'new' ? '#D97706' : '#059669',
                    display: 'flex', alignItems: 'center', gap: 4,
                    fontFamily: 'inherit',
                  }}
                >
                  {lead.status === 'new' ? (
                    <><Clock size={10} /> Yangi</>
                  ) : (
                    <><CheckCircle2 size={10} /> Aloqa</>
                  )}
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
