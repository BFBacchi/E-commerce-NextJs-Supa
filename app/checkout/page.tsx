'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, CreditCard, Truck, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/hooks/useAuth'
import { createOrder } from '@/lib/orders'
import type { CustomerInfo } from '@/types'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, total, clearCart } = useCart()
  const { user } = useAuth()
  
  const [loading, setLoading] = useState(false)
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: user?.full_name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    notes: '',
  })

  const shippingCost = total >= 50 ? 0 : 5
  const finalTotal = total + shippingCost

  const handleInputChange = (field: keyof CustomerInfo, value: string) => {
    setCustomerInfo(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (items.length === 0) {
      alert('Tu carrito está vacío')
      return
    }

    setLoading(true)
    
    try {
      const order = await createOrder(items, customerInfo, user?.id)
      
      // Clear cart
      clearCart()
      
      // Redirect to success page
      router.push(`/order-success?orderId=${order.id}`)
    } catch (error) {
      console.error('Error creating order:', error)
      alert('Hubo un error al procesar tu pedido. Por favor intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center space-y-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Tu carrito está vacío
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Agrega productos a tu carrito antes de proceder al checkout.
          </p>
          <Link href="/shop">
            <Button size="lg">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Ir a la Tienda
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Finalizar Compra
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Completa tu información para procesar el pedido
          </p>
        </div>
        
        <Link href="/cart">
          <Button variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver al Carrito
          </Button>
        </Link>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Customer Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Información de Contacto
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Nombre Completo"
                    type="text"
                    value={customerInfo.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                  />
                  <Input
                    label="Email"
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
                </div>
                <Input
                  label="Teléfono"
                  type="tel"
                  value={customerInfo.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  required
                />
              </CardContent>
            </Card>

            {/* Shipping Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Truck className="h-5 w-5 mr-2" />
                  Información de Envío
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  label="Dirección"
                  type="text"
                  value={customerInfo.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  required
                />
                <Input
                  label="Ciudad"
                  type="text"
                  value={customerInfo.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  required
                />
              </CardContent>
            </Card>

            {/* Additional Notes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Notas Adicionales (Opcional)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <textarea
                  className="input min-h-[100px] resize-y"
                  placeholder="Instrucciones especiales para el envío..."
                  value={customerInfo.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                />
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Resumen del Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Products */}
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-white">
                          {item.product.name}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                          Cantidad: {item.quantity}
                        </p>
                      </div>
                      <span className="font-medium text-gray-900 dark:text-white">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-3">
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Envío</span>
                    <span>{shippingCost === 0 ? 'Gratis' : `$${shippingCost.toFixed(2)}`}</span>
                  </div>
                  
                  <div className="flex justify-between text-lg font-semibold text-gray-900 dark:text-white">
                    <span>Total</span>
                    <span>${finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  loading={loading}
                  disabled={loading}
                >
                  {loading ? 'Procesando...' : 'Enviar Pedido por WhatsApp'}
                </Button>

                <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                  Al hacer clic en &quot;Enviar Pedido&quot;, tu información será enviada por WhatsApp 
                  para confirmar y procesar tu compra.
                </div>
              </CardContent>
            </Card>

            {/* Security Info */}
            <Card>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Información segura y protegida</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Confirmación por WhatsApp</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Envío en 2-3 días hábiles</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}