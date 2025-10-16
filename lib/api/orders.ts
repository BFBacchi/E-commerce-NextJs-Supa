import { createClient } from '@/lib/supabase/client'
import { Order, OrderItem, CartItem } from '@/lib/types'

export async function createOrder(
  userEmail: string,
  userName: string | null,
  userPhone: string | null,
  items: CartItem[],
  userId?: string
): Promise<Order | null> {
  const supabase = createClient()
  
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert([{
      user_id: userId || null,
      user_email: userEmail,
      user_name: userName,
      user_phone: userPhone,
      total,
      status: 'pending'
    }])
    .select()
    .single()

  if (orderError) {
    console.error('Error creating order:', orderError)
    return null
  }

  const orderItems = items.map(item => ({
    order_id: order.id,
    product_id: item.product.id,
    product_name: item.product.name,
    product_price: item.product.price,
    quantity: item.quantity
  }))

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems)

  if (itemsError) {
    console.error('Error creating order items:', itemsError)
    return null
  }

  return order as Order
}

export async function getOrders(): Promise<Order[]> {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching orders:', error)
    return []
  }

  return data as Order[]
}

export async function getOrderItems(orderId: string): Promise<OrderItem[]> {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('order_items')
    .select('*')
    .eq('order_id', orderId)

  if (error) {
    console.error('Error fetching order items:', error)
    return []
  }

  return data as OrderItem[]
}

export async function updateOrderStatus(orderId: string, status: string): Promise<boolean> {
  const supabase = createClient()
  
  const { error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', orderId)

  if (error) {
    console.error('Error updating order status:', error)
    return false
  }

  return true
}
