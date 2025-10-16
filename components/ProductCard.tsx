'use client'

import React from 'react'
import Image from 'next/image'
import { Product } from '@/lib/types'
import { formatPrice } from '@/lib/utils'
import { Button } from './ui/Button'
import { Card } from './ui/Card'
import { useCart } from '@/context/CartContext'
import { ShoppingCart, Heart } from 'lucide-react'

interface ProductCardProps {
  product: Product
  onViewDetails?: (product: Product) => void
}

export function ProductCard({ product, onViewDetails }: ProductCardProps) {
  const { addItem } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    addItem(product)
  }

  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(product)
    }
  }

  return (
    <Card 
      className="group cursor-pointer hover:shadow-rose transition-all duration-300 hover:-translate-y-1"
      onClick={handleViewDetails}
    >
      <div className="relative overflow-hidden rounded-xl mb-4">
        <Image
          src={product.image_url}
          alt={product.name}
          width={300}
          height={300}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Button
            variant="ghost"
            size="sm"
            className="bg-white/80 hover:bg-white/90 text-pink-600"
          >
            <Heart className="w-4 h-4" />
          </Button>
        </div>
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-semibold">Agotado</span>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-pink-600 dark:text-pink-400">
            {formatPrice(product.price)}
          </span>
          <Button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            size="sm"
            className="flex items-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            Agregar
          </Button>
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          {product.stock > 0 ? `${product.stock} disponibles` : 'Agotado'}
        </div>
      </div>
    </Card>
  )
}