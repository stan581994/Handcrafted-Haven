import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  // Get the token from the request
  const token = await getToken({ req: request });
  
  // If there's a token, the user is authenticated
  const isAuthenticated = !!token;
  
  // Check if the user is trying to access protected routes
  const isCheckoutPage = request.nextUrl.pathname.startsWith('/shop/checkout');
  const isOrdersPage = request.nextUrl.pathname.startsWith('/shop/orders');
  
  // If trying to access protected routes without being logged in, redirect to login
  if ((isCheckoutPage || isOrdersPage) && !isAuthenticated) {
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
