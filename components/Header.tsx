'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'
import { useTheme } from '@/context/ThemeContext'
import { Button } from './ui/Button'
import { 
  ShoppingBag, 
  User, 
  Search, 
  Menu, 
  X, 
  Sun, 
  Moon,
  ShoppingCart,
  LogOut
} from 'lucide-react'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { items, getTotalItems } = useCart()
  const { user, isAdmin, signOut } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  return (
    <header className="bg-white dark:bg-gray-900 shadow-soft sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              Boutique
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
            >
              Inicio
            </Link>
            <Link 
              href="/shop" 
              className="text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
            >
              Tienda
            </Link>
            {isAdmin && (
              <Link 
                href="/admin" 
                className="text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
              >
                Admin
              </Link>
            )}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="w-5 h-5" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </Button>

            <Link href="/cart" className="relative">
              <Button variant="ghost" size="sm">
                <ShoppingCart className="w-5 h-5" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </Button>
            </Link>

            {user ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {user.email}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSignOut}
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <Link href="/auth">
                <Button variant="outline" size="sm">
                  <User className="w-4 h-4 mr-2" />
                  Iniciar Sesión
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar productos..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className="text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Inicio
              </Link>
              <Link 
                href="/shop" 
                className="text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Tienda
              </Link>
              {isAdmin && (
                <Link 
                  href="/admin" 
                  className="text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admin
                </Link>
              )}
              <Link 
                href="/cart" 
                className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Carrito ({getTotalItems()})</span>
              </Link>
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">Tema:</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleTheme}
                >
                  {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                </Button>
              </div>
              {user ? (
                <div className="space-y-2">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {user.email}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSignOut}
                    className="w-full"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Cerrar Sesión
                  </Button>
                </div>
              ) : (
                <Link href="/auth">
                  <Button variant="outline" size="sm" className="w-full">
                    <User className="w-4 h-4 mr-2" />
                    Iniciar Sesión
                  </Button>
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}