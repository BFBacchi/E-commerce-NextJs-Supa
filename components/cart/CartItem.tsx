'use client'

import Image from 'next/image'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useCart } from '@/context/CartContext'
import type { CartItem as CartItemType } from '@/types'

interface CartItemProps {
  item: CartItemType
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart()

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(item.product.id)
    } else {
      updateQuantity(item.product.id, newQuantity)
    }
  }

  const itemTotal = item.product.price * item.quantity

  return (
    <div className="flex items-center space-x-4 py-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
      {/* Product Image */}
      <div className="relative w-16 h-16 flex-shrink-0">
        <Image
          src={item.product.image_url || '/placeholder-product.jpg'}
          alt={item.product.name}
          fill
          className="object-cover rounded-lg"
        />
      </div>

      {/* Product Info */}
      <div className="flex-grow min-w-0">
        <h3 className="font-medium text-gray-900 dark:text-white truncate">
          {item.product.name}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
          {item.product.category}
        </p>
        <p className="text-sm font-medium text-primary-600 dark:text-primary-400">
          ${item.product.price.toFixed(2)}
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          className="p-1 h-8 w-8"
          onClick={() => handleQuantityChange(item.quantity - 1)}
        >
          <Minus className="h-3 w-3" />
        </Button>
        
        <span className="w-8 text-center text-sm font-medium text-gray-900 dark:text-white">
          {item.quantity}
        </span>
        
        <Button
          variant="outline"
          size="sm"
          className="p-1 h-8 w-8"
          onClick={() => handleQuantityChange(item.quantity + 1)}
          disabled={item.quantity >= item.product.stock}
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>

      {/* Item Total */}
      <div className="text-right">
        <p className="font-medium text-gray-900 dark:text-white">
          ${itemTotal.toFixed(2)}
        </p>
      </div>

      {/* Remove Button */}
      <Button
        variant="ghost"
        size="sm"
        className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
        onClick={() => removeItem(item.product.id)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  )
}