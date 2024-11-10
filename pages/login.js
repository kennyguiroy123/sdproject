import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { serialize } from 'cookie';
import Image from 'next/image';


export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        throw new Error('Login failed');
      }
  
      const data = await response.json();
      const { token } = data;
  
      // Set the token in an HttpOnly cookie
      const cookie = serialize('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', 
        maxAge: 60 * 60 * 24,  //1D
        path: '/', 
      });
  
      // Set the cookie in the response headers
      document.cookie = cookie;
  
      // Redirect to the dashboard
      router.push('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="relative h-screen flex items-center justify-center bg-cover bg-center">
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>

      <div className="absolute top-0 left-0 w-full h-full">
        <Image
          src="/backgroundlogin.jpeg" // Path relative to the public folder
          alt="Background Login"
          layout="fill" // This ensures the image fills the entire container
          objectFit="cover" // Ensures the image covers the entire area while maintaining aspect ratio
        />
      </div>

      <header className="absolute top-0 w-full py-4 px-6 flex justify-between items-center bg-opacity-75 bg-gray-900">
        <h1 className="text-white text-2xl font-bold">Dashboard Admin SD Project</h1>
        <Link href="/register" className="text-white underline">
          Register
        </Link>
      </header>

      <div className="relative z-10 bg-white bg-opacity-90 rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <button type="submit" className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
            Log In
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Forgot your password?{' '}
          <Link href="/forgot-password" className="text-indigo-600 hover:underline">
            Click here
          </Link>
        </p>
        <p className="mt-4 text-center text-gray-600">
          No account ?{' '}
          <Link href="/register" className="text-indigo-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
