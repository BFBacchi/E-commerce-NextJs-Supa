'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/lib/types'
import { Card } from './ui/Card'
import { Button } from './ui/Button'
import { useCartStore } from '@/lib/store/cart'
import { useState } from 'react'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem)
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    setIsAdding(true)
    addItem(product, 1)
    
    setTimeout(() => {
      setIsAdding(false)
    }, 1000)
  }

  return (
    <Link href={`/product/${product.id}`}>
      <Card hover className="overflow-hidden h-full flex flex-col">
        <div className="relative h-64 w-full bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-700 dark:to-gray-800">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg className="w-20 h-20 text-primary-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
          {product.stock <= 5 && product.stock > 0 && (
            <div className="absolute top-3 right-3 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
              ¡Últimas unidades!
            </div>
          )}
          {product.stock === 0 && (
            <div className="absolute top-3 right-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              Agotado
            </div>
          )}
        </div>
        
        <div className="p-4 flex-1 flex flex-col">
          <div className="flex-1">
            {product.category && (
              <p className="text-xs text-primary-600 dark:text-primary-400 uppercase tracking-wide mb-1">
                {product.category}
              </p>
            )}
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              {product.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
              {product.description}
            </p>
          </div>
          
          <div className="flex items-center justify-between mt-auto">
            <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              ${product.price.toFixed(2)}
            </span>
            <Button
              size="sm"
              onClick={handleAddToCart}
              disabled={product.stock === 0 || isAdding}
              className="flex items-center space-x-1"
            >
              {isAdding ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span>Añadiendo...</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <span>Añadir</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </Card>
    </Link>
  )
}
