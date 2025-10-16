'use client'

import { useState } from 'react'
import { ShoppingCart, Heart, Minus, Plus } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/hooks/useAuth'
import type { Product } from '@/types'

interface ProductActionsProps {
  product: Product
}

export function ProductActions({ product }: ProductActionsProps) {
  const [quantity, setQuantity] = useState(1)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const { addItem } = useCart()
  const { user } = useAuth()

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity)
    }
  }

  const handleAddToCart = async () => {
    setIsAddingToCart(true)
    try {
      addItem(product, quantity)
      // Show success message (you could add a toast notification here)
    } catch (error) {
      console.error('Error adding to cart:', error)
    } finally {
      setIsAddingToCart(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Quantity Selector */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Cantidad
        </label>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleQuantityChange(quantity - 1)}
            disabled={quantity <= 1}
            className="p-2"
          >
            <Minus className="h-4 w-4" />
          </Button>
          
          <span className="w-16 text-center text-lg font-medium text-gray-900 dark:text-white">
            {quantity}
          </span>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleQuantityChange(quantity + 1)}
            disabled={quantity >= product.stock}
            className="p-2"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          size="lg"
          className="w-full"
          onClick={handleAddToCart}
          disabled={product.stock === 0 || isAddingToCart}
          loading={isAddingToCart}
        >
          <ShoppingCart className="h-5 w-5 mr-2" />
          {product.stock === 0 ? 'Agotado' : 'Agregar al Carrito'}
        </Button>
        
        <Button
          variant="outline"
          size="lg"
          className="w-full"
          onClick={() => {
            // TODO: Add to wishlist functionality
          }}
        >
          <Heart className="h-5 w-5 mr-2" />
          Agregar a Favoritos
        </Button>
      </div>

      {/* Size Guide */}
      {(product.category === 'vestidos' || product.category === 'blusas' || product.category === 'faldas') && (
        <div className="text-center">
          <Button variant="ghost" size="sm" className="text-primary-600 dark:text-primary-400">
            Ver guía de tallas
          </Button>
        </div>
      )}
    </div>
  )
}