import { CartItem } from '@/types'

interface OrderData {
  cart: CartItem[]
  user: {
    email: string
    name?: string
  }
  total: number
}

export async function sendOrderToWhatsApp(orderData: OrderData) {
  const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL

  if (!webhookUrl) {
    console.error('N8N_WEBHOOK_URL no está configurado')
    return false
  }

  try {
    const orderSummary = orderData.cart
      .map(
        (item) =>
          `- ${item.product.name} x${item.quantity} = ${formatPrice(
            item.product.price * item.quantity
          )}`
      )
      .join('\n')

    const message = `
🛍️ *Nuevo Pedido*

*Cliente:* ${orderData.user.name || orderData.user.email}
*Email:* ${orderData.user.email}

*Productos:*
${orderSummary}

*Total:* ${formatPrice(orderData.total)}
    `.trim()

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        orderData,
      }),
    })

    if (!response.ok) {
      throw new Error('Error al enviar el pedido')
    }

    return true
  } catch (error) {
    console.error('Error al enviar pedido a WhatsApp:', error)
    return false
  }
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  }).format(price)
}