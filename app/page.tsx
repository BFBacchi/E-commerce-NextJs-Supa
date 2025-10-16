import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Star, Truck, Shield, Heart } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { ProductCard } from '@/components/product/ProductCard'
import { createServerSupabaseClient } from '@/lib/supabase-server'

async function getFeaturedProducts() {
  const supabase = createServerSupabaseClient()
  
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .limit(4)
    .order('created_at', { ascending: false })

  return products || []
}

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts()

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 to-rose-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                  Descubre tu
                  <span className="bg-gradient-to-r from-primary-600 to-rose-600 bg-clip-text text-transparent">
                    {' '}Elegancia
                  </span>
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                  Moda femenina cuidadosamente seleccionada para mujeres que valoran el estilo, 
                  la calidad y la elegancia en cada detalle.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/shop">
                  <Button size="lg" className="w-full sm:w-auto">
                    Explorar Colección
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Ver Lookbook
                </Button>
              </div>

              <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  <span>4.9/5 en reseñas</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Truck className="h-5 w-5 text-green-500" />
                  <span>Envío gratis</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative w-full h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800"
                  alt="Moda elegante"
                  fill
                  className="object-cover"
                />
              </div>
              
              {/* Floating Cards */}
              <div className="absolute -top-4 -left-4 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-soft">
                <div className="flex items-center space-x-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  <span className="text-sm font-medium">+1000 clientas felices</span>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-soft">
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-medium">Compra segura</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
            Productos Destacados
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Seleccionamos cuidadosamente cada pieza para ofrecerte lo mejor en moda femenina
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center">
          <Link href="/shop">
            <Button variant="outline" size="lg">
              Ver Toda la Colección
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
              ¿Por qué elegir Elegancia?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-rose-500 rounded-xl flex items-center justify-center mx-auto">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Calidad Premium
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Seleccionamos cada prenda con los más altos estándares de calidad y materiales premium.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-rose-500 rounded-xl flex items-center justify-center mx-auto">
                  <Truck className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Envío Rápido
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Envío gratuito en pedidos superiores a $50. Recibe tu pedido en 2-3 días hábiles.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-rose-500 rounded-xl flex items-center justify-center mx-auto">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Compra Segura
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Tus datos están protegidos con la más alta seguridad. Garantía de satisfacción 100%.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="bg-gradient-to-r from-primary-500 to-rose-500 text-white border-0">
          <CardContent className="p-8 lg:p-12 text-center space-y-6">
            <h2 className="text-2xl lg:text-3xl font-bold">
              Mantente al día con las últimas tendencias
            </h2>
            <p className="text-primary-100 text-lg">
              Suscríbete a nuestro newsletter y recibe ofertas exclusivas y las últimas novedades en moda.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Tu email"
                className="flex-1 px-4 py-3 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <Button variant="secondary" className="bg-white text-primary-600 hover:bg-gray-100">
                Suscribirse
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}