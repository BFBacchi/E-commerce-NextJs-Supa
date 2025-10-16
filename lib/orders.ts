import { createClientSupabaseClient } from './supabase'
import { sendOrderToWhatsApp } from './whatsapp'
import type { CartItem, CustomerInfo, Order } from '@/types'

export async function createOrder(
  cartItems: CartItem[],
  customerInfo: CustomerInfo,
  userId?: string
): Promise<Order> {
  const supabase = createClientSupabaseClient()

  const total = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)

  // Create order
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      user_id: userId,
      total: Math.round(total * 100) / 100,
      status: 'pending',
      customer_info: customerInfo,
    })
    .select()
    .single()

  if (orderError) throw orderError

  // Create order items
  const orderItems = cartItems.map(item => ({
    order_id: order.id,
    product_id: item.product.id,
    quantity: item.quantity,
    price: item.product.price,
  }))

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems)

  if (itemsError) throw itemsError

  // Update product stock
  for (const item of cartItems) {
    const { error: stockError } = await supabase
      .from('products')
      .update({ stock: item.product.stock - item.quantity })
      .eq('id', item.product.id)

    if (stockError) {
      console.error('Error updating stock for product:', item.product.id, stockError)
    }
  }

  // Send to WhatsApp
  try {
    await sendOrderToWhatsApp(cartItems, customerInfo, order.id)
  } catch (error) {
    console.error('Error sending order to WhatsApp:', error)
    // Don't fail the order creation if WhatsApp fails
  }

  // Clear user's cart if authenticated
  if (userId) {
    await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', userId)
  }

  return {
    ...order,
    items: cartItems.map(item => ({
      id: `temp-${item.product.id}`,
      order_id: order.id,
      product: item.product,
      quantity: item.quantity,
      price: item.product.price,
      created_at: new Date().toISOString(),
    })),
  }
}

export async function getOrders(userId: string): Promise<Order[]> {
  const supabase = createClientSupabaseClient()

  const { data: orders, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (
        *,
        products (*)
      )
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error

  return orders.map(order => ({
    ...order,
    items: order.order_items.map((item: any) => ({
      id: item.id,
      order_id: item.order_id,
      product: item.products,
      quantity: item.quantity,
      price: item.price,
      created_at: item.created_at,
    })),
  }))
}

export async function getAllOrders(): Promise<Order[]> {
  const supabase = createClientSupabaseClient()

  const { data: orders, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (
        *,
        products (*)
      )
    `)
    .order('created_at', { ascending: false })

  if (error) throw error

  return orders.map(order => ({
    ...order,
    items: order.order_items.map((item: any) => ({
      id: item.id,
      order_id: item.order_id,
      product: item.products,
      quantity: item.quantity,
      price: item.price,
      created_at: item.created_at,
    })),
  }))
}

export async function updateOrderStatus(
  orderId: string,
  status: Order['status']
): Promise<void> {
  const supabase = createClientSupabaseClient()

  const { error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', orderId)

  if (error) throw error
}