"use client";
import { useEffect, useState } from 'react';
import { supabaseClient } from '@/lib/supabase/client';

type UserLike = { id: string; email: string | null } | null;

export function useUser() {
  const [user, setUser] = useState<UserLike>(null);
  useEffect(() => {
    if (!supabaseClient) return; // no env configured
    let mounted = true;
    supabaseClient.auth.getUser().then(({ data }) => {
      if (!mounted) return;
      setUser(data.user ? { id: data.user.id, email: data.user.email ?? null } : null);
    });
    const { data: sub } = supabaseClient.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ? { id: session.user.id, email: session.user.email ?? null } : null);
    });
    return () => { mounted = false; sub?.subscription?.unsubscribe(); };
  }, []);
  return user;
}
