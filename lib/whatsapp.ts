import { CartItem, User } from '@/lib/types'
import { formatPrice } from '@/lib/utils'

export async function sendOrderToWhatsApp(cartItems: CartItem[], user: User & { firstName?: string; lastName?: string; phone?: string; address?: string; city?: string; postalCode?: string; country?: string; notes?: string }) {
  const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || process.env.N8N_WEBHOOK_URL

  if (!webhookUrl) {
    console.warn('N8N_WEBHOOK_URL no está configurado. No se enviará el pedido a WhatsApp.')
    return
  }

  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  const shippingCost = totalPrice >= 50 ? 0 : 9.99
  const finalTotal = totalPrice + shippingCost

  // Crear mensaje formateado para WhatsApp
  const orderMessage = `
🛍️ *NUEVO PEDIDO - BOUTIQUE*

📋 *Detalles del Cliente:*
• Nombre: ${user.firstName || 'No especificado'} ${user.lastName || ''}
• Email: ${user.email}
• Teléfono: ${user.phone || 'No especificado'}
• Dirección: ${user.address || 'No especificada'}, ${user.city || ''} ${user.postalCode || ''}, ${user.country || 'España'}

🛒 *Productos:*
${cartItems.map(item => 
  `• ${item.name} x${item.quantity} - ${formatPrice(item.price * item.quantity)}`
).join('\n')}

💰 *Resumen:*
• Subtotal: ${formatPrice(totalPrice)}
• Envío: ${shippingCost === 0 ? 'GRATIS' : formatPrice(shippingCost)}
• *TOTAL: ${formatPrice(finalTotal)}*

${user.notes ? `📝 *Notas adicionales:*\n${user.notes}\n` : ''}

🆔 *ID del Pedido:* ${Date.now()}
📅 *Fecha:* ${new Date().toLocaleString('es-ES')}
  `.trim()

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: orderMessage,
        orderData: {
          orderId: Date.now().toString(),
          customer: {
            name: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
            email: user.email,
            phone: user.phone,
            address: {
              street: user.address,
              city: user.city,
              postalCode: user.postalCode,
              country: user.country
            }
          },
          items: cartItems,
          total: finalTotal,
          shipping: shippingCost,
          notes: user.notes,
          timestamp: new Date().toISOString()
        }
      })
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    console.log('Pedido enviado a WhatsApp exitosamente')
  } catch (error) {
    console.error('Error enviando pedido a WhatsApp:', error)
    throw error
  }
}