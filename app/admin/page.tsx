'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/auth-context'
import { supabase } from '@/lib/supabase/client'
import { Product, Order } from '@/types'
import { formatPrice } from '@/lib/utils'
import ProductForm from './product-form'
import { Package, ShoppingBag, DollarSign, TrendingUp } from 'lucide-react'
import Loading from '@/components/loading'

export default function AdminPage() {
  const { user, isAdmin, loading: authLoading } = useAuth()
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [showProductForm, setShowProductForm] = useState(false)

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      router.push('/')
    }
  }, [authLoading, isAdmin, router])

  useEffect(() => {
    if (isAdmin) {
      fetchData()
    }
  }, [isAdmin])

  const fetchData = async () => {
    setLoading(true)
    
    // Obtener productos
    const { data: productsData } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })
    
    // Obtener órdenes
    const { data: ordersData } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (productsData) setProducts(productsData)
    if (ordersData) setOrders(ordersData)
    
    setLoading(false)
  }

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este producto?')) return
    
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)
    
    if (!error) {
      setProducts(products.filter((p) => p.id !== id))
    }
  }

  const handleProductSaved = () => {
    fetchData()
    setShowProductForm(false)
    setEditingProduct(null)
  }

  if (authLoading || loading) {
    return <Loading />
  }

  if (!isAdmin) {
    return null
  }

  // Calcular estadísticas
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0)
  const totalProducts = products.length
  const totalOrders = orders.length
  const lowStockProducts = products.filter((p) => p.stock < 10).length

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Panel de Administración</h1>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-card rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Ingresos Totales</span>
            <DollarSign className="text-green-500" size={24} />
          </div>
          <p className="text-2xl font-bold">{formatPrice(totalRevenue)}</p>
        </div>
        
        <div className="bg-card rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Total Pedidos</span>
            <ShoppingBag className="text-blue-500" size={24} />
          </div>
          <p className="text-2xl font-bold">{totalOrders}</p>
        </div>
        
        <div className="bg-card rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Total Productos</span>
            <Package className="text-purple-500" size={24} />
          </div>
          <p className="text-2xl font-bold">{totalProducts}</p>
        </div>
        
        <div className="bg-card rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Stock Bajo</span>
            <TrendingUp className="text-orange-500" size={24} />
          </div>
          <p className="text-2xl font-bold">{lowStockProducts}</p>
        </div>
      </div>

      {/* Gestión de productos */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Productos</h2>
          <button
            onClick={() => {
              setEditingProduct(null)
              setShowProductForm(true)
            }}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
          >
            Añadir Producto
          </button>
        </div>

        {showProductForm && (
          <ProductForm
            product={editingProduct}
            onSave={handleProductSaved}
            onCancel={() => {
              setShowProductForm(false)
              setEditingProduct(null)
            }}
          />
        )}

        <div className="bg-card rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-background">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium">Producto</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Precio</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Stock</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Categoría</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="px-4 py-3">{product.name}</td>
                  <td className="px-4 py-3">{formatPrice(product.price)}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`${
                        product.stock < 10 ? 'text-orange-500' : ''
                      }`}
                    >
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-4 py-3">{product.category}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => {
                        setEditingProduct(product)
                        setShowProductForm(true)
                      }}
                      className="text-primary hover:underline mr-3"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="text-red-500 hover:underline"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Órdenes recientes */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Órdenes Recientes</h2>
        <div className="bg-card rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-background">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium">ID</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Fecha</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Total</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {orders.slice(0, 10).map((order) => (
                <tr key={order.id}>
                  <td className="px-4 py-3 text-sm">{order.id.slice(0, 8)}</td>
                  <td className="px-4 py-3 text-sm">
                    {new Date(order.created_at).toLocaleDateString('es-ES')}
                  </td>
                  <td className="px-4 py-3">{formatPrice(order.total)}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        order.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : order.status === 'processing'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}