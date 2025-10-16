export interface Product {
  id: string
  name: string
  description: string | null
  price: number
  image_url: string | null
  category: string
  stock: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface CartItem {
  id: string
  product: Product
  quantity: number
}

export interface Order {
  id: string
  user_id: string
  total: number
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
  customer_info: CustomerInfo
  items: OrderItem[]
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: string
  order_id: string
  product: Product
  quantity: number
  price: number
  created_at: string
}

export interface CustomerInfo {
  name: string
  email: string
  phone: string
  address: string
  city: string
  notes?: string
}

export interface User {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  is_admin: boolean
}

export interface WhatsAppOrderData {
  order_id: string
  customer: CustomerInfo
  items: Array<{
    name: string
    quantity: number
    price: number
    total: number
  }>
  total: number
  created_at: string
}