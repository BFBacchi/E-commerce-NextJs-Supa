'use client'

import React, { useState, useEffect } from 'react'
import { Product } from '@/lib/types'
import { ProductCard } from '@/components/ProductCard'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'
import { Search, Filter, Grid, List } from 'lucide-react'

// Datos de ejemplo para productos
const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Vestido Elegante Rosa',
    description: 'Vestido de fiesta en tono rosa con detalles dorados y corte perfecto para ocasiones especiales',
    price: 89.99,
    image_url: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop&crop=center',
    category: 'vestidos',
    stock: 5,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Collar de Perlas',
    description: 'Collar elegante con perlas naturales y detalle dorado, perfecto para complementar cualquier outfit',
    price: 45.99,
    image_url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop&crop=center',
    category: 'joyeria',
    stock: 8,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Bolso de Cuero Rosa',
    description: 'Bolso de mano en cuero rosa con cierre dorado, ideal para el día a día',
    price: 125.99,
    image_url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop&crop=center',
    category: 'accesorios',
    stock: 3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Blusa Seda Blanca',
    description: 'Blusa de seda blanca con detalles florales, perfecta para el verano',
    price: 65.99,
    image_url: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop&crop=center',
    category: 'blusas',
    stock: 7,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '5',
    name: 'Pendientes de Oro',
    description: 'Pendientes elegantes en oro rosa con diseño minimalista',
    price: 35.99,
    image_url: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop&crop=center',
    category: 'joyeria',
    stock: 12,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '6',
    name: 'Falda Plisada Rosa',
    description: 'Falda plisada en tono rosa pastel, ideal para crear looks femeninos',
    price: 55.99,
    image_url: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop&crop=center',
    category: 'faldas',
    stock: 4,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
]

const categories = [
  { id: 'all', name: 'Todos', count: sampleProducts.length },
  { id: 'vestidos', name: 'Vestidos', count: sampleProducts.filter(p => p.category === 'vestidos').length },
  { id: 'joyeria', name: 'Joyería', count: sampleProducts.filter(p => p.category === 'joyeria').length },
  { id: 'accesorios', name: 'Accesorios', count: sampleProducts.filter(p => p.category === 'accesorios').length },
  { id: 'blusas', name: 'Blusas', count: sampleProducts.filter(p => p.category === 'blusas').length },
  { id: 'faldas', name: 'Faldas', count: sampleProducts.filter(p => p.category === 'faldas').length }
]

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>(sampleProducts)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(sampleProducts)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('name')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    let filtered = products

    // Filtrar por categoría
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }

    // Filtrar por término de búsqueda
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Ordenar
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'name':
          return a.name.localeCompare(b.name)
        case 'newest':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        default:
          return 0
      }
    })

    setFilteredProducts(filtered)
  }, [products, searchTerm, selectedCategory, sortBy])

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId)
  }

  const handleSortChange = (sort: string) => {
    setSortBy(sort)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Nuestra Tienda
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Descubre nuestra colección completa de moda femenina
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <Card className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Buscar productos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Sort and View */}
              <div className="flex items-center space-x-4">
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  <option value="name">Ordenar por nombre</option>
                  <option value="price-low">Precio: menor a mayor</option>
                  <option value="price-high">Precio: mayor a menor</option>
                  <option value="newest">Más recientes</option>
                </select>

                <div className="flex border border-gray-300 dark:border-gray-600 rounded-xl overflow-hidden">
                  <Button
                    variant={viewMode === 'grid' ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-none"
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-none"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filtros
                </Button>
              </div>
            </div>

            {/* Mobile Filters */}
            {showFilters && (
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-2 gap-4">
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => handleCategoryChange(category.id)}
                      className="justify-between"
                    >
                      {category.name}
                      <span className="text-xs opacity-75">({category.count})</span>
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-64 space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Categorías
              </h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => handleCategoryChange(category.id)}
                    className="w-full justify-between"
                  >
                    {category.name}
                    <span className="text-xs opacity-75">({category.count})</span>
                  </Button>
                ))}
              </div>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-gray-600 dark:text-gray-400">
                Mostrando {filteredProducts.length} de {products.length} productos
              </p>
            </div>

            {filteredProducts.length === 0 ? (
              <Card className="p-12 text-center">
                <div className="text-gray-400 dark:text-gray-500 mb-4">
                  <Search className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No se encontraron productos
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Intenta ajustar tus filtros de búsqueda
                </p>
              </Card>
            ) : (
              <div className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                  : 'space-y-4'
              }>
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onViewDetails={(product) => {
                      // Aquí podrías navegar a la página de detalles
                      console.log('Ver detalles de:', product.name)
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}