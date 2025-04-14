import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from './auth';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const session = await auth();
  
  // Check if the user is trying to access protected routes
  const isCheckoutPage = request.nextUrl.pathname.startsWith('/shop/checkout');
  const isOrdersPage = request.nextUrl.pathname.startsWith('/shop/orders');
  
  // If trying to access protected routes without being logged in, redirect to login
  if ((isCheckoutPage || isOrdersPage) && !session) {
    // Store the original URL the user was trying to access so we can redirect after login
    const redirectUrl = new URL('/auth/login', request.url);
    redirectUrl.searchParams.set('callbackUrl', request.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }
  
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/shop/checkout/:path*', '/shop/orders/:path*'],
};
