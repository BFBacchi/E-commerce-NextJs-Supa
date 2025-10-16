import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Product, CartItem } from '@/types'
import { supabase } from '@/lib/supabase/client'

interface CartStore {
  items: CartItem[]
  isLoading: boolean
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getTotalPrice: () => number
  getTotalItems: () => number
  syncWithSupabase: (userId: string) => Promise<void>
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isLoading: false,
      
      addItem: (product: Product, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product.id === product.id
          )
          
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            }
          }
          
          return {
            items: [...state.items, { product, quantity }],
          }
        })
      },
      
      removeItem: (productId: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        }))
      },
      
      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId)
          return
        }
        
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        }))
      },
      
      clearCart: () => {
        set({ items: [] })
      },
      
      getTotalPrice: () => {
        const { items } = get()
        return items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        )
      },
      
      getTotalItems: () => {
        const { items } = get()
        return items.reduce((total, item) => total + item.quantity, 0)
      },
      
      syncWithSupabase: async (userId: string) => {
        set({ isLoading: true })
        
        try {
          // Obtener items del carrito desde Supabase
          const { data: cartItems, error } = await supabase
            .from('cart_items')
            .select(`
              quantity,
              product:products(*)
            `)
            .eq('user_id', userId)
          
          if (error) throw error
          
          if (cartItems) {
            const items: CartItem[] = cartItems
              .filter((item) => item.product)
              .map((item) => ({
                product: item.product as Product,
                quantity: item.quantity,
              }))
            
            set({ items })
          }
        } catch (error) {
          console.error('Error syncing cart with Supabase:', error)
        } finally {
          set({ isLoading: false })
        }
      },
    }),
    {
      name: 'cart-storage',
    }
  )
)