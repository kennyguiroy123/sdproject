import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request) {
  // Get the token from cookies
  const token = request.cookies.get('token')?.value;
  // console.log('Token in middleware:', token);

  // If token exists, verify it
  if (token) {
    try {
      // Using the jose library to verify the JWT
      const secret = new TextEncoder().encode(process.env.JWT_SECRET); // Convert the secret to Uint8Array
      const { payload } = await jwtVerify(token, secret); // Verify token

      console.log('Token is valid, proceeding...');
      return NextResponse.next(); // Allow the request to continue if token is valid
    } catch (error) {
      console.error('JWT verification failed:', error);
      // Redirect to login page if token verification fails
      return NextResponse.redirect(new URL('/login', request.url));
    }
  } else {
    console.log('No token found, redirecting to login...');
    return NextResponse.redirect(new URL('/login', request.url)); // Redirect if there's no token
  }
}

// Define the protected routes
export const config = {
  matcher: ['/dashboard', '/tasks', '/users'], // Protect these routes
};
