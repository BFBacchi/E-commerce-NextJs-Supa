'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { User } from '@/lib/types'
import type { Session } from '@supabase/auth-helpers-nextjs'

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  isAdmin: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setSession(session)
      
      if (session?.user) {
        const userData: User = {
          id: session.user.id,
          email: session.user.email!,
          is_admin: session.user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL
        }
        setUser(userData)
        setIsAdmin(userData.is_admin || false)
      } else {
        setUser(null)
        setIsAdmin(false)
      }
      
      setLoading(false)
    }

    getSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session)
        
        if (session?.user) {
          const userData: User = {
            id: session.user.id,
            email: session.user.email!,
            is_admin: session.user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL
          }
          setUser(userData)
          setIsAdmin(userData.is_admin || false)
        } else {
          setUser(null)
          setIsAdmin(false)
        }
        
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setSession(null)
    setIsAdmin(false)
  }

  return (
    <AuthContext.Provider value={{
      user,
      session,
      loading,
      isAdmin,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}