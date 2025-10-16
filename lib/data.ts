import { getServerSupabase } from '@/lib/supabase/server';
import type { Product } from './types';

const placeholders: Product[] = [
  {
    id: 'rose-candle',
    name: 'Vela Aromática Rose Gold',
    description: 'Aroma floral suave con notas de rosa y vainilla.',
    price: 2499,
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop',
    category: 'hogar',
    inventory: 20,
    featured: true,
  },
  {
    id: 'silk-scarf',
    name: 'Pañuelo de seda rosa',
    description: 'Seda premium con acabado satinado y bordes enrollados.',
    price: 3299,
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=1200&auto=format&fit=crop',
    category: 'accesorios',
    inventory: 15,
    featured: true,
  },
  {
    id: 'rose-mug',
    name: 'Taza Rose Gold',
    description: 'Cerámica esmaltada con detalles en rose gold.',
    price: 1899,
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=1200&auto=format&fit=crop',
    category: 'hogar',
    inventory: 50,
    featured: false,
  },
  {
    id: 'pearl-bracelet',
    name: 'Pulsera perlas rosas',
    description: 'Perlas cultivadas con broche ajustable.',
    price: 4599,
    image: 'https://images.unsplash.com/photo-1631049552240-59c37fdf1b9e?q=80&w=1200&auto=format&fit=crop',
    category: 'joyería',
    inventory: 10,
    featured: false,
  }
];

function envReady() {
  return !!(process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  if (!envReady()) return placeholders.filter((p) => p.featured);
  const supabase = getServerSupabase();
  if (!supabase) return placeholders.filter((p) => p.featured);
  const { data, error } = await supabase.from('products').select('*').eq('featured', true).limit(8);
  if (error || !data) return placeholders.filter((p) => p.featured);
  return data as Product[];
}

export async function getProducts(search?: string, category?: string): Promise<Product[]> {
  if (!envReady()) {
    let list = [...placeholders];
    if (category) list = list.filter((p) => p.category === category);
    if (search) list = list.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
    return list;
  }
  const supabase = getServerSupabase();
  if (!supabase) return placeholders;
  let query = supabase.from('products').select('*');
  if (category) query = query.eq('category', category);
  if (search) query = query.ilike('name', `%${search}%`);
  const { data, error } = await query.order('name');
  if (error || !data) return placeholders;
  return data as Product[];
}

export async function getProductById(id: string): Promise<Product | null> {
  if (!envReady()) return placeholders.find((p) => p.id === id) ?? null;
  const supabase = getServerSupabase();
  if (!supabase) return placeholders.find((p) => p.id === id) ?? null;
  const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
  if (error || !data) return placeholders.find((p) => p.id === id) ?? null;
  return data as Product;
}
