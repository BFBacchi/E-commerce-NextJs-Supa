'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { ProductCard } from '@/components/ProductCard'
import { useCart } from '@/context/CartContext'
import { 
  ArrowRight, 
  Star, 
  Truck, 
  Shield, 
  Heart,
  Sparkles,
  Crown
} from 'lucide-react'

// Datos de ejemplo para productos destacados
const featuredProducts = [
  {
    id: '1',
    name: 'Vestido Elegante Rosa',
    description: 'Vestido de fiesta en tono rosa con detalles dorados',
    price: 89.99,
    image_url: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop&crop=center',
    category: 'vestidos',
    stock: 5,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Collar de Perlas',
    description: 'Collar elegante con perlas naturales y detalle dorado',
    price: 45.99,
    image_url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop&crop=center',
    category: 'joyeria',
    stock: 8,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Bolso de Cuero Rosa',
    description: 'Bolso de mano en cuero rosa con cierre dorado',
    price: 125.99,
    image_url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&crop=center',
    category: 'accesorios',
    stock: 3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
]

const features = [
  {
    icon: Truck,
    title: 'Envío Gratis',
    description: 'En pedidos superiores a 50€'
  },
  {
    icon: Shield,
    title: 'Compra Segura',
    description: 'Pagos 100% seguros'
  },
  {
    icon: Heart,
    title: 'Hecho con Amor',
    description: 'Cada producto es único'
  }
]

export default function HomePage() {
  const { addItem } = useCart()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 dark:from-gray-900 dark:via-pink-900/20 dark:to-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white">
                  Descubre tu
                  <span className="block bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                    Estilo Único
                  </span>
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-lg">
                  Encuentra las piezas perfectas que reflejen tu personalidad y te hagan sentir especial en cada momento.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/shop">
                  <Button size="lg" className="group">
                    Explorar Tienda
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button variant="outline" size="lg">
                    Conocer Más
                  </Button>
                </Link>
              </div>

              <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span>4.9/5</span>
                </div>
                <div>+1000 clientes felices</div>
              </div>
            </div>

            <div className="relative">
              <div className="relative w-full h-96 lg:h-[500px] rounded-3xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=600&fit=crop&crop=center"
                  alt="Modelo con vestido elegante"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full flex items-center justify-center shadow-rose">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-gold-400 to-gold-500 rounded-full flex items-center justify-center shadow-lg">
                <Crown className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center group hover:shadow-rose transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Productos Destacados
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Descubre nuestras piezas más populares, cuidadosamente seleccionadas para ti
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center">
            <Link href="/shop">
              <Button size="lg" variant="outline">
                Ver Todos los Productos
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-pink-500 to-rose-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            ¿Lista para brillar?
          </h2>
          <p className="text-xl text-pink-100 mb-8 max-w-2xl mx-auto">
            Únete a miles de mujeres que ya han encontrado su estilo perfecto con nosotros
          </p>
          <Link href="/shop">
            <Button size="lg" variant="secondary" className="bg-white text-pink-600 hover:bg-pink-50">
              Comenzar a Comprar
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}