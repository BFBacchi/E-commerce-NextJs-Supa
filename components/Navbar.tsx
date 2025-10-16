'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ThemeToggle } from './ui/ThemeToggle'
import { useCartStore } from '@/lib/store/cart'
import { getCurrentUser } from '@/lib/auth'
import { User } from '@/lib/types'

export function Navbar() {
  const [user, setUser] = useState<User | null>(null)
  const itemsCount = useCartStore((state) => state.getItemsCount())

  useEffect(() => {
    getCurrentUser().then(setUser)
  }, [])

  return (
    <nav className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-rosegold bg-clip-text text-transparent">
              Boutique Rosa
            </span>
          </Link>

          {/* Links principales */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              Inicio
            </Link>
            <Link 
              href="/shop" 
              className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              Tienda
            </Link>
            {user?.isAdmin && (
              <Link 
                href="/admin" 
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                Admin
              </Link>
            )}
          </div>

          {/* Acciones */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            <Link 
              href="/cart" 
              className="relative p-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {itemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemsCount}
                </span>
              )}
            </Link>

            {user ? (
              <Link 
                href="/auth/signout"
                className="text-sm text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                Salir
              </Link>
            ) : (
              <Link 
                href="/auth/signin"
                className="text-sm bg-primary-500 text-white px-4 py-2 rounded-full hover:bg-primary-600 transition-colors"
              >
                Iniciar Sesión
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden border-t border-gray-200 dark:border-gray-800 px-4 py-3 space-y-2">
        <Link 
          href="/" 
          className="block text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
        >
          Inicio
        </Link>
        <Link 
          href="/shop" 
          className="block text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
        >
          Tienda
        </Link>
        {user?.isAdmin && (
          <Link 
            href="/admin" 
            className="block text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            Admin
          </Link>
        )}
      </div>
    </nav>
  )
}
