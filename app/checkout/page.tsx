"use client";
import { useState } from 'react';
import { useCartStore } from '@/context/cartStore';
import { useUser } from '@/hooks/useUser';

export default function CheckoutPage() {
  const { items, clear } = useCartStore();
  const user = useUser();
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const total = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  async function sendOrder() {
    setSending(true); setMessage(null);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cart: items, user })
      });
      if (!res.ok) throw new Error(await res.text());
      setMessage('Pedido enviado por WhatsApp ✅');
      clear();
    } catch (e: any) {
      setMessage('Error enviando pedido: ' + e.message);
    } finally { setSending(false); }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-rose-700 dark:text-rose-200">Resumen de compra</h1>
      <ul className="space-y-2">
        {items.map(({ product, quantity }) => (
          <li key={product.id} className="flex items-center justify-between">
            <span>{product.name} × {quantity}</span>
            <span>${((product.price*quantity)/100).toFixed(2)}</span>
          </li>
        ))}
      </ul>
      <div className="text-xl font-bold">Total: ${(total/100).toFixed(2)}</div>
      <button disabled={sending || items.length === 0} onClick={sendOrder} className="btn btn-primary rounded-full">
        {sending ? 'Enviando…' : 'Enviar pedido por WhatsApp'}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}
