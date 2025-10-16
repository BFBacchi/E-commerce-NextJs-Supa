import { notFound } from 'next/navigation'
import Image from 'next/image'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { formatPrice } from '@/lib/utils'
import AddToCartButton from './add-to-cart-button'

export default async function ProductPage({
  params,
}: {
  params: { id: string }
}) {
  const supabase = createServerSupabaseClient()
  
  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('id', params.id)
    .single()
  
  if (!product) {
    notFound()
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Imagen del producto */}
        <div className="relative aspect-square rounded-xl overflow-hidden bg-card">
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Información del producto */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-sm text-gray-500 uppercase">{product.category}</p>
          </div>

          <div className="text-3xl font-bold text-primary">
            {formatPrice(product.price)}
          </div>

          <div className="prose prose-gray dark:prose-invert">
            <p>{product.description}</p>
          </div>

          <div className="space-y-4">
            {product.stock > 0 ? (
              <>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Disponibilidad:</span>
                  <span className="text-sm font-medium text-green-600">
                    En stock ({product.stock} unidades)
                  </span>
                </div>
                <AddToCartButton product={product} />
              </>
            ) : (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-red-600 dark:text-red-400 font-medium">
                  Producto agotado
                </p>
              </div>
            )}
          </div>

          <div className="border-t border-border pt-6 space-y-2">
            <h3 className="font-semibold mb-3">Detalles del producto</h3>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">SKU:</span>
              <span>{product.id.slice(0, 8).toUpperCase()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Categoría:</span>
              <span className="capitalize">{product.category}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}