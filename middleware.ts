import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Proteger rutas de admin
  if (req.nextUrl.pathname.startsWith('/admin')) {
    if (!session || session.user.email !== process.env.ADMIN_EMAIL) {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }

  // Proteger checkout
  if (req.nextUrl.pathname === '/checkout' && !session) {
    return NextResponse.redirect(new URL('/auth/login?next=/checkout', req.url))
  }

  return res
}

export const config = {
  matcher: ['/admin/:path*', '/checkout'],
}