export interface Product {
  id: string
  name: string
  description: string
  price: number
  image_url: string
  category: string
  stock: number
  created_at: string
  updated_at: string
}

export interface CartItem {
  id: string
  name: string
  price: number
  image_url: string
  quantity: number
  stock: number
}

export interface Order {
  id: string
  user_id: string
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  items: CartItem[]
  created_at: string
  updated_at: string
}

export interface User {
  id: string
  email: string
  is_admin?: boolean
}

export interface Theme {
  mode: 'light' | 'dark'
  primary: string
  secondary: string
}