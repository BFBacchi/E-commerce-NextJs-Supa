import { getServerSupabase } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function AdminProductsPage() {
  const supabase = getServerSupabase();
  const adminEmail = process.env.ADMIN_EMAIL;
  let isAdmin = false;
  if (supabase && adminEmail) {
    const { data } = await supabase.auth.getUser();
    const email = data.user?.email ?? null;
    isAdmin = !!email && email === adminEmail;
  }
  if (!isAdmin) redirect('/login');
  if (!supabase) return <div>Configura Supabase</div>;
  const { data } = await supabase.from('products').select('*').order('name');
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Productos</h1>
      <pre className="card p-4 overflow-auto text-sm">{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
