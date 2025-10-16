'use client'

import Link from 'next/link'
import { ArrowLeft, ShoppingBag, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { CartItem } from '@/components/cart/CartItem'
import { useCart } from '@/context/CartContext'

export default function CartPage() {
  const { items, total, itemCount, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center space-y-6">
          <div className="text-gray-400 dark:text-gray-600">
            <ShoppingBag className="h-24 w-24 mx-auto mb-4" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Tu carrito está vacío
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            Descubre nuestra hermosa colección de moda femenina y encuentra las prendas perfectas para ti.
          </p>
          <Link href="/shop">
            <Button size="lg">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Continuar Comprando
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Carrito de Compras
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {itemCount} {itemCount === 1 ? 'producto' : 'productos'} en tu carrito
          </p>
        </div>
        
        <Link href="/shop">
          <Button variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continuar Comprando
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Productos ({itemCount})</CardTitle>
              {items.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearCart}
                  className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Vaciar Carrito
                </Button>
              )}
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {items.map((item) => (
                  <div key={item.id} className="p-6">
                    <CartItem item={item} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle>Resumen del Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal ({itemCount} productos)</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Envío</span>
                  <span>{total >= 50 ? 'Gratis' : '$5.00'}</span>
                </div>
                
                <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                  <div className="flex justify-between text-lg font-semibold text-gray-900 dark:text-white">
                    <span>Total</span>
                    <span>${(total + (total >= 50 ? 0 : 5)).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {total < 50 && (
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    Agrega ${(50 - total).toFixed(2)} más para obtener envío gratuito
                  </p>
                </div>
              )}

              <Link href="/checkout">
                <Button size="lg" className="w-full">
                  Proceder al Checkout
                </Button>
              </Link>

              <div className="text-center">
                <Link href="/shop">
                  <Button variant="ghost" size="sm">
                    Continuar Comprando
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Security Features */}
          <Card>
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Compra 100% segura</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Envío rápido y confiable</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Garantía de satisfacción</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}