import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { AddToCartButton } from './AddToCartButton';

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="card p-3">
      <Link href={`/product/${product.id}`}>
        <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl">
          <Image src={product.image} alt={product.name} fill className="object-cover" />
        </div>
        <h3 className="mt-3 font-semibold text-rose-700 dark:text-rose-200">{product.name}</h3>
      </Link>
      <p className="text-sm text-rose-600/80 dark:text-rose-300/80 line-clamp-2">{product.description}</p>
      <div className="mt-3 flex items-center justify-between">
        <span className="font-bold text-rose-700 dark:text-rose-100">${(product.price/100).toFixed(2)}</span>
        <AddToCartButton product={product} />
      </div>
    </div>
  );
}
