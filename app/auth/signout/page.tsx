'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { signOut } from '@/lib/auth'

export default function SignOutPage() {
  const router = useRouter()

  useEffect(() => {
    const handleSignOut = async () => {
      await signOut()
      router.push('/')
      router.refresh()
    }

    handleSignOut()
  }, [router])

  return (
    <div className="max-w-md mx-auto px-4 py-12 text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4" />
      <p className="text-gray-600 dark:text-gray-400">Cerrando sesión...</p>
    </div>
  )
}
