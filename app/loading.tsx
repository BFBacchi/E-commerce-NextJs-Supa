export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
      <div className="text-center space-y-4">
        {/* Elegant Loading Spinner */}
        <div className="relative">
          <div className="w-16 h-16 border-4 border-gray-200 dark:border-gray-700 rounded-full animate-spin">
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-primary-500 rounded-full animate-spin"></div>
          </div>
        </div>
        
        {/* Loading Text */}
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Cargando...
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Preparando tu experiencia elegante
          </p>
        </div>
      </div>
    </div>
  )
}