'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCartStore } from '@/lib/store/cart'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'
import { createOrder } from '@/lib/api/orders'
import { sendOrderToWhatsApp } from '@/lib/api/whatsapp'
import { getCurrentUser } from '@/lib/auth'
import { useEffect } from 'react'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotal, clearCart } = useCartStore()
  const [loading, setLoading] = useState(false)
  const [userId, setUserId] = useState<string | undefined>()
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  })

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
  })

  useEffect(() => {
    getCurrentUser().then(user => {
      if (user) {
        setUserId(user.id)
        setFormData(prev => ({
          ...prev,
          email: user.email
        }))
      }
    })
  }, [])

  useEffect(() => {
    if (items.length === 0) {
      router.push('/cart')
    }
  }, [items, router])

  const validateForm = () => {
    const newErrors = {
      name: '',
      email: '',
      phone: '',
    }

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es requerido'
    }

    setErrors(newErrors)
    return !Object.values(newErrors).some(error => error !== '')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      // Crear la orden en Supabase
      const order = await createOrder(
        formData.email,
        formData.name,
        formData.phone,
        items,
        userId
      )

      if (!order) {
        alert('Error al crear la orden. Por favor intenta de nuevo.')
        setLoading(false)
        return
      }

      // Enviar información a WhatsApp vía n8n
      const whatsappSuccess = await sendOrderToWhatsApp({
        userEmail: formData.email,
        userName: formData.name,
        userPhone: formData.phone,
        items,
        total: getTotal(),
      })

      if (whatsappSuccess) {
        // Limpiar carrito
        clearCart()
        
        // Redirigir a página de éxito
        router.push('/checkout/success')
      } else {
        alert('Orden creada pero hubo un problema al enviar la notificación. Te contactaremos pronto.')
        clearCart()
        router.push('/checkout/success')
      }
    } catch (error) {
      console.error('Error al procesar el checkout:', error)
      alert('Hubo un error al procesar tu pedido. Por favor intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return null
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
        Finalizar Compra
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulario */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Información de Contacto
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Nombre completo"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                error={errors.name}
                placeholder="María García"
                required
              />

              <Input
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                error={errors.email}
                placeholder="maria@ejemplo.com"
                required
              />

              <Input
                label="Teléfono (WhatsApp)"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                error={errors.phone}
                placeholder="+52 55 1234 5678"
                required
              />

              <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-2xl p-4">
                <div className="flex items-start space-x-3">
                  <svg className="w-6 h-6 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="text-sm text-primary-900 dark:text-primary-100">
                    <p className="font-semibold mb-1">Sobre tu pedido</p>
                    <p>
                      Al confirmar tu pedido, recibirás toda la información a través de WhatsApp 
                      para coordinar el pago y la entrega. ¡Es rápido y seguro!
                    </p>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center space-x-2">
                    <svg className="animate-spin h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span>Procesando...</span>
                  </span>
                ) : (
                  'Confirmar Pedido'
                )}
              </Button>
            </form>
          </Card>
        </div>

        {/* Resumen del pedido */}
        <div className="lg:col-span-1">
          <Card className="p-6 sticky top-24">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Resumen
            </h2>

            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.product.id} className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    {item.product.name} x{item.quantity}
                  </span>
                  <span className="text-gray-900 dark:text-gray-100 font-medium">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}

              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="flex justify-between text-gray-600 dark:text-gray-400 mb-2">
                  <span>Subtotal</span>
                  <span>${getTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400 mb-4">
                  <span>Envío</span>
                  <span className="text-green-600 dark:text-green-400">Gratis</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-gray-100">
                  <span>Total</span>
                  <span className="text-primary-600 dark:text-primary-400">
                    ${getTotal().toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Pago seguro garantizado</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
