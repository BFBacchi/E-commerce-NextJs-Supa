import { CartItem } from '@/lib/types'

export interface OrderData {
  userEmail: string
  userName?: string | null
  userPhone?: string | null
  items: CartItem[]
  total: number
}

export async function sendOrderToWhatsApp(orderData: OrderData): Promise<boolean> {
  const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL

  if (!webhookUrl) {
    console.warn('NEXT_PUBLIC_N8N_WEBHOOK_URL no está configurado. La notificación de WhatsApp no se enviará.')
    return false
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: orderData.userEmail,
        name: orderData.userName || 'Cliente',
        phone: orderData.userPhone || 'No proporcionado',
        items: orderData.items.map(item => ({
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          subtotal: item.product.price * item.quantity
        })),
        total: orderData.total,
        timestamp: new Date().toISOString()
      })
    })

    if (!response.ok) {
      console.error('Error al enviar a WhatsApp:', response.statusText)
      return false
    }

    return true
  } catch (error) {
    console.error('Error al enviar a WhatsApp:', error)
    return false
  }
}
