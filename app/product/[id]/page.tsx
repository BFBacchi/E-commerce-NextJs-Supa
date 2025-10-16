import { notFound } from 'next/navigation'
import Image from 'next/image'
import { ArrowLeft, Star, Truck, Shield, Heart } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Card, CardContent } from '@/components/ui/Card'
import { ProductActions } from '@/components/product/ProductActions'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import type { Product } from '@/types'

interface ProductPageProps {
  params: {
    id: string
  }
}

async function getProduct(id: string): Promise<Product | null> {
  const supabase = createServerSupabaseClient()
  
  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .eq('is_active', true)
    .single()

  return product
}

async function getRelatedProducts(category: string, currentId: string): Promise<Product[]> {
  const supabase = createServerSupabaseClient()
  
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('category', category)
    .eq('is_active', true)
    .neq('id', currentId)
    .limit(4)

  return products || []
}

export async function generateMetadata({ params }: ProductPageProps) {
  const product = await getProduct(params.id)
  
  if (!product) {
    return {
      title: 'Producto no encontrado',
    }
  }

  return {
    title: `${product.name} - Elegancia`,
    description: product.description || `Compra ${product.name} en Elegancia. Moda femenina elegante y sofisticada.`,
    openGraph: {
      title: product.name,
      description: product.description || '',
      images: product.image_url ? [product.image_url] : [],
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.id)
  
  if (!product) {
    notFound()
  }

  const relatedProducts = await getRelatedProducts(product.category, product.id)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-8">
        <Link href="/shop" className="flex items-center hover:text-primary-600 dark:hover:text-primary-400">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Volver a la tienda
        </Link>
        <span>/</span>
        <span className="capitalize">{product.category}</span>
        <span>/</span>
        <span className="text-gray-900 dark:text-white">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Product Image */}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800">
            <Image
              src={product.image_url || '/placeholder-product.jpg'}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
            
            {/* Stock Badge */}
            {product.stock <= 5 && product.stock > 0 && (
              <Badge variant="warning" className="absolute top-4 left-4">
                ¡Últimas {product.stock}!
              </Badge>
            )}
            
            {product.stock === 0 && (
              <Badge variant="error" className="absolute top-4 left-4">
                Agotado
              </Badge>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <Badge variant="default" className="mb-3 capitalize">
              {product.category}
            </Badge>
            
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {product.name}
            </h1>
            
            <div className="flex items-center space-x-4 mb-4">
              <span className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                ${product.price.toFixed(2)}
              </span>
              
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                  (4.8) 24 reseñas
                </span>
              </div>
            </div>
            
            {product.description && (
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                {product.description}
              </p>
            )}
          </div>

          {/* Stock Info */}
          <div className="flex items-center space-x-4 text-sm">
            <span className="text-gray-600 dark:text-gray-400">
              Stock disponible: <span className="font-medium text-gray-900 dark:text-white">{product.stock} unidades</span>
            </span>
          </div>

          {/* Product Actions */}
          <ProductActions product={product} />

          {/* Features */}
          <div className="space-y-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
              <Truck className="h-5 w-5 text-green-500" />
              <span>Envío gratis en pedidos superiores a $50</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
              <Shield className="h-5 w-5 text-blue-500" />
              <span>Garantía de satisfacción 30 días</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
              <Heart className="h-5 w-5 text-red-500" />
              <span>Cuidadosamente seleccionado por nuestro equipo</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Detalles del Producto
            </h3>
            <div className="space-y-3 text-gray-600 dark:text-gray-300">
              <div className="flex justify-between">
                <span>Categoría:</span>
                <span className="capitalize font-medium">{product.category}</span>
              </div>
              <div className="flex justify-between">
                <span>Material:</span>
                <span className="font-medium">Algodón Premium</span>
              </div>
              <div className="flex justify-between">
                <span>Cuidado:</span>
                <span className="font-medium">Lavado a máquina</span>
              </div>
              <div className="flex justify-between">
                <span>Origen:</span>
                <span className="font-medium">Diseño Nacional</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Guía de Tallas
            </h3>
            <div className="space-y-3 text-gray-600 dark:text-gray-300">
              <div className="flex justify-between">
                <span>XS:</span>
                <span className="font-medium">32-34</span>
              </div>
              <div className="flex justify-between">
                <span>S:</span>
                <span className="font-medium">36-38</span>
              </div>
              <div className="flex justify-between">
                <span>M:</span>
                <span className="font-medium">40-42</span>
              </div>
              <div className="flex justify-between">
                <span>L:</span>
                <span className="font-medium">44-46</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Productos Relacionados
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct.id}>
                <Link href={`/product/${relatedProduct.id}`}>
                  <Card className="group cursor-pointer transition-all duration-300 hover:shadow-soft-lg hover:-translate-y-1">
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src={relatedProduct.image_url || '/placeholder-product.jpg'}
                        alt={relatedProduct.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                        {relatedProduct.name}
                      </h3>
                      <span className="text-lg font-bold text-primary-600 dark:text-primary-400">
                        ${relatedProduct.price.toFixed(2)}
                      </span>
                    </div>
                  </Card>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}