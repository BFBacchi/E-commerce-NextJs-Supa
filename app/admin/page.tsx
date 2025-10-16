'use client'

import { useEffect, useState } from 'react'
import { redirect } from 'next/navigation'
import { Plus, Package, ShoppingCart, Users, TrendingUp, Edit, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { useAuth } from '@/hooks/useAuth'
import { createClientSupabaseClient } from '@/lib/supabase'
import { getAllOrders } from '@/lib/orders'
import type { Product, Order } from '@/types'

export default function AdminDashboard() {
  const { user, isAdmin, loading } = useAuth()
  const [products, setProducts] = useState<Product[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    lowStockProducts: 0,
  })
  const [loadingData, setLoadingData] = useState(true)

  const supabase = createClientSupabaseClient()

  useEffect(() => {
    if (!loading && !isAdmin) {
      redirect('/')
    }
  }, [loading, isAdmin])

  useEffect(() => {
    if (isAdmin) {
      fetchData()
    }
  }, [isAdmin]) // eslint-disable-line react-hooks/exhaustive-deps

  const fetchData = async () => {
    setLoadingData(true)
    try {
      // Fetch products
      const { data: productsData } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })

      // Fetch orders
      const ordersData = await getAllOrders()

      setProducts(productsData || [])
      setOrders(ordersData)

      // Calculate stats
      const totalProducts = productsData?.length || 0
      const totalOrders = ordersData.length
      const totalRevenue = ordersData.reduce((sum, order) => sum + order.total, 0)
      const lowStockProducts = productsData?.filter(p => p.stock <= 5).length || 0

      setStats({
        totalProducts,
        totalOrders,
        totalRevenue,
        lowStockProducts,
      })
    } catch (error) {
      console.error('Error fetching admin data:', error)
    } finally {
      setLoadingData(false)
    }
  }

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      return
    }

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId)

      if (error) throw error

      setProducts(products.filter(p => p.id !== productId))
    } catch (error) {
      console.error('Error deleting product:', error)
      alert('Error al eliminar el producto')
    }
  }

  const toggleProductStatus = async (productId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('products')
        .update({ is_active: !currentStatus })
        .eq('id', productId)

      if (error) throw error

      setProducts(products.map(p => 
        p.id === productId ? { ...p, is_active: !currentStatus } : p
      ))
    } catch (error) {
      console.error('Error updating product status:', error)
      alert('Error al actualizar el estado del producto')
    }
  }

  if (loading || loadingData) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded-2xl"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!isAdmin) {
    return null
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Panel de Administración
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Gestiona productos, pedidos y estadísticas de tu tienda
          </p>
        </div>
        
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Agregar Producto
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Productos
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.totalProducts}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
                <Package className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Pedidos
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.totalOrders}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center">
                <ShoppingCart className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Ingresos Totales
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${stats.totalRevenue.toFixed(2)}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-xl flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Stock Bajo
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stats.lowStockProducts}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-xl flex items-center justify-center">
                <Users className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Products Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Productos Recientes</span>
              <Button size="sm" variant="outline">
                Ver Todos
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {products.slice(0, 5).map((product) => (
                <div key={product.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {product.name}
                    </h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant={product.is_active ? 'success' : 'error'}>
                        {product.is_active ? 'Activo' : 'Inactivo'}
                      </Badge>
                      <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                        {product.category}
                      </span>
                      <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                        ${product.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm ${product.stock <= 5 ? 'text-red-600' : 'text-gray-600'} dark:text-gray-400`}>
                      Stock: {product.stock}
                    </span>
                    
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => toggleProductStatus(product.id, product.is_active)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDeleteProduct(product.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Pedidos Recientes</span>
              <Button size="sm" variant="outline">
                Ver Todos
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orders.slice(0, 5).map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      Pedido #{order.id.slice(-8).toUpperCase()}
                    </h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge 
                        variant={
                          order.status === 'delivered' ? 'success' :
                          order.status === 'shipped' ? 'info' :
                          order.status === 'cancelled' ? 'error' : 'warning'
                        }
                      >
                        {order.status === 'pending' && 'Pendiente'}
                        {order.status === 'confirmed' && 'Confirmado'}
                        {order.status === 'shipped' && 'Enviado'}
                        {order.status === 'delivered' && 'Entregado'}
                        {order.status === 'cancelled' && 'Cancelado'}
                      </Badge>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {order.customer_info.name}
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-medium text-gray-900 dark:text-white">
                      ${order.total.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {new Date(order.created_at).toLocaleDateString('es-ES')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}