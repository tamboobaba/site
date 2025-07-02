'use client';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    // Don't protect the login page
    if (pathname === '/login') {
      setIsLoading(false);
      return;
    }
    // Check for the auth cookie
    if (typeof document !== 'undefined' && document.cookie.includes('is-authenticated=true')) {
      setIsAuth(true);
      setIsLoading(false);
    } else {
      router.replace('/login');
    }
  }, [pathname, router]);

    if (pathname === '/login') {
    return children;
  }
  
  if (isLoading) {
    // You can show a spinner or blank
    return <div className="min-h-screen flex items-center justify-center bg-gray-950 text-yellow-400">Checking authentication...</div>;
  }

  // Render protected content if authenticated
  return isAuth ? children : null;
}
