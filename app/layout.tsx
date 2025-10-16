import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ThemeProvider } from '@/context/ThemeContext'
import { CartProvider } from '@/context/CartContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Elegancia - Moda Femenina Elegante',
  description: 'Descubre la elegancia en cada prenda. Moda femenina cuidadosamente seleccionada para mujeres que valoran el estilo y la calidad.',
  keywords: 'moda femenina, ropa elegante, vestidos, blusas, faldas, tienda online',
  authors: [{ name: 'Elegancia' }],
  openGraph: {
    title: 'Elegancia - Moda Femenina Elegante',
    description: 'Descubre la elegancia en cada prenda. Moda femenina cuidadosamente seleccionada para mujeres que valoran el estilo y la calidad.',
    type: 'website',
    locale: 'es_ES',
  },
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
          <CartProvider>
            <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
              <Header />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
            </div>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}