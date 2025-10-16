'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { createClient } from '@/lib/supabase'
import { Product, Order } from '@/lib/types'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'
import { formatPrice, formatDate } from '@/lib/utils'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Package, 
  ShoppingCart, 
  Users,
  DollarSign,
  Eye,
  EyeOff
} from 'lucide-react'

export default function AdminPage() {
  const { user, isAdmin, loading } = useAuth()
  const router = useRouter()
  const supabase = createClient()

  const [activeTab, setActiveTab] = useState<'products' | 'orders'>('products')
  const [products, setProducts] = useState<Product[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [showProductForm, setShowProductForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: '',
    image_url: '',
    category: '',
    stock: ''
  })

  // Redirigir si no es admin
  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      router.push('/')
    }
  }, [user, isAdmin, loading, router])

  // Cargar productos
  useEffect(() => {
    if (isAdmin) {
      loadProducts()
      loadOrders()
    }
  }, [isAdmin])

  const loadProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setProducts(data || [])
    } catch (error) {
      console.error('Error loading products:', error)
    }
  }

  const loadOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setOrders(data || [])
    } catch (error) {
      console.error('Error loading orders:', error)
    }
  }

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const productData = {
        name: productForm.name,
        description: productForm.description,
        price: parseFloat(productForm.price),
        image_url: productForm.image_url,
        category: productForm.category,
        stock: parseInt(productForm.stock),
        updated_at: new Date().toISOString()
      }

      if (editingProduct) {
        // Actualizar producto
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', editingProduct.id)

        if (error) throw error
      } else {
        // Crear producto
        const { error } = await supabase
          .from('products')
          .insert([productData])

        if (error) throw error
      }

      // Limpiar formulario y recargar
      setProductForm({
        name: '',
        description: '',
        price: '',
        image_url: '',
        category: '',
        stock: ''
      })
      setEditingProduct(null)
      setShowProductForm(false)
      loadProducts()
    } catch (error) {
      console.error('Error saving product:', error)
      alert('Error al guardar el producto')
    }
  }

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
    setProductForm({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      image_url: product.image_url,
      category: product.category,
      stock: product.stock.toString()
    })
    setShowProductForm(true)
  }

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este producto?')) return

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId)

      if (error) throw error
      loadProducts()
    } catch (error) {
      console.error('Error deleting product:', error)
      alert('Error al eliminar el producto')
    }
  }

  const handleOrderStatusUpdate = async (orderId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', orderId)

      if (error) throw error
      loadOrders()
    } catch (error) {
      console.error('Error updating order status:', error)
      alert('Error al actualizar el estado del pedido')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Cargando...</p>
        </div>
      </div>
    )
  }

  if (!user || !isAdmin) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Panel de Administración
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Gestiona productos y pedidos de tu tienda
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/20 rounded-xl flex items-center justify-center">
                <Package className="w-6 h-6 text-pink-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Productos</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{products.length}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-blue-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pedidos</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{orders.length}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Ventas</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatPrice(orders.reduce((total, order) => total + order.total, 0))}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Clientes</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {new Set(orders.map(order => order.user_id)).size}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('products')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'products'
                    ? 'border-pink-500 text-pink-600 dark:text-pink-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                Productos
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'orders'
                    ? 'border-pink-500 text-pink-600 dark:text-pink-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                Pedidos
              </button>
            </nav>
          </div>
        </div>

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Gestión de Productos
              </h2>
              <Button
                onClick={() => {
                  setEditingProduct(null)
                  setProductForm({
                    name: '',
                    description: '',
                    price: '',
                    image_url: '',
                    category: '',
                    stock: ''
                  })
                  setShowProductForm(true)
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Nuevo Producto
              </Button>
            </div>

            {/* Product Form Modal */}
            {showProductForm && (
              <Card className="p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
                </h3>
                <form onSubmit={handleProductSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Nombre"
                      value={productForm.name}
                      onChange={(e) => setProductForm(prev => ({ ...prev, name: e.target.value }))}
                      required
                    />
                    <Input
                      label="Precio"
                      type="number"
                      step="0.01"
                      value={productForm.price}
                      onChange={(e) => setProductForm(prev => ({ ...prev, price: e.target.value }))}
                      required
                    />
                  </div>
                  <Input
                    label="Descripción"
                    value={productForm.description}
                    onChange={(e) => setProductForm(prev => ({ ...prev, description: e.target.value }))}
                    required
                  />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input
                      label="URL de Imagen"
                      value={productForm.image_url}
                      onChange={(e) => setProductForm(prev => ({ ...prev, image_url: e.target.value }))}
                      required
                    />
                    <Input
                      label="Categoría"
                      value={productForm.category}
                      onChange={(e) => setProductForm(prev => ({ ...prev, category: e.target.value }))}
                      required
                    />
                    <Input
                      label="Stock"
                      type="number"
                      value={productForm.stock}
                      onChange={(e) => setProductForm(prev => ({ ...prev, stock: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="flex space-x-4">
                    <Button type="submit">
                      {editingProduct ? 'Actualizar' : 'Crear'} Producto
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowProductForm(false)}
                    >
                      Cancelar
                    </Button>
                  </div>
                </form>
              </Card>
            )}

            {/* Products List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="p-6">
                  <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-xl mb-4 overflow-hidden">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-bold text-pink-600 dark:text-pink-400">
                      {formatPrice(product.price)}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Stock: {product.stock}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEditProduct(product)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteProduct(product.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Gestión de Pedidos
            </h2>

            <div className="space-y-4">
              {orders.map((order) => (
                <Card key={order.id} className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        Pedido #{order.id}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {formatDate(order.created_at)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900 dark:text-white">
                        {formatPrice(order.total)}
                      </p>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                        order.status === 'processing' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' :
                        order.status === 'shipped' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400' :
                        order.status === 'delivered' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                        'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                      }`}>
                        {order.status === 'pending' ? 'Pendiente' :
                         order.status === 'processing' ? 'Procesando' :
                         order.status === 'shipped' ? 'Enviado' :
                         order.status === 'delivered' ? 'Entregado' :
                         'Cancelado'}
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Productos:</h4>
                    <div className="space-y-2">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span>{item.name} x{item.quantity}</span>
                          <span>{formatPrice(item.price * item.quantity)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <select
                      value={order.status}
                      onChange={(e) => handleOrderStatusUpdate(order.id, e.target.value)}
                      className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                    >
                      <option value="pending">Pendiente</option>
                      <option value="processing">Procesando</option>
                      <option value="shipped">Enviado</option>
                      <option value="delivered">Entregado</option>
                      <option value="cancelled">Cancelado</option>
                    </select>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}