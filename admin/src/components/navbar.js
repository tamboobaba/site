import Link from 'next/link';

export function Navbar() {
  // Logout handler
  const handleLogout = () => {
    // Remove the is-authenticated cookie
    document.cookie = 'is-authenticated=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    // Redirect to login page
    window.location.href = '/login';
  };

  return (
    <nav className="bg-[#0E111D] border-b border-[#0E111D]/10 px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between ">
      {/* Logo + Title */}
      <div className="flex items-center gap-3 text-center sm:text-left">
        <Link href="/" className="flex items-center gap-2 sm:gap-3">
          <img
            src="/hero-image.png"
            alt="Tamboo Baba Logo"
            className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg border border-yellow-400"
          />
          <span className="text-lg sm:text-2xl font-bold text-yellow-400 tracking-wide">
            Tamboo Baba Admin Dashboard
          </span>
        </Link>
      </div>

      {/* Navigation Links + Logout */}
      <div className="hidden sm:flex gap-6 items-center">
        <Link href="/events" className="text-white hover:text-yellow-400 transition">
          Event Management
        </Link>
        <Link href="/brandalliances" className="text-white hover:text-yellow-400 transition">
          Brand Alliances
        </Link>
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="ml-4 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
