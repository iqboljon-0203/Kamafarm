'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Save, CheckCircle2, Globe, Plus, Trash2, ArrowUp, ArrowDown,
  Layout, Camera, Image as ImageIcon, Link2, Upload, X
} from 'lucide-react';
import { translations } from '@/lib/i18n';
import Image from 'next/image';

const defaultInstagramPosts = [
  { id: 1, image: '/instagram-1.png', likes: 287, comments: 24, caption: "Premium sifatli vitaminlar...", href: 'https://instagram.com/kamafarm.healthcare' },
  { id: 2, image: '/instagram-2.png', likes: 342, comments: 31, caption: "Farzandingiz salomatligi...", href: 'https://instagram.com/kamafarm.healthcare' },
  { id: 3, image: '/instagram-3.png', likes: 198, comments: 15, caption: "Ferro-Glob — temir tanqisligiga...", href: 'https://instagram.com/kamafarm.healthcare' },
  { id: 4, image: '/instagram-4.png', likes: 456, comments: 38, caption: "GMP sertifikatlangan laboratoriyamizda...", href: 'https://instagram.com/kamafarm.healthcare' },
  { id: 5, image: '/instagram-5.png', likes: 312, comments: 27, caption: "Fiziobrain DHA...", href: 'https://instagram.com/kamafarm.healthcare' },
  { id: 6, image: '/instagram-6.png', likes: 523, comments: 42, caption: "VitaKids Gummies...", href: 'https://instagram.com/kamafarm.healthcare' },
];

