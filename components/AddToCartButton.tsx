"use client";
import { useCartStore } from '@/context/cartStore';
import type { Product } from '@/lib/types';

export function AddToCartButton({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  return (
    <button onClick={() => addItem(product, 1)} className="btn btn-primary rounded-full">
      Añadir al carrito
    </button>
  );
}
