import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/context/auth-context'
import { ThemeProvider } from '@/context/theme-context'
import Navbar from '@/components/navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Boutique Rosa - Tu tienda de moda femenina',
  description: 'Descubre las últimas tendencias en moda femenina. Joyas, accesorios y más.',
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
            <div className="min-h-screen bg-background">
              <Navbar />
              <main>{children}</main>
              <footer className="bg-card border-t border-border mt-16">
                <div className="max-w-7xl mx-auto px-4 py-8 text-center text-sm text-gray-600">
                  <p>&copy; 2024 Boutique Rosa. Todos los derechos reservados.</p>
                </div>
              </footer>
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}