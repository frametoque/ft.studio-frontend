'use client'

import { useState, useEffect } from 'react'
import { Film, Palette, Music, Video, LucideIcon } from 'lucide-react'
import NavBar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

interface Tool {
  id: string
  status: 'live' | 'soon'
  icon: LucideIcon
  name: string
  tagline: string
  description: string
  href: string | null
  accent: string
  accentRgb: string
  stats: string[]
}

const tools: Tool[] = [
  {
    id: 'video-analyzer',
    status: 'live',
    icon: Film,
    name: 'Video Analyzer',
    tagline: 'AI-powered cinematography feedback',
    description: 'Upload any footage and get instant ML analysis on exposure, composition, stability, style detection, and engagement prediction.',
    href: '/video-analyzer',
    accent: '#29B6F6',
    accentRgb: '41,182,246',
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
    accentRgb: '255,112,67',
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
    accentRgb: '171,71,188',
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
    accentRgb: '102,187,106',
    stats: ['Shot breakdown', 'Camera suggestions', 'Export PDF'],
  },
]

const stats = [
  { val: '1',  label: 'Live Tool' },
  { val: '3',  label: 'Coming Soon' },
  { val: 'AI', label: 'Powered' },
]

export default function StudioLanding() {
  const [hoveredTool, setHoveredTool] = useState<string | null>(null)
  const [mousePos, setMousePos]       = useState({ x: 0, y: 0 })
  const [mounted, setMounted]         = useState(false)
  const [isMobile, setIsMobile]       = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleMouse = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY })
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('mousemove', handleMouse)
    window.addEventListener('resize', checkMobile)
    return () => {
      window.removeEventListener('mousemove', handleMouse)
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  const hovered = tools.find(t => t.id === hoveredTool)

  return (
    <div className="min-h-screen bg-[#060B18] overflow-x-hidden relative">

      {/* Cursor glow */}
      {mounted && !isMobile && (
        <div
          className="fixed w-[640px] h-[640px] rounded-full pointer-events-none z-0"
          style={{
            left: mousePos.x - 320,
            top: mousePos.y - 320,
            background: hovered
              ? `radial-gradient(circle, rgba(${hovered.accentRgb},0.07) 0%, transparent 70%)`
              : 'radial-gradient(circle, rgba(41,182,246,0.06) 0%, transparent 70%)',
          }}
        />
      )}

      {/* Hero radial glow */}
      <div className="fixed top-[10%] -left-[10%] w-[700px] h-[700px] rounded-full pointer-events-none z-0"
        style={{ background: 'radial-gradient(ellipse, rgba(41,182,246,0.06) 0%, transparent 65%)' }}
      />

      <NavBar />

      <main>
        <section className="relative z-[2] max-w-[1400px] mx-auto px-12 grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-64px)] items-center gap-0 lg:px-8 md:px-4">

          {/* LEFT — hero copy */}
          <div className="py-20 lg:pr-16 lg:sticky lg:top-16 fade-1">

            {/* Live label */}
            <div className={`font-mono text-[11px] text-[#29B6F6] tracking-[0.3em] uppercase mb-7 flex items-center gap-2.5 transition-opacity duration-700 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
              <span className="live-badge w-[7px] h-[7px] rounded-full bg-[#29B6F6] inline-block flex-shrink-0 animate-pulse" />
              AI Filmmaking Tools
            </div>

            {/* Title — h1 + h2 establish the heading hierarchy for the page */}
            <h1 className={`font-display text-[clamp(48px,10vw,110px)] leading-[0.9] tracking-[0.04em] text-white mb-1 fade-2`}>
              FRAMETOQUE
            </h1>
            <h2
              className="font-display text-[clamp(48px,10vw,110px)] leading-[0.9] tracking-[0.04em] mb-8 fade-3"
              style={{
                background: 'linear-gradient(90deg, #29B6F6 0%, #0D47A1 40%, #29B6F6 60%, #0D47A1 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundSize: '200% auto',
                animation: mounted ? 'shimmer 5s linear 1s infinite' : 'none',
              }}
            >
              STUDIO
            </h2>

            <p className="text-[15px] md:text-[14px] text-white/60 max-w-[400px] leading-[1.8] font-light mb-10 fade-4">
              A growing suite of AI tools built for filmmakers, videographers,
              and content creators who take their craft seriously.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 mb-14 fade-5">
              <Link
                href="https://frametoque.online/"
                target="_blank"
                className="bg-gradient-to-r from-[#29B6F6] to-[#0288D1] text-white px-7 py-3.5 rounded-xl font-semibold text-[14px] tracking-[0.05em] hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#29B6F6]/40 transition-all duration-200 text-center"
              >
                Visit Our Main Site
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-10 sm:gap-6 fade-6">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="font-display text-[38px] sm:text-[30px] text-[#29B6F6] tracking-[0.05em] leading-none">
                    {s.val}
                  </div>
                  <div className="text-[10px] text-white/55 tracking-[0.18em] uppercase mt-1">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Scroll hint */}
            {!isMobile && (
              <div className="flex items-center gap-2.5 mt-14 fade-6">
                <div
                  className="w-9 h-px"
                  style={{ background: 'linear-gradient(to right, rgba(41,182,246,0.5), transparent)' }}
                />
                <span className="font-mono text-[10px] text-white/50 tracking-[0.2em]">
                  4 TOOLS IN THE SUITE
                </span>
              </div>
            )}
          </div>

          {/* RIGHT — tool cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-24 pb-20 lg:pt-24 content-start">
            {tools.map((tool, i) => {
              const isLive    = tool.status === 'live'
              const isHovered = hoveredTool === tool.id

              return (
                <div
                  key={tool.id}
                  onMouseEnter={() => setHoveredTool(tool.id)}
                  onMouseLeave={() => setHoveredTool(null)}
                  onClick={() => isLive && tool.href && (window.location.href = tool.href)}
                  className={`relative overflow-hidden rounded-2xl p-5 transition-all duration-300 ${isLive ? 'cursor-pointer' : 'cursor-default'} ${isHovered ? '-translate-y-1.5' : ''} ${mounted ? 'opacity-100' : 'opacity-0'}`}
                  style={{
                    animationDelay: `${0.3 + i * 0.1}s`,
                    background: isHovered
                      ? `linear-gradient(145deg, rgba(${tool.accentRgb},0.1), rgba(6,11,24,0.96))`
                      : 'rgba(13,21,38,0.75)',
                    border: `1px solid ${isHovered ? tool.accent + '50' : 'rgba(30,48,96,0.5)'}`,
                    boxShadow: isHovered
                      ? `0 16px 48px rgba(${tool.accentRgb},0.15), 0 0 0 1px ${tool.accent}20`
                      : '0 4px 20px rgba(0,0,0,0.3)',
                    animation: mounted ? `fadeUp 0.6s ease ${0.3 + i * 0.1}s both` : 'none',
                  }}
                >
                  {/* Top glow line */}
                  <div
                    className="absolute top-0 left-0 right-0 h-px transition-all duration-300"
                    style={{
                      background: isHovered
                        ? `linear-gradient(90deg, transparent, ${tool.accent}, transparent)`
                        : 'transparent',
                    }}
                  />

                  {/* Corner radial */}
                  {isHovered && (
                    <div
                      className="absolute top-0 right-0 w-[70px] h-[70px] pointer-events-none"
                      style={{ background: `radial-gradient(circle at top right, rgba(${tool.accentRgb},0.18), transparent 70%)` }}
                    />
                  )}

                  {/* Icon + badge */}
                  <div className="flex justify-between items-start mb-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{
                        background: `rgba(${tool.accentRgb},0.1)`,
                        border: `1px solid rgba(${tool.accentRgb},0.2)`,
                      }}
                    >
                      <tool.icon size={19} color={tool.accent} strokeWidth={1.5} />
                    </div>

                    <span
                      className="font-mono text-[9px] tracking-[0.18em] uppercase px-[9px] py-[3px] rounded-full flex items-center gap-1.5"
                      style={{
                        background: isLive ? 'rgba(41,182,246,0.1)' : 'rgba(255,255,255,0.04)',
                        border: `1px solid ${isLive ? 'rgba(41,182,246,0.3)' : 'rgba(255,255,255,0.08)'}`,
                        color: isLive ? '#29B6F6' : 'rgba(255,255,255,0.55)',
                      }}
                    >
                      {isLive && (
                        <span className="w-1 h-1 rounded-full bg-[#29B6F6] animate-pulse inline-block" />
                      )}
                      {isLive ? 'Live' : 'Soon'}
                    </span>
                  </div>

                  <h3 className="font-display text-[22px] tracking-[0.05em] text-white mb-1">
                    {tool.name}
                  </h3>
                  <p
                    className="font-mono text-[11px] tracking-[0.05em] mb-2.5"
                    style={{ color: tool.accent }}
                  >
                    {tool.tagline}
                  </p>
                  <p className="text-[12px] text-white/60 leading-[1.65] mb-3.5 font-light">
                    {tool.description}
                  </p>

                  {/* Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {tool.stats.map(s => (
                      <span
                        key={s}
                        className="font-mono text-[10px] px-2 py-0.5 rounded-md"
                        style={{
                          background: `rgba(${tool.accentRgb},0.07)`,
                          border: `1px solid rgba(${tool.accentRgb},0.15)`,
                          color: `rgba(${tool.accentRgb},0.85)`,
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  {isLive ? (
                    <div
                      className="text-[12px] font-semibold tracking-[0.05em] flex items-center gap-1.5"
                      style={{ color: tool.accent }}
                    >
                      Open Tool
                      <span className={`inline-block transition-transform duration-250 ${isHovered ? 'translate-x-1' : ''}`}>
                        →
                      </span>
                    </div>
                  ) : (
                    <div className="font-mono text-[10px] text-white/50 tracking-[0.12em]">
                      IN DEVELOPMENT
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}