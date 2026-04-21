import { NextRequest, NextResponse } from 'next/server'
import { verifyJwt } from './lib/login/manage-login'

export async function proxy(request: NextRequest) {
  // This is a showcase mode, where authentication is bypassed for demonstration purposes.
  if (process.env.SHOWCASE_MODE === 'true') {
    return NextResponse.next()
  }

  const isLoginPage = request.nextUrl.pathname.startsWith('/admin/login')
  const isAdminPage = request.nextUrl.pathname.startsWith('/admin')
  const isGetRequest = request.method === 'GET'

  const shouldBeAuthenticated = isAdminPage && !isLoginPage
  const shouldRedirect = shouldBeAuthenticated && isGetRequest

  if (!shouldRedirect) {
    return NextResponse.next()
  }

  const jwtSession = request.cookies.get(process.env.LOGIN_COOKIE_NAME || 'loginSession')?.value
  const isAuthenticated = await verifyJwt(jwtSession)

  if (!isAuthenticated) {
    const loginUrl = new URL('/admin/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*',
}
