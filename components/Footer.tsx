export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-primary-50 to-primary-100 dark:from-gray-900 dark:to-gray-800 border-t border-primary-200 dark:border-gray-700 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-rosegold bg-clip-text text-transparent mb-3">
              Boutique Rosa
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Tu destino para la moda femenina más elegante y moderna. Descubre piezas únicas que realzan tu estilo.
            </p>
          </div>

          {/* Enlaces */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Enlaces</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Inicio
                </a>
              </li>
              <li>
                <a href="/shop" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Tienda
                </a>
              </li>
              <li>
                <a href="/cart" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Carrito
                </a>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Contacto</h4>
            <ul className="space-y-2">
              <li className="text-gray-600 dark:text-gray-400">
                <span className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>info@boutiquerosa.com</span>
                </span>
              </li>
              <li className="text-gray-600 dark:text-gray-400">
                <span className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>WhatsApp disponible</span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-200 dark:border-gray-700 mt-8 pt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} Boutique Rosa. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
