'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCartStore } from '@/context/cart-store'
import { useAuth } from '@/context/auth-context'
import { formatPrice } from '@/lib/utils'
import { sendOrderToWhatsApp } from '@/lib/whatsapp'
import { supabase } from '@/lib/supabase/client'
import Link from 'next/link'
import { CheckCircle, Loader2 } from 'lucide-react'

export default function CheckoutPage() {
  const router = useRouter()
  const { user } = useAuth()
  const { items, getTotalPrice, clearCart } = useCartStore()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleCheckout = async () => {
    if (!user) {
      router.push('/auth/login?next=/checkout')
      return
    }

    setLoading(true)
    setError('')

    try {
      // Crear orden en Supabase
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          items: items,
          total: getTotalPrice(),
          status: 'pending',
        })
        .select()
        .single()

      if (orderError) throw orderError

      // Enviar orden a WhatsApp
      const whatsappSent = await sendOrderToWhatsApp({
        cart: items,
        user: {
          email: user.email!,
          name: user.user_metadata?.full_name,
        },
        total: getTotalPrice(),
      })

      if (!whatsappSent) {
        console.error('No se pudo enviar la orden a WhatsApp')
      }

      // Limpiar carrito de Supabase si el usuario está autenticado
      if (user) {
        await supabase
          .from('cart_items')
          .delete()
          .eq('user_id', user.id)
      }

      // Limpiar carrito local
      clearCart()
      setSuccess(true)
    } catch (err: any) {
      setError(err.message || 'Error al procesar el pedido')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <CheckCircle className="mx-auto text-green-500 mb-4" size={64} />
        <h1 className="text-2xl font-bold mb-4">¡Pedido realizado con éxito!</h1>
        <p className="text-gray-600 mb-8">
          Hemos recibido tu pedido y te contactaremos pronto por WhatsApp para
          coordinar el pago y envío.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
        >
          Volver a la tienda
        </Link>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Tu carrito está vacío</h1>
          <Link
            href="/shop"
            className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
          >
            Ir a la tienda
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Finalizar compra</h1>

      {/* Resumen del pedido */}
      <div className="bg-card rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Resumen del pedido</h2>
        
        <div className="space-y-3 mb-6">
          {items.map((item) => (
            <div key={item.product.id} className="flex justify-between text-sm">
              <span>
                {item.product.name} x {item.quantity}
              </span>
              <span>{formatPrice(item.product.price * item.quantity)}</span>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-4">
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span className="text-primary">{formatPrice(getTotalPrice())}</span>
          </div>
        </div>
      </div>

      {/* Información del usuario */}
      {user && (
        <div className="bg-card rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Información de contacto</h2>
          <p className="text-sm text-gray-600">
            Email: {user.email}
          </p>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400">
          <p className="text-sm">{error}</p>
        </div>
      )}

      <div className="space-y-4">
        <button
          onClick={handleCheckout}
          disabled={loading}
          className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Procesando...
            </>
          ) : (
            'Confirmar pedido'
          )}
        </button>

        <p className="text-sm text-gray-600 text-center">
          Al confirmar tu pedido, recibirás un mensaje de WhatsApp con los detalles
          para completar el pago y coordinar el envío.
        </p>
      </div>
    </div>
  )
}