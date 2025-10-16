'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí podrías implementar el envío del formulario
    alert('¡Mensaje enviado! Te contactaremos pronto.')
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Contacta con Nosotros
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            ¿Tienes alguna pregunta? Estamos aquí para ayudarte. Envíanos un mensaje y te responderemos pronto.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Envíanos un Mensaje
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Nombre"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <Input
                label="Asunto"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Mensaje
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
                  placeholder="Cuéntanos cómo podemos ayudarte..."
                />
              </div>
              <Button type="submit" className="w-full" size="lg">
                <Send className="w-5 h-5 mr-2" />
                Enviar Mensaje
              </Button>
            </form>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Información de Contacto
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-pink-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      Email
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      info@boutique.com
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      ventas@boutique.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      Teléfono
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      +34 123 456 789
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      WhatsApp disponible
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      Dirección
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Calle de la Moda, 123<br />
                      28001 Madrid, España
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-purple-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      Horarios
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Lunes - Viernes: 9:00 - 18:00<br />
                      Sábados: 10:00 - 14:00<br />
                      Domingos: Cerrado
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Social Media */}
            <Card className="p-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Síguenos en Redes Sociales
              </h3>
              <div className="flex space-x-4">
                <Button variant="outline" size="sm">
                  Instagram
                </Button>
                <Button variant="outline" size="sm">
                  Facebook
                </Button>
                <Button variant="outline" size="sm">
                  TikTok
                </Button>
              </div>
            </Card>

            {/* FAQ */}
            <Card className="p-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Preguntas Frecuentes
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                    ¿Cuánto tardan los envíos?
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Los envíos estándar tardan 2-5 días laborables. Envío gratis en pedidos superiores a 50€.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                    ¿Puedo devolver un producto?
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Sí, tienes 30 días para devolver cualquier producto en perfecto estado.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                    ¿Qué métodos de pago aceptan?
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Aceptamos tarjetas de crédito, PayPal y pago contra reembolso.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}