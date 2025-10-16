"use client";
import { useState } from 'react';
import { supabaseClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  async function signInEmail(e: React.FormEvent) {
    e.preventDefault();
    if (!supabaseClient) { setMessage('Configura Supabase para iniciar sesión'); return; }
    const { error } = await supabaseClient.auth.signInWithPassword({ email, password });
    if (error) setMessage(error.message);
    else router.push('/');
  }

  async function signInGoogle() {
    if (!supabaseClient) { setMessage('Configura Supabase para iniciar sesión'); return; }
    const { error } = await supabaseClient.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: window.location.origin } });
    if (error) setMessage(error.message);
  }

  return (
    <div className="max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-bold text-rose-700 dark:text-rose-200">Acceder</h1>
      <form onSubmit={signInEmail} className="space-y-3 card p-4">
        <input type="email" placeholder="Email" className="w-full rounded-full border border-rose-200 px-4 py-2" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Contraseña" className="w-full rounded-full border border-rose-200 px-4 py-2" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="btn btn-primary rounded-full w-full">Entrar</button>
      </form>
      <button onClick={signInGoogle} className="btn rounded-full bg-rose-100 text-rose-800 hover:bg-rose-200 w-full">Continuar con Google</button>
      {message && <p className="text-rose-600">{message}</p>}
    </div>
  );
}