export default function InstagramPage() {
  const [activeTab, setActiveTab] = useState<'general' | 'posts'>('general');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // General state
  const [sectionLabelUz, setSectionLabelUz] = useState('');
  const [sectionLabelRu, setSectionLabelRu] = useState('');
  const [headingUz, setHeadingUz] = useState('');
  const [headingRu, setHeadingRu] = useState('');
  const [handle, setHandle] = useState('');
  const [bioUz, setBioUz] = useState('');
  const [bioRu, setBioRu] = useState('');
  const [followBtnUz, setFollowBtnUz] = useState('');
  const [followBtnRu, setFollowBtnRu] = useState('');
  
  // Stats texts
  const [statsUz, setStatsUz] = useState({ posts: '', followers: '', following: '' });
  const [statsRu, setStatsRu] = useState({ posts: '', followers: '', following: '' });

  // Profile Stats Numbers
  const [profileStats, setProfileStats] = useState({ posts: 0, followers: '', following: 0 });

  // Posts state
  const [postsUz, setPostsUz] = useState<any[]>([]);
  const [postsRu, setPostsRu] = useState<any[]>([]);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPost, setNewPost] = useState({ image: '', likes: 0, comments: 0, captionUz: '', captionRu: '', href: 'https://instagram.com/kamafarm.healthcare' });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/settings');
      const data = await res.json();
      const settings = data.settings || {};

      setSectionLabelUz(settings.instagram_sectionLabel_uz || translations.uz.instagram.sectionLabel);
      setSectionLabelRu(settings.instagram_sectionLabel_ru || translations.ru.instagram.sectionLabel);
      setHeadingUz(settings.instagram_heading_uz || translations.uz.instagram.heading);
      setHeadingRu(settings.instagram_heading_ru || translations.ru.instagram.heading);
      setHandle(settings.instagram_handle || translations.uz.instagram.handle);
      setBioUz(settings.instagram_bio_uz || translations.uz.instagram.bio);
      setBioRu(settings.instagram_bio_ru || translations.ru.instagram.bio);
      setFollowBtnUz(settings.instagram_followBtn_uz || translations.uz.instagram.followBtn);
      setFollowBtnRu(settings.instagram_followBtn_ru || translations.ru.instagram.followBtn);

      setStatsUz(settings.instagram_stats_uz ? JSON.parse(settings.instagram_stats_uz) : translations.uz.instagram.stats);
      setStatsRu(settings.instagram_stats_ru ? JSON.parse(settings.instagram_stats_ru) : translations.ru.instagram.stats);
      
      setProfileStats(settings.instagram_profileStatsNumbers ? JSON.parse(settings.instagram_profileStatsNumbers) : { posts: 29, followers: '1,243', following: 181 });

      setPostsUz(settings.instagram_posts_uz ? JSON.parse(settings.instagram_posts_uz) : defaultInstagramPosts);
      setPostsRu(settings.instagram_posts_ru ? JSON.parse(settings.instagram_posts_ru) : defaultInstagramPosts);
    } catch (e) {
      console.error('[Instagram Admin] Failed to fetch settings:', e);
    } finally {
      setLoading(false);
    }
  };

  const getToken = () => localStorage.getItem('kamafarm_admin_token') || 'kamafarm-admin-2026';

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload: Record<string, string> = {
        instagram_sectionLabel_uz: sectionLabelUz,
        instagram_sectionLabel_ru: sectionLabelRu,
        instagram_heading_uz: headingUz,
        instagram_heading_ru: headingRu,
        instagram_handle: handle,
        instagram_bio_uz: bioUz,
        instagram_bio_ru: bioRu,
        instagram_followBtn_uz: followBtnUz,
        instagram_followBtn_ru: followBtnRu,
        instagram_stats_uz: JSON.stringify(statsUz),
        instagram_stats_ru: JSON.stringify(statsRu),
        instagram_profileStatsNumbers: JSON.stringify(profileStats),
        instagram_posts_uz: JSON.stringify(postsUz),
        instagram_posts_ru: JSON.stringify(postsRu),
      };

      await Promise.all(
        Object.keys(payload).map((key) =>
          fetch('/api/settings', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${getToken()}`,
            },
            body: JSON.stringify({ key, value: payload[key] }),
          })
        )
      );

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (e) {
      console.error('[Instagram Save] Error saving Settings:', e);
      alert('Tizim sozlamalarini saqlashda xatolik yuz berdi.');
    } finally {
      setSaving(false);
    }
  };

  // Upload image logic for posts
  const handleImageUpload = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${getToken()}` },
        body: formData,
      });

      if (!res.ok) throw new Error('Failed to upload image');
      const data = await res.json();
      
      if (data.url) {
        // Update both arrays with the same image link
        const newUz = [...postsUz];
        newUz[index].image = data.url;
        setPostsUz(newUz);

        const newRu = [...postsRu];
        newRu[index].image = data.url;
        setPostsRu(newRu);
      }
    } catch (err) {
      console.error('Error uploading post image:', err);
      alert('Rasm yuklashda xatolik!');
    }
  };

  const handleNewPostImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${getToken()}` },
        body: formData,
      });

      if (!res.ok) throw new Error('Failed to upload image');
      const data = await res.json();
      
      if (data.url) {
        setNewPost(prev => ({ ...prev, image: data.url }));
      }
    } catch (err) {
      console.error('Error uploading post image:', err);
      alert('Rasm yuklashda xatolik!');
    }
  };

  const handleOpenModal = () => {
    setNewPost({ image: '', likes: 0, comments: 0, captionUz: '', captionRu: '', href: 'https://instagram.com/kamafarm.healthcare' });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const submitNewPost = () => {
    const pUz = { id: Date.now(), image: newPost.image, likes: newPost.likes, comments: newPost.comments, caption: newPost.captionUz, href: newPost.href };
    const pRu = { id: Date.now(), image: newPost.image, likes: newPost.likes, comments: newPost.comments, caption: newPost.captionRu, href: newPost.href };
    setPostsUz([pUz, ...postsUz]);
    setPostsRu([pRu, ...postsRu]);
    setIsModalOpen(false);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const removePost = async (index: number) => {
    const postToDelete = postsUz[index];
    
    // Optimistic UI removal
    setPostsUz(postsUz.filter((_, i) => i !== index));
    setPostsRu(postsRu.filter((_, i) => i !== index));

    // Delete image from storage if it's a Supabase URL
    if (postToDelete?.image && postToDelete.image.includes('supabase.co')) {
      try {
        await fetch(`/api/delete-file?url=${encodeURIComponent(postToDelete.image)}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${getToken()}` }
        });
      } catch (e) {
        console.error('Failed to delete image from storage', e);
      }
    }
  };

  const updatePost = (lang: 'uz' | 'ru', index: number, key: string, value: any) => {
    if (lang === 'uz') {
      const newPosts = [...postsUz];
      newPosts[index][key] = value;
      setPostsUz(newPosts);
      // Some properties are shared, sync them if needed (like likes, comments, href, image)
      if (['likes', 'comments', 'href', 'image'].includes(key)) {
        const newPostsRu = [...postsRu];
        newPostsRu[index][key] = value;
        setPostsRu(newPostsRu);
      }
    } else {
      const newPosts = [...postsRu];
      newPosts[index][key] = value;
      setPostsRu(newPosts);
      if (['likes', 'comments', 'href', 'image'].includes(key)) {
        const newPostsUz = [...postsUz];
        newPostsUz[index][key] = value;
        setPostsUz(newPostsUz);
      }
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', flexDirection: 'column', gap: 16 }}>
        <span style={{
          width: 36, height: 36, border: '3px solid rgba(4,67,44,0.1)', borderTop: '3px solid #04432C', borderRadius: '50%',
          animation: 'spin 0.8s linear infinite', display: 'inline-block',
        }} />
        <span style={{ fontSize: 14, color: '#64748B', fontWeight: 600 }}>Instagram sozlamalari yuklanmoqda...</span>
      </div>
    );
  }

  return (
    <div style={{ padding: 32, maxWidth: 1000, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 900, color: '#0F172A', letterSpacing: '-0.02em', marginBottom: 6 }}>
            Instagram (Ijtimoiy tarmoqlar)
          </h1>
          <p style={{ fontSize: 14, color: '#64748B' }}>
            Instagram profil ma'lumotlari va saytda ko'rinadigan postlarni boshqaring
          </p>
        </div>
        <button onClick={handleSave} disabled={saving} className={`btn ${saved ? '' : 'btn-primary'}`} style={{
            minWidth: 160, background: saved ? '#10B981' : undefined,
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            boxShadow: '0 4px 12px rgba(4,67,44,0.15)',
          }}>
          {saving ? (
            <><span style={{ width: 14, height: 14, border: '2px solid rgba(255,255,255,0.4)', borderTop: '2px solid white', borderRadius: '50%', animation: 'spin 0.8s linear infinite', display: 'inline-block' }} /> Saqlanmoqda...</>
          ) : saved ? (
            <><CheckCircle2 size={16} /> Saqlandi!</>
          ) : (
            <><Save size={16} /> Saqlash</>
          )}
        </button>
      </div>

      {/* Tab Selector */}
      <div className="tabs-container">
        <button onClick={() => setActiveTab('general')} style={{
            background: 'none', border: 'none', padding: '12px 20px', fontSize: 14, fontWeight: 700,
            color: activeTab === 'general' ? '#04432C' : '#64748B',
            borderBottom: activeTab === 'general' ? '3px solid #04432C' : '3px solid transparent',
            cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 8
          }}>
          <Layout size={16} /> Asosiy va Statistika
        </button>
        <button onClick={() => setActiveTab('posts')} style={{
            background: 'none', border: 'none', padding: '12px 20px', fontSize: 14, fontWeight: 700,
            color: activeTab === 'posts' ? '#04432C' : '#64748B',
            borderBottom: activeTab === 'posts' ? '3px solid #04432C' : '3px solid transparent',
            cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 8
          }}>
          <ImageIcon size={16} /> Postlar Ro'yxati
        </button>
      </div>

      {/* Content Area */}
      <div>
        <AnimatePresence mode="wait">
          {activeTab === 'general' && (
            <motion.div key="general" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.2 }}>
              <div className="grid-2-cols" style={{ marginBottom: 24 }}>
                {/* UZ Texts */}
                <div style={{ background: 'white', borderRadius: 20, border: '1px solid #E2E8F0', overflow: 'hidden' }}>
                  <div style={{ padding: '16px 24px', background: '#F0FDF4', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Globe size={16} color="#10B981" />
                    <span style={{ fontSize: 13, fontWeight: 800, color: '#04432C', textTransform: 'uppercase' }}>O'zbek tili (UZ)</span>
                  </div>
                  <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <div><label className="field-label">Kichik sarlavha</label><input className="input" type="text" value={sectionLabelUz} onChange={(e) => setSectionLabelUz(e.target.value)} /></div>
                    <div><label className="field-label">Sarlavha</label><input className="input" type="text" value={headingUz} onChange={(e) => setHeadingUz(e.target.value)} /></div>
                    <div><label className="field-label">Bio (Tavsif)</label><textarea className="input" rows={2} style={{ resize: 'vertical', padding: 10 }} value={bioUz} onChange={(e) => setBioUz(e.target.value)} /></div>
                    <div><label className="field-label">Kuzatish tugmasi</label><input className="input" type="text" value={followBtnUz} onChange={(e) => setFollowBtnUz(e.target.value)} /></div>
                    
                    <hr style={{ border: 'none', borderTop: '1px solid #E2E8F0' }} />
                    <label className="field-label" style={{ color: '#04432C' }}>Statistika Matnlari</label>
                    <div className="grid-3-cols-sm">
                      <div><label className="field-label" style={{ fontSize: 10 }}>Postlar</label><input className="input" type="text" value={statsUz.posts} onChange={(e) => setStatsUz({...statsUz, posts: e.target.value})} /></div>
                      <div><label className="field-label" style={{ fontSize: 10 }}>Kuzatuvchi</label><input className="input" type="text" value={statsUz.followers} onChange={(e) => setStatsUz({...statsUz, followers: e.target.value})} /></div>
                      <div><label className="field-label" style={{ fontSize: 10 }}>Kuzatilmoqda</label><input className="input" type="text" value={statsUz.following} onChange={(e) => setStatsUz({...statsUz, following: e.target.value})} /></div>
                    </div>
                  </div>
                </div>

                {/* RU Texts */}
                <div style={{ background: 'white', borderRadius: 20, border: '1px solid #E2E8F0', overflow: 'hidden' }}>
                  <div style={{ padding: '16px 24px', background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Globe size={16} color="#64748B" />
                    <span style={{ fontSize: 13, fontWeight: 800, color: '#334155', textTransform: 'uppercase' }}>Русский язык (RU)</span>
                  </div>
                  <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <div><label className="field-label">Метка раздела</label><input className="input" type="text" value={sectionLabelRu} onChange={(e) => setSectionLabelRu(e.target.value)} /></div>
                    <div><label className="field-label">Заголовок</label><input className="input" type="text" value={headingRu} onChange={(e) => setHeadingRu(e.target.value)} /></div>
                    <div><label className="field-label">Био (Описание)</label><textarea className="input" rows={2} style={{ resize: 'vertical', padding: 10 }} value={bioRu} onChange={(e) => setBioRu(e.target.value)} /></div>
                    <div><label className="field-label">Кнопка подписки</label><input className="input" type="text" value={followBtnRu} onChange={(e) => setFollowBtnRu(e.target.value)} /></div>
                    
                    <hr style={{ border: 'none', borderTop: '1px solid #E2E8F0' }} />
                    <label className="field-label" style={{ color: '#04432C' }}>Тексты Статистики</label>
                    <div className="grid-3-cols-sm">
                      <div><label className="field-label" style={{ fontSize: 10 }}>Посты</label><input className="input" type="text" value={statsRu.posts} onChange={(e) => setStatsRu({...statsRu, posts: e.target.value})} /></div>
                      <div><label className="field-label" style={{ fontSize: 10 }}>Подписчики</label><input className="input" type="text" value={statsRu.followers} onChange={(e) => setStatsRu({...statsRu, followers: e.target.value})} /></div>
                      <div><label className="field-label" style={{ fontSize: 10 }}>Подписки</label><input className="input" type="text" value={statsRu.following} onChange={(e) => setStatsRu({...statsRu, following: e.target.value})} /></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Shared Numbers */}
              <div style={{ background: 'white', borderRadius: 20, border: '1px solid #E2E8F0', overflow: 'hidden' }}>
                <div style={{ padding: '16px 24px', background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Camera size={16} color="#E1306C" />
                  <span style={{ fontSize: 13, fontWeight: 800, color: '#334155', textTransform: 'uppercase' }}>Umumiy Ma'lumotlar</span>
                </div>
                <div className="grid-4-cols" style={{ padding: 24 }}>
                  <div>
                    <label className="field-label">Instagram Handle (Username)</label>
                    <input className="input" type="text" value={handle} onChange={(e) => setHandle(e.target.value)} />
                  </div>
                  <div>
                    <label className="field-label">Postlar Soni</label>
                    <input className="input" type="number" value={profileStats.posts} onChange={(e) => setProfileStats({...profileStats, posts: Number(e.target.value)})} />
                  </div>
                  <div>
                    <label className="field-label">Kuzatuvchilar (Matn: 1,243 yoki 12K)</label>
                    <input className="input" type="text" value={profileStats.followers} onChange={(e) => setProfileStats({...profileStats, followers: e.target.value})} />
                  </div>
                  <div>
                    <label className="field-label">Kuzatilmoqda (Soni)</label>
                    <input className="input" type="number" value={profileStats.following} onChange={(e) => setProfileStats({...profileStats, following: Number(e.target.value)})} />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'posts' && (
            <motion.div key="posts" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.2 }}>
              <div style={{ background: 'white', borderRadius: 20, border: '1px solid #E2E8F0', overflow: 'hidden' }}>
                <div style={{ padding: '16px 24px', background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 13, fontWeight: 800, color: '#0F172A', textTransform: 'uppercase' }}>Postlar ro'yxati</span>
                  <button type="button" onClick={handleOpenModal} className="btn btn-primary" style={{ padding: '6px 12px', fontSize: 12, gap: 4 }}>
                    <Plus size={14} /> Yangi Post
                  </button>
                </div>
                <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 24 }}>
                  {postsUz.map((postUz, i) => (
                    <div key={i} style={{ background: '#F8FAFC', padding: 20, borderRadius: 16, border: '1px solid #E2E8F0', position: 'relative' }}>
                      <div style={{ position: 'absolute', top: 16, right: 16 }}>
                        <button onClick={() => removePost(i)} style={{ padding: 6, background: '#FEE2E2', border: '1px solid #FCA5A5', borderRadius: 6, cursor: 'pointer', color: '#EF4444' }}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                      
                      <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 20 }}>
                        {/* Image Upload Area */}
                        <div>
                          <label className="field-label" style={{ marginBottom: 4 }}>Rasm</label>
                          <div style={{ width: 120, height: 120, background: '#E2E8F0', borderRadius: 12, position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {postUz.image ? (
                              <>
                                <Image src={postUz.image} alt="post" fill style={{ objectFit: 'cover' }} />
                                <label style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, cursor: 'pointer', transition: 'opacity 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.opacity='1'} onMouseLeave={(e) => e.currentTarget.style.opacity='0'}>
                                  <Upload size={20} />
                                  <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => handleImageUpload(i, e)} />
                                </label>
                              </>
                            ) : (
                              <label style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, color: '#64748B' }}>
                                <Upload size={24} />
                                <span style={{ fontSize: 11, fontWeight: 600 }}>Yuklash</span>
                                <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => handleImageUpload(i, e)} />
                              </label>
                            )}
                          </div>
                        </div>

                        {/* Details Area */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr', gap: 12 }}>
                            <div>
                              <label className="field-label">Layklar</label>
                              <input className="input" type="number" style={{ background: 'white' }} value={postUz.likes} onChange={(e) => updatePost('uz', i, 'likes', Number(e.target.value))} />
                            </div>
                            <div>
                              <label className="field-label">Kommentlar</label>
                              <input className="input" type="number" style={{ background: 'white' }} value={postUz.comments} onChange={(e) => updatePost('uz', i, 'comments', Number(e.target.value))} />
                            </div>
                            <div>
                              <label className="field-label">Havola (Link)</label>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <Link2 size={16} color="#64748B" />
                                <input className="input" type="text" style={{ background: 'white', flex: 1 }} value={postUz.href} onChange={(e) => updatePost('uz', i, 'href', e.target.value)} />
                              </div>
                            </div>
                          </div>
                          
                          <div className="grid-2-cols-sm">
                            <div>
                              <label className="field-label">Matn (UZ)</label>
                              <textarea className="input" rows={2} style={{ background: 'white', resize: 'vertical' }} value={postUz.caption} onChange={(e) => updatePost('uz', i, 'caption', e.target.value)} />
                            </div>
                            <div>
                              <label className="field-label">Текст (RU)</label>
                              <textarea className="input" rows={2} style={{ background: 'white', resize: 'vertical' }} value={postsRu[i]?.caption || ''} onChange={(e) => updatePost('ru', i, 'caption', e.target.value)} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {postsUz.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '32px 0', color: '#94A3B8', fontSize: 13 }}>Hech qanday post qo'shilmagan</div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div style={{ marginTop: 24 }}>
          <button onClick={handleSave} disabled={saving} className={`btn ${saved ? '' : 'btn-primary'}`} style={{
              width: '100%', justifyContent: 'center', padding: '14px', fontSize: 14,
              background: saved ? '#10B981' : undefined, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
            }}>
            {saving ? <><span style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.4)', borderTop: '2px solid white', borderRadius: '50%', animation: 'spin 0.8s linear infinite', display: 'inline-block' }} /> Saqlanmoqda...</> : saved ? <><CheckCircle2 size={16} /> Muvaffaqiyatli saqlandi!</> : <><Save size={16} /> Sozlamalarni saqlash</>}
          </button>
        </div>
      </div>

      {/* Add Post Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 24
          }}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              style={{
                position: 'absolute', inset: 0,
                background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(4px)'
              }}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              style={{
                background: 'white', borderRadius: 24, width: '100%', maxWidth: 640,
                position: 'relative', zIndex: 1, overflow: 'hidden',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                maxHeight: '90vh', overflowY: 'auto'
              }}
            >
              <div style={{
                padding: '20px 24px', borderBottom: '1px solid #E2E8F0',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                position: 'sticky', top: 0, background: 'white', zIndex: 2
              }}>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: '#0F172A', margin: 0 }}>Yangi post qo'shish</h3>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  style={{
                    width: 32, height: 32, borderRadius: '50%', border: 'none',
                    background: '#F1F5F9', color: '#64748B', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <X size={18} />
                </button>
              </div>

              <div style={{ padding: 24, display: 'grid', gridTemplateColumns: '120px 1fr', gap: 20 }}>
                {/* Image Upload Area */}
                <div>
                  <label className="field-label" style={{ marginBottom: 4 }}>Rasm</label>
                  <div style={{ width: 120, height: 120, background: '#E2E8F0', borderRadius: 12, position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {newPost.image ? (
                      <>
                        <Image src={newPost.image} alt="post" fill style={{ objectFit: 'cover' }} />
                        <label style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, cursor: 'pointer', transition: 'opacity 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.opacity='1'} onMouseLeave={(e) => e.currentTarget.style.opacity='0'}>
                          <Upload size={20} />
                          <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleNewPostImageUpload} />
                        </label>
                      </>
                    ) : (
                      <label style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, color: '#64748B' }}>
                        <Upload size={24} />
                        <span style={{ fontSize: 11, fontWeight: 600 }}>Yuklash</span>
                        <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleNewPostImageUpload} />
                      </label>
                    )}
                  </div>
                </div>

                {/* Details Area */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr', gap: 12 }}>
                    <div>
                      <label className="field-label">Layklar</label>
                      <input className="input" type="number" style={{ background: 'white' }} value={newPost.likes} onChange={(e) => setNewPost(prev => ({...prev, likes: Number(e.target.value)}))} />
                    </div>
                    <div>
                      <label className="field-label">Kommentlar</label>
                      <input className="input" type="number" style={{ background: 'white' }} value={newPost.comments} onChange={(e) => setNewPost(prev => ({...prev, comments: Number(e.target.value)}))} />
                    </div>
                    <div>
                      <label className="field-label">Havola (Link)</label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Link2 size={16} color="#64748B" />
                        <input className="input" type="text" style={{ background: 'white', flex: 1 }} value={newPost.href} onChange={(e) => setNewPost(prev => ({...prev, href: e.target.value}))} />
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid-2-cols-sm">
                    <div>
                      <label className="field-label">Matn (UZ)</label>
                      <textarea className="input" rows={3} style={{ background: 'white', resize: 'vertical' }} value={newPost.captionUz} onChange={(e) => setNewPost(prev => ({...prev, captionUz: e.target.value}))} />
                    </div>
                    <div>
                      <label className="field-label">Текст (RU)</label>
                      <textarea className="input" rows={3} style={{ background: 'white', resize: 'vertical' }} value={newPost.captionRu} onChange={(e) => setNewPost(prev => ({...prev, captionRu: e.target.value}))} />
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ padding: '16px 24px', background: '#F8FAFC', borderTop: '1px solid #E2E8F0', display: 'flex', justifyContent: 'flex-end', gap: 12, position: 'sticky', bottom: 0, zIndex: 2 }}>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  style={{
                    padding: '10px 20px', borderRadius: 10, background: 'white', border: '1px solid #E2E8F0',
                    color: '#64748B', fontSize: 14, fontWeight: 600, cursor: 'pointer'
                  }}
                >
                  Bekor qilish
                </button>
                <button
                  type="button"
                  onClick={submitNewPost}
                  style={{
                    padding: '10px 24px', borderRadius: 10, background: '#04432C', border: 'none',
                    color: 'white', fontSize: 14, fontWeight: 600, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: 8
                  }}
                >
                  <Plus size={16} /> Qo'shish
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style>{`
        .field-label { display: flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 800; color: #475569; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.04em; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
