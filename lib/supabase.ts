import { createClientComponentClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export const createClient = () => {
  return createClientComponentClient()
}

export const createServerClient = () => {
  return createServerComponentClient({ cookies })
}

export type Database = {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          name: string
          description: string
          price: number
          image_url: string
          category: string
          stock: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          price: number
          image_url: string
          category: string
          stock: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          price?: number
          image_url?: string
          category?: string
          stock?: number
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string
          total: number
          status: string
          items: any
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          total: number
          status?: string
          items: any
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          total?: number
          status?: string
          items?: any
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}