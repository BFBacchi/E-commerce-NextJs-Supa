import { create } from 'zustand'
import { Product, CartItem } from '@/lib/types'

interface CartStore {
  items: CartItem[]
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
  getItemsCount: () => number
  hydrated: boolean
  setHydrated: () => void
}

// Función para cargar desde localStorage
const loadFromStorage = (): CartItem[] => {
  if (typeof window === 'undefined') return []
  
  try {
    const stored = localStorage.getItem('cart-storage')
    if (stored) {
      const data = JSON.parse(stored)
      return data.items || []
    }
  } catch (e) {
    console.error('Error loading cart from storage:', e)
  }
  
  return []
}

// Función para guardar en localStorage
const saveToStorage = (items: CartItem[]) => {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem('cart-storage', JSON.stringify({ items }))
  } catch (e) {
    console.error('Error saving cart to storage:', e)
  }
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  hydrated: false,

  setHydrated: () => {
    const items = loadFromStorage()
    set({ items, hydrated: true })
  },
  
  addItem: (product: Product, quantity = 1) => {
    set((state) => {
      const existingItem = state.items.find(
        (item) => item.product.id === product.id
      )

      let newItems: CartItem[]

      if (existingItem) {
        newItems = state.items.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      } else {
        newItems = [...state.items, { product, quantity }]
      }

      saveToStorage(newItems)
      return { items: newItems }
    })
  },

  removeItem: (productId: string) => {
    set((state) => {
      const newItems = state.items.filter((item) => item.product.id !== productId)
      saveToStorage(newItems)
      return { items: newItems }
    })
  },

  updateQuantity: (productId: string, quantity: number) => {
    if (quantity <= 0) {
      get().removeItem(productId)
      return
    }

    set((state) => {
      const newItems = state.items.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
      saveToStorage(newItems)
      return { items: newItems }
    })
  },

  clearCart: () => {
    saveToStorage([])
    set({ items: [] })
  },

  getTotal: () => {
    return get().items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    )
  },

  getItemsCount: () => {
    return get().items.reduce((count, item) => count + item.quantity, 0)
  },
}))

// Hidratar el store cuando esté en el cliente
if (typeof window !== 'undefined') {
  useCartStore.getState().setHydrated()
}
