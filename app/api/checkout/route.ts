import { NextRequest, NextResponse } from 'next/server';
import { sendOrderToWhatsApp } from '@/lib/n8n';

export async function POST(req: NextRequest) {
  try {
    const { cart, user } = await req.json();
    if (!Array.isArray(cart)) return NextResponse.json({ error: 'Carrito inválido' }, { status: 400 });
    const result = await sendOrderToWhatsApp(cart, user || {});
    return NextResponse.json({ ok: true, result });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Error' }, { status: 500 });
  }
}
