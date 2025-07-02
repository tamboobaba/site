'use client';
import { useState } from 'react';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    // Fetch env vars from a public API route
    const res = await fetch('/api/adminsign');
    const { ADMIN_USERNAME, ADMIN_PASSWORD } = await res.json();

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      document.cookie = 'is-authenticated=true; path=/';
      window.location.href = '/';
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <form onSubmit={handleLogin} className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-xs">
        {/* Tamboo Baba Admin branding */}
        <div className="flex flex-col items-center mb-6">
          <img
            src="/hero-image.png"
            alt="Tamboo Baba Logo"
            className="h-12 w-12 rounded-lg border border-yellow-400 mb-2"
          />
          <h1 className="text-2xl font-bold text-yellow-400 mb-1 text-center">
            Tamboo Baba Admin
          </h1>
          <span className="text-gray-300 text-sm mb-2">Login</span>
        </div>
        <input
          className="w-full mb-4 px-4 py-2 rounded bg-gray-800 border border-white/10 text-white"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          className="w-full mb-4 px-4 py-2 rounded bg-gray-800 border border-white/10 text-white"
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
        <button
          type="submit"
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}
