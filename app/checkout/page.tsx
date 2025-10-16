'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'
import { formatPrice } from '@/lib/utils'
import { sendOrderToWhatsApp } from '@/lib/whatsapp'
import { ArrowLeft, CreditCard, MapPin, User, Mail, Phone } from 'lucide-react'

export default function CheckoutPage() {
  const { items, getTotalPrice, getTotalItems, clearCart } = useCart()
  const { user } = useAuth()
  const router = useRouter()

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'España',
    notes: ''
  })

  const [isProcessing, setIsProcessing] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    try {
      // Crear la orden
      const order = {
        id: Date.now().toString(),
        user_id: user?.id || 'guest',
        total: getTotalPrice() + (getTotalPrice() >= 50 ? 0 : 9.99),
        status: 'pending',
        items: items,
        shipping: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
          country: formData.country
        },
        notes: formData.notes,
        created_at: new Date().toISOString()
      }

      // Enviar a WhatsApp
      await sendOrderToWhatsApp(items, {
        ...formData,
        id: user?.id || 'guest',
        is_admin: user?.is_admin || false
      })

      // Limpiar carrito
      clearCart()

      // Redirigir a página de confirmación
      router.push(`/order-confirmation?orderId=${order.id}`)
    } catch (error) {
      console.error('Error processing order:', error)
      alert('Hubo un error al procesar tu pedido. Por favor, inténtalo de nuevo.')
    } finally {
      setIsProcessing(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              No hay productos en tu carrito
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Añade algunos productos antes de proceder al pago
            </p>
            <Button onClick={() => router.push('/shop')}>
              Ir a la Tienda
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Finalizar Compra
          </h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Shipping Information */}
            <div className="space-y-6">
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-pink-500" />
                  Información de Envío
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Nombre"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    label="Apellidos"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    label="Teléfono"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="mt-4">
                  <Input
                    label="Dirección"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <Input
                    label="Ciudad"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    label="Código Postal"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    label="País"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Notas adicionales (opcional)
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
                    placeholder="Instrucciones especiales para la entrega..."
                  />
                </div>
              </Card>

              {/* Payment Information */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                  <CreditCard className="w-5 h-5 mr-2 text-pink-500" />
                  Información de Pago
                </h2>

                <div className="bg-pink-50 dark:bg-pink-900/20 border border-pink-200 dark:border-pink-800 rounded-xl p-4">
                  <p className="text-sm text-pink-700 dark:text-pink-300">
                    <strong>Método de pago:</strong> Pago contra reembolso
                  </p>
                  <p className="text-xs text-pink-600 dark:text-pink-400 mt-1">
                    Pagarás cuando recibas tu pedido en casa
                  </p>
                </div>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Resumen del Pedido
                </h2>

                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-lg flex-shrink-0">
                        <img
                          src={item.image_url}
                          alt={item.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 dark:text-white truncate">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Cantidad: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                      <span>Subtotal ({getTotalItems()} productos)</span>
                      <span>{formatPrice(getTotalPrice())}</span>
                    </div>
                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                      <span>Envío</span>
                      <span className={getTotalPrice() >= 50 ? 'text-green-600' : ''}>
                        {getTotalPrice() >= 50 ? 'Gratis' : formatPrice(9.99)}
                      </span>
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
                      <div className="flex justify-between text-lg font-semibold text-gray-900 dark:text-white">
                        <span>Total</span>
                        <span>
                          {formatPrice(getTotalPrice() + (getTotalPrice() >= 50 ? 0 : 9.99))}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {getTotalPrice() < 50 && (
                  <div className="bg-pink-50 dark:bg-pink-900/20 border border-pink-200 dark:border-pink-800 rounded-xl p-4 mt-4">
                    <p className="text-sm text-pink-700 dark:text-pink-300">
                      <span className="font-semibold">
                        ¡Añade {formatPrice(50 - getTotalPrice())} más
                      </span>
                      {' '}para obtener envío gratis
                    </p>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full mt-6"
                  size="lg"
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Procesando...' : 'Confirmar Pedido'}
                </Button>

                <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
                  Al confirmar tu pedido, aceptas nuestros términos y condiciones
                </p>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}