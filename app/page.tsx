import Link from 'next/link';
import Image from 'next/image';
import { ProductGrid } from '@/components/ProductGrid';
import { getFeaturedProducts } from '@/lib/data';

export default async function HomePage() {
  const products = await getFeaturedProducts();
  return (
    <div className="space-y-10">
      <section className="rounded-2xl bg-gradient-to-br from-pink-50 to-rose-100 dark:from-rose-900/20 dark:to-rose-800/10 p-8 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-bold text-rose-700 dark:text-rose-300">Rose Boutique</h1>
          <p className="mt-3 text-rose-600 dark:text-rose-200">Elegancia cotidiana, detalles en rose gold, y un diseño que enamora.</p>
          <div className="mt-6">
            <Link href="/shop" className="inline-flex items-center rounded-full bg-rose-600 text-white px-6 py-3 hover:bg-rose-700 transition">
              Comprar ahora
            </Link>
          </div>
        </div>
        <div className="flex-1">
          <Image src="https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5?q=80&w=1200&auto=format&fit=crop" alt="Hero" width={600} height={400} className="rounded-xl shadow-sm object-cover"/>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-rose-700 dark:text-rose-200 mb-4">Destacados</h2>
        <ProductGrid products={products} />
      </section>
    </div>
  );
}
