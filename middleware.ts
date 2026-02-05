import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('twitch_access_token')?.value;

  const isAuthPage = request.nextUrl.pathname.startsWith('/dashboard') || 
                     request.nextUrl.pathname.startsWith('/overlay');

  if (isAuthPage && !token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/overlay/:path*'],
};