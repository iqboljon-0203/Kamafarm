import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get('host') || '';

  // 1. Subdomain routing for admin.kamafarm.uz
  // Check if the request is coming from the admin subdomain
  if (hostname.startsWith('admin.')) {
    // Prevent infinite rewrites for api, static files, and next.js internals
    if (!url.pathname.startsWith('/api') && !url.pathname.startsWith('/_next') && !url.pathname.includes('.')) {
      // If the path does not start with /admin, prefix it with /admin
      if (!url.pathname.startsWith('/admin')) {
        url.pathname = `/admin${url.pathname === '/' ? '' : url.pathname}`;
        return NextResponse.rewrite(url);
      }
    }
  }

  // 2. Auth Protection for all /admin routes except login
  // This applies to both admin.kamafarm.uz/* and kamafarm.uz/admin/*
  if (url.pathname.startsWith('/admin') && url.pathname !== '/admin/login') {
    const adminToken = request.cookies.get('admin_token')?.value;

    if (!adminToken) {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  // Run middleware on all paths except static files, api, images, and favicon
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
