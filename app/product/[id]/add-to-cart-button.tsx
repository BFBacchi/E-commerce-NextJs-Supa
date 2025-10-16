'use client'

import { useState } from 'react'
import { ShoppingCart, Plus, Minus } from 'lucide-react'
import { Product } from '@/types'
import { useCartStore } from '@/context/cart-store'

interface AddToCartButtonProps {
  product: Product
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1)
  const addItem = useCartStore((state) => state.addItem)
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = () => {
    setIsAdding(true)
    addItem(product, quantity)
    
    // Mostrar feedback visual
    setTimeout(() => {
      setIsAdding(false)
      setQuantity(1)
    }, 500)
  }

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium">Cantidad:</span>
        <div className="flex items-center border border-border rounded-lg">
          <button
            onClick={decrementQuantity}
            className="p-2 hover:bg-card transition-colors"
            disabled={quantity <= 1}
          >
            <Minus size={16} />
          </button>
          <span className="px-4 py-2 min-w-[50px] text-center">{quantity}</span>
          <button
            onClick={incrementQuantity}
            className="p-2 hover:bg-card transition-colors"
            disabled={quantity >= product.stock}
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      <button
        onClick={handleAddToCart}
        disabled={isAdding}
        className={`w-full py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
          isAdding
            ? 'bg-green-500 text-white'
            : 'bg-primary text-white hover:bg-primary-hover'
        }`}
      >
        <ShoppingCart size={20} />
        {isAdding ? '¡Añadido!' : 'Añadir al carrito'}
      </button>
    </div>
  )
}