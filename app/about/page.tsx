import React from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Heart, Users, Award, Sparkles } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Sobre Nosotros
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Somos una boutique especializada en moda femenina, dedicada a realzar la belleza y elegancia de cada mujer.
          </p>
        </div>

        {/* Story Section */}
        <Card className="p-8 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Nuestra Historia
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Fundada en 2020, Boutique nació del sueño de crear un espacio donde cada mujer pueda encontrar 
                piezas únicas que reflejen su personalidad y estilo personal.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Nos especializamos en moda femenina con un enfoque en la calidad, el diseño elegante y 
                la sostenibilidad. Cada pieza de nuestra colección es cuidadosamente seleccionada para 
                ofrecerte lo mejor en moda contemporánea.
              </p>
              <Button>
                Conoce Nuestra Historia
              </Button>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-pink-100 to-rose-100 dark:from-pink-900/20 dark:to-rose-900/20 rounded-2xl flex items-center justify-center">
                <Sparkles className="w-24 h-24 text-pink-500" />
              </div>
            </div>
          </div>
        </Card>

        {/* Values Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card className="p-6 text-center">
            <div className="w-16 h-16 bg-pink-100 dark:bg-pink-900/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-pink-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Pasión por la Moda
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Cada pieza es seleccionada con amor y dedicación para realzar tu belleza natural.
            </p>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Comunidad
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Creemos en el poder de la comunidad y en apoyar a mujeres emprendedoras.
            </p>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-16 h-16 bg-gold-100 dark:bg-gold-900/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-gold-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Calidad Premium
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Comprometidos con la excelencia en cada detalle y material que utilizamos.
            </p>
          </Card>
        </div>

        {/* Mission Section */}
        <Card className="p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Nuestra Misión
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
            Empoderar a cada mujer para que se sienta confiada, elegante y auténtica a través de 
            piezas de moda cuidadosamente curadas que celebran su individualidad.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              Ver Nuestra Colección
            </Button>
            <Button variant="outline" size="lg">
              Contactar con Nosotros
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}