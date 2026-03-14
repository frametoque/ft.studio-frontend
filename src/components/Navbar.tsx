'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false)

  const navLinks = [
    { href: 'https://frametoque.online/services', label: 'Services' },
    { href: 'https://frametoque.online/about', label: 'About' },
    { href: 'https://frametoque.online/contact', label: 'Contact' },
  ]

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[100] h-16 px-6 flex items-center justify-between border-b border-white/5 bg-[#060B18]/85 backdrop-blur-xl">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 no-underline group">
          <Image src="/name-logo-trans.png" alt="Frametoque" width={160} height={32} />
          <span className="font-mono text-[10px] text-[#29B6F6] tracking-[0.2em] bg-[#29B6F6]/10 border border-[#29B6F6]/20 px-[7px] py-[2px] rounded ml-1 whitespace-nowrap">
            STUDIO
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              target="_blank"
              className="text-[13px] text-white/50 tracking-widest uppercase hover:text-white transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="https://frametoque.online"
            target="_blank"
            className="bg-gradient-to-r from-[#29B6F6] to-[#0288D1] text-white px-5 py-2 rounded-lg font-semibold text-[13px] tracking-[0.04em] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#29B6F6]/30 transition-all duration-200"
          >
            Visit Our Main Site
          </Link>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          className="md:hidden flex flex-col justify-center gap-[5px] p-1 bg-transparent border-none cursor-pointer"
        >
          <span className={`block w-[22px] h-[2px] bg-white/70 rounded-sm transition-all duration-250 ${menuOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
          <span className={`block w-[22px] h-[2px] bg-white/70 rounded-sm transition-all duration-250 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-[22px] h-[2px] bg-white/70 rounded-sm transition-all duration-250 ${menuOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
        </button>
      </nav>

      {/* Mobile menu */}
      <div className={`md:hidden fixed top-16 left-0 right-0 z-[99] bg-[#060B18]/97 backdrop-blur-xl border-b border-white/5 flex flex-col px-6 gap-1 transition-all duration-300 overflow-hidden ${menuOpen ? 'py-5 pb-7 opacity-100 pointer-events-auto' : 'max-h-0 py-0 opacity-0 pointer-events-none'}`}>
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            target="_blank"
            onClick={() => setMenuOpen(false)}
            className="text-[15px] text-white/50 hover:text-white py-2.5 border-b border-white/5 tracking-widest uppercase transition-colors duration-200"
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="https://frametoque.online"
          target="_blank"
          onClick={() => setMenuOpen(false)}
          className="mt-2 block text-center bg-gradient-to-r from-[#29B6F6] to-[#0288D1] text-white px-5 py-3 rounded-lg font-semibold text-[14px] tracking-[0.04em] hover:opacity-90 transition-opacity duration-200"
        >
          Visit Our Main Site
        </Link>
      </div>
    </>
  )
}