import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default function SuccessPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full mb-6">
          <svg className="w-12 h-12 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          ¡Pedido Confirmado!
        </h1>

        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Gracias por tu compra. En breve recibirás un mensaje de WhatsApp con los detalles de tu pedido.
        </p>

        <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-3xl p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            ¿Qué sigue?
          </h2>
          <div className="space-y-4 text-left max-w-md mx-auto">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <p className="text-gray-900 dark:text-gray-100 font-medium">
                  Recibirás un mensaje por WhatsApp
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Te enviaremos todos los detalles de tu pedido
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <p className="text-gray-900 dark:text-gray-100 font-medium">
                  Coordinaremos el pago
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Te daremos las opciones de pago disponibles
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <p className="text-gray-900 dark:text-gray-100 font-medium">
                  Prepararemos tu pedido
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Y lo enviaremos a tu dirección
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/shop">
            <Button size="lg">
              Continuar Comprando
            </Button>
          </Link>
          <Link href="/">
            <Button size="lg" variant="outline">
              Volver al Inicio
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
