import Link from 'next/link'
import { Home, Search } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full text-center space-y-8 px-4">
        {/* 404 Illustration */}
        <div className="space-y-4">
          <div className="text-8xl font-bold text-primary-500 dark:text-primary-400">
            404
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
            Página no encontrada
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Lo sentimos, la página que buscas no existe o ha sido movida.
          </p>
        </div>

        {/* Search Suggestion */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-soft border border-gray-200 dark:border-gray-700">
          <Search className="h-12 w-12 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            ¿Buscabas algo específico?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Explora nuestra hermosa colección de moda femenina
          </p>
          <Link href="/shop">
            <Button className="w-full">
              Ir a la Tienda
            </Button>
          </Link>
        </div>

        {/* Navigation Options */}
        <div className="space-y-4">
          <Link href="/">
            <Button variant="outline" size="lg" className="w-full">
              <Home className="h-5 w-5 mr-2" />
              Volver al Inicio
            </Button>
          </Link>
          
          <div className="text-sm text-gray-500 dark:text-gray-400">
            ¿Necesitas ayuda? Contáctanos por WhatsApp
          </div>
        </div>
      </div>
    </div>
  )
}