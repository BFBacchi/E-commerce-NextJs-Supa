import React from 'react'
import Link from 'next/link'
import { ShoppingBag, Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Boutique</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Tu tienda online de moda y accesorios con estilo femenino y elegante. 
              Descubre las últimas tendencias en ropa, joyería y complementos.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-300">
                <Mail className="w-4 h-4" />
                <span>info@boutique.com</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Phone className="w-4 h-4" />
                <span>+34 123 456 789</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <MapPin className="w-4 h-4" />
                <span>Madrid, España</span>
              </div>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-pink-400 transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-gray-300 hover:text-pink-400 transition-colors">
                  Tienda
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-pink-400 transition-colors">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-pink-400 transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Información */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Información</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/shipping" className="text-gray-300 hover:text-pink-400 transition-colors">
                  Envíos
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-gray-300 hover:text-pink-400 transition-colors">
                  Devoluciones
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-pink-400 transition-colors">
                  Privacidad
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-pink-400 transition-colors">
                  Términos
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Boutique. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}