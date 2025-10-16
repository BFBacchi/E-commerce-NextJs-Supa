'use client'

import { useEffect, useState, Suspense } from 'react'
import { ProductCard } from '@/components/ProductCard'
import { getProducts, searchProducts } from '@/lib/api/products'
import { Product } from '@/lib/types'
import { Input } from '@/components/ui/Input'
import { useSearchParams } from 'next/navigation'

const categories = [
  { value: 'todos', label: 'Todos' },
  { value: 'vestidos', label: 'Vestidos' },
  { value: 'blusas', label: 'Blusas' },
  { value: 'faldas', label: 'Faldas' },
  { value: 'pantalones', label: 'Pantalones' },
  { value: 'conjuntos', label: 'Conjuntos' },
  { value: 'tops', label: 'Tops' },
  { value: 'blazers', label: 'Blazers' },
]

function ShopContent() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('todos')
  const searchParams = useSearchParams()

  useEffect(() => {
    const categoryParam = searchParams.get('category')
    if (categoryParam) {
      setSelectedCategory(categoryParam)
    }
  }, [searchParams])

  useEffect(() => {
    loadProducts()
  }, [selectedCategory])

  const loadProducts = async () => {
    setLoading(true)
    const data = await getProducts(selectedCategory === 'todos' ? undefined : selectedCategory)
    setProducts(data)
    setLoading(false)
  }

  const handleSearch = async (query: string) => {
    setSearchQuery(query)
    if (query.trim() === '') {
      loadProducts()
      return
    }

    setLoading(true)
    const data = await searchProducts(query)
    setProducts(data)
    setLoading(false)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Nuestra Tienda
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Explora nuestra colección completa de moda femenina
        </p>
      </div>

      {/* Barra de búsqueda */}
      <div className="mb-8">
        <Input
          type="search"
          placeholder="Buscar productos..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="max-w-md"
        />
      </div>

      {/* Filtros de categoría */}
      <div className="mb-8 flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category.value}
            onClick={() => {
              setSelectedCategory(category.value)
              setSearchQuery('')
            }}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
              selectedCategory === category.value
                ? 'bg-primary-500 text-white shadow-md'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-gray-700'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Grid de productos */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500" />
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20">
          <svg className="w-20 h-20 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            No se encontraron productos
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Intenta con otra búsqueda o categoría
          </p>
        </div>
      ) : (
        <>
          <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
            Mostrando {products.length} {products.length === 1 ? 'producto' : 'productos'}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500" />
        </div>
      </div>
    }>
      <ShopContent />
    </Suspense>
  )
}
