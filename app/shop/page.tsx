import { getProducts } from '@/lib/data';
import { ProductGrid } from '@/components/ProductGrid';

export const dynamic = 'force-dynamic';

export default async function ShopPage({ searchParams }: { searchParams: { q?: string; cat?: string } }) {
  const products = await getProducts(searchParams.q, searchParams.cat);
  return (
    <div className="space-y-6">
      <form className="flex gap-3">
        <input name="q" defaultValue={searchParams.q} placeholder="Buscar" className="flex-1 px-4 py-2 rounded-full border border-rose-200" />
        <select name="cat" defaultValue={searchParams.cat} className="px-4 py-2 rounded-full border border-rose-200">
          <option value="">Todas</option>
          <option value="hogar">Hogar</option>
          <option value="joyería">Joyería</option>
          <option value="accesorios">Accesorios</option>
        </select>
        <button className="btn btn-primary rounded-full">Filtrar</button>
      </form>
      <ProductGrid products={products} />
    </div>
  );
}
