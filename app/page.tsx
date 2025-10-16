import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Heart, Sparkles, Package } from 'lucide-react'
import ProductCard from '@/components/product-card'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export default async function HomePage() {
  const supabase = createServerSupabaseClient()
  
  // Obtener productos destacados
  const { data: featuredProducts } = await supabase
    .from('products')
    .select('*')
    .limit(3)
    .order('created_at', { ascending: false })

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[600px] bg-gradient-to-br from-pink-100 to-rose-200">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Descubre tu estilo único
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Explora nuestra colección exclusiva de moda femenina, diseñada para resaltar tu belleza natural.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center px-6 py-3 bg-white text-primary rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            >
              Explorar Tienda
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="text-primary" size={32} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Hecho con amor</h3>
              <p className="text-gray-600">
                Cada producto es seleccionado cuidadosamente para ofrecerte la mejor calidad.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="text-primary" size={32} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Diseños exclusivos</h3>
              <p className="text-gray-600">
                Encuentra piezas únicas que no verás en ningún otro lugar.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="text-primary" size={32} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Envío rápido</h3>
              <p className="text-gray-600">
                Recibe tus pedidos en la puerta de tu casa en tiempo récord.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Productos destacados */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Productos destacados
          </h2>
          
          {featuredProducts && featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">
              No hay productos disponibles en este momento.
            </p>
          )}
          
          <div className="text-center mt-12">
            <Link
              href="/shop"
              className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors font-semibold"
            >
              Ver todos los productos
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}