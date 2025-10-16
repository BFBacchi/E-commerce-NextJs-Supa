'use client'

import { useEffect } from 'react'
import { useCartStore } from '@/lib/store/cart'

export function CartHydration() {
  useEffect(() => {
    useCartStore.getState().setHydrated()
  }, [])

  return null
}
