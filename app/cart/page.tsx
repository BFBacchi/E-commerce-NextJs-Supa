'use client'

import { useCartStore } from '@/context/cart-store'
import { formatPrice } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react'

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCartStore()

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center">
          <ShoppingBag className="mx-auto text-gray-400 mb-4" size={64} />
          <h1 className="text-2xl font-bold mb-4">Tu carrito está vacío</h1>
          <p className="text-gray-600 mb-8">
            Parece que aún no has añadido ningún producto a tu carrito.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
          >
            Continuar comprando
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Tu carrito</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Lista de productos */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.product.id}
              className="bg-card rounded-lg p-4 flex gap-4"
            >
              <div className="relative w-24 h-24 rounded-lg overflow-hidden">
                <Image
                  src={item.product.image_url}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1">
                <h3 className="font-semibold mb-1">{item.product.name}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  {formatPrice(item.product.price)} cada uno
                </p>

                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-border rounded-lg">
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity - 1)
                      }
                      className="p-1 hover:bg-background transition-colors"
                      disabled={item.quantity <= 1}
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-3 py-1 min-w-[40px] text-center text-sm">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity + 1)
                      }
                      className="p-1 hover:bg-background transition-colors"
                      disabled={item.quantity >= item.product.stock}
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="text-red-500 hover:text-red-600 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <div className="text-right">
                <p className="font-semibold">
                  {formatPrice(item.product.price * item.quantity)}
                </p>
              </div>
            </div>
          ))}

          <button
            onClick={clearCart}
            className="text-red-500 hover:text-red-600 transition-colors text-sm"
          >
            Vaciar carrito
          </button>
        </div>

        {/* Resumen del pedido */}
        <div className="lg:col-span-1">
          <div className="bg-card rounded-lg p-6 sticky top-20">
            <h2 className="text-xl font-semibold mb-4">Resumen del pedido</h2>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>{formatPrice(getTotalPrice())}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Envío</span>
                <span className="text-green-600">Gratis</span>
              </div>
            </div>

            <div className="border-t border-border pt-4 mb-6">
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span className="text-primary">{formatPrice(getTotalPrice())}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="block w-full py-3 bg-primary text-white text-center rounded-lg hover:bg-primary-hover transition-colors font-semibold"
            >
              Proceder al pago
            </Link>

            <Link
              href="/shop"
              className="block w-full py-3 text-center text-sm text-gray-600 hover:text-primary transition-colors mt-2"
            >
              Continuar comprando
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}