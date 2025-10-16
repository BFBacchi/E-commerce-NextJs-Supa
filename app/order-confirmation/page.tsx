'use client'

import React from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { CheckCircle, Package, Truck, MessageCircle } from 'lucide-react'

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId')

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          {/* Success Icon */}
          <div className="w-24 h-24 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>

          {/* Success Message */}
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            ¡Pedido Confirmado!
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Gracias por tu compra. Hemos recibido tu pedido y te contactaremos pronto.
          </p>

          {orderId && (
            <Card className="p-6 mb-8 max-w-md mx-auto">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Número de Pedido
              </h2>
              <p className="text-2xl font-mono text-pink-600 dark:text-pink-400">
                #{orderId}
              </p>
            </Card>
          )}

          {/* Next Steps */}
          <Card className="p-8 mb-8 text-left">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
              ¿Qué sigue ahora?
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-pink-100 dark:bg-pink-900/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-5 h-5 text-pink-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Te contactaremos por WhatsApp
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    En las próximas horas recibirás un mensaje con los detalles de tu pedido y opciones de pago.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Package className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Preparación del pedido
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Nuestro equipo preparará cuidadosamente tu pedido en 1-2 días laborables.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Truck className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Envío y entrega
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Tu pedido será enviado y llegará a tu domicilio en 2-5 días laborables.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Contact Information */}
          <Card className="p-6 mb-8 bg-pink-50 dark:bg-pink-900/20 border-pink-200 dark:border-pink-800">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              ¿Tienes alguna pregunta?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              No dudes en contactarnos si necesitas ayuda o tienes alguna pregunta sobre tu pedido.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/34123456789"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp
              </a>
              <a
                href="mailto:info@boutique.com"
                className="inline-flex items-center justify-center px-4 py-2 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition-colors"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Email
              </a>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shop">
              <Button size="lg">
                Seguir Comprando
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" size="lg">
                Volver al Inicio
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}