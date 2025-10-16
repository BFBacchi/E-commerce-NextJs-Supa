'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, Heart } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { useCart } from '@/context/CartContext'
import type { Product } from '@/types'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product, 1)
  }

  return (
    <Link href={`/product/${product.id}`}>
      <Card className="group cursor-pointer transition-all duration-300 hover:shadow-soft-lg hover:-translate-y-1">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.image_url || '/placeholder-product.jpg'}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Stock Badge */}
          {product.stock <= 5 && product.stock > 0 && (
            <Badge variant="warning" className="absolute top-3 left-3">
              ¡Últimas {product.stock}!
            </Badge>
          )}
          
          {product.stock === 0 && (
            <Badge variant="error" className="absolute top-3 left-3">
              Agotado
            </Badge>
          )}

          {/* Quick Actions */}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex flex-col space-y-2">
              <Button
                variant="secondary"
                size="sm"
                className="p-2 bg-white/90 hover:bg-white"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  // TODO: Add to wishlist functionality
                }}
              >
                <Heart className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Add to Cart Button - Overlay */}
          <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              variant="primary"
              size="sm"
              className="w-full"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              {product.stock === 0 ? 'Agotado' : 'Agregar al Carrito'}
            </Button>
          </div>
        </div>

        <div className="p-4">
          <div className="mb-2">
            <Badge variant="default" className="text-xs">
              {product.category}
            </Badge>
          </div>
          
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
            {product.name}
          </h3>
          
          {product.description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
              {product.description}
            </p>
          )}
          
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-primary-600 dark:text-primary-400">
              ${product.price.toFixed(2)}
            </span>
            
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Stock: {product.stock}
            </span>
          </div>
        </div>
      </Card>
    </Link>
  )
}