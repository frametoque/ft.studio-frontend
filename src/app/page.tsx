'use client'

import { useState, useEffect } from 'react'
import { Film, Palette, Music, Video } from 'lucide-react'
import NavBar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import './page.css'

const tools = [
  {
    id: 'video-analyzer',
    status: 'live',
    icon: Film,
    name: 'Video Analyzer',
    tagline: 'AI-powered cinematography feedback',
    description: 'Upload any footage and get instant ML analysis on exposure, composition, stability, style detection, and engagement prediction.',
    href: '/video-analyzer',
    accent: '#29B6F6',
    stats: ['7 quality checks', 'Style detection', 'Engagement score'],
  },
  {
    id: 'color-grader',
    status: 'soon',
    icon: Palette,
    name: 'Color Grader',
    tagline: 'LUT generation from reference stills',
    description: 'Drop a reference image and let AI generate a matching color grade for your footage.',
    href: null,
    accent: '#FF7043',
    stats: ['LUT export', 'Reference matching', 'Batch apply'],
  },
  {
    id: 'audio-sync',
    status: 'soon',
    icon: Music,
    name: 'Audio Sync',
    tagline: 'Beat-matched auto cut detection',
    description: 'Analyze your audio track and get automatic cut point suggestions synced to the beat.',
    href: null,
    accent: '#AB47BC',
    stats: ['BPM detection', 'Cut markers', 'Timeline export'],
  },
  {
    id: 'script-to-shot',
    status: 'soon',
    icon: Video,
    name: 'Script to Shot List',
    tagline: 'Scene breakdown from your script',
    description: 'Paste your script and get a full shot list, camera angles, and lighting suggestions generated instantly.',
    href: null,
    accent: '#66BB6A',
    stats: ['Shot breakdown', 'Camera suggestions', 'Export PDF'],
  },
]

