import { CartItem } from './types';

export async function sendOrderToWhatsApp(cart: CartItem[], user: { id?: string | null; email?: string | null }) {
  const url = process.env.N8N_WEBHOOK_URL;
  if (!url) throw new Error('N8N_WEBHOOK_URL no configurada');
  const total = cart.reduce((sum, ci) => sum + ci.product.price * ci.quantity, 0);
  const payload = {
    user,
    total,
    items: cart.map(ci => ({
      id: ci.product.id,
      name: ci.product.name,
      price: ci.product.price,
      quantity: ci.quantity
    }))
  };
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Error enviando a n8n: ${res.status} ${text}`);
  }
  return await res.json().catch(() => ({}));
}
