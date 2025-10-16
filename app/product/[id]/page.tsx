'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getProduct } from '@/lib/api/products'
import { Product } from '@/lib/types'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { useCartStore } from '@/lib/store/cart'

export default function ProductPage() {
  const params = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)
  const addItem = useCartStore((state) => state.addItem)

  useEffect(() => {
    loadProduct()
  }, [params.id])

  const loadProduct = async () => {
    if (typeof params.id === 'string') {
      const data = await getProduct(params.id)
      setProduct(data)
    }
    setLoading(false)
  }

  const handleAddToCart = () => {
    if (!product) return
    setIsAdding(true)
    addItem(product, quantity)
    
    setTimeout(() => {
      setIsAdding(false)
    }, 1000)
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500" />
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Producto no encontrado
          </h2>
          <Link href="/shop">
            <Button>Volver a la tienda</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <div className="mb-8 flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
        <Link href="/" className="hover:text-primary-600 dark:hover:text-primary-400">
          Inicio
        </Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-primary-600 dark:hover:text-primary-400">
          Tienda
        </Link>
        <span>/</span>
        <span className="text-gray-900 dark:text-gray-100">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Imagen del producto */}
        <div>
          <Card className="overflow-hidden">
            <div className="relative aspect-square bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-700 dark:to-gray-800">
              {product.image_url ? (
                <Image
                  src={product.image_url}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <svg className="w-32 h-32 text-primary-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Información del producto */}
        <div>
          {product.category && (
            <p className="text-sm text-primary-600 dark:text-primary-400 uppercase tracking-wide mb-2">
              {product.category}
            </p>
          )}
          
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            {product.name}
          </h1>

          <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-6">
            ${product.price.toFixed(2)}
          </div>

          {product.description && (
            <div className="mb-6">
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                {product.description}
              </p>
            </div>
          )}

          <div className="mb-6">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Disponibilidad:</span>
              {product.stock > 0 ? (
                <span className="text-green-600 dark:text-green-400 font-medium">
                  En stock ({product.stock} unidades)
                </span>
              ) : (
                <span className="text-red-600 dark:text-red-400 font-medium">
                  Agotado
                </span>
              )}
            </div>
          </div>

          {product.stock > 0 && (
            <>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Cantidad
                </label>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 hover:bg-primary-200 dark:hover:bg-primary-900/50 transition-colors"
                  >
                    -
                  </button>
                  <span className="text-xl font-semibold text-gray-900 dark:text-gray-100 min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 hover:bg-primary-200 dark:hover:bg-primary-900/50 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  className="flex-1"
                >
                  {isAdding ? 'Añadiendo...' : 'Añadir al carrito'}
                </Button>
                <Link href="/cart" className="flex-1">
                  <Button size="lg" variant="outline" className="w-full">
                    Ver carrito
                  </Button>
                </Link>
              </div>
            </>
          )}

          {product.stock === 0 && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-4">
              <p className="text-red-800 dark:text-red-400">
                Este producto está temporalmente agotado. Vuelve pronto para más novedades.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
