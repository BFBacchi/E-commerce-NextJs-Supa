import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/context/ThemeContext'
import { AuthProvider } from '@/context/AuthContext'
import { CartProvider } from '@/context/CartContext'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Boutique - Tu tienda de moda online',
  description: 'Descubre las últimas tendencias en moda femenina, joyería y accesorios. Envío gratis en pedidos superiores a 50€.',
  keywords: 'moda, ropa, accesorios, joyería, tienda online, boutique',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <AuthProvider>
            <CartProvider>
              <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <Header />
                <main className="flex-1">
                  {children}
                </main>
                <Footer />
              </div>
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}