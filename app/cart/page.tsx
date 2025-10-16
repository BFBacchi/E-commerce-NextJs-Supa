'use client'

import React from 'react'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'
import { CartItem } from '@/components/CartItem'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { formatPrice } from '@/lib/utils'
import { ShoppingBag, ArrowLeft, Trash2 } from 'lucide-react'

export default function CartPage() {
  const { items, clearCart, getTotalPrice, getTotalItems } = useCart()
  const { user } = useAuth()

  const handleCheckout = () => {
    if (!user) {
      // Redirigir al login si no está autenticado
      window.location.href = '/auth'
      return
    }
    // Redirigir al checkout
    window.location.href = '/checkout'
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-gray-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Tu carrito está vacío
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Explora nuestra tienda y encuentra productos increíbles
            </p>
            <Link href="/shop">
              <Button size="lg">
                Ir a la Tienda
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/shop">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Continuar Comprando
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Carrito de Compras
            </h1>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={clearCart}
            className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Vaciar Carrito
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Resumen del Pedido
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Productos ({getTotalItems()})</span>
                  <span>{formatPrice(getTotalPrice())}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Envío</span>
                  <span className={getTotalPrice() >= 50 ? 'text-green-600' : ''}>
                    {getTotalPrice() >= 50 ? 'Gratis' : formatPrice(9.99)}
                  </span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="flex justify-between text-lg font-semibold text-gray-900 dark:text-white">
                    <span>Total</span>
                    <span>
                      {formatPrice(getTotalPrice() + (getTotalPrice() >= 50 ? 0 : 9.99))}
                    </span>
                  </div>
                </div>
              </div>

              {getTotalPrice() < 50 && (
                <div className="bg-pink-50 dark:bg-pink-900/20 border border-pink-200 dark:border-pink-800 rounded-xl p-4 mb-6">
                  <p className="text-sm text-pink-700 dark:text-pink-300">
                    <span className="font-semibold">
                      ¡Añade {formatPrice(50 - getTotalPrice())} más
                    </span>
                    {' '}para obtener envío gratis
                  </p>
                </div>
              )}

              <div className="space-y-3">
                <Button
                  onClick={handleCheckout}
                  className="w-full"
                  size="lg"
                >
                  Proceder al Pago
                </Button>
                <Link href="/shop">
                  <Button variant="outline" className="w-full">
                    Continuar Comprando
                  </Button>
                </Link>
              </div>

              {/* Security badges */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                  <p className="mb-2">Compra 100% segura</p>
                  <div className="flex justify-center space-x-4">
                    <span>🔒 SSL</span>
                    <span>💳 Pago seguro</span>
                    <span>🚚 Envío rápido</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}