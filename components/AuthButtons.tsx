"use client";
import Link from 'next/link';
import { supabaseClient } from '@/lib/supabase/client';
import { useUser } from '@/hooks/useUser';

export function AuthButtons() {
  const user = useUser();
  if (!supabaseClient) {
    return <Link href="/login" className="hover:underline">Acceder</Link>;
  }
  if (!user) {
    return <Link href="/login" className="hover:underline">Acceder</Link>;
  }
  return (
    <button onClick={() => supabaseClient?.auth.signOut()} className="hover:underline">Salir</button>
  );
}
