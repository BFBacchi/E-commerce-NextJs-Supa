import { createClient } from '@/lib/supabase/client'

export async function signInWithEmail(email: string, password: string) {
  const supabase = createClient()
  return await supabase.auth.signInWithPassword({ email, password })
}

export async function signUpWithEmail(email: string, password: string) {
  const supabase = createClient()
  return await supabase.auth.signUp({ email, password })
}

export async function signInWithGoogle() {
  const supabase = createClient()
  return await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`
    }
  })
}

export async function signOut() {
  const supabase = createClient()
  return await supabase.auth.signOut()
}

export async function getCurrentUser() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return null
  
  // El email del admin debe configurarse como variable de entorno
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || process.env.ADMIN_EMAIL
  const isAdmin = user.email === adminEmail
  
  return {
    id: user.id,
    email: user.email || '',
    isAdmin
  }
}
