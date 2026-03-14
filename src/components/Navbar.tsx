'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false)

  return (
    <>
    
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '0 24px', height: 64,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        background: 'rgba(6,11,24,0.85)', backdropFilter: 'blur(20px)',
      }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <Image src="/name-logo-trans.png" alt="Frametoque" width={160} height={32} />
          <span style={{
            fontFamily: "'DM Mono', monospace", fontSize: 10,
            color: '#29B6F6', letterSpacing: '0.2em',
            background: 'rgba(41,182,246,0.1)',
            border: '1px solid rgba(41,182,246,0.2)',
            padding: '2px 7px', borderRadius: 4, marginLeft: 4,
            whiteSpace: 'nowrap',
          }}>STUDIO</span>
        </Link>

        {/* Desktop links */}
        <div className="nav-desktop-links">
        <Link className="nav-link" href="https://frametoque.online/services" target="_blank">Services</Link>
        <Link className="nav-link" href="https://frametoque.online/about" target="_blank" >About</Link>
        <Link className="nav-link" href="https://frametoque.online/contact" target="_blank">Contact</Link>
          <Link href="https://frametoque.online" target="_blank" style={{
            background: 'linear-gradient(135deg, #29B6F6, #0288D1)',
            color: 'white', padding: '8px 20px', borderRadius: 8,
            fontWeight: 600, fontSize: 13, letterSpacing: '0.04em',
            textDecoration: 'none',
          }}>Visit Our Main Site</Link>
        </div>

        {/* Hamburger */}
        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <Link className="nav-link" href="https://frametoque.online/services" target="_blank" onClick={() => setMenuOpen(false)}>Services</Link>
        <Link className="nav-link" href="https://frametoque.online/about" target="_blank" onClick={() => setMenuOpen(false)}>About</Link>
        <Link className="nav-link" href="https://frametoque.online/contact" target="_blank" onClick={() => setMenuOpen(false)}>Contact</Link>
        <Link
          href="https://frametoque.online"
          target="_blank"
          className="mobile-cta"
          onClick={() => setMenuOpen(false)}
        >Visit Our Main Site</Link>
      </div>
    </>
  )
}