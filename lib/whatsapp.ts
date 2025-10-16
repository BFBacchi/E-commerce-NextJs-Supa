import type { CartItem, CustomerInfo, WhatsAppOrderData } from '@/types'

export async function sendOrderToWhatsApp(
  cartItems: CartItem[],
  customerInfo: CustomerInfo,
  orderId: string
): Promise<void> {
  const webhookUrl = process.env.N8N_WEBHOOK_URL

  if (!webhookUrl) {
    console.warn('N8N_WEBHOOK_URL not configured, skipping WhatsApp notification')
    return
  }

  const total = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)

  const orderData: WhatsAppOrderData = {
    order_id: orderId,
    customer: customerInfo,
    items: cartItems.map(item => ({
      name: item.product.name,
      quantity: item.quantity,
      price: item.product.price,
      total: item.product.price * item.quantity,
    })),
    total: Math.round(total * 100) / 100,
    created_at: new Date().toISOString(),
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    console.log('Order sent to WhatsApp successfully')
  } catch (error) {
    console.error('Error sending order to WhatsApp:', error)
    throw error
  }
}

export function formatOrderForWhatsApp(
  cartItems: CartItem[],
  customerInfo: CustomerInfo,
  orderId: string
): string {
  const total = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)

  let message = `🛍️ *NUEVO PEDIDO* 🛍️\n\n`
  message += `📋 *Pedido #:* ${orderId.slice(-8).toUpperCase()}\n`
  message += `👤 *Cliente:* ${customerInfo.name}\n`
  message += `📧 *Email:* ${customerInfo.email}\n`
  message += `📱 *Teléfono:* ${customerInfo.phone}\n`
  message += `📍 *Dirección:* ${customerInfo.address}, ${customerInfo.city}\n\n`

  message += `🛒 *PRODUCTOS:*\n`
  cartItems.forEach((item, index) => {
    message += `${index + 1}. ${item.product.name}\n`
    message += `   • Cantidad: ${item.quantity}\n`
    message += `   • Precio: $${item.product.price.toFixed(2)}\n`
    message += `   • Subtotal: $${(item.product.price * item.quantity).toFixed(2)}\n\n`
  })

  message += `💰 *TOTAL: $${total.toFixed(2)}*\n\n`

  if (customerInfo.notes) {
    message += `📝 *Notas:* ${customerInfo.notes}\n\n`
  }

  message += `⏰ *Fecha:* ${new Date().toLocaleString('es-ES')}\n`
  message += `\n¡Gracias por tu compra! 💕`

  return message
}