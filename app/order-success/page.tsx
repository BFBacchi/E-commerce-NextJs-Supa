'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, MessageCircle, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'

export default function OrderSuccessPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId')
  const [orderNumber, setOrderNumber] = useState('')

  useEffect(() => {
    if (orderId) {
      // Generate a user-friendly order number from the UUID
      setOrderNumber(orderId.slice(-8).toUpperCase())
    }
  }, [orderId])

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center space-y-8">
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
            <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
          </div>
        </div>

        {/* Success Message */}
        <div className="space-y-4">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
            ¡Pedido Enviado Exitosamente!
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Tu pedido ha sido procesado y enviado por WhatsApp. Nos pondremos en contacto contigo 
            pronto para confirmar los detalles y coordinar la entrega.
          </p>
        </div>

        {/* Order Details */}
        {orderNumber && (
          <Card className="max-w-md mx-auto">
            <CardContent className="p-6 text-center space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Número de Pedido
              </h3>
              <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 font-mono">
                #{orderNumber}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Guarda este número para futuras referencias
              </p>
            </CardContent>
          </Card>
        )}

        {/* Next Steps */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            ¿Qué sigue?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto">
                  <MessageCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  1. Confirmación
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Recibirás un mensaje de WhatsApp con los detalles de tu pedido
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-yellow-600 dark:text-yellow-400 font-bold text-lg">2</span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  2. Preparación
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Prepararemos tu pedido con mucho cuidado y amor
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-green-600 dark:text-green-400 font-bold text-lg">3</span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  3. Entrega
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Recibirás tu pedido en 2-3 días hábiles
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/shop">
            <Button size="lg" className="w-full sm:w-auto">
              Continuar Comprando
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </Link>
          
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto"
            onClick={() => {
              const whatsappUrl = `https://wa.me/1234567890?text=Hola! Tengo una consulta sobre mi pedido #${orderNumber}`
              window.open(whatsappUrl, '_blank')
            }}
          >
            <MessageCircle className="h-5 w-5 mr-2" />
            Contactar por WhatsApp
          </Button>
        </div>

        {/* Additional Info */}
        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-6 max-w-2xl mx-auto">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
            Información Importante
          </h3>
          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400 text-left">
            <p>• Recibirás actualizaciones del estado de tu pedido por WhatsApp</p>
            <p>• El tiempo de entrega es de 2-3 días hábiles</p>
            <p>• Envío gratuito en pedidos superiores a $50</p>
            <p>• Tienes 30 días para cambios y devoluciones</p>
          </div>
        </div>
      </div>
    </div>
  )
}