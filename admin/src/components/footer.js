import Link from 'next/link';
import { FiInstagram, FiTwitter, FiLinkedin } from 'react-icons/fi';

export function Footer() {
  return (
    <footer className="bg-[#0E111D] border-t border-white/10 py-8 px-6 flex flex-col md:flex-row items-center md:items-start justify-between text-sm text-gray-400 gap-8">
      {/* Logo and description */}
      <div className="flex flex-col items-center md:items-start gap-3 w-full md:w-1/3">
        <img src="/hero-image.png" alt="Tamboo Baba Logo" className="h-12 w-12 rounded-lg border border-yellow-400" />
        <span className="text-yellow-400 font-bold text-lg">Tamboo Baba Admin</span>
        <p className="text-gray-400 max-w-xs text-center md:text-left">
          Tamboo Baba Admin Dashboard is your one-stop solution for managing events and brand alliances efficiently and securely.
        </p>
      </div>

      {/* Contact Details */}
      <div className="flex flex-col gap-2 w-full md:w-1/3 mt-6 md:mt-0 text-center md:text-left">
        <span className="font-semibold text-yellow-400 mb-1">Contact Us</span>
        <span>{'\u{1F4CD}'} Ludhiana, Punjab, India</span>
        <span>{'\u{1F4DE}'} <a className="hover:text-yellow-400" href="tel:+917355260895">+91 73552 60895</a></span>
        <span>{'\u{2709}'} <a className="hover:text-yellow-400" href="mailto:tamboobaba@gmail.com">tamboobaba@gmail.com</a></span>
        <span>{'\u{1F310}'} <a className="hover:text-yellow-400" href="https://www.tamboobaba.com" target="_blank" rel="noopener noreferrer">www.tamboobaba.com</a></span>
      </div>

      {/* Social Handles */}
      <div className="flex flex-col items-center md:items-end gap-3 w-full md:w-1/3 mt-6 md:mt-0">
        <span className="font-semibold text-yellow-400 mb-1">Connect with us</span>
        <div className="flex gap-4 text-2xl">
          <a href="https://www.instagram.com/tamboobaba" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400"><FiInstagram /></a>
          <a href="https://twitter.com/tamboobaba" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400"><FiTwitter /></a>
          <a href="https://www.linkedin.com/company/tamboobaba" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400"><FiLinkedin /></a>
        </div>
        <div className="mt-2 text-xs text-gray-500">
          &copy; {new Date().getFullYear()} Tamboo Baba. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
