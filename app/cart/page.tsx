"use client";
import Link from 'next/link';
import { useCartStore } from '@/context/cartStore';

export default function CartPage() {
  const { items, updateQuantity, removeItem } = useCartStore();
  const total = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-rose-700 dark:text-rose-200">Tu carrito</h1>
      {items.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <div className="space-y-4">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="card p-4 flex items-center gap-4">
              <div className="flex-1">
                <div className="font-semibold">{product.name}</div>
                <div className="text-sm text-rose-600/80">${(product.price/100).toFixed(2)}</div>
              </div>
              <input
                type="number"
                min={1}
                className="w-20 rounded-full border border-rose-200 px-3 py-2"
                value={quantity}
                onChange={(e) => updateQuantity(product.id, Math.max(1, parseInt(e.target.value || '1', 10)))}
              />
              <button className="text-rose-600 hover:underline" onClick={() => removeItem(product.id)}>Quitar</button>
            </div>
          ))}
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold">Total: ${(total/100).toFixed(2)}</div>
            <Link href="/checkout" className="btn btn-primary rounded-full">Proceder al pago</Link>
          </div>
        </div>
      )}
    </div>
  );
}
