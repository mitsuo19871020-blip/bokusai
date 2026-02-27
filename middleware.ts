import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const isMaintenanceMode = process.env.MAINTENANCE_MODE === 'true'

  if (isMaintenanceMode && req.nextUrl.pathname !== '/maintenance') {
    return NextResponse.redirect(new URL('/maintenance', req.url))
  }
}

export const config = {
  // Webhook は除外（Stripe からの通知を止めない）
  // _next/static などの静的ファイルも除外
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/webhook).*)'],
}
