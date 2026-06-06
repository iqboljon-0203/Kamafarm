'use client';
import { useEffect } from 'react';

export default function VisitTracker() {
  useEffect(() => {
    // Check if we've already tracked this session to avoid tracking every single reload as a unique visit if desired.
    // For now, we will track once per session.
    if (!sessionStorage.getItem('kamafarm_visited')) {
      fetch('/api/visits', { method: 'POST' }).catch(() => {});
      sessionStorage.setItem('kamafarm_visited', 'true');
    }
  }, []);

  return null;
}
