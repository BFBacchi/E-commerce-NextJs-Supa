'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import { Product } from '@/types'
import { formatPrice } from '@/lib/utils'
import { useCartStore } from '@/context/cart-store'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem)

  return (
    <div className="bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
      <Link href={`/product/${product.id}`}>
        <div className="relative h-64 w-full">
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
      </Link>
      
      <div className="p-4">
        <Link href={`/product/${product.id}`}>
          <h3 className="font-semibold text-lg mb-1 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-primary">
            {formatPrice(product.price)}
          </span>
          
          <button
            onClick={() => addItem(product)}
            className="p-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
            aria-label="Añadir al carrito"
          >
            <ShoppingCart size={20} />
          </button>
        </div>
        
        {product.stock < 10 && product.stock > 0 && (
          <p className="text-sm text-orange-500 mt-2">
            ¡Solo quedan {product.stock} unidades!
          </p>
        )}
        
        {product.stock === 0 && (
          <p className="text-sm text-red-500 mt-2">Agotado</p>
        )}
      </div>
    </div>
  )
}