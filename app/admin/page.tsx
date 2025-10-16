import { getServerSupabase } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const supabase = getServerSupabase();
  const adminEmail = process.env.ADMIN_EMAIL;
  let isAdmin = false;
  if (supabase && adminEmail) {
    const { data } = await supabase.auth.getUser();
    const email = data.user?.email ?? null;
    isAdmin = !!email && email === adminEmail;
  }
  if (!isAdmin) redirect('/login');

  // Minimal CRUD demo using RPCs or simple inserts/updates
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-rose-700 dark:text-rose-200">Panel Admin</h1>
      <p>Gestiona productos y pedidos desde Supabase. (Demo)</p>
      <ul className="list-disc pl-6 text-sm">
        <li>Añade productos en la tabla <code>products</code> (id, name, description, price, image, category, inventory, featured).</li>
        <li>Consulta pedidos en la tabla <code>orders</code>.</li>
      </ul>
    </div>
  );
}
