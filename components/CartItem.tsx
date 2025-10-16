'use client'

import React from 'react'
import Image from 'next/image'
import { CartItem as CartItemType } from '@/lib/types'
import { formatPrice } from '@/lib/utils'
import { Button } from './ui/Button'
import { useCart } from '@/context/CartContext'
import { Minus, Plus, Trash2 } from 'lucide-react'

interface CartItemProps {
  item: CartItemType
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart()

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(item.id)
    } else {
      updateQuantity(item.id, newQuantity)
    }
  }

  return (
    <div className="flex items-center space-x-4 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
      <div className="relative w-16 h-16 flex-shrink-0">
        <Image
          src={item.image_url}
          alt={item.name}
          fill
          className="object-cover rounded-lg"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-gray-900 dark:text-white truncate">
          {item.name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {formatPrice(item.price)} c/u
        </p>
      </div>

      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleQuantityChange(item.quantity - 1)}
          className="w-8 h-8 p-0"
        >
          <Minus className="w-4 h-4" />
        </Button>
        
        <span className="w-8 text-center font-medium text-gray-900 dark:text-white">
          {item.quantity}
        </span>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleQuantityChange(item.quantity + 1)}
          disabled={item.quantity >= item.stock}
          className="w-8 h-8 p-0"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      <div className="text-right">
        <p className="font-semibold text-gray-900 dark:text-white">
          {formatPrice(item.price * item.quantity)}
        </p>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => removeItem(item.id)}
          className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}