const grain = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`

export default function StudioLanding() {
  const [hoveredTool, setHoveredTool] = useState(null)
  const [mousePos, setMousePos]       = useState({ x: 0, y: 0 })
  const [mounted, setMounted]         = useState(false)
  const [isMobile, setIsMobile]       = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleMouse = (e) => setMousePos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', handleMouse)
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => {
      window.removeEventListener('mousemove', handleMouse)
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  const hovered = tools.find(t => t.id === hoveredTool)

  return (
    <div style={{
      minHeight: '100vh',
      background: '#060B18',
      fontFamily: "'DM Sans', sans-serif",
      overflowX: 'hidden',
      position: 'relative',
    }}>

      {/* Cursor glow — desktop only */}
      {mounted && !isMobile && (
        <div style={{
          position: 'fixed',
          left: mousePos.x - 320, top: mousePos.y - 320,
          width: 640, height: 640, borderRadius: '50%',
          background: hovered
            ? `radial-gradient(circle, ${hovered.accent}12 0%, transparent 70%)`
            : 'radial-gradient(circle, rgba(41,182,246,0.06) 0%, transparent 70%)',
          pointerEvents: 'none', zIndex: 0,
          transition: 'background 0.5s ease',
        }} />
      )}

      {/* Scanline */}
      <div style={{
        position: 'fixed', inset: 0,
        pointerEvents: 'none', zIndex: 1, overflow: 'hidden', opacity: 0.025,
      }}>
        <div style={{
          position: 'absolute', left: 0, right: 0, height: 2,
          background: 'linear-gradient(transparent, #29B6F6, transparent)',
          animation: 'scanline 10s linear infinite',
        }} />
      </div>

      {/* Grid */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: `
          linear-gradient(rgba(41,182,246,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(41,182,246,0.04) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        opacity: mounted ? 1 : 0,
        transition: 'opacity 1.6s ease',
      }} />

      {/* Grain */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0,
        backgroundImage: grain, backgroundRepeat: 'repeat', pointerEvents: 'none',
      }} />

      {/* Hero radial glow */}
      <div style={{
        position: 'fixed', top: '10%', left: '-10%',
        width: 700, height: 700, borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(41,182,246,0.06) 0%, transparent 65%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      <NavBar />

      {/* ══ MAIN LAYOUT ══ */}
      <section className="hero-section">

        {/* ── LEFT — hero copy ── */}
        <div className="hero-left">

          {/* Live label */}
          <div style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 11, letterSpacing: '0.3em', color: '#29B6F6',
            textTransform: 'uppercase', marginBottom: 28,
            display: 'flex', alignItems: 'center', gap: 10,
            opacity: mounted ? 1 : 0,
            animation: mounted ? 'fadeUp 0.7s ease 0.1s both' : 'none',
          }}>
            <span className="live-badge" style={{
              width: 7, height: 7, borderRadius: '50%',
              background: '#29B6F6', display: 'inline-block', flexShrink: 0,
            }} />
            AI Filmmaking Tools
          </div>

          {/* Title */}
          <h1 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(48px, 10vw, 110px)',
            lineHeight: 0.9, letterSpacing: '0.04em',
            color: 'white', marginBottom: 6,
            opacity: mounted ? 1 : 0,
            animation: mounted ? 'fadeUp 0.7s ease 0.2s both' : 'none',
          }}>FRAMETOQUE</h1>

          <h2 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(48px, 10vw, 110px)',
            lineHeight: 0.9, letterSpacing: '0.04em',
            background: 'linear-gradient(90deg, #29B6F6 0%, #0D47A1 40%, #29B6F6 60%, #0D47A1 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundSize: '200% auto',
            marginBottom: 32,
            opacity: mounted ? 1 : 0,
            animation: mounted
              ? 'fadeUp 0.7s ease 0.3s both, shimmer 5s linear 1s infinite'
              : 'none',
          }}>STUDIO</h2>

          <p style={{
            fontSize: isMobile ? 14 : 16,
            color: 'rgba(255,255,255,0.42)',
            maxWidth: 400, lineHeight: 1.8, marginBottom: 40,
            fontWeight: 300,
            opacity: mounted ? 1 : 0,
            animation: mounted ? 'fadeUp 0.7s ease 0.4s both' : 'none',
          }}>
            A growing suite of AI tools built for filmmakers, videographers,
            and content creators who take their craft seriously.
          </p>

          {/* CTAs */}
          <div
            className="hero-ctas"
            style={{
              opacity: mounted ? 1 : 0,
              animation: mounted ? 'fadeUp 0.7s ease 0.5s both' : 'none',
            }}
          >
            <Link href="https://frametoque.online/" target="_blank" className="cta-primary">
              Visit Our Main Site
            </Link>
            
          </div>

          {/* Stats */}
          <div
            className="hero-stats"
            style={{
              opacity: mounted ? 1 : 0,
              animation: mounted ? 'fadeUp 0.7s ease 0.65s both' : 'none',
            }}
          >
            {[
              { val: '1',  label: 'Live Tool' },
              { val: '3',  label: 'Coming Soon' },
              { val: 'AI', label: 'Powered' },
            ].map((s) => (
              <div key={s.label}>
                <div style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: isMobile ? 30 : 38,
                  color: '#29B6F6',
                  letterSpacing: '0.05em', lineHeight: 1,
                }}>{s.val}</div>
                <div style={{
                  fontSize: 10, color: 'rgba(255,255,255,0.28)',
                  letterSpacing: '0.18em', textTransform: 'uppercase', marginTop: 4,
                }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Scroll hint — hide on mobile */}
          {!isMobile && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10, marginTop: 52,
              opacity: mounted ? 1 : 0,
              animation: mounted ? 'fadeIn 1s ease 1.4s both' : 'none',
            }}>
              <div style={{
                width: 36, height: 1,
                background: 'linear-gradient(to right, rgba(41,182,246,0.5), transparent)',
                animation: 'scrollHint 2s ease-in-out infinite',
              }} />
              <span style={{
                fontFamily: "'DM Mono', monospace", fontSize: 10,
                color: 'rgba(255,255,255,0.2)', letterSpacing: '0.2em',
              }}>4 TOOLS IN THE SUITE</span>
            </div>
          )}
        </div>

        {/* ── RIGHT — tool cards grid ── */}
        <div className="hero-right">
          {tools.map((tool, i) => {
            const isLive    = tool.status === 'live'
            const isHovered = hoveredTool === tool.id
            const [r, g, b] = tool.accent.slice(1).match(/.{2}/g).map(h => parseInt(h, 16))

            return (
              <div
                key={tool.id}
                className="tool-card"
                onMouseEnter={() => setHoveredTool(tool.id)}
                onMouseLeave={() => setHoveredTool(null)}
                onClick={() => isLive && tool.href && (window.location.href = tool.href)}
                style={{
                  background: isHovered
                    ? `linear-gradient(145deg, rgba(${r},${g},${b},0.1), rgba(6,11,24,0.96))`
                    : 'rgba(13,21,38,0.75)',
                  border: `1px solid ${isHovered ? tool.accent + '50' : 'rgba(30,48,96,0.5)'}`,
                  borderRadius: 16,
                  padding: isMobile ? '18px 16px 16px' : '22px 20px 20px',
                  cursor: isLive ? 'pointer' : 'default',
                  position: 'relative', overflow: 'hidden',
                  opacity: mounted ? 1 : 0,
                  animation: mounted ? `fadeUp 0.6s ease ${0.3 + i * 0.1}s both` : 'none',
                  boxShadow: isHovered
                    ? `0 16px 48px rgba(${r},${g},${b},0.15), 0 0 0 1px ${tool.accent}20`
                    : '0 4px 20px rgba(0,0,0,0.3)',
                }}>

                {/* Top glow line */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                  background: isHovered
                    ? `linear-gradient(90deg, transparent, ${tool.accent}, transparent)`
                    : 'transparent',
                  transition: 'background 0.3s ease',
                }} />

                {/* Corner radial */}
                {isHovered && (
                  <div style={{
                    position: 'absolute', top: 0, right: 0,
                    width: 70, height: 70,
                    background: `radial-gradient(circle at top right, rgba(${r},${g},${b},0.18), transparent 70%)`,
                    pointerEvents: 'none',
                  }} />
                )}

                {/* Icon + badge */}
                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  alignItems: 'flex-start', marginBottom: 16,
                }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 10,
                    background: `rgba(${r},${g},${b},0.1)`,
                    border: `1px solid rgba(${r},${g},${b},0.2)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <tool.icon size={19} color={tool.accent} strokeWidth={1.5} />
                  </div>

                  <span style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 9, letterSpacing: '0.18em',
                    padding: '3px 9px', borderRadius: 20,
                    background: isLive ? 'rgba(41,182,246,0.1)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${isLive ? 'rgba(41,182,246,0.3)' : 'rgba(255,255,255,0.08)'}`,
                    color: isLive ? '#29B6F6' : 'rgba(255,255,255,0.22)',
                    textTransform: 'uppercase',
                    display: 'flex', alignItems: 'center', gap: 5,
                  }}>
                    {isLive && (
                      <span className="live-badge" style={{
                        width: 4, height: 4, borderRadius: '50%',
                        background: '#29B6F6', display: 'inline-block',
                      }} />
                    )}
                    {isLive ? 'Live' : 'Soon'}
                  </span>
                </div>

                <h4 style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 22, letterSpacing: '0.05em',
                  color: 'white', marginBottom: 4,
                }}>{tool.name}</h4>

                <p style={{
                  fontSize: 11, color: tool.accent,
                  fontFamily: "'DM Mono', monospace",
                  letterSpacing: '0.05em', marginBottom: 10,
                }}>{tool.tagline}</p>

                <p style={{
                  fontSize: 12, color: 'rgba(255,255,255,0.35)',
                  lineHeight: 1.65, marginBottom: 14, fontWeight: 300,
                }}>{tool.description}</p>

                {/* Pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 16 }}>
                  {tool.stats.map(s => (
                    <span key={s} style={{
                      fontSize: 10, padding: '2px 8px', borderRadius: 5,
                      background: `rgba(${r},${g},${b},0.07)`,
                      border: `1px solid rgba(${r},${g},${b},0.15)`,
                      color: `rgba(${r},${g},${b},0.85)`,
                      fontFamily: "'DM Mono', monospace",
                    }}>{s}</span>
                  ))}
                </div>

                {isLive ? (
                  <div style={{
                    fontSize: 12, color: tool.accent, fontWeight: 600,
                    letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: 5,
                  }}>
                    Open Tool
                    <span style={{
                      display: 'inline-block',
                      transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
                      transition: 'transform 0.25s ease',
                    }}>→</span>
                  </div>
                ) : (
                  <div style={{
                    fontSize: 10, color: 'rgba(255,255,255,0.18)',
                    fontFamily: "'DM Mono', monospace", letterSpacing: '0.12em',
                  }}>IN DEVELOPMENT</div>
                )}
              </div>
            )
          })}
        </div>
      </section>

      <Footer />
    </div>
  )
}