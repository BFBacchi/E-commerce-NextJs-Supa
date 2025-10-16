import { Suspense } from 'react'
import ProductCard from '@/components/product-card'
import Loading from '@/components/loading'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import SearchAndFilter from './search-filter'

export default async function ShopPage({
  searchParams,
}: {
  searchParams: { search?: string; category?: string }
}) {
  const supabase = createServerSupabaseClient()
  
  let query = supabase.from('products').select('*')
  
  if (searchParams.search) {
    query = query.ilike('name', `%${searchParams.search}%`)
  }
  
  if (searchParams.category && searchParams.category !== 'all') {
    query = query.eq('category', searchParams.category)
  }
  
  const { data: products } = await query.order('created_at', { ascending: false })
  
  // Obtener categorías únicas
  const { data: categoriesData } = await supabase
    .from('products')
    .select('category')
    .not('category', 'is', null)
  
  const categories = Array.from(
    new Set(categoriesData?.map((item) => item.category) || [])
  )

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Nuestra Tienda</h1>
      
      <SearchAndFilter categories={categories} />
      
      <Suspense fallback={<Loading />}>
        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">
              No se encontraron productos que coincidan con tu búsqueda.
            </p>
          </div>
        )}
      </Suspense>
    </div>
  )
}