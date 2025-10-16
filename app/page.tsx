import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { ProductCard } from '@/components/ProductCard'
import { getProducts } from '@/lib/api/products'
import { Product } from '@/lib/types'

export const dynamic = 'force-dynamic'

export default async function Home() {
  let displayProducts: Product[] = []
  
  try {
    const featuredProducts = await getProducts()
    displayProducts = featuredProducts.slice(0, 4)
  } catch (error) {
    console.error('Error loading products:', error)
    // Continuar sin productos si hay error
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <div className="inline-block mb-4">
          <span className="px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full text-sm font-medium">
            Nueva Colección
          </span>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary-500 via-primary-600 to-rosegold bg-clip-text text-transparent">
          Elegancia que te define
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
          Descubre nuestra colección de piezas únicas diseñadas para realzar tu estilo y personalidad
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/shop">
            <Button size="lg">
              Explorar Tienda
            </Button>
          </Link>
          <Link href="/shop?category=vestidos">
            <Button size="lg" variant="outline">
              Ver Vestidos
            </Button>
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Productos Destacados
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Las piezas más populares de nuestra colección
            </p>
          </div>
          <Link href="/shop">
            <Button variant="outline">Ver todo</Button>
          </Link>
        </div>

        {displayProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">
              Configura Supabase para ver los productos. Ver SUPABASE_SETUP.md
            </p>
          </div>
        )}
      </section>

      {/* Features */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="text-center p-6 bg-white/50 dark:bg-gray-800/50 rounded-3xl backdrop-blur-sm">
          <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Calidad Premium</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Materiales de la más alta calidad seleccionados cuidadosamente
          </p>
        </div>

        <div className="text-center p-6 bg-white/50 dark:bg-gray-800/50 rounded-3xl backdrop-blur-sm">
          <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Entrega Rápida</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Recibe tu pedido en tiempo récord con nuestro servicio express
          </p>
        </div>

        <div className="text-center p-6 bg-white/50 dark:bg-gray-800/50 rounded-3xl backdrop-blur-sm">
          <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Pago Seguro</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Tus datos protegidos con tecnología de encriptación avanzada
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-3xl p-12 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          ¿Lista para renovar tu armario?
        </h2>
        <p className="text-xl mb-8 opacity-90">
          Únete a miles de mujeres que ya confían en nosotras
        </p>
        <Link href="/shop">
          <Button size="lg" variant="secondary">
            Comenzar a Comprar
          </Button>
        </Link>
      </section>
    </div>
  )
}
