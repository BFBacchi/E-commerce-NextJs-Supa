'use client'

import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { createClientSupabaseClient } from '@/lib/supabase'
import { useAuth } from '@/hooks/useAuth'
import type { CartItem, Product } from '@/types'

interface CartState {
  items: CartItem[]
  total: number
  itemCount: number
}

type CartAction =
  | { type: 'SET_CART'; payload: CartItem[] }
  | { type: 'ADD_ITEM'; payload: { product: Product; quantity: number } }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }

interface CartContextType extends CartState {
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'SET_CART':
      return calculateCartTotals({ ...state, items: action.payload })
    
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.product.id === action.payload.product.id)
      
      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item.product.id === action.payload.product.id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        )
        return calculateCartTotals({ ...state, items: updatedItems })
      } else {
        const newItem: CartItem = {
          id: `cart-${action.payload.product.id}`,
          product: action.payload.product,
          quantity: action.payload.quantity,
        }
        return calculateCartTotals({ ...state, items: [...state.items, newItem] })
      }
    }
    
    case 'REMOVE_ITEM': {
      const updatedItems = state.items.filter(item => item.product.id !== action.payload)
      return calculateCartTotals({ ...state, items: updatedItems })
    }
    
    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity <= 0) {
        const updatedItems = state.items.filter(item => item.product.id !== action.payload.id)
        return calculateCartTotals({ ...state, items: updatedItems })
      }
      
      const updatedItems = state.items.map(item =>
        item.product.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      )
      return calculateCartTotals({ ...state, items: updatedItems })
    }
    
    case 'CLEAR_CART':
      return { items: [], total: 0, itemCount: 0 }
    
    default:
      return state
  }
}

function calculateCartTotals(state: CartState): CartState {
  const total = state.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0)
  
  return {
    ...state,
    total: Math.round(total * 100) / 100,
    itemCount,
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
    itemCount: 0,
  })
  
  const { user } = useAuth()
  const supabase = createClientSupabaseClient()

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      try {
        const cartItems = JSON.parse(savedCart)
        dispatch({ type: 'SET_CART', payload: cartItems })
      } catch (error) {
        console.error('Error loading cart from localStorage:', error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.items))
  }, [state.items])

  // Sync cart with Supabase when user is authenticated
  useEffect(() => {
    if (user && state.items.length > 0) {
      syncCartWithSupabase()
    }
  }, [user, state.items])

  const syncCartWithSupabase = async () => {
    if (!user) return

    try {
      // Clear existing cart items for this user
      await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id)

      // Insert current cart items
      if (state.items.length > 0) {
        const cartItemsToInsert = state.items.map(item => ({
          user_id: user.id,
          product_id: item.product.id,
          quantity: item.quantity,
        }))

        await supabase
          .from('cart_items')
          .insert(cartItemsToInsert)
      }
    } catch (error) {
      console.error('Error syncing cart with Supabase:', error)
    }
  }

  const addItem = (product: Product, quantity = 1) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, quantity } })
  }

  const removeItem = (productId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId })
  }

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
    localStorage.removeItem('cart')
  }

  return (
    <CartContext.Provider
      value={{
        ...state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}