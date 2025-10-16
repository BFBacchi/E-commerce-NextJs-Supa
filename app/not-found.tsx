import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="max-w-md w-full text-center">
        <Card className="p-12">
          <div className="w-24 h-24 bg-pink-100 dark:bg-pink-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">😔</span>
          </div>
          
          <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">
            404
          </h1>
          
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Página no encontrada
          </h2>
          
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Lo sentimos, la página que buscas no existe o ha sido movida.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button size="lg">
                <Home className="w-5 h-5 mr-2" />
                Ir al Inicio
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Volver Atrás
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}