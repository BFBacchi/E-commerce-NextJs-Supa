'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Search } from 'lucide-react'
import { useCallback, useState } from 'react'

interface SearchAndFilterProps {
  categories: string[]
}

export default function SearchAndFilter({ categories }: SearchAndFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '')

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set(name, value)
      } else {
        params.delete(name)
      }
      return params.toString()
    },
    [searchParams]
  )

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    router.push('/shop' + '?' + createQueryString('search', searchTerm))
  }

  const handleCategoryChange = (category: string) => {
    router.push('/shop' + '?' + createQueryString('category', category))
  }

  return (
    <div className="mb-8 space-y-4">
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar productos..."
            className="w-full pl-10 pr-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
        >
          Buscar
        </button>
      </form>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => handleCategoryChange('all')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            !searchParams.get('category') || searchParams.get('category') === 'all'
              ? 'bg-primary text-white'
              : 'bg-card hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
        >
          Todos
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`px-4 py-2 rounded-lg transition-colors capitalize ${
              searchParams.get('category') === category
                ? 'bg-primary text-white'
                : 'bg-card hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  )
}