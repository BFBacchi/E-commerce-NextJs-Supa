'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { createClient } from '@/lib/supabase'
import { Product } from '@/lib/types'
import { useCart } from '@/context/CartContext'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { formatPrice } from '@/lib/utils'
import { 
  ArrowLeft, 
  ShoppingCart, 
  Heart, 
  Star, 
  Truck, 
  Shield, 
  RotateCcw,
  Minus,
  Plus
} from 'lucide-react'

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { addItem } = useCart()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const supabase = createClient()

  useEffect(() => {
    if (params.id) {
      loadProduct(params.id as string)
    }
  }, [params.id])

  const loadProduct = async (productId: string) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', productId)
        .single()

      if (error) throw error
      setProduct(data)
    } catch (error) {
      console.error('Error loading product:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity)
      // Mostrar notificación de éxito (opcional)
      alert('Producto añadido al carrito')
    }
  }

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 0)) {
      setQuantity(newQuantity)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Cargando producto...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Producto no encontrado
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            El producto que buscas no existe o ha sido eliminado
          </p>
          <Button onClick={() => router.push('/shop')}>
            Volver a la Tienda
          </Button>
        </div>
      </div>
    )
  }

  // Simular múltiples imágenes (en un caso real vendrían de la base de datos)
  const productImages = [
    product.image_url,
    product.image_url.replace('w=400&h=400', 'w=400&h=400&fit=crop&crop=top'),
    product.image_url.replace('w=400&h=400', 'w=400&h=400&fit=crop&crop=bottom')
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>
          <span className="text-gray-500 dark:text-gray-400">/</span>
          <button
            onClick={() => router.push('/shop')}
            className="text-gray-500 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400"
          >
            Tienda
          </button>
          <span className="text-gray-500 dark:text-gray-400">/</span>
          <span className="text-gray-900 dark:text-white font-medium">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-white dark:bg-gray-800 rounded-2xl overflow-hidden">
              <Image
                src={productImages[selectedImage]}
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-3 gap-4">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-white dark:bg-gray-800 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? 'border-pink-500 dark:border-pink-400'
                      : 'border-gray-200 dark:border-gray-700 hover:border-pink-300 dark:hover:border-pink-600'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {product.name}
              </h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                    (4.5) - 128 reseñas
                  </span>
                </div>
              </div>
              <p className="text-3xl font-bold text-pink-600 dark:text-pink-400">
                {formatPrice(product.price)}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Descripción
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Quantity Selector */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Cantidad
              </h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-xl">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                    className="rounded-none rounded-l-xl"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="px-4 py-2 text-gray-900 dark:text-white font-medium">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= product.stock}
                    className="rounded-none rounded-r-xl"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {product.stock} disponibles
                </span>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="space-y-4">
              <Button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                size="lg"
                className="w-full"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {product.stock === 0 ? 'Agotado' : 'Añadir al Carrito'}
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="w-full"
              >
                <Heart className="w-5 h-5 mr-2" />
                Añadir a Favoritos
              </Button>
            </div>

            {/* Product Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="text-center">
                <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Truck className="w-6 h-6 text-pink-500" />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Envío Gratis</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">En pedidos +50€</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Shield className="w-6 h-6 text-green-500" />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Compra Segura</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">Pagos protegidos</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <RotateCcw className="w-6 h-6 text-blue-500" />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Devoluciones</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">30 días garantía</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8">
              <button className="py-2 px-1 border-b-2 border-pink-500 text-pink-600 dark:text-pink-400 font-medium text-sm">
                Detalles
              </button>
              <button className="py-2 px-1 border-b-2 border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 font-medium text-sm">
                Reseñas
              </button>
              <button className="py-2 px-1 border-b-2 border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 font-medium text-sm">
                Envío
              </button>
            </nav>
          </div>

          <div className="py-8">
            <Card className="p-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Información del Producto
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Categoría</h4>
                  <p className="text-gray-600 dark:text-gray-400 capitalize">{product.category}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Material</h4>
                  <p className="text-gray-600 dark:text-gray-400">Algodón 100%</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Cuidados</h4>
                  <p className="text-gray-600 dark:text-gray-400">Lavado a máquina 30°C</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Origen</h4>
                  <p className="text-gray-600 dark:text-gray-400">Hecho en España</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}