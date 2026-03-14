'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false)

  return (
    <>
      <style>{`
        .nav-link {
          font-size: 13px;
          color: rgba(255,255,255,0.5);
          text-decoration: none;
          transition: color 0.2s;
        }
        .nav-link:hover { color: white; }

        .hamburger {
          display: none;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
        }
        .hamburger span {
          display: block;
          width: 22px;
          height: 2px;
          background: rgba(255,255,255,0.7);
          border-radius: 2px;
          transition: transform 0.25s, opacity 0.25s;
        }
        .hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity: 0; }
        .hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        .nav-desktop-links { display: flex; gap: 32px; align-items: center; }

        .mobile-menu {
          display: none;
          position: fixed;
          top: 64px; left: 0; right: 0;
          background: rgba(6,11,24,0.97);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          flex-direction: column;
          padding: 20px 24px 28px;
          gap: 6px;
          z-index: 99;
        }
        .mobile-menu.open { display: flex; }

        .mobile-menu .nav-link {
          font-size: 15px;
          padding: 10px 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          display: block;
        }

        .mobile-cta {
          background: linear-gradient(135deg, #29B6F6, #0288D1);
          color: white !important;
          padding: 11px 20px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 14px;
          letter-spacing: 0.04em;
          text-decoration: none;
          text-align: center;
          margin-top: 8px;
          display: block;
        }

        @media (max-width: 767px) {
          .nav-desktop-links { display: none; }
          .hamburger { display: flex; }
        }
      `}</style>

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