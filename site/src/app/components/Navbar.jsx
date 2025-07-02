'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-black text-white sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-2xl font-bold">
            <span className="text-yellow-400">Tamboo</span> Baba
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="hover:text-yellow-400 transition-colors">Home</Link>
            <Link href="/services" className="hover:text-yellow-400 transition-colors">Services</Link>
            <Link href="/bookings" className="hover:text-yellow-400 transition-colors">My Bookings</Link>
            <Link href="/contact" className="hover:text-yellow-400 transition-colors">Contact</Link>
            <Link href="/BrandAlliances" className="hover:text-yellow-400 transition-colors">Brand Alliances</Link>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <nav className="flex flex-col space-y-3">
              <Link href="/" className="hover:text-yellow-400 transition-colors">Home</Link>
              <Link href="/services" className="hover:text-yellow-400 transition-colors">Services</Link>
              <Link href="/bookings" className="hover:text-yellow-400 transition-colors">My Bookings</Link>
              <Link href="/contact" className="hover:text-yellow-400 transition-colors">Contact</Link>
              <Link href="/BrandAlliances" className="hover:text-yellow-400 transition-colors">Brand Alliances</Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}