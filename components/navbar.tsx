'use client'

import Link from 'next/link'
import { ShoppingCart, User, Sun, Moon, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '@/context/auth-context'
import { useTheme } from '@/context/theme-context'
import { useCartStore } from '@/context/cart-store'

export default function Navbar() {
  const { user, isAdmin, signOut } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const totalItems = useCartStore((state) => state.getTotalItems())
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-primary">
              Boutique Rosa
            </Link>
            
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              <Link href="/" className="hover:text-primary transition-colors">
                Inicio
              </Link>
              <Link href="/shop" className="hover:text-primary transition-colors">
                Tienda
              </Link>
              {isAdmin && (
                <Link href="/admin" className="hover:text-primary transition-colors">
                  Admin
                </Link>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-card rounded-lg transition-colors"
              aria-label="Cambiar tema"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            
            <Link
              href="/cart"
              className="relative p-2 hover:bg-card rounded-lg transition-colors"
            >
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            
            {user ? (
              <div className="relative group">
                <button className="p-2 hover:bg-card rounded-lg transition-colors">
                  <User size={20} />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-card rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="p-2">
                    <p className="text-sm text-gray-500 px-3 py-2">{user.email}</p>
                    <button
                      onClick={() => signOut()}
                      className="w-full text-left px-3 py-2 hover:bg-background rounded-md transition-colors"
                    >
                      Cerrar sesión
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                href="/auth/login"
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
              >
                Iniciar sesión
              </Link>
            )}
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-card rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            <Link
              href="/"
              className="block px-3 py-2 hover:bg-card rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Inicio
            </Link>
            <Link
              href="/shop"
              className="block px-3 py-2 hover:bg-card rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Tienda
            </Link>
            {isAdmin && (
              <Link
                href="/admin"
                className="block px-3 py-2 hover:bg-card rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Admin
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}