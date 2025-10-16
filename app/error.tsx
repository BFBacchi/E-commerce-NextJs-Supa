'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">¡Algo salió mal!</h2>
        <p className="text-gray-600 mb-8">
          Ha ocurrido un error inesperado. Por favor, intenta de nuevo.
        </p>
        <button
          onClick={() => reset()}
          className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
        >
          Intentar de nuevo
        </button>
      </div>
    </div>
  )
}